/*   Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
     Description: Provide a list of supported locales. */

function getEndpoints552002() {
    // read the locale id array.
    var serverCapabilities =  MonitoredItem.fromNodeIds( new UaNodeId( Identifier.Server_ServerCapabilities_LocaleIdArray ) )[0];
    if( ReadHelper.Execute( { NodesToRead: serverCapabilities } ) ) {
        var supportedLocales = serverCapabilities.Value.Value.toStringArray();
        // loop thru each received locale by specifying it in GetEndpoints, and checking if our server is returned.
        for( var ii=0; ii<supportedLocales.length; ii++ ) {   
            if( GetEndpointsHelper.Execute2( { LocaleIds: CreateSupportedLocaleArray(supportedLocales, ii) } ) ) {
                // check that server returns at least one endpoint.
                if( Assert.GreaterThan( 0, GetEndpointsHelper.Response.Endpoints.length, "GetEndpoints: no endpoint returned when requesting locale '" + supportedLocales + "'" ) ) {
                    for( var jj=0; jj<GetEndpointsHelper.Response.Endpoints.length; jj++ ) {
                        var description = GetEndpointsHelper.Response.Endpoints[jj];
                        addLog( "Application name #" + jj + ": locale: \"" + description.Server.ApplicationName.Locale + "\" text: \"" + description.Server.ApplicationName.Text + "\"" );
                        if( description.Server.ApplicationName.Locale.length > 0 && description.Server.ApplicationName.Locale != GetEndpointsHelper.Request.LocaleIds[0] ) {
                            addWarning( "Returned locale is not the expected one." );
                        }
                    }//for jj...
                }
            }//getendpoints
        }//for ii..
    }//read 
    return( true );
}

Test.Execute( { Procedure: getEndpoints552002 } );