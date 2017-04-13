/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script specifies empty monitoredItemIds[]. */

function deleteMonitoredItems595Err006() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for MonitoredItemsServiceSet was not created." );
        return( false );
    }
    return( DeleteMonitoredItemsHelper.Execute( { SubscriptionId: MonitorBasicSubscription, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: deleteMonitoredItems595Err006 } );