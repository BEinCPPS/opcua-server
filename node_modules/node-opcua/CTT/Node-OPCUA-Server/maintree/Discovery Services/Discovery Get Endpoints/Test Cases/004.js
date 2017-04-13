/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: List with supported and unsupported locales. */

function getEndpoints552004() {
    var itemLocaleIdArray = MonitoredItem.fromNodeIds( new UaNodeId( Identifier.Server_ServerCapabilities_LocaleIdArray, 0 ) )[0];
    if( ReadHelper.Execute( { NodesToRead: itemLocaleIdArray } ) ) {
        var supportedLocales = itemLocaleIdArray.Value.Value.toStringArray();
        if( !isDefined( supportedLocales ) && supportedLocales.length > 0 ) {
            supportedLocales = CreateSupportedLocaleArray( supportedLocales, supportedLocales.length - 1 );
            var unsupportedLocale = GetUnsupportedLocale( supportedLocales );
    
            if( GetEndpointsHelper.Execute2( { LocaleIds: unsupportedLocale } ) ) {
                if ( GetEndpointsHelper.Response.Endpoints.length === 0 ) addError( "GetEndpoints: no endpoint returned." );
                else {
                    for( var jj=0; jj<GetEndpointsHelper.Response.Endpoints.length; jj++ ) {
                        var description = GetEndpointsHelper.Response.Endpoints[jj];
                        if( description.Server.ApplicationName.Locale.length > 0 && description.Server.ApplicationName.Locale != expectedLocale) {
                            addWarning("Returned locale is not the expected one.");
                        }
                    }//for jj...
                }
            }//getendpoints
        }//supported locales
    }//read 
    return( true );
}

Test.Execute( { Procedure: getEndpoints552004 } );