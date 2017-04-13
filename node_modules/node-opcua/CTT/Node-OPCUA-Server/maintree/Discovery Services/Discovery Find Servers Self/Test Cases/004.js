/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Invoke FindServers in a loop of iterations. Verify time taken to process the requests. */

function findServers551007() {
    const MAX_DELAY = 10; // in seconds.
    for ( var ii = 1; ii <= 100; ii++ ) {
        var timeBefore = UaDateTime.utcNow();
        if( FindServersHelper.Execute() ) {
            var timeAfter = UaDateTime.utcNow();
            var time = timeBefore.msecsTo( timeAfter );
            addLog( "FindServers call #" + ii + " took " + time + " ms." );
            if ( time > MAX_DELAY * 1000 ) {
                addError( "FindServers call #" + ii + " took more than " + MAX_DELAY + " seconds." );
                break;
            }
        }//findservers
    }//for
    return( true );
}

Test.Execute( { Procedure: findServers551007 } );