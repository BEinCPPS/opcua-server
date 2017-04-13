// The service is expected to succeed;
// one, some or all operations are expected to fail.

// This function checks if the server returned the expected error codes
// request is of Type UaBrowseRequest
// response is of Type UaBrowseResponse
// expectedOperationResultsArray is an array of ExpectedAndAcceptedResult (defined in Base/Objects/expectedResults.js)
function assertBrowseError( request, response, expectedOperationResultsArray )
{
    if ( !Assert.Equal(3, arguments.length, "checkBrowseError(): Number of arguments must be 3") ) return( false );

    // expectedOperationResultsArray needs to have the correct size
    if ( !Assert.Equal(request.NodesToBrowse.length, expectedOperationResultsArray.length, "checkBrowseError(): expectedOperationResultsArray[] must have the same size as request.NodesToBrowse[]") )         return( false );

    // check response header
    //checkResponseHeaderError( request.RequestHeader, response.ResponseHeader, expectedOperationResultsArray );
    UaResponseHeader.IsValid( { Service: { Name: "Browse", Request: request, Response: response } } );

    // check results
    // check number of results
    if( Assert.Equal( response.Results.length, request.NodesToBrowse.length, "The number of results does not match the number of NodesToBrowse." ) ) {
        for( var i=0; i<response.Results.length; i++ ) Assert.StatusCodeIsOneOf( expectedOperationResultsArray[i], response.Results[i].StatusCode, "Response.Results[" + i + "].StatusCode" );
    }
}