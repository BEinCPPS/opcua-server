'use strict'
var CryptoJS = require('crypto-js')
var logger = require('./logger.js')

var AddressSpaceNotifier = (function () {
  var hashVal = null
  var AddressSpaceNotifier = function () {}
  var reset = function () {
    hashVal = null
  }

  var init = function () {

  }
    // TODO
  var notifyChange = function (model, changeType) {
    logger.info('Change detected :'.bold.red + '' + changeType)
    var _hashVal = calculateHash(changeType) // TODO
    logger.info('Old hash calculated: ' + hashVal + ''.bold.cyan)
    logger.info('New hash calculated: ' + _hashVal + ''.bold.red)
    if (_hashVal === hashVal) return false
    hashVal = _hashVal
    return true
  }
  var calculateHash = function (objectToHash) {
    try {
      return CryptoJS.SHA256(objectToHash).toString()
    } catch (error) {
      logger.error('Error in hashing address space: ' + error)
      return null
    }
  }
  var sendCloseEvent = function () {
    hashVal = 'TERMINATE'
    logger.info('TERMINATE event reached')
  }

  var getHash = function () {
    return hashVal
  }
  AddressSpaceNotifier.prototype = {
        // constructor
    constructor: AddressSpaceNotifier,
    notifyChange: notifyChange,
    reset: reset,
    getHash: getHash,
    sendCloseEvent: sendCloseEvent,
    init: init
  }
  return AddressSpaceNotifier
})()
module.exports = new AddressSpaceNotifier()
