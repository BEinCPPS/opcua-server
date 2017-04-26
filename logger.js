'use strict'
var winston = require('winston')
var config = require('./config')

winston.loggers.add('information', {
  console: {
    level: 'info',
    colorize: true
  },
  file: {
    json: false,
    filename: config.logging.fileName,
    level: 'info'
  }
})
winston.loggers.add('result', {
  file: {
    timestamp: false,
    json: false,
    filename: 'result.log',
    level: 'debug'
  }
})

var log = winston.loggers.get('information')
var logResult = winston.loggers.get('result')

var logger = {
  debug: function (data, metadata, result) {
    log.log('debug', data, metadata)
    if (result === 'result') { logResult.log('debug', data, metadata) }
  },
  info: function (data, metadata, result) {
    log.log('info', data, metadata)
    if (result === 'result') { logResult.log('info', data, metadata) }
  },
  warn: function (data, metadata, result) {
    log.log('warn', data, metadata)
    if (result === 'result') { logResult.log('warn', data, metadata) }
  },
  error: function (data, metadata, result) {
    log.log('error', data, metadata)
    if (result === 'result') { logResult.log('error', data, metadata) }
  }
}
module.exports = logger
