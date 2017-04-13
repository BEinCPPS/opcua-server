/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script specifies empty ItemsToModify array. */

function modifyMonitoredItems592Err009() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for Monitor Basic was not created" );
        return( false );
    }
    // Call modifyMonitoredItems with empty ItemsToModify
    return( ModifyMonitoredItemsHelper.Execute( { SubscriptionId: MonitorBasicSubscription, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: modifyMonitoredItems592Err009 } );