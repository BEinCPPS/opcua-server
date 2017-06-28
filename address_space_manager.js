'use strict'
var HashMap = require('hashmap')
var assert = require('assert')
var config = require('./config')

var opcua = require('node-opcua')
var _ = require('underscore')
// var addressSpaceNotifier = require('./address_space_notifier.js')
var logger = require('./logger.js')

var AddressSpaceManager = (function () {
  var serverEngine = null
  var addressSpace = null
  var mySpace = null
  var testStationInstanceMap = new HashMap()
  var testStationValueInstanceMap = new HashMap()
  var currentTestStationInstance = {}
  var testGenericType = null

  var typeMap = new HashMap()
  var measureConfigMap = new HashMap()

  var measureMap = new HashMap()
  var stateObj = {}
  var acknowledgeObj = {}
  var testStationAddInfoObj = {}
  var eventNotifierHashObj = {}
  var serialNumberObj = {}
  var _12NCObj = {}
  // var stateMap = new HashMap();
  var methodMap = new HashMap()

  var defaultValue = null
  var defaultTimestamp = null
  var modelToHash = null
  var addressSpaceNotifier = null

  var buildAddressSpace = function () {
    addTypes() // TODO Understand if needed
    // addMeasures();
    // addStates();
    /* buildState()
     buildAcknowledge()
     buildTestStationAddInfo()

     buildSerialNumber()
     build12NC() */
  }

  var addTypes = function () {
    var types = config.addressSpaceTypes
    for (var i in types) {
      if (!typeMap.has(types[i].name)) {
        var type = addressSpace.addVariableType({
          browseName: types[i].name
        })
        typeMap.set(types[i].name, type)
      }
    }
    if (testGenericType === null) {
      testGenericType = addressSpace.addVariableType({
        browseName: 'TestGenericType'
      })
    }
  }
  // TODO Creare in modo dinamico una sottovariabile per gestire il payload degli stati
  // e l'indirizzo IP delle info
  var createVariable = function (object, dataValue, namePrefix) {
    var variableObj = {
      browseName: namePrefix + object.name,
      dataType: 'BaseDataType',
      typeDefinition: typeMap.get(object.type)
        ? typeMap.get(object.type).nodeId : typeMap.get('GenericMeasurementType').nodeId,
      // modellingRule: "Optional"
      value: {
        timestamped_get: function () {
          return dataValue
        }
      }
    }
    if (typeof object.nodeId !== 'undefined' && object.nodeId !== null) {
      variableObj.nodeId = object.nodeId
    }
    return addressSpace.addVariable(variableObj)
  }

  var createProperty = function (name, dataValue) {
    return addressSpace.addVariable({
      browseName: name,
      dataType: 'BaseDataType',
      value: {
        timestamped_get: function () {
          return dataValue
        }
      }
    })
  }

  var createVariableDataValue = function () {
    return new opcua.DataValue({
      value: defaultValue,
      sourceTimestamp: defaultTimestamp
    })
  }
  var addMeasure = function (idMachine, idBox, idMeasure) {
    var testStationIdentifier = createInstanceIdentifier(idMachine, idBox)
    var measureIdentifier = createMeasureIdentifier(idMachine, idBox, idMeasure)
    if (measureMap.has(measureIdentifier)) return false
    var measure = {
      name: idMeasure + '' // TODO
    }

    var dataValue = createVariableDataValue()
    var variable = createVariable(measure, dataValue, config.variableMeasurePrefix)

    var measureObj = {
      variable: variable,
      value: dataValue,
      description: ''
    }
    measureMap.set(measureIdentifier, measureObj)
    var array = [variable]
    var instance = testStationInstanceMap.get(testStationIdentifier)
    referenceNodeToVariables(instance, array)

    logger.info('Added new measure: ' + measureIdentifier)
    return addressSpaceNotifier.notifyChange(addressSpace,
      'Added measure ' + measureIdentifier)
  }

  var buildState = function () {
    var state = config.addressSpaceState // TODO
    var dataValue = createVariableDataValue()
    var variable = createVariable(state, dataValue, '')
    var propertyDataValue = createVariableDataValue()
    var property = createProperty(state.properties[0].name, propertyDataValue) // WARNING !!!!
    referenceNodeToVariables(variable, [property])
    return {
      variable: variable,
      value: dataValue,
      description: state.description,
      properties: [property],
      propertyValues: [propertyDataValue]
    }
  }

  var buildTestStationAddInfo = function () {
    var info = config.addressSpaceTestStationAddInfo
    var dataValue = createVariableDataValue()
    var variable = createVariable(info, dataValue, '')
    var propertyDataValue = createVariableDataValue()
    var properties = []
    var propertyDataValues = []
    for (var i in info.properties) {
      var property = createProperty(info.properties[i].name, propertyDataValue)
      referenceNodeToVariables(variable, [property])
      properties.push(property)
      propertyDataValues.push(propertyDataValue)
    }
    return {
      variable: variable,
      value: dataValue,
      description: info.description,
      properties: properties,
      propertyValues: propertyDataValues
    }
  }

  var buildAcknowledge = function () {
    var ack = config.addressSpaceAcknowledge
    var dataValue = createVariableDataValue()
    var variable = createVariable(ack, dataValue, '')
    return {
      variable: variable,
      value: dataValue,
      description: ack.description
    }
  }
  var buildSerialNumber = function () {
    var sn = config.addressSpaceSerialNumber
    var dataValue = createVariableDataValue()
    var variable = createVariable(sn, dataValue, '')
    return {
      variable: variable,
      value: dataValue,
      description: sn.description
    }
  }
  var build12NC = function () {
    var nc12 = config.addressSpace12NC
    var dataValue = createVariableDataValue()
    var variable = createVariable(nc12, dataValue, '')
    return {
      variable: variable,
      value: dataValue,
      description: nc12.description
    }
  }

  var referenceNodeToVariables = function (node, array, relation) {
    try {
      var relation_ = relation || 'HasComponent'
      for (var i in array) {
        node.addReference({
          referenceType: relation_,
          nodeId: array[i].nodeId
        })
      }
    } catch (error) {
      logger.error('Error encountered referencing variable to node: ' + error)
    }
  }
  // TODO Linking TestStation instances to ObjectsFolder
  var addTestStationInstance = function (idMachine, idBox) {
    logger.info('Creating Object with standard configuration: '.bold.yellow)
    var testStationToCreateObj = testStationInstanceMap.get(createInstanceIdentifier(idMachine, idBox))
    if (testStationToCreateObj) return testStationToCreateObj

    var stateObject = buildState()
    var acknowledgeObject = buildAcknowledge()
    var testStationAddInfoObject = buildTestStationAddInfo()
    var serialNumberObject = buildSerialNumber()
    var _12NCObject = build12NC()

    var testStationInstanceValue = {
      state: stateObject,
      acknowledge: acknowledgeObject,
      testStationAddInfo: testStationAddInfoObject,
      serialNumber: serialNumberObject,
      _12NC: _12NCObject
    }
    testStationValueInstanceMap.set(createInstanceIdentifier(idMachine, idBox), testStationInstanceValue)

    var testStationInstance = addressSpace.addObject({
      organizedBy: addressSpace.rootFolder.objects, // TODO MySpaceFolder
      browseName: config.stationPrefix + createInstanceIdentifier(idMachine, idBox), // TODO Name concat product configuration
      typeDefinition: testGenericType.nodeId
    })
    referenceNodeToVariables(mySpace, [testStationInstance])

    referenceNodeToVariables(testStationInstance, [stateObject.variable])
    referenceNodeToVariables(testStationInstance, [acknowledgeObject.variable])
    referenceNodeToVariables(testStationInstance, [testStationAddInfoObject.variable])
    referenceNodeToVariables(testStationInstance, [serialNumberObject.variable])
    referenceNodeToVariables(testStationInstance, [_12NCObject.variable])
    testStationInstanceMap.set(createInstanceIdentifier(idMachine, idBox), testStationInstance)

    // DEMO only remove
    addressSpaceNotifier.notifyChange(addressSpace, 'Added Testation: ' + testStationInstance.browseName)
    currentTestStationInstance = testStationInstance
    return testStationInstance
  }

  var addEventNotifierInstance = function () {
    var dataValue = createVariableDataValue()
    var hash = config.addressSpaceEventNotifier
    hash.nodeId = 'ns=3;s=test_station_event_hash'
    var variable = createVariable(hash, dataValue, '')
    eventNotifierHashObj = {
      variable: variable,
      value: dataValue,
      description: 'EventNotifierHash'
    }
    try {
      var eventNotifierHashInstance = addressSpace.addObject({
        organizedBy: addressSpace.rootFolder.objects,
        browseName: 'TestStationEventNotifier',
        nodeId: 'ns=2;s=test_station_event',
        typeDefinition: testGenericType.nodeId
      })
      // referenceNodeToVariables(mySpace, [eventNotifierHashInstance])
      referenceNodeToVariables(eventNotifierHashInstance, [eventNotifierHashObj.variable])
      logger.info('Event notifier object added to the Address Space')
    } catch (error) {
      logger.error('Error in creating Event notifier Object in address space'.bold.red, JSON.stringify(error))
    }
  }

  /*
   var removeReferencesToNode = function (identifier) {
     try {
       var references = mySpace.getComponents()
       for (var i in references) {
         if (references[i].browseName.toString() === 'TestStation' + identifier) {
           addressSpace.deleteNode(references[i])
         }
       }
     } catch (error) {
       logger.error('Error encountered in removing a node', error)
     }
   } */
  // WARNING Unused at the moment
  var removeTestStationInstance = function (identifier) {
    // var identifier = createInstanceIdentifier(idMachine, idBox)
    var testStationObject = testStationInstanceMap.get(identifier)
    // removeReferencesToNode(testStationObject)
    try {
      // removeReferencesToNode(identifier)
      addressSpace.deleteNode(testStationObject)
      logger.info('Removing TestStation' + identifier + '.........'.yellow)
      testStationInstanceMap.remove(identifier)
      testStationValueInstanceMap.remove(identifier)
    } catch (error) {
      logger.error('Error encountered in removing a node', error)
    }
  }

  var removeAllTestStations = function () {
    try {
      addressSpace.deleteNode(mySpace)
      var rootFolder = addressSpace.findNode('RootFolder')
      mySpace = addressSpace.addFolder(rootFolder.objects, {
        nodeId: 'ns=1;s=main_folder',
        browseName: 'TestStationFolder'
      })
      buildAddressSpace()
      measureMap.clear()
      testStationInstanceMap.clear()
      testStationValueInstanceMap.clear()
    } catch (error) {
      logger.error('Error removing Address Space: '.red.bold, error)
    }

    /*  var keys = testStationInstanceMap.keys()
      for (var i in keys) {
        var identifier = keys[i]
        removeTestStationInstance(identifier)
      }
      // Delete the folder after deleting all nodes
      */
    // addressSpaceNotifier.sendCloseEvent()
  }

  var getTestStationInstance = function (idMachine, idBox) {
    var testStationInstance = testStationInstanceMap.get(createInstanceIdentifier(idMachine, idBox)) || null
    return testStationInstance
  }

  var getTestStationValueInstance = function (idMachine, idBox) {
    var testStationValueInstance = testStationValueInstanceMap.get(createInstanceIdentifier(idMachine, idBox)) || null
    return testStationValueInstance
  }

  var createInstanceIdentifier = function (idMachine, idBox) {
    return idMachine + config.stationPrefixSeparator + idBox
  }

  var createMeasureIdentifier = function (idMachine, idBox, measureId) {
    return createInstanceIdentifier(idMachine, idBox) + '_' + measureId
  }

  var getAddressSpace = function () {
    return addressSpace
  }

  var getMeasureMap = function () {
    return measureMap
  }

  var getMethodMap = function () {
    return methodMap
  }

  var getMeasureConfigMap = function () {
    return measureConfigMap
  }

  var getStateObj = function () {
    return stateObj
  }

  var getSerialNumberObj = function () {
    return serialNumberObj
  }

  var get12NCObj = function () {
    return _12NCObj
  }

  var getAcknowledgeObj = function () {
    return acknowledgeObj
  }

  var getTestStationAddInfoObj = function () {
    return testStationAddInfoObj
  }

  var getTypeMap = function () {
    return typeMap
  }

  var getMySpace = function () {
    return mySpace
  }

  var getEventNotifierHash = function () {
    return eventNotifierHashObj
  }

  var reset = function () {
    serverEngine = null
    addressSpace = null
    mySpace = null
    testStationInstanceMap = new HashMap()
    testStationValueInstanceMap = new HashMap()
    measureMap = new HashMap()
    typeMap = new HashMap()
    stateObj = {}
    acknowledgeObj = {}
    serialNumberObj = {}
    _12NCObj = {}
    methodMap = new HashMap()
    addressSpaceNotifier = null
    testGenericType = null
  }

  var init = function (addressSpaceNotifier_, serverEngine_) {
    reset()
    serverEngine = serverEngine_
    addressSpaceNotifier = addressSpaceNotifier_
    modelToHash = new HashMap()
    addressSpace = serverEngine.addressSpace
    var rootFolder = addressSpace.findNode('RootFolder')
    assert(rootFolder.browseName.toString() === 'Root')
    /* var view = addressSpace.addView({
        organizedBy: rootFolder.views,
        browseName: "MySpaceView"
    }); */
    mySpace = addressSpace.addFolder(rootFolder.objects, {
      nodeId: 'ns=1;s=main_folder',
      browseName: 'TestStationFolder'
    })
    buildAddressSpace()
    addEventNotifierInstance()
    /* view.addReference({
          referenceType: "Organizes",
          nodeId: node.nodeId
      });
     */
  }
  // Costructor
  var AddressSpaceManager = function () {
    reset()
  }

  AddressSpaceManager.prototype = {
    // constructor
    constructor: AddressSpaceManager,
    addTestStationInstance: addTestStationInstance,
    removeTestStationInstance: removeTestStationInstance,
    getTestStationInstance: getTestStationInstance,
    getAddressSpace: getAddressSpace,
    getMySpace: getMySpace,
    getMeasureMap: getMeasureMap,
    getMethodMap: getMethodMap,
    getMeasureConfigMap: getMeasureConfigMap,
    getStateObj: getStateObj,
    getAcknowledgeObj: getAcknowledgeObj,
    getSerialNumberObj: getSerialNumberObj,
    get12NCObj: get12NCObj,
    getTestStationAddInfoObj: getTestStationAddInfoObj,
    getTestStationValueInstance: getTestStationValueInstance,
    getTypeMap: getTypeMap,
    getEventNotifierHash: getEventNotifierHash,
    addMeasure: addMeasure,
    buildTestStationAddInfo: buildTestStationAddInfo,
    createMeasureIdentifier: createMeasureIdentifier,
    removeAllTestStations: removeAllTestStations,
    reset: reset,
    init: init
  }
  return AddressSpaceManager
})()
module.exports = new AddressSpaceManager()
