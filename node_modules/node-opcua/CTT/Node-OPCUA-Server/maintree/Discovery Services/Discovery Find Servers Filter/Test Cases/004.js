/*  Test prepared by compliance@opcfoundation.org; original work by: Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide a serverUri that does not match any servers provided by previous call to FindServers. */

function findServers551008() {
    if( FindServersHelper.Execute( { ServerUris: [ "www.tempuri.org" ] } ) ) Assert.Equal( 0, FindServersHelper.Response.Servers.length, "FindServers: server did not filter unmatched server URI" );
    return( true );
}

Test.Execute( { Procedure: findServers551008 } );