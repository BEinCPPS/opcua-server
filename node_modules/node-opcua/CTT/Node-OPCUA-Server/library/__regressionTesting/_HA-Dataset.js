/* Recordset information, as used by the .NET tool for validating the aggregates used 
   in the definition and validation of the Aggregates defined in UA Part 13.
*/

var AggregateName = { Interpolative: 1 }
const Interpolated = 0x01; //TODO
const Calculated = 0x02; //TODO
const Partial = 0x03; //TODO
const MultipleValues = 0x04; //TODO
OPCF.HA.AggregatesDataSet = new Object();
OPCF.HA.AggregatesDataSet = {
    DurationGood:{
        Historian1: { 
        Name: "Historian1",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 6000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:08" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 6000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:16" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 16000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:32" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 14000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:04" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10001 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },]
        },
        Historian2: { 
        Name: "Historian2",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 14000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:16" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 16000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:32" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 14000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:04" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 13000 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 7001 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, ], 
        }
    },
    
    PercentGood:{
        Historian1: { 
        Name: "Historian1",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 37.5 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:16" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 100 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:32" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 87.5 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:04" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 100 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },]
        }
    },
    
     Delta:{
        Historian1: { 
        Name: "Historian1",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:16" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:32" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:04" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 0 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },]
        }
    },
 };

OPCF.HA.AggregatesDataSet = {
    Averaging:{
        Historian1: { 
        Name: "Historian1",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:10" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:40" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:50" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:10" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) } 
        ], //RawValues
        }, //Historian1
   
        Historian2: { 
        Name: "Historian2",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.BadNoData ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 25 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain  ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }
        ],//RawValues
        }, //Historian2

        Historian3: { 
        Name: "Historian3",
        RawValues: [
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 25 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain  ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }
        ],//RawValues
        }, //Historian3

        Historian4: { 
        Name: "Historian4",
        RawValues: [
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: "null" } ), StatusCode: StatusCode.Bad }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: StatusCode.Uncertain }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }
        ],//RawValues
        }, //Historian4

    }//Averaging
    };

var Historian1 = {
    Name: "Historian1",
    RawValues: [
        /*{ NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:10" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:40" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:50" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:00" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:10" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) } ],*/
        
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:10" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:20" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:30" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:40" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:50" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: "null" } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:00" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:10" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: new UaStatusCode( StatusCode.Uncertain ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:20" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: new UaStatusCode( StatusCode.Good ) } ], 
        
};
var Historian2 = {
    Name: "Historian2", 
    RawValues: [

        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.BadNoData ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 25 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain  ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) } ],
};

var Historian3 = {
    Name: "Historian3", 
    RawValues: [
        
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 25 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: new UaVariant(), StatusCode: new UaStatusCode( StatusCode.Bad ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Uncertain  ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: new UaStatusCode( StatusCode.Good ) }, 
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: new UaStatusCode( StatusCode.Good ) },
        { NodeId: new UaNodeId( Identifier.Server ), SourceTimestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: new UaStatusCode( StatusCode.Good ) } ],
        
        
        /*
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: null },
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 25 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: "null" } ), StatusCode: StatusCode.Bad }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 40 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 60 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: StatusCode.Uncertain }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 90 } ), StatusCode: null } ]
        */
};

var Historian4 = {
    Name: "Historian4",
    RawValues: [
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: "null" } ), StatusCode: StatusCode.Bad }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: StatusCode.Uncertain }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: false } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Boolean, Value: true } ), StatusCode: null } ]
};

var Historian5 = {
    Name: "Historian5", 
    RawValues: [
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:02" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:25" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 20 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:28" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 10 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:39" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:42" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: "null" } ), StatusCode: StatusCode.Bad }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:48" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:00:52" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 50 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:12" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 30 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:17" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: StatusCode.Uncertain }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:23" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:26" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 80 } ), StatusCode: null }, 
        { Timestamp: UaDateTime.fromHoursMinutesSecondsString( "00:01:30" ), Value: UaVariant.New( { Type: BuiltInType.Int32, Value: 70 } ), StatusCode: null } ]
};