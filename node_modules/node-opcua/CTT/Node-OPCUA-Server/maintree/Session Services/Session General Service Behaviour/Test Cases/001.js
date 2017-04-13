/*  Test prepared by compliance@opcfoundation.org; based on original work by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Invoke CreateSession with default parameters. */

function createSession561001() {
    var session = new CreateSessionService( { Channel: Test.Channel } );
    if( session.Execute() ) if( ActivateSessionHelper.Execute( { Session: session } ) ) CloseSessionHelper.Execute( { Session: session } );
    return( true );
}

Test.Execute( { Procedure: createSession561001 } );