include( "./library/ClassBased/Events.js" );
include( "./library/Base/assertions.js" );

var bs = UaByteString.fromStringData( ( "id000" ) );
var lt = new UaLocalizedText(); lt.Text = "lt001";
var ae = new AuditEventType( { EventId: bs, EventType: new UaNodeId( Identifier.Server ), SourceNode: new UaNodeId( Identifier.Server ), SourceName: "sourcename", Time: UaDateTime.utcNow(), ReceiveTime: UaDateTime.utcNow(), LocalTime: UaDateTime.utcNow(), Message: lt, Severity: 500 } );
print( "AE = " + ae.toString() );
Assert.True( ae.Validate(), "AuditEventType(params-base)" );
ae = new AuditEventType( { ActionTimeStamp: UaDateTime.utcNow(), Status: true, ServerId: "server001", ClientAuditEntryId: "client001", ClientUserId: "user001", EventId: bs, EventType: new UaNodeId( Identifier.Server ), SourceNode: new UaNodeId( Identifier.Server ), SourceName: "sourcename", Time: UaDateTime.utcNow(), ReceiveTime: UaDateTime.utcNow(), LocalTime: UaDateTime.utcNow(), Message: lt, Severity: 500 } );
print( "AuditEventType(params-all) expect true, actual: " + ae.Validate() );
print( "AE = " + ae.toString() );

for( var i=1; i<110; i++ ) {
    bs = UaByteString.fromStringData( ( "id" + i.toString() ) );
    ae = new AuditEventType( { EventId: bs, EventType: new UaNodeId( Identifier.Server ), SourceNode: new UaNodeId( Identifier.Server ), SourceName: "sourcename", Time: UaDateTime.utcNow(), ReceiveTime: UaDateTime.utcNow(), LocalTime: UaDateTime.utcNow(), Message: lt, Severity: 500 } );
}
print( "EventIds Buffered, length: " + _eventIdsBuffer.Length() );
var be = new BaseEvent();
Assert.False( be.Validate( { Suppress: true } ), "new BaseEvent()" );
be.EventId = UaByteString.fromStringData( "Hello world" );
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(EventId" );
be.EventType = new UaNodeId( Identifier.BaseModelChangeEventType );
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(EventType)" );
be.SourceNode = new UaNodeId( Identifier.BaseDataType );
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(SourceNode)" );
be.SourceName = "hello world sn";
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(SourceName)" );
be.Time = UaDateTime.utcNow();
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(Time)" );
be.ReceiveTime = UaDateTime.utcNow();
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(ReceiveTime)" );
be.LocalTime = UaDateTime.utcNow();
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(LocalTime)" );
be.Message.Text = "Hello world LT";
Assert.False( be.Validate( { Suppress: true } ), "BaseEvent(Message)" );
be.Severity = 500;
Assert.True( be.Validate( { Suppress: true } ), "BaseEvent(Severity)" );