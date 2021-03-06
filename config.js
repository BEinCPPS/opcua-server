var config = {
  host:  process.env.SERVER_HOST || '127.0.0.1', // Socket communication
  // '127.0.0.1',
    // portR: 6969,
  port: process.env.SOCKET_PORT || 7001,
  stationPrefix: 'TestStation',
  stationPrefixSeparator: '_',
  enableServiceDiscovery: false,
  executorDataSeparator: '@',
  executorSubDataSeparator: '|',
  variableMeasurePrefix: 'measure',
  addressSpaceTypes: [{
    name: 'PowerMeasurementType'
  },
  {
    name: 'TemperatureMeasurementType'
  },
  {
    name: 'CounterMeasurementType'
  },
  {
    name: 'VoltageMeasurementType'

  },
  {
    name: 'CosFiMeasurementType'

  },
  {
    name: 'CurrentMeasurementType'

  },
  {
    name: 'EnergyMeasurementType'

  },
  {
    name: 'AnalogicMeasurementType'

  },
  {
    name: 'GenericMeasurementType'

  },
  {
    name: 'AutomaStateType'

  },
  {
    name: 'AcknowledgeType'

  }, {
    name: 'TestStationAddInfoType'

  },
  {
    name: 'EventNotifierType'

  },
  {
    name: 'SerialNumberType'

  }, {
    name: '12NCType'

  }
  ],
  addressSpaceState: {
    id: 'state',
    name: 'state',
    description: 'State',
    type: 'AutomaStateType',
    properties: [{
      name: 'statePayload'
    }]
  },
  addressSpaceAcknowledge: {
    id: 'acknowledge',
    name: 'acknowledge',
    description: 'Acknowledge',
    type: 'AcknowledgeType'
  },
  addressSpaceTestStationAddInfo: {
    id: 'stationInfo',
    name: 'stationInfo',
    description: 'TestStationAddInfo',
    type: 'EventNotifierType',
    properties: [{
      name: 'ipAddress'
    }]
  },
  addressSpaceEventNotifier: {
    id: 'hash',
    name: 'hash',
    description: 'EventNotifierHash',
    type: 'EventNotifierType'
  },
  addressSpaceSerialNumber: {
    id: 'serialNumber',
    name: 'serialNumber',
    description: 'SerialNumber',
    type: 'SerialNumberType'
  },
  addressSpace12NC: {
    id: '12NC',
    name: '12NC',
    description: '12NC',
    type: '12NCType'
  },
  logging: {
    fileName: 'opcua-server.log',
    logLevel: process.env.LOG_LEVEL || 'info'
  }

}
module.exports = config
