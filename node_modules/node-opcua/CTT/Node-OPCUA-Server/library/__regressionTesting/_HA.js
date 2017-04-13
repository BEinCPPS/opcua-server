// include files needed
include( "./library/Base/Objects/expectedResults.js" );
include( "./library/Base/SettingsUtilities/NodeIds.js" );
include( "./library/ServiceBased/Helpers.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/CttHistoryServer.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/HAAggregates.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/HAAnalysis.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/HAStructureHelpers.js" );
include( "./library/__regressionTesting/_HA-Dataset.js" );
// Scripts validated: CttHistoryServer, rawDataAnalysis, historyRead


Testing = {
   HistoryRead: {
        General: function() {
            // instanciation
            print( "[enter] Testing.HistoryRead.General [enter]" );
            var hrh;
            try{ hrh = new HistoryReadService( null ); }catch( e ){ print( "PASS: Empty ctor param! '" + e + "'." ); };
            try{ var sess = new UaSession(); hrh = new HistoryReadService( sess ); }catch( e ){ addError( "Session in ctor param! '" + e + "'." ); };
            // execute
            var nodes = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.HAProfile.Scalar.Settings );
            try{ hrh.Execute(); }catch( e ){ print( "PASS! Execute (empty) exception! '" + e + "'." ) };
            try{ hrh.Execute( {NodesToRead:null} ); }catch( e ){ print( "PASS: NodesToRead empty. '" + e + "'." ); };
            try{ hrh.Execute( {NodesToRead:nodes, HistoryReadDetails:null} ); }catch( e ){ print( "PASS: HistoryReadDetails empty. '" + e + "'." ); };
            // historyReadFailed
            try{ hrh.CheckHistoryReadFailed(); addError( "Exception expected - no args" ); }catch( e ){ print( "PASS: CheckHistoryReadFailed(empty)" ); };
            try{ hrh.CheckHistoryReadFailed(1); addError( "Exception expected - invalid param" ); }catch(e){ print( "PASS: CheckHistoryReadFailed(invalid param)" ); };
            try{ hrh.CheckHistoryReadFailed( { Request: null } ); addError( "Exception expected!" ); }catch(e) { print( "PASS: CheckHistoryReadFailed(Request:null)" ); }
            print( "[leave] Testing.HistoryRead.General [leave]" );
            },// general
        },// historyRead
    CttHAserver: function() {
        // executel
        print( "[enter] Testing OPCF.HA.Server [enter]" );
        try{ OPCF.HA.Server.Execute(); }catch( ex ){ print( "PASS: no arguments specified. '" + ex + "'." ); }
        try{ OPCF.HA.Server.Execute( 1 ); }catch( ex ){ print( "PASS: rawData specified, args missing. '" + ex + "'." ); }
        try{ OPCF.HA.Server.Execute( undefined, 1 ); }catch( ex ){ print( "PASS: rawData missing, args specified. '" + ex + "'." ); }
        var historyReadParameters = { 
                  NodesToRead: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues,
                  HistoryReadDetails: UaReadRawModifiedDetails.New(
                                          { IsReadModified: false,
                                            StartTime: new UaDateTime(), 
                                            EndTime: UaDateTime.Now(),
                                            NumValuesPerNode: 0, 
                                            ReturnBounds: false } ),
                  TimestampsToReturn: TimestampsToReturn.Both,
                  ReleaseContinuationPoints: true,
                  ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ),
                  OperationResults: new ExpectedAndAcceptedResults( StatusCode.Good ) };
        var result = OPCF.HA.Server.Execute( historyReadParameters );
        print( "OPCF.HA.Server.Response.Results = [" + OPCF.HA.Server.Response.Results.length + "]" );
        // historyMatches
        try{ OPCF.HA.Server.RecordsetsMatch(); }catch( ex ){ print( "PASS: no arguments specified. '" + ex + "'." ); }
        try{ OPCF.HA.Server.RecordsetsMatch( 1 ); }catch( ex ){ print( "PASS: cttData specified, serverData missing. '" + ex + "'." ); }
        try{ OPCF.HA.Server.RecordsetsMatch( undefined, 1 ); }catch( ex ){ print( "PASS: cttData missing, serverData specified. '" + ex + "'." ); }
        print( "[leave] Testing OPCF.HA.Server [leave]" );
        },

    RawDataAnalysis: {
        Get: {
            DataInTimeSlice: function() {
                print( "[enter] Testing.RawDataAnalysis.Get.DataInTimeSlice [enter]" );
                // check exceptions/arguments
                try{ OPCF.HA.Analysis.Get.DataInTimeSlice(); addError( "FAIL Get.DataInTimeSlice() no args" ); } catch(e){};
                try{ OPCF.HA.Analysis.Get.DataInTimeSlice( { RawData: null } ); addError( "FAIL Get.DataInTimeSlice() RawData null" ); } catch(e){};
                try{ OPCF.HA.Analysis.Get.DataInTimeSlice( { RawData: [1], TimeSlice: null } ); addError( "FAIL Get.DataInTimeSlice() TimeSlice null" ); } catch(e){};
                try{ OPCF.HA.Analysis.Get.DataInTimeSlice( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: OPCF.HA.Server.TimeSlice.New( { StartTime: "00:00:10", ProcessingInterval: 10000 } ) } ); }catch(e){ addError( "Unexpected '" + e.toString() + "'." ); }
                print( "[leave] Testing.RawDataAnalysis.Get.DataInTimeSlice [leave]" );
                },
            },
        Find: {
            Date: {
                First: function() {
                    print( "[enter] Testing.RawDataAnalysis.Find.Date.First [enter]" );
                    var d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "good" } ); 
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[0].Value, d.Value, "Find.Date.First (0)" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[0].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "bad" } ); 
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[3].Value, d.Value, "Find.Date.First (3, bad) bad" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[3].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "uncertain" } ); 
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[6].Value, d.Value, "Find.Date.First (6) bad" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[6].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "null" } );
                        Assert.IsNull( d );
                    d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Index: 2 } );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[2].Value, d.Value, "Find.Date.First[2] bad." );
                    d = OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Index: 4 } );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[4].Value, d.Value, "Find.Date.First[4] bad." ); // 6th element, because 4th is bad quality
                    print( "[leave] Testing.RawDataAnalysis.Find.Date.First [leave]" );
                    },
                Last: function() {
                    print( "[enter] Testing.RawDataAnalysis.Find.Date.Last [enter]" );
                    var rlen = OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues.length-1;
                    var d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Index: 2 } );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-2].Value, d.Value, "Find.Date.Last[2] bad." );
                    d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Index: 4 } );
                        Assert.Equal( Historian1.RawValues[rlen-4].Value, d.Value, "Find.Date.Last[4] bad" );
                    d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Index: 1, Filter: "good" } );
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-1].Value, d.Value, "Find.Date.Last[1](good) bad" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-1].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "bad" } ); 
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-5].Value, d.Value, "Find.Date.Last[bad] bad" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-5].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "uncertain" } ); 
                        Assert.StringNotNullOrEmpty( d );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-2].Value, d.Value, "Find.Date.Last[uncertain] bad" );
                        Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[rlen-2].SourceTimestamp, d.SourceTimestamp );
                    d = OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "null" } );
                        Assert.IsNull( d );
                    print( "[leave] Testing.RawDataAnalysis.Find.Date.Last [leave]" );
                    },
                },// date
            },// find
        Exists: {
            Date: function() {
                print( "[enter] Testing.RawDataAnalysis.Exists.Date [enter]" );
                Assert.True( OPCF.HA.Analysis.Exists.Date( { Date: OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues } ).SourceTimestamp, RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues } ), "1st Date expected", "Found first date" );
                Assert.True( OPCF.HA.Analysis.Exists.Date( { Date: OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues } ).SourceTimestamp, RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues } ), "Last Date expected", "Found last date" );
                Assert.False( OPCF.HA.Analysis.Exists.Date( { Date: UaDateTime.fromHoursMinutesSecondsString( "00:00:10" ), RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues } ), "Date not expected", "Date '00:00:00' not found, as expected" );
                print( "[leave] Testing.RawDataAnalysis.Exists.Date [leave]" );
                },// date
            },// exists
    }, //rawDataAnalysis
    DataTypes: {
        Timeslice: function() {
            print( "[enter] Testing.DataTypes.Timeslice [enter]" );
            var ts = new TimeSlice( { 
                StartTime: OPCF.HA.Analysis.Find.Date.First( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "good" } ).SourceTimestamp,
                EndTime:   OPCF.HA.Analysis.Find.Date.Last( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, Filter: "good" } ).SourceTimestamp } );
                var d = OPCF.HA.Analysis.Get.DataInTimeSlice( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts } );
                    Assert.StringNotNullOrEmpty( d );
                    Assert.Equal( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues.length - 1, d.length );
                    var expected = []; for( i=0; i<OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues.length - 1; i++ ) expected.push( OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues[i] );
                    Assert.True( OPCF.HA.Server.RecordsetsMatch( { Expected: expected, Actual: d } ), "RecordsetMatches #1" );
            print( "[leave] Testing.DataTypes.Timeslice [leave]" );
            },
        UaAggregateConfiguration: function() {
            print( "[enter] Testing.DataTypes.UaAggregateConfiguration [enter]" );
            var a;
            try{ a = new UaAggregateConfiguration.New(); }catch( e ){ print( "PASS: empty CTOR: '" + e + "'." ); }
            try{ a = new UaAggregateConfiguration.New( {UseDefaults:null} ); }catch( e ){ print( "PASS: empty UseDefaults: '" + e + "'." ); }
            try{ a = new UaAggregateConfiguration.New( {UseDefaults:true} ); }catch( e ){ print( "PASS: empty UncertAsBad: '" + e + "'." ); }
            try{ a = new UaAggregateConfiguration.New( {UseDefaults:true, UncertainAsBad:0} ) }catch( e ){ print( "PASS: empty PercentBad: '" + e + "'." ) }
            try{ a = new UaAggregateConfiguration.New( {UseDefaults:true, UncertainAsBad:0, PercentBad:0}) }catch( e ){ print( "PASS: empty PercentGood: '" + e + "'." ) }
            try{ a = new UaAggregateConfiguration.New( {UseDefaults:true, UncertainAsBad:0, PercentBad:0, PercentGood:0}) }catch( e ){ print( "PASS: empty Sloped: '" + e + "'." ) }
            a = new UaAggregateConfiguration.New( {UseDefaults:true, UncertainAsBad:0, PercentBad:0, PercentGood:0, UseSloped:true} );
            print( "[leave] Testing.DataTypes.UaAggregateConfiguration [leave]" );
            },// uaAggregateConfiguration
        GetUpdateDataDetails: function() {
            print( "[enter] Testing.DataTypes.GetUpdateDataDetails [enter]" );
            try{ a = UaUpdateDataDetails.New(); addError( "FAIL: GetUpdateDataDetails ctor. empty" ); }catch(e){  }
            try{ a = UaUpdateDataDetails.New(1); addError( "FAIL: GetUpdateDataDetails ctor. arg provided, sub-items non-existent" ); }catch(e){}
            try{ a = UaUpdateDataDetails.New({NodeId:new UaNodeId()}); addError( "FAIL: GetUpdateDataDetails ctor. arg provided + nodeId" ); }catch(e){}
            try{ a = UaUpdateDataDetails.New({NodeId:new UaNodeId(), PerformInsertReplace:true}); addError( "PASS: GetUpdateDataDetails ctor. arg provided + nodeId + enum" ); }catch(e){}
            try{ a = UaUpdateDataDetails.New({NodeId:new UaNodeId(), PerformInsertReplace:true, UpdateValues: 1}); addError( "FAIL: GetUpdateDataDetails ctor. arg provided + nodeId + enum + updateValues" ); }catch(e){}
            print( "[leave] Testing.DataTypes.GetUpdateDataDetails [leave]" );
            },// getUpdateDataDetails
        }, //common 
    Aggregates: {
      Averaging: {
            Average: function() {
                print( "[enter] Testing.Aggregates.Averaging.Average [enter]" );
                // every 10-seconds
                print( "\tAverage Aggregate 10-sec..." ); 
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 10000 } );
                var expected = [ { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                var d = OPCF.HA.Aggregates.Averaging.Average.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                if( !Assert.Equal( expected.length, d.length, "DataSet length mismatch (10-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( data in d ) { Assert.Equal( expected[data].RawValue, parseInt( d[data].Value ) ); }
                // every 5-seconds
                print( "\tAverage Aggregate 5-sec..." ); 
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 5000 } );
                expected = [ { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                d = OPCF.HA.Aggregates.Averaging.Average.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                if( !Assert.Equal( expected.length, d.length, "DataSet length mismatch (5-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( data in d ) { Assert.Equal( expected[data].RawValue, parseInt( d[data].Value ) ) };
                // every 60-seconds
                print( "\tAverage Aggregate 60-sec..." ); 
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 60000 } );
                expected = [ { RawValue: 27.5, StatusCode: StatusCode.Uncertain }, { RawValue: 76.6667, StatusCode: StatusCode.Bad } ];
                d = OPCF.HA.Aggregates.Averaging.Average.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                if( !Assert.Equal( expected.length, d.length, "DataSet length mismatch (60-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( data in d ) { Assert.Equal( expected[data].RawValue, parseFloat( d[data].Value ) ); }
                print( "[leave] Testing.Aggregates.Averaging.Average [leave]" );
                },//average
            TimeAverage: function() {
                print( "[enter] Testing.Aggregates.Averaging.TimeAverage [enter]" );
//TODO
                print( "[leave] Testing.Aggregates.Averaging.TimeAverage [leave]" );
                },// timeAverage
            Minimum: function() {
                print( "[enter] Testing.Aggregates.Averaging.Minimum [enter]" );
                // every 16-seconds
                print( "\tAverage Aggregate 10-sec..." ); 
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good } ];
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.Minimum.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: false, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.Minimum [leave]" );
                },// minimum
            Minimum2: function() {
                print( "[enter] Testing.Aggregates.Averaging.Minimum2 [enter]" );
                // every 16-seconds
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good } ];
                var expected = [ { RawValue: 10, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 16.087, StatusCode: StatusCode.Good }, { RawValue: 26.818, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 56, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: null , StatusCode: StatusCode.BadNoData } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.Minimum2.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                //for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.Minimum [leave]" );
                },// minimum
            Maximum: function() {
                print( "[enter] Testing.Aggregates.Averaging.Maximum [enter]" );
                // every 16-seconds
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 25, StatusCode: StatusCode.Bad }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.Maximum.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.Maximum [leave]" );
                },// Maximum

            Maximum2: function() {
                print( "[enter] Testing.Aggregates.Averaging.Maximum2 [enter]" );
                // every 16-seconds
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                var expected = [ { RawValue: 16.087, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 26.8182, StatusCode: StatusCode.Bad }, { RawValue: 40, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 56, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.Maximum2.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: true } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.Maximum2 [leave]" );
                },// Maximum2
            
            Total2: function() {
                print( "[enter] Testing.Aggregates.Averaging.Total2 [enter]" );
                //Testing.Aggregates.Averaging.Total2( OPCF.HA.Aggregates.Averaging.Total2.GetDataset );

                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 25, StatusCode: StatusCode.Bad }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 5000 } );
                var data = OPCF.HA.Aggregates.Averaging.Total2.GetDataset( { RawData: Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( "\t" + data[d] );

            /**
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval:16000 } ); 
                var expected = [ { RawValue: "null", StatusCode: StatusCode.BadNoData }, { RawValue: "null", StatusCode: StatusCode.BadNoData }, { RawValue: 62.5, StatusCode: StatusCode.Good }, { RawValue: 87.5, StatusCode: StatusCode.Good }, { RawValue: 112.5, StatusCode: StatusCode.Good },{ RawValue: 137.5, StatusCode: StatusCode.Good },{ RawValue: 150, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 150, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: "null", StatusCode: StatusCode.BadNoData }, { RawValue: "null", StatusCode: StatusCode.BadNoData }, { RawValue: 262.5, StatusCode: StatusCode.Good }, { RawValue: 287.5, StatusCode: StatusCode.Good }, { RawValue: 312.5, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 337.5, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 362.5, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 387.5, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 412.5, StatusCode: StatusCode.Good }, { RawValue: 437.5, StatusCode: StatusCode.Good }, { RawValue: 0.09, StatusCode: StatusCode.UncertainDataSubNormal } ];
                var myData = Historian3.RawValues;
                var d = OPCF.HA.Aggregates.Averaging.Total2.GetDataset( { RawData: myData, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSlopedExtrapolation: true } ) } );
                for( data in d ) print( "\t" + d[data] );
                **/
                print( "[leave] Testing.Aggregates.Averaging.Total2 [leave]" );                
                },// Total2

            MinimumActualTime: function() {
                print( "[enter] Testing.Aggregates.Averaging.MinimumActualTime [enter]" );
                // every 16-seconds
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good } ];
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.Good } ];
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.MinimumActualTime.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.MinimumActualTime [leave]" );
                },// MinimumActualTime

            MinimumActualTime2: function() {
                print( "[enter] Testing.Aggregates.Averaging.MinimumActualTime [enter]" );
                // every 16-seconds
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 16, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 64, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 80, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                var expected = [ { RawValue: 10, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 16.087, StatusCode: StatusCode.Good }, { RawValue: 26.8182, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 56, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 40, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 70, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.MinimumActualTime2.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: false, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.MinimumActualTime [leave]" );
                },// MinimumActualTime

            MaximumActualTime: function() {
                print( "[enter] Testing.Aggregates.Averaging.MaximumActualTime [enter]" );
                // every 16-seconds
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 25, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.MaximumActualTime.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, TreatUncertainAsBad: false, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.MaximumActualTime [leave]" );
                },// MaximumActualTime

            MaximumActualTime2: function() {
                print( "[enter] Testing.Aggregates.Averaging.MaximumActualTime [enter]" );
                // every 16-seconds
                print( "\tAverage Aggregate 10-sec..." );
                //var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                var expected = [ { RawValue: 16.087, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 26.818, StatusCode: StatusCode.Good }, { RawValue: 40, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 56, StatusCode: StatusCode.Good }, { RawValue: 60, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var data = OPCF.HA.Aggregates.Averaging.MaximumActualTime2.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d] );
                if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                //for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Averaging.MaximumActualTime [leave]" );
                },// MaximumActualTime

            StartBound: function() {
                print( "[enter] Testing.Aggregates.Averaging.StartBound [enter]" );
                //Testing.Aggregates.Averaging.TestAllCases( OPCF.HA.Aggregates.Averaging.StartBound.GetDataset );
                
                var expected = [ { RawValue: 16, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 64, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 80, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 5000 } );
                var myData = Historian3.RawValues;
                var data = OPCF.HA.Aggregates.Averaging.StartBound.GetDataset( { RawData: myData, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d].toString() );
                
                print( "[leave] Testing.Aggregates.Averaging.StartBound [leave]" );
                },// StartBound

            EndBound: function() {
                print( "[enter] Testing.Aggregates.Averaging.EndBound [enter]" );
                //Testing.Aggregates.Averaging.TestAllCases( OPCF.HA.Aggregates.Averaging.EndBound.GetDataset );
                
                var expected = [ { RawValue: 16, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 30, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 64, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 80, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: 90, StatusCode: StatusCode.UncertainDataSubNormal }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 10000 } );
                var myData = Historian2.RawValues;
                var data = OPCF.HA.Aggregates.Averaging.EndBound.GetDataset( { RawData: myData, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                for( d in data ) print( data[d].toString() );
                
                print( "[leave] Testing.Aggregates.Averaging.EndBound [leave]" );
                },// EndBound
            },// averaging

        Counting: {
            Count: function() {
                print( "[enter] Testing.Aggregates.Counting.Count [enter]" );
                // 16-seconds
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                var expected = [ { RawValue: 1, StatusCode: StatusCode.Good }, { RawValue: 2, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 2, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Uncertain }, { RawValue: 2, StatusCode: StatusCode.Good } ];
                var d = OPCF.HA.Aggregates.Counting.Count.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } );
                Assert.Equal( expected.length, d.length, "DataSet length mismatch (16-sec)" );
                print( "Count.Count Aggregate:" ); for( data in d ) print( "\t" + d[data].toString() );
                print( "[leave] Testing.Aggregates.Counting.Count [leave]" );
                },// count
            },// counting
        Time: {
            Start: function() {
                print( "[enter] Testing.Aggregates.Time.Start [enter]" );
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } ); 
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: NaN, StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: 70, StatusCode: StatusCode.Good }, { RawValue: 80, StatusCode: StatusCode.Good } ];
                var d = OPCF.HA.Aggregates.Time.Start.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } ); 
                Assert.Equal( expected.length, d.length, "DataSet length mismatch (16-sec)" );
                for( var i=0; i<d.length; i++ ) { print( "\t" + d[i].toString() ); Assert.Equal( expected[i].RawValue, parseInt( d[i].Value ) ); }
                print( "[leave] Testing.Aggregates.Time.Start [leave]" );
                },// start
            End: function() {
                print( "[enter] Testing.Aggregates.Time.End [enter]" );
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } ); 
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 30, StatusCode: StatusCode.Good }, { RawValue: NaN, StatusCode: StatusCode.Bad }, { RawValue: 60, StatusCode: StatusCode.Good }, { RawValue: 70, StatusCode: StatusCode.Uncertain }, { RawValue: 90, StatusCode: StatusCode.Good } ];
                var d = OPCF.HA.Aggregates.Time.End.GetDataset( { RawData: OPCF.HA.AggregatesDataSet.Averaging.Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSloped: false } ) } ); 
                Assert.Equal( expected.length, d.length, "DataSet length mismatch (16-sec)" );
                for( data in d ) print( "\t" + d[data].toString() );
                print( "[leave] Testing.Aggregates.Time.End [leave]" );
                },// end
            },// time */
        Quality: {
            DurationGood: function() {
                print( "[enter] Testing.Aggregates.Quality.DurationGood [enter]" );
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );
                //var expected = [ { RawValue: 6000, StatusCode: StatusCode.Good }, { RawValue: 16000, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Good }, { RawValue: 14000, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Good }, { RawValue: 10001, StatusCode: StatusCode.Good } ];                
                var expected = [ { RawValue: 14000, StatusCode: StatusCode.Good }, { RawValue: 16000, StatusCode: StatusCode.Good }, { RawValue: 10000, StatusCode: StatusCode.Good }, { RawValue: 16000, StatusCode: StatusCode.Good }, { RawValue: 13000, StatusCode: StatusCode.Good }, { RawValue: 7001, StatusCode: StatusCode.Good } ];                
                var ds = OPCF.HA.Aggregates.Quality.DurationGood.GetDataset( { RawData: Historian2.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSlopedExtrapolation: false } ) } ); 
                Assert.Equal( expected.length, ds.length, "DataSet length mismatch (16-sec)" );
                for( var i=0; i<ds.length; i++ ) { print( "\t" + ds[i].toString() ); }
                print( "[leave] Testing.Aggregates.Quality.DurationGood [leave]" );
                },// durationgood
            PercentGood: function() {
                print( "[enter] Testing.Aggregates.Quality.PercentGood [enter]" );
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 16000 } );                 
                var expected = [ { RawValue: 37.500, StatusCode: StatusCode.Good }, { RawValue: 100, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Bad }, { RawValue: 87.500, StatusCode: StatusCode.Good }, { RawValue: 0, StatusCode: StatusCode.Uncertain }, { RawValue: 100, StatusCode: StatusCode.Good } ];
                var myData = OPCF.HA.AggregatesDataSet.PercentGood.Historian1;
                var d = OPCF.HA.Aggregates.Quality.PercentGood.GetDataset( { RawData: myData.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentDataBad: 100, PercentDataGood: 100, UseSloped: false } ) } ); 
                Assert.Equal( expected.length, d.length, "DataSet length mismatch (16-sec)" );
                for( data in d ) print( "\t" + d[data].toString() );
                print( "[leave] Testing.Aggregates.Quality.PercentGood [leave]" );
                },// percentgood
            },// quality */
        Other: {
            Interpolative: function() { // Deepthi - Teegala
                print( "[enter] Testing.Aggregates.Other.Interpolative [enter]" );
                // every 16-seconds
                var expected = [ { RawValue: 10, StatusCode: StatusCode.Good }, { RawValue: 20, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 50, StatusCode: StatusCode.Good }, { RawValue: new UaVariant(), StatusCode: StatusCode.Bad }, { RawValue: 80, StatusCode: StatusCode.Good } ];
                ts = new TimeSlice( { StartTime: UaDateTime.fromHoursMinutesSecondsString( "00:00:00" ), ProcessingInterval: 10000 } );
                var data = OPCF.HA.Aggregates.Other.Interpolative.GetDataset( { RawData: Historian1.RawValues, TimeSlice: ts, Configuration: UaAggregateConfiguration.New( { UseDefaults: true, UncertainAsBad: true, PercentBad: 100, PercentGood: 100, UseSlopedExtrapolation: true } ) } );
                for( d in data ) print( data[d] );
               // if( !Assert.Equal( expected.length, data.length, "DataSet length mismatch (16-sec)" ) ) for( var i=0; i<d.length; i++ ) print( d[i] );
                //for( var d=0; d<data.length; d++ ) { Assert.CoercedEqual( expected[d].RawValue, data[d].Value ); }
                print( "[leave] Testing.Aggregates.Other.Interpolative [leave]" );
                },// Interpolative
        }// Other
        }, //aggregates 
}// Testing


Testing.HistoryRead.General();
//Testing.CttHAserver();
Testing.RawDataAnalysis.Get.DataInTimeSlice();
//Testing.RawDataAnalysis.Find.Date.First(); // FAIL
//Testing.RawDataAnalysis.Find.Date.Last(); // FAIL
Testing.RawDataAnalysis.Exists.Date();
//Testing.DataTypes.Timeslice(); // FAIL
Testing.DataTypes.UaAggregateConfiguration();
//Testing.DataTypes.GetUpdateDataDetails(); // FAIL
Testing.Aggregates.Other.Interpolative();
Testing.Aggregates.Averaging.Average();
Testing.Aggregates.Averaging.TimeAverage();
Testing.Aggregates.Counting.Count();
Testing.Aggregates.Time.Start();
Testing.Aggregates.Time.End();
Testing.Aggregates.Averaging.Minimum();
Testing.Aggregates.Averaging.Total2();
//Testing.Aggregates.Averaging.Minimum2(); // FAIL
//Testing.Aggregates.Averaging.MinimumActualTime(); // FAIL
//Testing.Aggregates.Averaging.MinimumActualTime2(); // FAIL
//Testing.Aggregates.Averaging.MaximumActualTime(); // FAIL
//Testing.Aggregates.Averaging.MaximumActualTime2(); // FAIL
//Testing.Aggregates.Averaging.Maximum(); // FAIL
//Testing.Aggregates.Averaging.Maximum2(); // FAIL
//Testing.Aggregates.Averaging.StartBound(); // FAIL
//Testing.Aggregates.Averaging.EndBound(); // FAIL
Testing.Aggregates.Quality.DurationGood();