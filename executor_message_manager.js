'use strict'
var HashMap = require('hashmap')
var logger = require('./logger.js')
var config = require('./config')
var opcua = require('node-opcua')
var DataType = opcua.DataType

var ExecutorMessageManager = (function () {
  var addressSpaceManager = null
  var addressSpaceNotifier = null

  var messageArray = null
  var messageTypeMap = new HashMap()
  var isConnected = false
  // var buttonsMap = new HashMap();
  // TODO Bastera solo uno o una mappa
  var testStationObject = null
  // var idMachine = null
  // var idBox = null
  // var idMeasureConfiguration = null
  // var serialNumber = null
  // var _12NC = null

  function convertStringToDate (value) {
    if (!value) {
      return
    }
    // console.log('inside convertStringToDate with the following input string: ' + value);
    value = replaceLineBreak(value)
    var millisecs = null
    if (value.length > 14) {
      millisecs = value.substring(value.length - 3)
      value = value.substring(0, value.length - 3)
    }
    var date = new Date(value.replace(
      /^(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/,
      '$4:$5:$6 $2/$3/$1'
    ))

    if (millisecs) {
      date.setMilliseconds(millisecs)
    }
    return date
  }

  /* function convertDateToString (value) {
    if (!value) { return }
        // console.log('inside convertDateToString with following input date: ' + value);
    var retval = value.getFullYear() +
            pad2(value.getMonth() + 1) +
            pad2(value.getDate()) +
            pad2(value.getHours()) +
            pad2(value.getMinutes()) +
            pad2(value.getSeconds()) +
            pad3(value.getMilliseconds())
    console.log('resulting string is: ' + retval)
    return retval
  }

  function pad2 (n) {
    return (n < 10 ? '0' : '') + n
  }

  function pad3 (n) {
    if (!n) { return '000' }
    var str = new String(n)
    while (str.length < 3) { str = '0' + str }
    return str
  }
  */
  function replaceLineBreak (message) {
    var message_ = message + ''
    var text = message_.replace(/(\r\n|\n|\r)/gm, '')
    return text
  }
  var extractData = function (message) {
    var dataStr = message + ''
    if (dataStr) {
      try {
        messageArray = dataStr.split(config.executorDataSeparator)
        var messageType = Number(messageArray[2])
        var callback = messageTypeMap.get(Number(messageType))
        callback()
      } catch (error) {}
    }
  } // end extract

  var connectSocket = function () {
    console.log('Socket Connecting....'.bold.cyan)
    var idMachine = Number(messageArray[0])
    var idBox = Number(messageArray[1])
    var ipAddress = messageArray[3]
    var description = messageArray[4]
    // TODO Capire come fare con Preda a gestire le configurazioni
    // idMeasureConfiguration = extractMeasureConfiguration(messageArray[5]);
    if (!idMachine || !idBox) {
      return
    }
    testStationObject = addressSpaceManager
      .addTestStationInstance(idMachine, idBox)
    feedEventNotifierHash()
    if (testStationObject) {
      isConnected = true
      feedAdditionalInfo(ipAddress, description)
    }
  }

  var closeSocket = function () {
    // TODO
    // addressSpaceManager.removeTestStationInstance(idMachine, idBox);
    isConnected = false
    // idMachine = null
    // idBox = null
    // feedAdditionalInfoActive('false')
  }

  var feedSerialNumber = function (idMachine, idBox, serialNumber_) {
    if (typeof serialNumber_ !== 'undefined' && serialNumber_ != null && serialNumber_) {
      var serialNumberObj = addressSpaceManager.getTestStationValueInstance(idMachine, idBox).serialNumber
      var dataValue = null
      if (serialNumberObj) {
        // dataValue = addressSpaceManager.getSerialNumberObj().value
        dataValue = serialNumberObj.value
        var retVal = setStringToMeasure('serialNuber', dataValue, serialNumber_)
        if (retVal) {
          setTimestampToMeasure('serialNumber', dataValue, new Date())
          logger.info('SerialNumber '.cyan + serialNumberObj.description + ' reached :-)'.cyan)
          logger.debug('ok->TestStation_' + idMachine + '_' + idBox + 'serialNumber', serialNumber_, 'result')
        }
      }
    }
  }

  var feed12NC = function (idMachine, idBox, _12NC_) {
    if (typeof _12NC_ !== 'undefined' && _12NC_ != null && _12NC_) {
      var _12NCObj = addressSpaceManager.getTestStationValueInstance(idMachine, idBox)._12NC
      var dataValue = null
      if (_12NCObj) {
        // dataValue = addressSpaceManager.get12NCObj().value
        dataValue = _12NCObj.value
        var retVal = setStringToMeasure('12NC', dataValue, _12NC_)
        if (retVal) {
          setTimestampToMeasure('12NC', dataValue, new Date())
          logger.info('12NC '.cyan + _12NCObj.description + ' reached :-)'.cyan)
          logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_12NC', _12NC_, 'result')
        }
      }
    }
  }

  var feedMeasure = function () {
    try {
      var idMachineVal = messageArray[0]
      var idBoxVal = messageArray[1]
      var measureId = Number(messageArray[3])
      var haveToNotifyEvent = addressSpaceManager.addMeasure(idMachineVal, idBoxVal, measureId)
      if (haveToNotifyEvent) {
        feedEventNotifierHash()
      }
      var measureIdentifier = addressSpaceManager.createMeasureIdentifier(idMachineVal, idBoxVal, measureId)
      var measureObj = addressSpaceManager.getMeasureMap().get(measureIdentifier)
      var dataValue = measureObj.value
      var retVal = setNumberToMeasure(measureId, dataValue, messageArray[4])
      logger.info('Measure '.bold.yellow + measureIdentifier + ' feeded  with value ' + messageArray[4].bold.cyan)
      logger.debug('ok->teststation:TestStation_' + idMachineVal + '_' + idBoxVal + '_measure' + measureId, messageArray[4], 'result')
      if (retVal) {
        setTimestampToMeasure(measureId, dataValue, messageArray[5])
      }
    } catch (error) {
      logger.error('Error encountered in feeding measures: '.bold.red, error)
    }
  }
  var feedAutomaState = function () {
    try {
      var idMachine = messageArray[0]
      var idBox = messageArray[1]
      var stateId = Number(messageArray[3])
      var dataValue = null
      // if (addressSpaceManager.getStateObj()) {
      // dataValue = addressSpaceManager.getStateObj().value
      var stateObj = addressSpaceManager.getTestStationValueInstance(idMachine, idBox).state
      if (stateObj) {
        dataValue = stateObj.value
        var retVal = setStringToMeasure(stateId, dataValue, stateId)
        logger.info('State '.bold.yellow + stateId + ' feeded  with value ' + messageArray[4].bold.cyan)
        logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_state', messageArray[3], 'result')
        // Set payload in INNER  property for State
        // setStringToMeasure(stateId, addressSpaceManager.getStateObj().propertyValues[0], messageArray[4])
        setStringToMeasure(stateId, stateObj.propertyValues[0], messageArray[4])
        logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_statePayload', messageArray[4], 'result')

        if (retVal) {
          setTimestampToMeasure(stateId, dataValue, messageArray[5])
          logger.info('State '.cyan + stateObj.description + ' reached :-)'.cyan)
        }
        // Extract serial Number and Payload
        if (stateId === 300) {
          var payload = messageArray[4] + ''
          if (payload) {
            var payloadArray = payload.split(config.executorSubDataSeparator)
            var serialNumber_ = payloadArray[0]
            var _12nc = payloadArray[3]
            // serialNumber = serialNumber_
            // _12NC = _12nc
            feedSerialNumber(idMachine, idBox, serialNumber_)
            feed12NC(idMachine, idBox, _12nc)
            logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_serialNumber', serialNumber_, 'result')
            logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_12NC', _12nc, 'result')
          }
        }
      }
    } catch (error) {
      logger.error('Error encountered in feeding automa state: '.bold.red, error)
    }
  }

  var feedAcknowledge = function () {
    try {
      var idMachine = messageArray[0]
      var idBox = messageArray[1]
      var ackId = Number(messageArray[3])
      var dataValue = null
      var acknowledgeObj = addressSpaceManager.getTestStationValueInstance(idMachine, idBox).acknowledge
      if (acknowledgeObj) {
        // dataValue = addressSpaceManager.getAcknowledgeObj().value
        dataValue = acknowledgeObj.value
        var retVal = setNumberToMeasure(ackId, dataValue, messageArray[3])
        if (retVal) {
          setTimestampToMeasure(ackId, dataValue, messageArray[4])
          logger.info('Ack '.cyan + addressSpaceManager.getAcknowledgeObj().description + ' reached :-)'.cyan)
          logger.debug('ok->TestStation_' + idMachine + '_' + idBox + '_acknowledge', messageArray[3], 'result')
        }
      }
    } catch (error) {
      logger.error('Error encountered in feeding acknowledge: '.bold.red, error)
    }
  }
  var feedAdditionalInfo = function (ipAddress, description) {
    try {
      var idMachine = messageArray[0]
      var idBox = messageArray[1]
      var dataValue = null
      var testAdditionalInfoObj = addressSpaceManager.getTestStationValueInstance(idMachine, idBox).testStationAddInfo
      if (testAdditionalInfoObj) {
        // dataValue = addressSpaceManager.getTestStationAddInfoObj().value
        dataValue = testAdditionalInfoObj.value
        var retVal = setStringToMeasure('', dataValue, description)
        // Set ipAddress in INNER  property for State
        setStringToMeasure('', testAdditionalInfoObj.propertyValues[0], ipAddress)
        // feedAdditionalInfoActive('true'); //TODO
        if (retVal) {
          setTimestampToMeasure('info', dataValue, messageArray[5])
          logger.info('AdditionalInfo '.cyan + testAdditionalInfoObj.description + ' reached :-)'.cyan)
        }
      }
    } catch (error) {
      logger.error('Error encountered in feeding station info: '.bold.red, error)
    }
  }

  var feedEventNotifierHash = function () {
    try {
      logger.info('Entering in event notifier....'.bold.yellow)
      var dataValue = null
      if (addressSpaceManager.getEventNotifierHash()) {
        var hash = addressSpaceNotifier.getHash()
        if (hash) {
          dataValue = addressSpaceManager.getEventNotifierHash().value
          var retVal = setStringToMeasure('', dataValue, hash)
          if (retVal) {
            setTimestampToMeasure('hash', dataValue, new Date())
            logger.info('EventNotifierHash '.cyan + addressSpaceManager.getEventNotifierHash().description + ' reached :-)'.cyan)
          }
        }
      }
    } catch (error) {
      logger.error('Error encountered in feeding EventNotifierHash: '.bold.red, error)
    }
  }

  var setNumberToMeasure = function (idVariable, variableValue, value) {
    var retVal = false
    if (!isConnected) return retVal
    if (typeof value === 'undefined') {
      variableValue.value = -1
    } else {
      variableValue.value = {
        dataType: DataType.Int32,
        value: value
      }
      retVal = true
    }
    return retVal
  }

  var setStringToMeasure = function (idVariable, variableValue, value) {
    var retVal = false
    if (!isConnected) return retVal
    if (typeof value === 'undefined' || value == null || value === '') {
      // Se non ho dei dati accessori metto ON per segnalare l'arrivo dello stato
      variableValue.value = {
        dataType: DataType.String,
        value: 'NULL'
      }
    } // TODO
    else {
      variableValue.value = {
        dataType: DataType.String,
        value: replaceLineBreak(value)
      }
      retVal = true
    }
    return retVal
  }

  var setTimestampToMeasure = function (idVariable, variableValue, timestamp) {
    if (!isConnected) return
    if (typeof timestamp === 'undefined' || timestamp == null) {
      variableValue.sourceTimestamp = new Date()
    } else {
      variableValue.sourceTimestamp = convertStringToDate(timestamp)
    }
  }

  var buildMessageTypeMap = function () {
    messageTypeMap.set(1, connectSocket)
    messageTypeMap.set(2, feedMeasure)
    messageTypeMap.set(3, feedAutomaState)
    messageTypeMap.set(5, feedAcknowledge)
  }

  var init = function (addressSpaceManager_, addressSpaceNotifier_) {
    addressSpaceManager = addressSpaceManager_
    addressSpaceNotifier = addressSpaceNotifier_
    buildMessageTypeMap()
  }

  var reset = function () {
    messageArray = null
    messageTypeMap = new HashMap()
    isConnected = false
    testStationObject = null
    addressSpaceManager = null
    addressSpaceNotifier = null
  }

  // Costructor
  var ExecutorMessageManager = function () {
    reset()
  }

  ExecutorMessageManager.prototype = {
    // constructor
    constructor: ExecutorMessageManager,
    extractData: extractData,
    // buildData: buildData,
    feedEventNotifierHash: feedEventNotifierHash,
    closeSocket: closeSocket,
    reset: reset,
    init: init
  }
  return ExecutorMessageManager
})()

module.exports = new ExecutorMessageManager()
