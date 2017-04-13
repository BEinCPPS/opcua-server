include( "./library/Base/Objects/expectedResults.js" )
include( "./library/Base/locales.js" );
include( "./library/Base/safeInvoke.js" );
include( "./library/ServiceBased/DiscoveryServiceSet/FindServers.js" );
include( "./library/Base/serviceRegister.js" );

if( !Test.Connect( { SkipCreateSession: true } ) ) {
    addError( "ConnectChannel failed. Stopping execution of current conformance unit.");
    stopCurrentUnit();
}
else {
    FindServersHelper = new FindServersService( { Session: Test.DiscoverySession } );
}