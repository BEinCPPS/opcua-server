include("./library/Base/locales.js");
include("./library/Base/safeInvoke.js");

// Connect to the server
if( !Test.Connect() ) {
    addError( "ConnectChannel failed. Stopping execution of current conformance unit.");
    stopCurrentUnit();
}
else {
    // read the locale id array.
    var supportedLocales = null;
    var localeArray = MonitoredItem.fromNodeIds( new UaNodeId( Identifier.Server_ServerCapabilities_LocaleIdArray, 0 ) )[0];
    if( ReadHelper.Execute( { NodesToRead: localeArray } ) ) {
        if( ReadHelper.Response.Results[0].Value.DataType === BuiltInType.Null ) addError( "FindServers() Locale ID array is empty" );
        else {
            // now filter using one unsupported locale id.
            if( ReadHelper.Response.Results[0].Value.ArrayType === 1 ) supportedLocales = ReadHelper.Response.Results[0].Value.toStringArray();
            else {
                var supportedLocales = new UaStrings();
                supportedLocales[0] = ReadHelperResponse.Results[0].Value.toString();
            }
            // craft a call where the first locale is NOT supported!
            supportedLocales = CreateSupportedLocaleArray( supportedLocales, supportedLocales.length - 1 );
        }
    }
}