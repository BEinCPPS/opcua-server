/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Specify an unknown subscriptionId for SetMonitoringMode. */

function setMonitoringMode593Err004() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for MonitoredItemsServiceSet was not created." );
        return( false );
    }
    if( CreateMonitoredItemsHelper.Execute( { SubscriptionId: MonitorBasicSubscription, ItemsToCreate: scalarItems } ) ) {
        // temporarily change the subscription id
        MonitorBasicSubscription.SubscriptionId += 0x1234;
        SetMonitoringModeHelper.Execute( { SubscriptionId: MonitorBasicSubscription, MonitoringMode: MonitoringMode.Sampling, MonitoredItemIds: scalarItems[0], ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadSubscriptionIdInvalid ) } );
        MonitorBasicSubscription.SubscriptionId -= 0x1234;
        // clean-up
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: scalarItems, SubscriptionId: MonitorBasicSubscription } );
    }
    return( true );
}

Test.Execute( { Procedure: setMonitoringMode593Err004 } );