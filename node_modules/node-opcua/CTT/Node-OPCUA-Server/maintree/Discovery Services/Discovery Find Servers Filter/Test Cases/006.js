/*  Test prepared by compliance@opcfoundation.org; original work by: Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Provide a list of supported locales. */

function findServers551010() {
    if( FindServersHelper.Execute( { LocaleIds: CreateSupportedLocaleArray( supportedLocales, 0 ) } ) ) {
        addLog( "Expected locale for localized application names: \"" + FindServersHelper.Request.LocaleIds[0] + "\"." );
        for( var jj=0; jj<FindServersHelper.Response.Servers.length; jj++ ) {
            var description = FindServersHelper.Response.Servers[jj];
            addLog( "Application name #" + jj + ": locale: \"" + description.ApplicationName.Locale + "\" text: \"" + description.ApplicationName.Text + "\"" );
            if ( description.ApplicationName.Locale.length > 0 && description.ApplicationName.Locale !== FindServersHelper.Request.LocaleIds[0] ) addWarning("Returned locale is not the expected one." );
        }
    }
    return( true );
}

Test.Execute( { Procedure: findServers551010 } );