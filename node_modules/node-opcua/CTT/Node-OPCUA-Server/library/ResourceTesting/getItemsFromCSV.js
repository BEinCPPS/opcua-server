function getItemsFromCSV( filename )
{
    var nodes = [];
    var s = readFile( filename );
    var lines = s.toString().split( "\n" );
    if( lines.length > 1 )
    {
        // skip the first line as it contains the column names
        var line;
        var nodeIds = [];
        var accesses = [];
        for( line=1; line<lines.length; line++ )
        {
            var lineSplit = lines[line].split( "," );
            if( lineSplit !== null && lineSplit.length == 2 )
            {
                var nodeId = lineSplit[0];
                if( nodeId !== null && nodeId.length > 1 )
                {
                    nodeIds.push( UaNodeId.fromString( nodeId ) );
                }
                var access = lineSplit[1];
                if( access !== null && access.length > 0 )
                {
                    accesses.push( access );
                }
                else
                {
                    accesses.push( "" );
                }
            }
            //var commaPosition = lines[line].indexOf( ",", 6 ); //skip first 6 characters containing namespace index
            //var nodeId = lines[line].substring( 0, colonPosition );
        }//for line
        nodes = MonitoredItem.fromNodeIds( nodeIds );
    }
    print( "getItemsFromCSV loaded " + lines.length + " records from file '" + filename + "'." );
    return( {nodeList:nodes, accessList:accesses} );
}