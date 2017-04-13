/* Functions in this script:
        function disconnect( Channel, Session )
        function disconnectSession( Channel, Session )
        function disconnectChannel( Channel, ExpectedErrors ) */

include("./library/ServiceBased/SessionServiceSet/CloseSession.js")

// Completely disconnects from a server; closes the session, then closes the channel.
function disconnect( Channel, Session ) {
    // check function parameters
    if( Channel == null || Channel == undefined ) {
        return;
    }
    // check the "isConnected" flag on the channel
    if( Channel.IsConnected === false ) {
        print( "Channel is already disconnected. Aborting 'disconnect' request." );
        return;
    }
    var uaStatus = new UaStatusCode();
    var bSucceeded = true;
    // check parameters
    if( arguments.length != 2 ) {
        addError( "function disconnect(Channel, Session): Number of arguments must be 2. Got " + arguments.length + " instead" );
        return false;
    }
    // close session
    if( Session !== undefined && Session !== null ) { 
        if( !closeSession( Session ) ) {
            bSucceeded = false;
        }
    }
    else {
        print( "Skipping closeSession since the session object is null. Proceeding to close the secureChannel." );
    }
    // disconnect channel
    if( !disconnectChannel( Channel ) ) {
        bSucceeded = false;
    }
    return bSucceeded;
}// function disconnect( Channel, Session )


// Closes a session without closing the Channel. Used by multi-subscription (per session) tests.
function disconnectSession( Channel, Session ) {
    var bSucceeded = true;
    // check parameters
    if( arguments.length != 2 ) {
        addError( "function disconnectSessions(Channel, Session): Number of arguments must be 2. Got " + arguments.length + " instead" );
        return false;
    }    
    // close session
    if( !closeSession( Session ) ) {
        return false;
    }
    if( bSucceeded ) {
        print( "Session closed." );
    }
    return true;
}// function disconnectSession( Channel, Session )

// Disconnects the channel; assumes the session is already closed.
function disconnectChannel( Channel, ExpectedErrors ) {
    var result = true;
    if( !isDefined( Channel ) ) throw( "disconnectChannel(): 'Channel' not specified!" );
    var uaStatus = Channel.disconnect();
    addLog( "CloseSecureChannel() called. Result: " + uaStatus.toString() );
    // check our ExpectedErrors parameter
    if( isDefined( ExpectedErrors ) ) {
        result = ExpectedErrors.containsStatusCode( uaStatus.StatusCode );
        if( !result ) addError( "CloseSecureChannel().Result received " + uaStatus.toString() + ", but expected any one of the following:\n\t" + ExpectedErrors.ExpectedResults.toString(), uaStatus );
    }
    else result = uaStatus.isGood();
    return( result );
}// function disconnectChannel( Channel, ExpectedErrors )