/*  Test prepared by Development; compliance@opcfoundation.org
    Description: CloseSession using default parameters. This test works by first opening a session (default parameters) and then closes it. */

function closeSession563001() {
    var session = new CreateSessionService( { Channel: Test.Channel } );
    if( session.Execute() && ActivateSessionHelper.Execute( { Session: session } ) ) {
        CloseSessionHelper.Execute( { Session: session, DeleteSubscriptions: true } )
    }
    return( true );
}

Test.Execute( { Procedure: closeSession563001 } );