/*    Test 5.7.1-21 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given five nodes to browse
            And the nodes exist
            And the nodes have at least two forward references
          When Browse is called
          Then the server returns a continuation point for each node
            And all preceding operation results are Good
          Note: it is OK to use the same node over and over (as this script does)
          because the ContinuationPoint will be unique for each. */

include( "./library/ServiceBased/ViewServiceSet/Browse/get_max_browse_continuation_points.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse/number_of_continuation_points_test.js" );

function Test57121() {
    var nodeId = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has 3 Forward References 1" ).toString() );
    if( nodeId === undefined || nodeId === null ) {
        addSkipped( "[Configuration Issue?] Unable to execute test. Check setting 'Has 3 Forward References 1'." );
        return( false );
    }
    // verify the maximum number of continuation points is greater than five
    var maxContinuationPoints = parseInt( GetMaxBrowseContinuationPoints( Test.Session.Session ) );
    if( ( maxContinuationPoints < 5 ) && ( maxContinuationPoints !== 0 ) ) {
        addError( "Server indicates it supports " + maxContinuationPoints + " continuation points, but it must support at least five." );
    }
    var minContinuationPoints = 5;
    // run the test to get the point of first failure
    var failurePoint = BrowseNodesUntilOutOfContinuationPoints( Test.Session.Session, nodeId, minContinuationPoints, 0 );
    if( failurePoint < 0 ) {
        addError( "Test cannot be completed." );
    }
    else if( failurePoint == 0 ) {
        // passed
    }
    else if( failurePoint == 1 ) {
        addError( "Server did not allocate any continuation points, but it must be able to allocate at least " + minContinuationPoints + " continuation points." );
    }
    else if( failurePoint < minContinuationPoints ) {
        addError( "Server ran out of continuation points on node " + failurePoint + ", but it must be able to allocate at least " + minContinuationPoints + " continuation points." );
    }
    return( true );
}

Test.Execute( { Procedure: Test57121 } );