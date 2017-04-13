/*  Test prepared by compliance@opcfoundation.org; original work by: Anand Taparia; ataparia@kepware.com
      Description: Script specifies items from different subscriptions for triggeringItemId and linksToAdd[].
        Create in Subscription 1 a trigger, but the trigger is defined in subscription #2. */

function setTriggering594Err009() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings );
    if( items == null || items.length < 2 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }
    // We already have one subscription created in the initialize routine. Lets's create the second one here
    SecondSubscription = new Subscription();
    if( !CreateSubscriptionHelper.Execute( { Subscription: SecondSubscription } ) ) return( false );
    // Just for clarity
    var FirstSubscription = MonitorTriggeringSubscription;
    if( !FirstSubscription.SubscriptionCreated || !SecondSubscription.SubscriptionCreated ) {
        addError( "One or both subscriptions for conformance unit Monitor Triggering was not created." );
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
        return( false );
    }
    // add 1 item (will be used as triggeringItemId) to the first subscription
    var triggeringItemSub1 = items[0];
    triggeringItemSub1.SamplingInterval = SAMPLING_RATE_FASTEST;
    triggeringItemSub1.QueueSize = 1;
    triggeringItemSub1.MonitoringMode = MonitoringMode.Reporting;
    // create a clone of triggeringItemSub1 because we will delete triggeringItemSub1 in a moment
    // so as to ensure we have a different monitoredItemId between the items in different subscriptions.
    var triggeringItemSub1Clone = MonitoredItem.Clone( triggeringItemSub1 );
    // create the trigger in subscription1
    if( !CreateMonitoredItemsHelper.Execute( { ItemsToCreate: [ triggeringItemSub1, triggeringItemSub1Clone ], TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: FirstSubscription } ) ) {
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
        return( false );
    }
    // create the next triggering item, for subscription #2
    var triggeringItemSub2 = items[1];
    triggeringItemSub2.SamplingInterval = SAMPLING_RATE_FASTEST;
    triggeringItemSub2.QueueSize = 1;
    triggeringItemSub2.MonitoringMode = MonitoringMode.Reporting;
    // create the trigger in subscription2
    if( !CreateMonitoredItemsHelper.Execute( { ItemsToCreate: triggeringItemSub2, TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: SecondSubscription } ) ) {
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: triggeringItemSub1, SubscriptionId: FirstSubscription } );
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
        return( false );
    }
    // now delete triggeringItemSub1
    /* Jan-13-2012 NP: We need to carefully CHECK the item that we're going to delete because the server
                       may allocate MonitoredItem Ids unique to the subscription, or to the session.
                       If we delete the wrong item we could end-up with duplicate monitored item Ids in
                       2 different subscriptions which will invalidate this test. */
    var sub1ItemToRemove = triggeringItemSub1;
    var sub1ItemRemaining = triggeringItemSub1Clone;
    if( triggeringItemSub1.MonitoredItemId === triggeringItemSub2.MonitoredItemId ) {
        sub1ItemToRemove  = triggeringItemSub1Clone;
        sub1ItemRemaining = triggeringItemSub1;
    }
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: sub1ItemToRemove, SubscriptionId: FirstSubscription } );
    // create the trigger in subscription 1 with linked items defined in subscription 2
    var ExpectedOperationResultsAdd = [];
    ExpectedOperationResultsAdd [0] = new ExpectedAndAcceptedResults( StatusCode.BadMonitoredItemIdInvalid );
    SetTriggeringHelper.Execute( { SubscriptionId: FirstSubscription, TriggeringItemId: sub1ItemRemaining, LinksToAdd: sub1ItemToRemove, AddResults: ExpectedOperationResultsAdd } );
    // Cleanup
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: sub1ItemRemaining, SubscriptionId: FirstSubscription } );
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: triggeringItemSub2, SubscriptionId: SecondSubscription } );
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
    return( true );
}

Test.Execute( { Procedure: setTriggering594Err009 } );