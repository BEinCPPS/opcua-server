/*  Test prepared by compliance@opcfoundation.org; original work by: Anand Taparia; ataparia@kepware.com
    Description: Script delete "items to report" items. */

function setTriggering595005() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, Attribute.Value, "", MonitoringMode.Reporting, true, null, 1, -1, TimestampsToReturn.Both, true );
    if( items == null || items.length < 2 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }
    if( !MonitorTriggeringSubscription.SubscriptionCreated ) {
        addError( "Subscription for MonitoredItemsServiceSet was not created." );
        return( false );
    }
    items[1].MonitoringMode = MonitoringMode.Disabled;
    // add the items to the subscription
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: [items[0], items[1]], TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: MonitorTriggeringSubscription } ) ) {
        if( DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: [items[1]], SubscriptionId: MonitorTriggeringSubscription } ) ) {
            // add a triggered link
            addLog( "** Now to delete the linked item in a call to SetTriggering **" );
            var expectedResults = [ new ExpectedAndAcceptedResults( StatusCode.BadMonitoredItemIdInvalid ) ];
            SetTriggeringHelper.Execute( { SubscriptionId: MonitorTriggeringSubscription, TriggeringItemId: items[0], LinksToRemove: [ items[1] ], DeleteResults: expectedResults } );
        }// setTriggering
        // delete the remaining item
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: [items[0]], SubscriptionId: MonitorTriggeringSubscription } );
    }// createMonitoredItems
    return( true );
}

Test.Execute( { Procedure: setTriggering595005 } );