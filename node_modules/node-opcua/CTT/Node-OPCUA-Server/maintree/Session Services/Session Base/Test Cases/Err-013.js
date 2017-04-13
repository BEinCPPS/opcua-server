/*  Test prepared by Development; compliance@opcfoundation.org
    Description:
        Calls CloseSession twice, the 2nd time being being a session that no
        longer exists. Expect 'BadSessionIdInvalid' or 'Bad_SessionClosed'. */

function closeSession563Err001() {
    var session = new CreateSessionService( { Channel: Test.Channel } );
    if( session.Execute() && ActivateSessionHelper.Execute( { Session: session } ) ) {
        CloseSessionHelper.Execute( { Session: session } );
        // call again with the same parameters
        var expectedResult = new ExpectedAndAcceptedResults( StatusCode.BadSessionIdInvalid );
        CloseSessionHelper.Execute( { Session: session, ServiceResult: expectedResult } );
    }
    return( true );
}

Test.Execute( { Procedure: closeSession563Err001 } );