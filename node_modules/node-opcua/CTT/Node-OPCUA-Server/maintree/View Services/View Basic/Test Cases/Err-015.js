/*    Test 5.7.1-Gen-Err-002 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given an empty/null authenticationToken. When Browse is called, then the server returns service error Bad_SecurityChecksFailed */

include( "./library/ClassBased/UaRequestHeader/5.4-Err-002.js" );

function Test571GenErr002Browse( request, response ) {
    return Test.Session.Session.browse( request, response );
}

function Test571GenErr002Assert( request, response, expectedServiceResult ) {
    return( UaResponseHeader.IsValid( { Service: { Name: "BrowseNext", Request: request, Response: response }, ServiceResult: expectedServiceResult } ) );
}

function Test571GenErr002() {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has 3 Forward References 1" ).toString() );
    if( nodeToBrowse === undefined || nodeToBrowse === null ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check setting '/Server Test/NodeIds/References/Has 3 Forward References 1'." );
        return( false );
    }
    // setup a valid request
    var request = GetDefaultBrowseRequest( Test.Session.Session, nodeToBrowse );
    if( request == -1 ) {
        addError( "Test cannot be completed" );
        return( false );
    }
    var response = new UaBrowseResponse();
    TestNullAuthenticationToken( Test571GenErr002Browse, Test571GenErr002Assert, request, response );
    return( true );
}

Test.Execute( { Procedure: Test571GenErr002 } );