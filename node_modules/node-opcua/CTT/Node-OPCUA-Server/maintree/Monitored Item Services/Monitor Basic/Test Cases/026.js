/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script sets monitoring mode to 'Disabled' for a 'Reporting' monitor item. Verifies that data is received(on publish) only when the monitoring mode is 'Reporting'. */

function setMonitoringMode593007() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for Monitor Basic was not created" );
        return( false );
    }
    // 1 monitored item (Reporting)
    var monitoredItems = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, Attribute.Value, "", MonitoringMode.Reporting, true, null, 1, -1, TimestampsToReturn.Both );
    if( monitoredItems == null || monitoredItems.length == 0 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: monitoredItems[0], TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: MonitorBasicSubscription } ) ) {
        addLog( "Calling Publish (first call) and initial check to make sure NO dataChanges are received!" );
        PublishHelper.WaitInterval( { Items: monitoredItems[0], Subscription: MonitorBasicSubscription } );
        PublishHelper.Execute();
        Assert.Equal( true, PublishHelper.CurrentlyContainsData(), "The initial DataChange notification was expected but not received. We created the subscription (reporting=ENABLED) and then waited for the publish period before calling Publish()." );

        // Set the monitoring mode to Disabled!
        addLog ( "Setting the monitoring mode to an DISABLED" );
        if( SetMonitoringModeHelper.Execute( { MonitoringMode: MonitoringMode.Disabled, MonitoredItemIds: monitoredItems[0], SubscriptionId: MonitorBasicSubscription } ) ) {
            // call Publish() again to verify that we do not receive any notification this time
            addLog ( "Calling publish again. We should not receive NotificationData still." );
            // wait one publishing cycle before calling publish
            PublishHelper.WaitInterval( { Items: monitoredItems[0], Subscription: MonitorBasicSubscription } );
            PublishHelper.Execute();
            Assert.Equal( false, PublishHelper.CurrentlyContainsData(), "No dataChanges were expected because the subscription should be disabled! But a DataChange notification was received which is incorrect!" );
        }
    }
    // delete the items we added in this test
    DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: monitoredItems[0], SubscriptionId: MonitorBasicSubscription } );
    return( true );
}

Test.Execute( { Procedure: setMonitoringMode593007 } );