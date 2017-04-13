/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script specifies a value for ModifyMonitoredItems 'TimestampsToReturn' that is not in the enum. */

function modifyMonitoredItems592Err010() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for Monitor Basic was not created" );
        return( false );
    }
    if( CreateMonitoredItemsHelper.Execute( { SubscriptionId: MonitorBasicSubscription, ItemsToCreate: scalarItems[0] } ) ) {
        ModifyMonitoredItemsHelper.Execute( { SubscriptionId: MonitorBasicSubscription, ItemsToModify: scalarItems[0], TimestampsToReturn: 0x999, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadTimestampsToReturnInvalid ) } );
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: scalarItems[0], SubscriptionId: MonitorBasicSubscription } );
    }
    return( true );
}

Test.Execute( { Procedure: modifyMonitoredItems592Err010 } );