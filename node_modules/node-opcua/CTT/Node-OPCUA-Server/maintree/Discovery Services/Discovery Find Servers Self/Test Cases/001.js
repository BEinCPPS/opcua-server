/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Invoke FindServers with default parameters. */

function findServers551001() {
    if( FindServersHelper.Execute() ) {
        if( FindServersHelper.Response.Servers.length > 0 ) addLog( "FindServers() returned " + FindServersHelper.Response.Servers.length + " description(s)." );
        else addWarning( "FindServers() returned " + FindServersHelper.Response.Servers.length + " description(s)." );
    }
    return( true );
}

Test.Execute( { Procedure: findServers551001 } );