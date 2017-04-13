/*  Test prepared by compliance@opcfoundation.org; original work by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide an invalid endpoint URL (string, but syntactically not a URL). */

function findServers551014() {
    if( FindServersHelper.Execute( { EndpointUrl: "This is my endpoint" } ) ) Assert.GreaterThan( 0, FindServersHelper.Response.Servers.length, "FindServers should have returned a default endpoint url, even with the invalid url '" + FindServersHelper.Request.EndpointUrl + "' request." );
    return( true );
}

Test.Execute( { Procedure: findServers551014 } );