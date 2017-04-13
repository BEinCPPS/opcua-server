/*    Test 5.7.2-Gen-Err-003 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given a non-existent authenticationToken
          When BrowseNext is called
          Then the server returns service error Bad_SecurityChecksFailed. */

include( "./library/ClassBased/UaRequestHeader/5.4-Err-003.js" );

function Test572GenErr003Browse( request, response ) {
    return Test.Session.Session.browseNext( request, response );
}

function Test572GenErr003Assert( request, response, expectedServiceResult ) {
    return( UaResponseHeader.IsValid( { Service: { Name: "BrowseNext", Request: request, Response: response }, ServiceResult: expectedServiceResult } ) );
}

function Test572GenErr003() {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has 3 Forward References 1" ).toString() );
    if( nodeToBrowse === undefined || nodeToBrowse === null ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check setting 'Server Test/NodeIds/References/Has 3 Forward References 1.'" );
        return( false );
    }
    var firstResponse = GetBrowseResponseForOneReference( Test.Session.Session, [ nodeToBrowse ] );
    if( firstResponse === -1 ) return( false );
    // setup a valid request
    var request = CreateDefaultBrowseNextRequest( Test.Session.Session );
    if( request == -1 ) {
        addError( "Test cannot be completed" );
        return( false );
    }
    request.ContinuationPoints[0] = firstResponse.Results[0].ContinuationPoint;
    var response = new UaBrowseNextResponse();
    TestNonexistentAuthenticationToken( Test572GenErr003Browse, Test572GenErr003Assert, request, response );
    // clean-up any continuationPoints
    releaseContinuationPoints( Test.Session.Session, firstResponse );
    return( true );
}

Test.Execute( { Procedure: Test572GenErr003 } );