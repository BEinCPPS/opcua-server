/*  Test prepared by Nathan Pocock; compliance@opcfoundation.org
    Description: Check ServerCapabilities.HistoryServerCapabilities for InsertDataCapabilities */

function hainsertval() { 
    var capabilityItem = MonitoredItem.fromNodeIds( [ new UaNodeId( Identifier.HistoryServerCapabilitiesType ) ] )[0];
    capabilityItem.BrowseDirection = BrowseDirection.Forward;
    var result = true;

    if( !BrowseHelper.Execute( { NodesToBrowse: capabilityItem } ) ) result = false;
    if( Assert.GreaterThan( 0, BrowseHelper.Response.Results.length, "HistoryServerCapabilitiesType not found in the Server's address space. Seeking: ServerCapabilities.HistoryServerCapabilities" ) ) {
        if( Assert.GreaterThan( 0, BrowseHelper.Response.Results[0].References.length, "1 or more FORWARD references expected." ) ) {
            var found = false;
            for( var r=0; r<BrowseHelper.Response.Results[0].References.length; r++ ) {
                if( BrowseHelper.Response.Results[0].References[r].BrowseName.Name === "InsertDataCapability" ) {
                    found = true;
                    break;
                }
            }//for ...
            if( !found ) { addError( "ServerCapabilities.HistoryServerCapabilities.InsertDataCapability not found in the Server's address space." ); result = false; }
            else if( CUVariables.Debug ) print( "ServerCapabilities.HistoryServerCapabilities.InsertDataCapability found in Server's address space." );
        }
        else result = false;
    }
    else result = false;

    return( result );
}

Test.Execute( { Procedure: hainsertval } );