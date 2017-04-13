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
                                        NumValuesPerNode: 999, 
                                        ReturnBounds: false } ),
              Debug: CUVariables.Debug };

        if( !Assert.True( HistoryReadHelper.Execute( CUVariables.HistoryReadParameters ), "Unable to obtain initial history values. Please check settings." ) ) stopCurrentUnit();

        // do some initial analysis of the data to help with tests in this CU.
        // record the first & last date in history for each item, and store that value within the item in property FirstValueInHistory.
        for( var i=0; i<CUVariables.Items.length; i++ ) {
            CUVariables.Items[i].RawValues = CUVariables.Items[i].Value.clone();
            CUVariables.Items[i].RawValues.parent = CUVariables.Items[i].RawValues;
            CUVariables.Items[i].RawValues.FirstRecord = function() { print( "RawValues.FirstRecord()" ); return( this.parent[0] ); }
            CUVariables.Items[i].RawValues.LastRecord = function() { print( "RawValues.LastRecord()" ); if( this.parent.length <= 0 ) return( new UaDataValue() ); else return( this.parent[ this.parent.length - 1 ] ); }
            CUVariables.Items[i].FirstValueInHistory = OPCF.HA.Analysis.Find.Date.First( { RawData: CUVariables.Items[i].Value, Debug: CUVariables.HistoryReadParameters.Debug } ).clone();
            CUVariables.Items[i].LastValueInHistory = OPCF.HA.Analysis.Find.Date.Last( { RawData: CUVariables.Items[i].Value, Debug: CUVariables.HistoryReadParameters.Debug } ).clone();
            CUVariables.Items[i].FirstRecord = function() { return( this.Value[0] ); }
            CUVariables.Items[i].LastRecord = function() { return( this.Value[ this.Value.length - 1 ] ); }
            print( "Items[" + i + "].FirstDateInHistory=" + CUVariables.Items[i].FirstValueInHistory.SourceTimestamp + "; LastDateInHistory=" + CUVariables.Items[i].LastValueInHistory.SourceTimestamp );
        }// for i...



        // read again, but now seek the MODIFIED data only!
        CUVariables.HistoryReadParametersModified = CUVariables.HistoryReadParameters;
        CUVariables.HistoryReadParametersModified.HistoryReadDetails.IsReadModified = true;
        if( !Assert.True( HistoryReadHelper.Execute( CUVariables.HistoryReadParametersModified ), "Unable to obtain initial history values of MODIFIED data." ) ) stopCurrentUnit();

        // now to cache the modified data
        for( var i=0; i<CUVariables.Items.length; i++ ) {
            CUVariables.Items[i].RawModifiedValues = CUVariables.Items[i].ModifiedValues.clone();
            CUVariables.Items[i].RawModificationInfos = CUVariables.Items[i].ModificationInfos.clone();
        }//for i...



        // store the values deleted, so that we can insert them back at the end (cleanup.js)
        CUVariables.DeletedRecords = [];
        CUVariables.DeletedModifiedRecords = [];
        CUVariables.ArchiveRecords = function( args ) { //records, number ) { 
            if( !isDefined( args ) ) return( false );
            if( !isDefined( args.Records ) ) return( false );
            if( !isDefined( args.Records.length ) ) args.Records = [ args.Records ];
            if( !isDefined( args.Number ) ) args.Number = args.Records.length;
            for( var r=0; r<args.Number; r++ ) CUVariables.DeletedRecords.push( args.Records.shift() );
        }

        CUVariables.RestoreRecords = function() { 
            if( CUVariables.DeletedRecords.length === 0 ) return( false );
            // restore RAW records
            if( CUVariables.Debug ) print( "~~~~~ Restoring " + CUVariables.DeletedRecords.length + " Deleted [RAW] Record(s) ~~~~~" );
            CUVariables.HistoryUpdateParameters = { 
                  Debug: CUVariables.Debug,
                  HistoryUpdateDetails: UaUpdateDataDetails.New(
                                          { NodeId: CUVariables.Items[0],
                                            PerformInsertReplace: PerformUpdateType.Insert,
                                            UpdateValues: [ ] } ) };
            var i=0;
            while( CUVariables.DeletedRecords.length > 0 ) {
                var obj = CUVariables.DeletedRecords.shift();
                CUVariables.HistoryUpdateParameters.HistoryUpdateDetails.UpdateValues[i++] = obj;
            }//while...
            if( CUVariables.Debug ) print( CUVariables.HistoryUpdateParameters );
            Assert.True( HistoryUpdateHelper.Execute( CUVariables.HistoryUpdateParameters ), "Unable to restore history back to a state before testing Delete. Perhaps the data was not deleted in the first place?" );
        }

        Test.PostTestFunctions[0] = CUVariables.RestoreRecords;
    }

}