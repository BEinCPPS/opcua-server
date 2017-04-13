/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Invoke GetEndpoints with default parameters. */

function getEndpoints552001() {
    if( GetEndpointsHelper.Execute2() ) {
        Assert.GreaterThan( 0, GetEndpointsHelper.Response.Endpoints.length, "GetEndpoints.Response.Endpoints is empty. 1 or more endpoints expected.", ( "GetEndpoints returned " + GetEndpointsHelper.Response.Endpoints.length + " endpoints." ) );
    }
    return( true );
}

Test.Execute( { Procedure: getEndpoints552001 } );