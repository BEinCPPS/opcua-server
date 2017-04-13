/*    Test 5.7.2-Gen-Err-004 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given a RequestHeader.Timestamp of 0
          When BrowseNext is called
          Then the server returns service error Bad_InvalidTimestamp. */

include( "./library/ClassBased/UaRequestHeader/5.4-Err-004.js" );

function Test572GenErr004BrowseNext( request, response ) {
    return Test.Session.Session.browseNext( request, response );
}

function Test572GenErr004Assert( request, response, expectedServiceResult ) {
    return( UaResponseHeader.IsValid( { Service: { Name: "BrowseNext", Request: request, Response: response }, ServiceResult: expectedServiceResult } ) );
}

function Test572GenErr004() {
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
        addError( "Test cannot be completed." );
        return( false );
    }
    request.ContinuationPoints[0] = firstResponse.Results[0].ContinuationPoint;
    var response = new UaBrowseNextResponse();
    TestInvalidRequestHeaderTimestamp( Test572GenErr004BrowseNext, Test572GenErr004Assert, request, response );
    return( true );
}

Test.Execute( { Procedure: Test572GenErr004 } );