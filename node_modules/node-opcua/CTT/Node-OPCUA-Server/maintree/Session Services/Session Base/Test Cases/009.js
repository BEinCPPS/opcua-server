/*  Test prepared by Development; compliance@opcfoundation.org
    Description: provide NO software certificates. This used to be a problem, but UA 1.02 changed this behavior. */

function activateSession562006() {
    var session = new CreateSessionService( { Channel: Test.Channel } );
    if( session.Execute() ) {
        ActivateSessionHelper.Execute( { Session:session, ClientSoftwareCertificates:[] } );
        CloseSessionHelper.Execute( { Session: session } );
    }
    return( true );
}

Test.Execute( { Procedure: activateSession562006 } );