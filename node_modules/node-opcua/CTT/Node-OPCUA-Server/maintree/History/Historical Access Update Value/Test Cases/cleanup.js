// Disconnect the Server.
Test.Disconnect();

print( Test.Stats() );
Test.ResetStats();
Test.PostTestFunctions[0] = null;