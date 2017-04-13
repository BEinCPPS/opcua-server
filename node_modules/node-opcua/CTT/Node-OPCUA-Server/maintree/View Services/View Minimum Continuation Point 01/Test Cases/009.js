/*    Test 5.7.2-7 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node exists
            And the node has at least three inverse references
            And RequestedMaxReferencesPerNode is 1
            And BrowseDirection is Inverse
            And Browse has been called
          When BrowseNext is called
            And ReleaseContinuationPoints is false
          Then the server returns the second reference
            And ContinuationPoint is not empty
          Validation is accomplished by first browsing all inverse references
          on a node, then performing the test and comparing the second 
          reference to the reference returned by the BrowseNext call. So this
          test only validates that Browse two references is consistent with 
          Browse one reference followed by BrowseNext. */

function GetDefaultInverseReferencesFromNodeId( nodeToBrowse ) {
    var request = GetDefaultBrowseRequest( Test.Session.Session, nodeToBrowse );
    request.NodesToBrowse[0].BrowseDirection = BrowseDirection.Inverse;
    var references = GetReferencesFromRequest( Test.Session.Session, request );
    return references[0];
}


// Return the response from a call to Browse requesting one Inverse reference of a node.
function GetBrowseResponseForOneInverseReference( nodeToBrowse ) { 
    var request = GetDefaultBrowseRequest( Test.Session.Session, nodeToBrowse );
    var response = new UaBrowseResponse();
    request.RequestedMaxReferencesPerNode = 1;
    request.NodesToBrowse[0].BrowseDirection = BrowseDirection.Inverse;
    var uaStatus = Test.Session.Session.browse( request, response );
    if( !AssertBasicBrowseSuccess( uaStatus, response, request ) ) {
        addError( "Test cannot be completed: Browse failed" );
        return -1;
    }
    return response;
}


function TestBrowseNextWhenMoreInverseReferencesExist() {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has 3 Inverse References 1" ).toString() );
    if( nodeToBrowse === undefined || nodeToBrowse === null || nodeToBrowse === "" ) {
        addSkipped( "Unable to read setting: /Server Test/NodeIds/References/Has 3 Inverse References 1. This test needs a node that has at least 3 inverse references." );
        return( false );
    }
    // get expected references and ensure they're Inverse
    var expectedReferences = GetDefaultInverseReferencesFromNodeId( nodeToBrowse ); 
    for( var i = 0; i < expectedReferences.length; i++ ) {
        print( "\tChecking reference[" + i + "] is an inverse only reference: " + !expectedReferences[i].IsForward );
        if( expectedReferences[i].IsForward ) {
            addError( "Test cannot be completed: Browse in the Inverse direction returned Forward nodes." );
            return( false );
        }
    }
    if( expectedReferences.length < 3 ) {
        addError( "Test cannot be completed: node must have at least three Inverse references." );
        return( false );
    }
    // Browse for first reference
    var firstResponse = GetBrowseResponseForOneInverseReference( nodeToBrowse );
    if( firstResponse == -1 ) {
        return( false );
    } 
    // BrowseNext for second reference
    // And validate that the reference from BrowseNext is the second reference (expectedReferences[1])
    AssertBrowseNextReturnsReferences( Test.Session.Session, [ expectedReferences ], 1, firstResponse );
}

// BrowseNext for references in the Inverse direction
TestBrowseNextWhenMoreInverseReferencesExist();