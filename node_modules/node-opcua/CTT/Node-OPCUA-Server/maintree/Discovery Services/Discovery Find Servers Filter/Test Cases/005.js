/*  Test prepared by compliance@opcfoundation.org; original work by: Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Use unsupported locale id. */

function findServers551009() {
    if( FindServersHelper.Execute( { LocaleIds: [ GetUnsupportedLocale( supportedLocales ) ] } ) ) {
        if( Assert.GreaterThan( 0, FindServersHelper.Response.Servers.length, "Expected Server to return at least its own description and DEFAULT locale, even when the Client specified an unsupported locale." ) ) {
            for ( var jj=0; jj<FindServersHelper.Response.Servers.length; jj++ ) {
                var description = FindServersHelper.Response.Servers[jj];
                addLog( "Application name #" + jj + ": locale: \"" + description.ApplicationName.Locale + "\" text: \"" + description.ApplicationName.Text + "\"" );
            }
        }
    }
    return( true );
}

Test.Execute( { Procedure: findServers551009 } );