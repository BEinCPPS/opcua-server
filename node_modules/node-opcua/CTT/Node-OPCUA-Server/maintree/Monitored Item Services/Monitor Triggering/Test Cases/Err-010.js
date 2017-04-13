/*  Test prepared by compliance@opcfoundation.org; original work by: Anand Taparia; ataparia@kepware.com
      Description: Script specifies items from different subscriptions for triggeringItemId and linksToAdd[].
          Create a trigger in Subscription 1, but the links to remove are not defined because they are in subscription #2. */

function setTriggering594Err010() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings );
    if( items == null || items.length < 2 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }
    // We already have one subscription created in the initialize routine. Lets's
    // create the second one here
    SecondSubscription = new Subscription();
    if( !CreateSubscriptionHelper.Execute( { Subscription: SecondSubscription } ) ) return( false );
    // Just for clarity, assign a friendly-name so we can distinguish our two subscriptions
    var FirstSubscription = MonitorTriggeringSubscription;
    if( !FirstSubscription.SubscriptionCreated || !SecondSubscription.SubscriptionCreated ) {
        addError( "One or both subscriptions for conformance unit Monitor Triggering was not created." );
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
    // now delete triggeringItemSub1
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: triggeringItemSub1, SubscriptionId: FirstSubscription } );
    // create the next triggering item, for subscription #2
    var triggeringItemSub2 = items[1];
    triggeringItemSub2.SamplingInterval = SAMPLING_RATE_FASTEST;
    triggeringItemSub2.QueueSize = 1;
    triggeringItemSub2.MonitoringMode = MonitoringMode.Reporting;
    var triggeringItemSub2Clone1 = MonitoredItem.Clone( triggeringItemSub2 );
    var triggeringItemSub2Clone2 = MonitoredItem.Clone( triggeringItemSub2 );
    // create the trigger in subscription2
    if( !CreateMonitoredItemsHelper.Execute( { ItemsToCreate: [ triggeringItemSub2, triggeringItemSub2Clone1, triggeringItemSub2Clone2 ], TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: SecondSubscription } ) ) {
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: triggeringItemSub1, SubscriptionId: FirstSubscription } );
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
        return( false );
    }
    /* Jan-13-2012 NP: We need to CAREFULLY specify the monitored item in the OTHER subscription so that we do 
                       not specify an item that also exists in this subscription. We want the call to fail! */
    var sub2UniqueItem;
    if( triggeringItemSub1Clone.MonitoredItemId !== triggeringItemSub2.MonitoredItemId ) sub2UniqueItem = triggeringItemSub2;
    else if( triggeringItemSub1Clone.MonitoredItemId !== triggeringItemSub2Clone1 ) sub2UniqueItem = triggeringItemSub2Clone1;
    else if( triggeringItemSub1Clone.MonitoredItemId !== triggeringItemSub2Clone2 ) sub2UniqueItem = triggeringItemSub2Clone2;
    // create the trigger in subscription 1 with linked items defined in subscription 1
    var expectedServiceResult = new ExpectedAndAcceptedResults( StatusCode.BadMonitoredItemIdInvalid );
    SetTriggeringHelper.Execute( { SubscriptionId: FirstSubscription, TriggeringItemId: sub2UniqueItem, LinksToAdd: [ triggeringItemSub1Clone ], ServiceResult: expectedServiceResult } );
    // Cleanup
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: triggeringItemSub1Clone, SubscriptionId: FirstSubscription } );
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: [ triggeringItemSub2, triggeringItemSub2Clone1, triggeringItemSub2Clone2 ], SubscriptionId: SecondSubscription } );
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: SecondSubscription } );
    return( true );
}

Test.Execute( { Procedure: setTriggering594Err010 } );