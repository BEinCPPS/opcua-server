/*  Test prepared by Mark Rice; mrice@canarylabs.com
    Description: Read a valid attribute from a node id with invalid syntax: Byte Id: Empty/null. */

function read581Err006() {
    // Request a NodeId that is an empty/null byte string
    var bs = new UaByteString();
    bs.setUtf8FromString( "" );
    var nId = new UaNodeId();
    nId.setIdentifierOpaque( bs );
    var item = MonitoredItem.fromNodeIds( nId )[0];
    return( ReadHelper.Execute( { NodesToRead: item, OperationResults: [ new ExpectedAndAcceptedResults( [ StatusCode.BadNodeIdInvalid, StatusCode.BadNodeIdUnknown ] ) ] } ) );
}// function read581Err006() 

Test.Execute( { Procedure: read581Err006 } );