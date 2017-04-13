/*    Test 5.7.1-Err-2 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node does not exist in the address space
          When Browse is called
          Then the server returns the operation error Bad_NodeIdUnknown */

function TestBrowseUnknownNode( nodeId, returnDiagnostics ) {
    var request = GetDefaultBrowseRequest( Test.Session.Session, nodeId );
    var response = new UaBrowseResponse();
    request.RequestHeader.ReturnDiagnostics = returnDiagnostics;
    uaStatus = Test.Session.Session.browse( request, response );
    // check result
    if( uaStatus.isGood() ) {
        var expectedOperationResultsArray = [1];
        expectedOperationResultsArray[0] = new ExpectedAndAcceptedResults( StatusCode.BadNodeIdUnknown );
        assertBrowseError( request, response, expectedOperationResultsArray );
    }
    else addError( "browse() failed: " + uaStatus );
}

function testerr002(){
    TestBrowseUnknownNode( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId1" ).toString() ), 0 );
    TestBrowseUnknownNode( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId2" ).toString() ), 0 );
    TestBrowseUnknownNode( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId3" ).toString() ), 0 );
    TestBrowseUnknownNode( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId4" ).toString() ), 0x3ff );
    TestBrowseUnknownNode( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId5" ).toString() ), 0x3ff );
    return( true );
}

Test.Execute( { Procedure: testerr002 } );