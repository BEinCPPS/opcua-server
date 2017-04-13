/*  Test prepared by Nathan Pocock; compliance@opcfoundation.org
    Description: Check ServerCapabilities.HistoryServerCapabilities for DeleteAtTime */

function deleteAtTimeTest() { 
    var capabilityItem = MonitoredItem.fromNodeIds( [ new UaNodeId( Identifier.HistoryServerCapabilitiesType ) ] )[0];
    capabilityItem.BrowseDirection = BrowseDirection.Forward;
    var result = true;

    if( !BrowseHelper.Execute( { NodesToBrowse: capabilityItem } ) ) result = false;
    if( Assert.GreaterThan( 0, BrowseHelper.Response.Results.length, "HistoryServerCapabilitiesType not found in the Server's address space. Seeking: ServerCapabilities.HistoryServerCapabilities" ) ) {
        if( Assert.GreaterThan( 0, BrowseHelper.Response.Results[0].References.length, "1 or more FORWARD references expected." ) ) {
            var found = false;
            for( var r=0; r<BrowseHelper.Response.Results[0].References.length; r++ ) {
                if( BrowseHelper.Response.Results[0].References[r].BrowseName.Name === "DeleteAtTimeCapability" ) {
                    found = true;
                    break;
                }
            }//for ...
            if( !found ) { addError( "ServerCapabilities.HistoryServerCapabilities.DeleteAtTimeCapability not found in the Server's address space." ); result = false; }
            else {
                if( CUVariables.Debug ) print( "ServerCapabilities.HistoryServerCapabilities.DeleteAtTimeCapability found in Server's address space." );
                // now read the value 
                var item = MonitoredItem.fromNodeIds( [ new UaNodeId( Identifier.HistoryServerCapabilitiesType_DeleteAtTimeCapability ) ] )[0];
                if( ReadHelper.Execute( { NodesToRead: item } ) ) CUVariables.DeleteAtTime = item.Value.Value.toBoolean();
                else CUVariables.DeleteAtTime = false;

                if( CUVariables.Debug ) addLog( "DeleteAtTime supported: " + CUVariables.DeleteAtTime );
            }
        }
        else result = false;
    }
    else result = false;

    return( result );
}

Test.Execute( { Procedure: deleteAtTimeTest } );