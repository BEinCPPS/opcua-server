// Disconnect the Server.
Test.Disconnect();

// Display the history values we're caching 
if( CUVariables.Debug ) {
    print( "\nDatabase Cache of History Data" );
    for( var i=0; i<CUVariables.Items.length; i++ ) {
        print( CUVariables.Items[i].NodeId + "\n" );
        for( var d=0; d<CUVariables.Items[i].RawValues.length; d++ ) 
            print( CUVariables.Items[i].RawValues[d].toString() );
    }
}

print( Test.Stats() );
Test.ResetStats();