/*    Test 5.7.1-Err-1 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node ID has invalid syntax
          When Browse is called
          Then the server returns an operation result of BadNodeIdInvalid
          This is as close as one can get to testing a NodeId with invalid
          syntax within the confines of the CTT, but the CTT may not be 
          doing what is intended: The CTT may just be passing the null
          Identifier associated with the IdentifierType instead of passing
          the Identifier with a data type that conflicts with the 
          IdentifierType. Maybe it's not even possible within the UA API
          to set an Identifier data type in conflict with the IdentifierType.
          In that case, the only way to create an InvalidNodeId is through
          some trickery, which would mean this test is actually a security
          test and would need to be rewritten. */

// Test browsing a NodeId of invalid syntax.
function TestBrowseOneInvalidSyntaxNodeId( nodeToBrowse, returnDiagnostics ) {
    var request = GetDefaultBrowseRequest( Test.Session.Session, nodeToBrowse );
    var response = new UaBrowseResponse();
    request.RequestHeader.ReturnDiagnostics = returnDiagnostics;
    uaStatus = Test.Session.Session.browse( request, response );

    // check result
    if( uaStatus.isGood() ) {
        var expectedOperationResultsArray = [1];
        expectedOperationResultsArray[0] = new ExpectedAndAcceptedResults( StatusCode.BadNodeIdInvalid );
        expectedOperationResultsArray[0].addExpectedResult( StatusCode.BadNodeIdUnknown );
        assertBrowseError( request, response, expectedOperationResultsArray );
    }
    else addError( "Browse() failed: " + uaStatus );
}

function testErr001() {
    var settings = Settings.Advanced.NodeIds.Invalid.Invalids;
    for( var i=0; i<settings.length; i++ ) TestBrowseOneInvalidSyntaxNodeId( UaNodeId.fromString( readSetting( settings[i] ).toString() ), 0 );
    for( var i=0; i<settings.length; i++ ) TestBrowseOneInvalidSyntaxNodeId( UaNodeId.fromString( readSetting( settings[i] ).toString() ), 0x3ff );
    return( true );
}

Test.Execute( { Procedure: testErr001 } );