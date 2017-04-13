// helper to get the browse names
function helperReadBrowseName( NodeId ) {
    var request = new UaReadRequest();
    var response = new UaReadResponse();
    Session.buildRequestHeader( request.RequestHeader );
    request.NodesToRead[0].NodeId = NodeId;
    request.NodesToRead[0].AttributeId = Attribute.BrowseName;
    uaStatus = Session.read( request, response );
    if( !uaStatus.isGood() ) addError( "Read() status " + uaStatus, uaStatus );
    if( response.Results.length != 1 ) addError( "Read() returned no results" );
    return response.Results[0].Value;
}

// the service is expected to succeed
// all operations are expected to succeed
function checkRegisterNodesValidParameter( Request, Response, SuppressMessaging ) {
    if( !isDefined( Request ) || !isDefined( Response ) ) throw( "RegisterNodes::check_registerNodes_valid:Request/Response not specified." );
    if( Response.ResponseHeader.ServiceResult.isBad() ) return( false ); // no need to check response if overall call failed
    var bSucceeded = true;
    if( !isDefined( SuppressMessaging ) ) SuppressMessaging = false;
    // check number of results
    if( Response.RegisteredNodeIds.length !== Request.NodesToRegister.length ) {
        if( !suppressMessaging ) addError( "The number of RegisteredNodeIds does not match the number of NodesToRegister." );
        if( !suppressMessaging ) addError( "NodesToRegister.length = " + Request.NodesToRegister.length + "; RegisteredNodeIds.length = " + Response.RegisteredNodeIds.length );
        bSucceeded = false;
    }
    else {
        // check each result
        for( var i=0; i<Response.RegisteredNodeIds.length; i++ ) {
            var originalBrowseName   = helperReadBrowseName( Request.NodesToRegister[i] );
            var registeredBrowseName = helperReadBrowseName( Response.RegisteredNodeIds[i] );
            if( !originalBrowseName.equals( registeredBrowseName ) ) if( !suppressMessaging ) addError( "Specified NodeId does not refer to the same node as the returned NodeId." );
        }
    }
    return bSucceeded;
}