/*    Test prepared by Anand Taparia; ataparia@kepware.com
      Description: Script specifies empty monitoredItemIds array. */

function setMonitoringMode593Err006() {
    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for MonitoredItemsServiceSet was not created." );
        return( false ); 
    }
    return( SetMonitoringModeHelper.Execute( { SubscriptionId: MonitorBasicSubscription, MonitoringMode: MonitoringMode.Sampling, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: setMonitoringMode593Err006 } );