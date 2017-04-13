/*  Test prepared by Development; compliance@opcfoundation.org
    Description: QueueSize = Max UInt32; Expect revision. */

function createMonitoredItems591004() {
const MIN_QUEUE_SIZE = 2;
    var item = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0 )[0];
    if( !isDefined( item ) ) { addSkipped( "No scalar items defined. Aborting." ); return( false ); }
    item.QueueSize = Constants.UInt32_Max;
    // create the subscription
    var subscription = new Subscription();
    CreateSubscriptionHelper.Execute( { Subscription: subscription } );
    // add the item
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: item, TimestampsToReturn: TimestampsToReturn.Server, SubscriptionId: subscription } ) ) {
        if( Constants.UInt32_Max === item.RevisedQueueSize) addWarning( "Expected the server to revise the queueSize from a Max UInt32." );
        Assert.GreaterThan( 1, item.RevisedQueueSize, "Expected the server to revise the queueSize to be 2 or greater, per the conformance unit requirements.", "CreateMonitoredItems() server revised queueSize as expected from MaxInt32 to " + item.RevisedQueueSize + "."  );
        Assert.NotEqual( Constants.UInt32_Max, item.RevisedQueueSize, "Expected the revised queueSize to NOT equal UInt32.Max" );
        if( item.RevisedQueueSize < MIN_QUEUE_SIZE ) addError( "Revised QueueSize is LESS than the required minimum of " + MIN_QUEUE_SIZE + ". QueueSize revised to: " + item.RevisedQueueSize );

        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: item, SubscriptionId: subscription } );
    }
    // clean-up
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: subscription } );
    return( true );
}

Test.Execute( { Procedure: createMonitoredItems591004 } );