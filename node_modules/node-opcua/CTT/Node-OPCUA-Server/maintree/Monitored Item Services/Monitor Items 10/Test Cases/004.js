/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script modifies multiple monitored items, where: 
        1) Sampling period alternates 5000 & 500 msec. 
        2) Monitoring mode is 'Reporting' for first half of items and 'Disabled' for the remaining.
        3) QueueSize increments by 2 for each item. Initial queueSize is 0.
        4) DiscardOldest is True for first half of items anf False for the remaining.
        And the initial configuration is:
            A subscription of 10 (or more) monitoredItems using default parameters
        We are expecting all of the queues to have a non-zero value. */

function modifyMonitoredItems592014() {
    if( !defaultSubscription.SubscriptionCreated ) {
        addError( "Subscription for Monitor Basic was not created" );
        return( false );
    }
    // configure the items and then add them to the subscription
    var items = MonitoredItem.GetRequiredNodes( { Number: 10, Settings: Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings } );
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: items, SubscriptionId: defaultSubscription, TimestampsToReturn: TimestampsToReturn.Both } ) ) {
        // Now modify the monitored items
        for( var i=0; i<items.length; i++ ) {
            items[i].SamplingInterval = ( i%2 === 0 )? 500 : 5000; // toggle scanrate
            items[i].QueueSize = i * 2;                            // increment queuesize for each item
            items[i].DiscardOldest = ( i%2 === 0 );                // toggle discard oldest
            if( i<5 ) items[i].MonitoringMode = MonitoringMode.Reporting; // first half are reporting
            else items[i].MonitoringMode = MonitoringMode.Disabled;       // second half are disabled;
        }
        ModifyMonitoredItemsHelper.Execute( { ItemsToModify: items, SubscriptionId: defaultSubscription } );
        // Cleanup
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: items, SubscriptionId: defaultSubscription } );
    }
    return( true );
}

Test.Execute( { Procedure: modifyMonitoredItems592014 } );