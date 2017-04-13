/*  Test prepared by Nathan Pocock; compliance@opcfoundation.org
    Description: Check ServerCapabilities.OperationLimits exists and contains a numeric value */

function hadatamaxnodes() { 
    var result = true;

    // Browse the ServerCapabilities.OperationLimits to find a reference to a node named "MaxNodesPerHistoryRead"
    var operationLimits = MonitoredItem.fromNodeIds( [ UaNodeId.fromString( "ns=0;i=11704" ) ] )[0];
    if( BrowseHelper.Execute( { NodesToBrowse: operationLimits } ) ) {

        // can we find the reference?
        var found = false;
        for( var r=0; r<BrowseHelper.Response.Results[0].References.length; r++ ) {
            if( BrowseHelper.Response.Results[0].References[r].BrowseName.Name === "MaxNodesPerHistoryRead" ) {
                found = true;
                break;
            }
        }//for ...

        if( Assert.True( found, "Server.ServerCapabilities.OperationLimits.MaxNodesPerHistoryRead does not exist." ) ) {
            // Read the MaxNodesPerHistoryRead (ns=0;i=11518) property in the ServerCapabilities.OperationLimits.
            var itemMaxNodesPerHistoryRead = MonitoredItem.fromNodeIds( [ UaNodeId.fromString( "ns=0;i=11518" ) ] )[0];

            // Read the value of the node
            if( ReadHelper.Execute( { NodesToRead: itemMaxNodesPerHistoryRead } ) ) {
                // value should be numeric. Zero is acceptable.
                print( itemMaxNodesPerHistoryRead.Value );
                CUVariables.MaxNodesPerHistoryRead = itemMaxNodesPerHistoryRead.Value.Value.toUInt32();
            }
            else result = false;
        }
        else result = false;

    }


    return( result );
}

Test.Execute( { Procedure: hadatamaxnodes } );