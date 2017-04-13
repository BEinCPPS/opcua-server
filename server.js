'use strict'
// require('requirish')._(module)
Error.stackTraceLimit = Infinity
var net = require('net')
var config = require('./config')
var async = require('async')

var argv = require('yargs')
    .wrap(132)
    .string('alternateHostname')
    .describe('alternateHostname')
    .alias('a', 'alternateHostname')

    .string('port')
    .describe('port')
    .alias('p', 'port')

    .string('portSocket')
    .describe('portSocket')
    .alias('s', 'portSocket')
    .argv

var opcua = require('node-opcua')
var _ = require('underscore')
// var path = require('path')

var OPCUAServer = opcua.OPCUAServer
var getFullyQualifiedDomainName = opcua.get_fully_qualified_domain_name
var makeApplicationUrn = opcua.makeApplicationUrn

// var address_space_for_conformance_testing = require('lib/simulation/address_space_for_conformance_testing')
// var build_address_space_for_conformance_testing = address_space_for_conformance_testing.build_address_space_for_conformance_testing
// var install_optional_cpu_and_memory_usage_node = require('lib/server/vendor_diagnostic_nodes').install_optional_cpu_and_memory_usage_node

// var CallMethodResult = require('lib/services/call_service').CallMethodResult
// var standard_nodeset_file = opcua.standard_nodeset_file
var port = Number(argv.port) || 26543
var portSocket = Number(argv.portSocket) || config.port

// TODO Config file
var socketServer = null
// var socketClient = null
// var isSocketClientClosable = false
var addressSpaceManager = require('./address_space_manager.js')
var executorMessageManager = require('./executor_message_manager.js')
var addressSpaceNotifier = require('./address_space_notifier.js')
var header = require('./header.js')
var logger = require('./logger.js')

var userManager = {
  isValidUser: function (userName, password) {
    if (userName === 'user1' && password === 'password1') {
      return true
    }
    if (userName === 'user2' && password === 'password2') {
      return true
    }
    return false
  }
}
// var path = require('path')

// var server_certificate_file = path.join(__dirname, '../certificates/server_selfsigned_cert_2048.pem')
// var server_certificate_file = path.join(__dirname, '../certificates/server_cert_2048_outofdate.pem')
// var server_certificate_privatekey_file = path.join(__dirname, '../certificates/server_key_2048.pem')

var serverOptions = {

  // certificateFile: server_certificate_file,
  // privateKeyFile: server_certificate_privatekey_file,

  port: port,
  portSocket: portSocket,
    // xx (not used: causes UAExpert to get confused) resourcePath: "UA/Server",
  maxAllowedSessionNumber: 500,

  /* nodeset_filename: [
    standard_nodeset_file,
    path.join(__dirname, '../nodesets/Opc.Ua.Di.NodeSet2.xml')
  ], */

  serverInfo: {
    applicationUri: makeApplicationUrn(getFullyQualifiedDomainName(), 'OPCUA-Server'),
    productUri: 'OPCUA-Server',
    applicationName: {
      text: 'OPCUA',
      locale: 'en'
    },
    gatewayServerUri: null,
    discoveryProfileUri: null,
    discoveryUrls: []
  },
  buildInfo: {
    productName: 'OPCUA-Server',
    softwareVersion: '0.0.1',
    buildNumber: '00001',
    buildDate: new Date(2017, 3, 30)
  },
  serverCapabilities: {
    operationLimits: {
      maxNodesPerRead: 1000,
      maxNodesPerBrowse: 2000
    }
  },
  userManager: userManager,
  isAuditing: true
}

process.title = 'OPCUA Server on port : ' + serverOptions.port

serverOptions.alternateHostname = argv.alternateHostname

var server = new OPCUAServer(serverOptions)

var endpointUrl = server.endpoints[0].endpointDescriptions()[0].endpointUrl

var hostname = require('os').hostname()
logger.info(header)

server.on('post_initialize', function () {
 // build_address_space_for_conformance_testing(server.engine)
    // install_optional_cpu_and_memory_usage_node(server);
  async.series([
    function (callback) {
      addressSpaceManager.init(addressSpaceNotifier, server.engine)
      callback()
    },
    function (callback) {
      executorMessageManager.init(addressSpaceManager, addressSpaceNotifier)
      callback()
    }
  ], function (err) {
    if (!err)
            // connectClientSocket();
          { connectServerSocket() }
  })
})
function connectServerSocket () {
    // Create a server instance, and chain the listen function to it
    // The function passed to net.createServer() becomes the event handler for the 'connection' event
    // The sock object the callback function receives UNIQUE for each connection
  try {
    logger.info('SOCKET COMMNICATION (EXECUTOR-->SERVER)  listening on '.bold.yellow + config.host + ':' + portSocket + '')
    socketServer = net.createServer(function (sock) {
            // We have a connection - a socket object is assigned to the connection automatically
      logger.info('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort)

            // Add a 'data' event handler to this instance of socket
      sock.on('data', function (data) {
        logger.debug('DATA ' + sock.remoteAddress + ': ' + data + ''.red.bold)
        var dataStr = data + ''
        var dtStr = JSON.parse(JSON.stringify(dataStr))
        logger.debug(dtStr)
                // }
        executorMessageManager.extractData(dataStr)
      })
            // Add a 'close' event handler to this instance of socket
      sock.on('close', function (data) {
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort)
        // addressSpaceManager.removeAllTestStations()
        // executorMessageManager.feedEventNotifierHash()
      })
    })
    socketServer.listen(portSocket, config.host)
        // nodejs syntax
    socketServer.on('error', (e) => {
      if (e.code == 'EADDRINUSE') {
        logger.info('Another connection attempt, retrying...')
        setTimeout(() => {
          socketServer.close()
          socketServer.listen(portSocket, config.host)
        }, 5000)
      } else {
        logger.info('SOCKET COMMNICATION (EXECUTOR-->SERVER) is not available '.bold.yellow, e)
      }
    })
  } catch (err) {
    logger.error('SOCKET COMMNICATION (EXECUTOR-->SERVER) is not available '.bold.red, JSON.stringify(err))
  }
}

function dumpObject (obj) {
  function w (str, width) {
    var tmp = str + '                                        '
    return tmp.substr(0, width)
  }

  return _.map(obj, function (value, key) {
    return '      ' + w(key, 30).green + '  : ' + ((value === null) ? null : value.toString())
  }).join('\n')
}
console.log('  server PID          :'.yellow, process.pid)

server.start(function (err) {
  if (err) {
    console.log(' Server failed to start ... exiting')
    process.exit(-3)
  }
  console.log('  server on port      :'.yellow, server.endpoints[0].port.toString().cyan)
  console.log('  endpointUrl         :'.yellow, endpointUrl.cyan)

  console.log('  serverInfo          :'.yellow)
  console.log(dumpObject(server.serverInfo))
  console.log('  buildInfo           :'.yellow)
  console.log(dumpObject(server.engine.buildInfo))

  console.log('  standard nodeset    :'.yellow, 'Dynamically generated via Socket communication')

  console.log('\n  server now waiting for connections. CTRL+C to stop'.yellow)

    //  console.log = function(){};
})

server.on('create_session', function (session) {
  console.log(' SESSION CREATED')
  console.log('    client application URI: '.cyan, session.clientDescription.applicationUri)
  console.log('        client product URI: '.cyan, session.clientDescription.productUri)
  console.log('   client application name: '.cyan, session.clientDescription.applicationName.toString())
  console.log('   client application type: '.cyan, session.clientDescription.applicationType.toString())
  console.log('              session name: '.cyan, session.sessionName ? session.sessionName.toString() : '<null>')
  console.log('           session timeout: '.cyan, session.sessionTimeout)
  console.log('                session id: '.cyan, session.sessionId)
})

server.on('session_closed', function (session, reason) {
  console.log(' SESSION CLOSED :', reason)
  console.log('              session name: '.cyan, session.sessionName ? session.sessionName.toString() : '<null>')
})

function w (s, w) {
  return ('000' + s).substr(-w)
}

function t (d) {
  return w(d.getHours(), 2) + ':' + w(d.getMinutes(), 2) + ':' + w(d.getSeconds(), 2) + ':' + w(d.getMilliseconds(), 3)
}

server.on('response', function (response) {
  logger.debug(t(response.responseHeader.timeStamp), response.responseHeader.requestHandle,
        response._schema.name.cyan, ' status = ', response.responseHeader.serviceResult.toString().cyan)
  switch (response._schema.name) {
    case 'ModifySubscriptionResponse':
    case 'CreateMonitoredItemsResponse':
    case 'ModifyMonitoredItemsResponse':
    case 'RepublishResponse':
            // xx console.log(response.toString());
      break
    case 'BrowseResponse':
    case 'TranslateBrowsePathsToNodeIdsResponse':
            // xx console.log(response.toString());
      break
    case 'WriteResponse':
      break
    case 'XXXX':
      var str = '   '
      response.results.map(function (result) {
        str += result.toString()
      })
            // console.log(str); //TODO
      break
  }
})

function indent (str, nb) {
  var spacer = '                                             '.slice(0, nb)
  return str.split('\n').map(function (s) {
    return spacer + s
  }).join('\n')
}

server.on('request', function (request, channel) {
  logger.debug(t(request.requestHeader.timeStamp), request.requestHeader.requestHandle,
        request._schema.name.yellow, ' ID =', channel.secureChannelId.toString().cyan)
  switch (request._schema.name) {
    case 'ModifySubscriptionRequest':
    case 'CreateMonitoredItemsRequest':
    case 'ModifyMonitoredItemsRequest':
    case 'RepublishRequest':
            // xx console.log(request.toString());
      break
    case 'xxReadRequest':
      var str = '    '
      if (request.nodesToRead) {
        request.nodesToRead.map(function (node) {
          str += node.nodeId.toString() + ' ' + node.attributeId + ' ' + node.indexRange
        })
      }
            // console.log(str);
      break
    case 'xxWriteRequest':
      if (request.nodesToWrite) {
        var lines = request.nodesToWrite.map(function (node) {
          return '     ' + node.nodeId.toString().green + ' ' + node.attributeId + ' ' + node.indexRange + '\n' + indent('' + node.value.toString(), 10) + '\n'
        })
        logger.debug(lines.join('\n'))
      }
      break

    case 'xxTranslateBrowsePathsToNodeIdsRequest':
    case 'xxBrowseRequest':
            // do special console output
            // console.log(util.inspect(request, {colors: true, depth: 10}));
            // console.log(request.toString());
      break
  }
})

process.on('SIGINT', function () {
    // only work on linux apparently
  logger.info(' Received server interruption from user '.red.bold)
  logger.info(' shutting down ...'.red.bold)
  server.shutdown(1000, function () {
    logger.info(' shutting down completed '.red.bold)
    logger.info(' done '.red.bold)
    process.exit(-1)
  })
  if (socketServer) {
    logger.info('Destroying socket server...'.yellow)
    socketServer.close()
    logger.info('Socket sever destroyed'.yellow)
  }
})
if (config.enableServiceDiscovery) {
  var discoveryServerEndpointUrl = 'opc.tcp://' + hostname + ':4840/UADiscovery'

  console.log('\nregistering server to :'.yellow + discoveryServerEndpointUrl)

  server.registerServer(discoveryServerEndpointUrl, function (err) {
    if (err) {
        // cannot register server in discovery
      logger.debug('     warning : cannot register server into registry server'.cyan)
    } else {
      logger.debug('     registering server to the discovery server : done.'.cyan)
    }
    logger.debug('')
  })
}
