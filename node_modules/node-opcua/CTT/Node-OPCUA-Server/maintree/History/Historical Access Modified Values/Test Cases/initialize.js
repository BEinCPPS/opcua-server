include( "./library/Base/safeInvoke.js" );

var CUVariables = new Object();

// we need a list of items that support history; quit the CU if we don't have any
CUVariables.Items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.HAProfile.Scalar.Settings );
if( !isDefined( CUVariables.Items.length ) || CUVariables.Items.length === 0 ) { 
    addError( "No History items configured. Check settings." ); 
    stopCurrentUnit(); 
}
else {

    // Connect to the UA Server using default parameters (settings)
    if( !Test.Connect() ) { addError( "Unable to connect to Server. Aborting tests." ); stopCurrentUnit(); }
    else {

        CUVariables.ModifiedItems = [];
        CUVariables.Debug = gServerCapabilities.Debug;

        // create a function to reset all items after each test:
        CUVariables.ResetItems = function() {
            if( CUVariables.Debug ) print( "\n\t***** Clearing ContinuationPoints on all Items *****" );
            for( var i=0; i<CUVariables.Items.length; i++ ) CUVariables.Items[i].ContinuationPoint = null;
        };

        // attach the above function to the post-test handler
        Test.PostTestFunctions[0] = CUVariables.ResetItems;

        // get the initial values for each of our historical items
        var startTime = new UaDateTime();
        startTime.addMilliSeconds( 1 );
        CUVariables.HistoryReadParameters = { 
              NodesToRead: CUVariables.Items,
              TimestampsToReturn: TimestampsToReturn.Source,
              ReleaseContinuationPoints: false,
              HistoryReadDetails: UaReadRawModifiedDetails.New(
                                      { IsReadModified: true,
                                        StartTime: startTime, 
                                        EndTime: UaDateTime.utcNow(),
                                        NumValuesPerNode: 10, 
                                        ReturnBounds: false } ),
              Debug: CUVariables.Debug };

        if( !Assert.True( HistoryReadHelper.Execute( CUVariables.HistoryReadParameters ), "Unable to obtain initial history MODIFIED values. Please check settings." ) ) stopCurrentUnit();

        // do some initial analysis of the data to help with tests in this CU.
        // record the first & last date in history for each item, and store that value within the item in property FirstValueInHistory.
        for( var i=0; i<CUVariables.Items.length; i++ ) {
            CUVariables.Items[i].RawValues = CUVariables.Items[i].Value.clone();
            CUVariables.Items[i].RawValues.parent = CUVariables.Items[i].RawValues;
            CUVariables.Items[i].RawValues.FirstRecord = function() { return( this.parent[0] ); }
            CUVariables.Items[i].RawValues.LastRecord = function() { return( this.parent[ this.parent.length - 1 ] ); }

            // lets check the results and see if ANY modified records exist. How do we do this?
            //     We look at the timestamps of all returned values and if we find any duplicates then that
            //     means that modified values exist. 
            // What if we don't find any modified values?
            //     We can't continue with this test or this conformance unit.

            // flag this item as having no modified values (override later, if any are found)
            CUVariables.Items[i].HasModifiedValues = false;
            // loop through all raw values 
            if( CUVariables.Items[i].RawValues.length > 0 ) {

                // look at each timestamp and see if any duplicates are found anywhere.
                var currTimestamp = CUVariables.Items[i].RawValues[0].SourceTimestamp.clone();
                for(  var v=1; v<CUVariables.Items[i].RawValues.length; v++ ) {
                    if( CUVariables.Items[i].RawValues[v].SourceTimestamp.equals( currTimestamp ) ) { 
                        // flag this item as having modified values 
                        CUVariables.Items[i].HasModifiedValues = true;
                        CUVariables.Items[i].FirstModifiedValue = CUVariables.Items[i].RawValues[v].clone();

                        // reference this item into a readily usable collection
                        CUVariables.ModifiedItems.push( CUVariables.Items[i] ); 
                        break; 
                    }
                }//for v... (values)
            }// has >0 raw values?
        }//for i...

        // do we have any modified values? if not, then don't continue with this CU 
        if( !Assert.GreaterThan( 0, CUVariables.ModifiedItems.length, "No items have Modified data!\nAborting conformance unit.\nPlease add Modified data to your historian and then re-run this conformance unit." ) ) stopCurrentUnit();
    }

}