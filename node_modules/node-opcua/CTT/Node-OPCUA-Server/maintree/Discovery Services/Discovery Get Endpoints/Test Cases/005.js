/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide a list of locales not conforming to RFC 3066. */

function getEndpoints552005() {
    if( GetEndpointsHelper.Execute2( { LocaleIds: CreateNonConformingLocaleArray() } ) ) {
        Assert.GreaterThan( 0, GetEndpointsHelper.Response.Endpoints.length, "No endpoints received; a default locale was assumed." );
    }
    return( true );
}

Test.Execute( { Procedure: getEndpoints552005 } );