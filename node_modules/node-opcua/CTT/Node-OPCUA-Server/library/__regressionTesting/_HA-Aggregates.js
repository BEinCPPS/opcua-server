include( "./library/Base/safeInvoke.js" );
include( "./library/RunOnce/redefiners.js" );
include( "./library/__regressionTesting/_HA-Dataset.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/HAAggregates.js" );
include( "./library/ServiceBased/AttributeServiceSet/HistoryRead/CttHistoryServer.js" );
include( "./library/Base/assertions.js" );

// check our aggregates
var tests = [ 
    { Group: "Averaging", Aggregates: [ "Average", "TimeAverage", "Total", "Total2" ] },
    { Group: "Counting", Aggregates: [ "Count", "DurationInState0", "DurationInState1", "NumberOfTransitions" ] },
    { Group: "Time", Aggregates:  [ "Start", "End", "Delta", "Start2", "End2", "Delta2" ] },
    { Group: "Quality", Aggregates: [ "DurationGood", "DurationBad", "PercentGood", "PercentBad", "WorstQuality", "WorstQuality2" ] },
    { Group: "Annotation", Aggregates: [ "AnnotationCount" ] } ];

// perform the following tests (inside the inner loop) for all aggregate groups and nested aggregates.
for( t in tests ) {
    for( n in tests[t].Aggregates ) {
        print( "Testing [" + tests[t].Group + "]." + tests[t].Aggregates[n] );
        Assert.Equal( tests[t].Aggregates[n], OPCF.HA.Aggregates[tests[t].Group][tests[t].Aggregates[n]].Name );
        try{ OPCF.HA.Aggregates[tests[t].Group][tests[t].Aggregates[n]].GetDataset(); addError( "FAIL (null)" ); } catch(e){};
        try{ OPCF.HA.Aggregates[tests[t].Group][tests[t].Aggregates[n]].GetDataset( { RawData: null } ); addError( "FAIL ( RawData: null )" ); } catch(e){};
        try{ OPCF.HA.Aggregates[tests[t].Group][tests[t].Aggregates[n]].GetDataset( { RawData: [1, 2] } ); } catch(e){ addError( "FAIL ( RawData: [1,2] ) .Error: " + e ); };
    }
}