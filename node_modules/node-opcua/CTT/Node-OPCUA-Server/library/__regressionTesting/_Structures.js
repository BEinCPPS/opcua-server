include( "./library/ServiceBased/Helpers.js" );
include( "./library/Base/serverCapabilities.js" );


Structures = {
    NodeIds: function() {
        var n = new UaNodeId(); Assert.StringNotNullOrEmpty( n );
        n = UaNodeId.fromString( "ns=0;i=2048" ); Assert.Equal( 0, n.NamespaceIndex ); Assert.Equal( 2048, n.getIdentifierNumeric() ).
        n = UaNodeId.fromString( "ns=4;b=size=4, data=0x61626364" ); Assert.Equal( 4, n.NamespaceIndex, "NamespaceIndex, opaque nodeid" ); 
        print( n );
        }, 

    ServerCapabilities: function() {
        var g = new gServerCapabilitiesCache();
        print( "MaxStringLength: " + g.MaxStringLength );
        print( "MaxSupportedSubscriptions: " + g.MaxSupportedSubscriptions );
        print( "MaxSupportedMonitoredItems: " + g.MaxSupportedMonitoredItems );
        print( "MaxPublishRequestsPerSession: " + g.MaxPublishRequestsPerSession );
        print( "FastestPublishIntervalSupported: " + g.FastestPublishIntervalSupported );
        try{ g.GetServerCapabilties(); addError( "FAIL: no exception" ); }catch(e){ print( "PASS: excep=good '" + e.toString() + "'"); }
        },
    
}; // structures


Structures.NodeIds();
Structures.ServerCapabilities();