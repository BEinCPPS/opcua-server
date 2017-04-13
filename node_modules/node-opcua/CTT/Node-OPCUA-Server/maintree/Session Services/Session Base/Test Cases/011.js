/*  Test prepared by Development; compliance@opcfoundation.org
    Description: provide NO software certificates. This used to be a problem, but UA 1.02 changed this behavior. */

function activateSession563004() {
    var session = null;
    for( var i=0; i<100; i++ ) {
        session = new CreateSessionService( { Channel: Test.Channel } );
        if( session.Execute() ) {
            ActivateSessionHelper.Execute( { Session:session, ClientSoftwareCertificates:[] } );
            CloseSessionHelper.Execute( { Session: session } );
        }
        else return( false );
    }
    return( true );
}

Test.Execute( { Procedure: activateSession563004 } );