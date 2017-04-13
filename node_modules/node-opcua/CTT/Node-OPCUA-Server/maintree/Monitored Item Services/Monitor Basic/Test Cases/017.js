/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Specifies a valid subscriptiondId and triggeringItem, with a valid link also. */

function setTriggering595001() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, Attribute.Value, "", MonitoringMode.Reporting, true, null, 1, -1, TimestampsToReturn.Both, true );
    if( items == null || items.length == 0 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }

    // subscription is created and deleted in initialize and cleanup scripts
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for MonitoredItemsServiceSet was not created." );
        return( false );
    }
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: items[0],  TimestampsToReturn: TimestampsToReturn.Both,  SubscriptionId: MonitorBasicSubscription } ) ) {
        // delete monitored item
        if( DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: items[0], SubscriptionId: MonitorBasicSubscription } ) ) {
            // verify the object is deleted by trying to change the monitoringMode.
            var expectedErrors = [ new ExpectedAndAcceptedResults( StatusCode.BadMonitoredItemIdInvalid ) ];
            SetMonitoringModeHelper.Execute( { MonitoringMode: MonitoringMode.Disabled, MonitoredItemIds: items[0], SubscriptionId: MonitorBasicSubscription, OperationResults: expectedErrors } );
        }
    }
    return( true );
}

Test.Execute( { Procedure: setTriggering595001 } );