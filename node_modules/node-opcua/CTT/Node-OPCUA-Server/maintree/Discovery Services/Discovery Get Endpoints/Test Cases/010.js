/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide an invalid endpoint URL (string, but syntactically not a URL).
    Expected Result: Server returns a DEFAULT endpoint URL. */

function getEndpoints552010() {
    if( GetEndpointsHelper.Execute2( { EndpointUrl: "This is my endpoint" } ) ) Assert.GreaterThan( 0, GetEndpointsHelper.Response.Endpoints.length, "Expected a default endpoint to be returned, even when specifying an invalid EndpointUrl." );
    return( true );
}

Test.Execute( { Procedure: getEndpoints552010 } );