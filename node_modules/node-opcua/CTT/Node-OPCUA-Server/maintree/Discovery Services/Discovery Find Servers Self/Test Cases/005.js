/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide a list of locales not conforming to RFC 3066. */

function findServers551011() {
    if( FindServersHelper.Execute( { LocaleIds: CreateNonConformingLocaleArray() } ) ) {
        // check that server returns at least its own description with a default locale.
        if ( FindServersHelper.Response.Servers.length <= 0 ) addError( "FindServers() no default locale returned" );
    }
    return( true );
}

Test.Execute( { Procedure: findServers551011 } );