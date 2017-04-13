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

        CUVariables.Debug = gServerCapabilities.Debug;

        // get the initial values for each of our historical items
        var startTime = new UaDateTime();
        startTime.addMilliSeconds( 1 );
        CUVariables.HistoryReadParameters = { 
              NodesToRead: CUVariables.Items,
              TimestampsToReturn: TimestampsToReturn.Source,
              ReleaseContinuationPoints: false,
              HistoryReadDetails: UaReadRawModifiedDetails.New(
                                      { IsReadModified: false,
                                        StartTime: startTime, 
                                        EndTime: UaDateTime.utcNow(),
                                        NumValuesPerNode: 10, 
                                        ReturnBounds: false } ),
              Debug: CUVariables.Debug };

        if( !Assert.True( HistoryReadHelper.Execute( CUVariables.HistoryReadParameters ), "Unable to obtain initial history values. Please check settings." ) ) stopCurrentUnit();

        // do some initial analysis of the data to help with tests in this CU.
        // record the first & last date in history for each item, and store that value within the item in property FirstValueInHistory.
        for( var i=0; i<CUVariables.Items.length; i++ ) {
            CUVariables.Items[i].RawValues = CUVariables.Items[i].Value.clone();
            CUVariables.Items[i].RawValues.parent = CUVariables.Items[i].RawValues;
            CUVariables.Items[i].RawValues.FirstRecord = function() { return( this.parent[0] ); }
            CUVariables.Items[i].RawValues.LastRecord = function() { return( this.parent[ this.parent.length - 1 ] ); }
            CUVariables.Items[i].FirstValueInHistory = OPCF.HA.Analysis.Find.Date.First( { RawData: CUVariables.Items[i].Value, Debug: CUVariables.HistoryReadParameters.Debug } ).clone();
            CUVariables.Items[i].LastValueInHistory = OPCF.HA.Analysis.Find.Date.Last( { RawData: CUVariables.Items[i].Value, Debug: CUVariables.HistoryReadParameters.Debug } ).clone();
            CUVariables.Items[i].FirstRecord = function() { return( this.Value[0] ); }
            CUVariables.Items[i].LastRecord = function() { return( this.Value[ this.Value.length - 1 ] ); }
            print( "Items[" + i + "].FirstDateInHistory=" + CUVariables.Items[i].FirstValueInHistory.SourceTimestamp + "; LastDateInHistory=" + CUVariables.Items[i].LastValueInHistory.SourceTimestamp );
        }

    }

}