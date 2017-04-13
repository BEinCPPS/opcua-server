//* UNIT TESTS
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds.js" );
var nod = UaNodeId.fromString( "ns=3;s=2FCS0101!BDSET_STR.AF" );
print( "NodeId to test: " + nod );
// connect
var Channel = new UaChannel();
var Session = new UaSession( Channel );
if( connect( Channel, Session ) && activateSession( Session ) ) {
    try {
        var tbp = new TranslateBrowsePathsToNodeIdsService( Session );
        // translateBrowsePaths helper
        print( "***** TranslateBrowsePathsHelper *****" );
        try{ tbp.Execute(); }catch( ex ){ print( "PASS: Execute() called with no parameters. '" + ex + "'." ); }
        try{ var x = tbp.Execute( { Node:nod, BrowsePaths:["HA Configuration", "StartOfArchive"] } ); print( ( x === true? "PASS" : "FAIL" ) + ".Execute() called with 2 levels of browse path." ); }catch( ex ){ print( "FAIL: Execute() threw exception even with argument specified. '" + ex + "'." ); }
        try{ var x = tbp.Execute( { Node:nod, BrowsePaths:["HA Configuration", "AggregateConfiguration", "PercentDataBad" ] } );print( ( x === true? "PASS" : "FAIL" ) + ".Execute() called with 3-levels of browse path." ); print( "Found NodeId: " + tbp.Response.Results[0].Targets[0].TargetId ); }catch( ex ){ print( "FAIL: Execute() called with 3-levels of browse path. '" + ex + "'." ); }
        // stringsToBrowsePaths
        print( "***** TranslateBrowsePathsHelper.stringsToBrowsePaths *****" );
        try{ tbp.stringsToBrowsePaths(); }catch( ex ){ print( "PASS: stringsToBrowsePaths no args. '" + ex + "'." ); }
        try{ tbp.stringsToBrowsePaths( 1 ); }catch( ex ){ print( "PASS: stringsToBrowsePaths node specified, strings not. '" + ex + "'. " ); }
        try{ tbp.stringsToBrowsePaths( undefined, 1 ); }catch( ex ){ print( "PASS: stringsToBrowsePaths node missing, strings specified. '" + ex + "'. " ); }
        try{ tbp.stringsToBrowsePaths( nod, "HA Configuration" ); print( "PASS: stringsToBrowsePaths strings not an array!" ); }catch( ex ){ print( "FAIL: stringsToBrowsePaths all params specified, string is not an array. '" + ex + "'." ); }
        try{ tbp.stringsToBrowsePaths( nod, [ "HA Configuration", "StartOfArchive" ] ); print( "PASS: stringsToBrowsePaths strings an array!" ); }catch( ex ){ print( "FAIL: stringsToBrowsePaths all params specified, strings is an array! '" + ex + "'." ); }
        try{ print( tbp.stringsToBrowsePaths( nod, [ "HA Configuration", "StartOfArchive" ] ) ); }catch( ex ){ print( "FAIL: stringsToBrowsePaths strings an array, unable to print. '" + ex + "'." ); }
        //print( tbp.stringsToBrowsePaths( nod, [ "5200" ] ) );
        tbp.Execute( { Node:nod, UaBrowsePaths: tbp.stringsToBrowsePaths( nod, [ "5200" ] ) } );
    }
    catch( ex ) {
        addError( "\n\nUnexpected error: " + ex.toString() );
    }
}
// disconnect
disconnect( Channel, Session );
// */