/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script specifies an invalid IndexRange of “-4:-2” (negative) for an array item. */

function createMonitoredItems591Err025() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Arrays.Settings, 0 );
    if( items === null || items.length === 0 ) {
        addSkipped( SETTING_UNDEFINED_SCALARARRAYS );
        return( false );
    }

    if( !MonitorBasicSubscription.SubscriptionCreated ) {
        addError( "Subscription for Monitor Basic was not created." );
    }
    else {
        // Create a single monitored item
        var createMonitoredItemsRequest = new UaCreateMonitoredItemsRequest();
        var createMonitoredItemsResponse = new UaCreateMonitoredItemsResponse();
        Test.Session.Session.buildRequestHeader( createMonitoredItemsRequest.RequestHeader );

        createMonitoredItemsRequest.SubscriptionId = MonitorBasicSubscription.SubscriptionId;
        createMonitoredItemsRequest.TimestampsToReturn = TimestampsToReturn.Both;
        createMonitoredItemsRequest.ItemsToCreate[0] = new UaMonitoredItemCreateRequest();
        createMonitoredItemsRequest.ItemsToCreate[0].ItemToMonitor.NodeId = items[0].NodeId;
        createMonitoredItemsRequest.ItemsToCreate[0].ItemToMonitor.IndexRange = "-4:-2"; 
        createMonitoredItemsRequest.ItemsToCreate[0].ItemToMonitor.AttributeId = Attribute.Value;
        createMonitoredItemsRequest.ItemsToCreate[0].MonitoringMode = MonitoringMode.Reporting;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.ClientHandle = 0x1234;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.SamplingInterval = -1;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.QueueSize = 1;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.DiscardOldest = true;

        print( "Creating one monitored item with invalid index range of '-4:-2'" );
        var uaStatus = Test.Session.Session.createMonitoredItems( createMonitoredItemsRequest, createMonitoredItemsResponse );
        if( uaStatus.isGood() ) {
            var ExpectedServiceResultArray = [ new ExpectedAndAcceptedResults( StatusCode.BadIndexRangeInvalid ) ];
            checkCreateMonitoredItemsError( createMonitoredItemsRequest, createMonitoredItemsResponse, ExpectedServiceResultArray );
            if( createMonitoredItemsResponse.Results[0].StatusCode.isGood() ) {
                DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: [ createMonitoredItemsResponse.Results[0].MonitoredItemId ], SubscriptionId: MonitorBasicSubscription } );
            }
        }
        else {
            addError( "CreateMonitoredItems() status: " + uaStatus, uaStatus );
        }
    }
    return( true );
}//function createMonitoredItems591Err025()

Test.Execute( { Procedure: createMonitoredItems591Err025 } );