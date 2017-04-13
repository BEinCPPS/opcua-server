/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script specifies an invalid samplingInterval of -10 ms. Expected result: ServiceResult/OperationResult: Good; The UA server should revise the SamplingInterval to > 0. */

function createMonitoredItems591Err022() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true );
    if( items == null || items.length == 0 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
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
        createMonitoredItemsRequest.ItemsToCreate[0].ItemToMonitor.AttributeId = Attribute.Value;
        createMonitoredItemsRequest.ItemsToCreate[0].MonitoringMode = MonitoringMode.Reporting;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.ClientHandle = 0x1234;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.SamplingInterval = -10;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.QueueSize = 1;
        createMonitoredItemsRequest.ItemsToCreate[0].RequestedParameters.DiscardOldest = true;

        var uaStatus = Test.Session.Session.createMonitoredItems( createMonitoredItemsRequest, createMonitoredItemsResponse );
        if( uaStatus.isGood() ) {
            checkCreateMonitoredItemsValidParameter( createMonitoredItemsRequest, createMonitoredItemsResponse );

            // Check the SamplingInterval was revised to a positive no.
            print( "RevisedSamplingInterval is: " + createMonitoredItemsResponse.Results[0].RevisedSamplingInterval );
            if( Assert.NotEqual( -10, createMonitoredItemsResponse.Results[0].RevisedSamplingInterval, "Expected the Server to revise the sampling interval." ) ) {
                if( createMonitoredItemsResponse.Results[0].RevisedSamplingInterval === 0 ) {
                    addWarning( "CreateMonitoredItems.Response.Results[0].RevisedSamplingInterval is " + createMonitoredItemsResponse.Results[0].RevisedSamplingInterval + "; which is legal, but it means the Server supports report-by-exception for data-collection which should be verified." );
                }
                else if( createMonitoredItemsResponse.Results[0].RevisedSamplingInterval === MonitorBasicSubscription.RevisedPublishingInterval ) { 
                    addLog( "CreateMonitoredItems.Response.Results[0].RevisedSamplingInterval matches Subscription.RevisedPublishingInterval." );
                }
            }

            // clean up (if required)
            if( createMonitoredItemsResponse.Results[0].StatusCode.isGood() ) {
                DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: [ createMonitoredItemsResponse.Results[0].MonitoredItemId ], SubscriptionId: MonitorBasicSubscription } );
            }
        }
        else {
            addError( "CreateMonitoredItems() status " + uaStatus, uaStatus );
        }
    }
    return( true );
}// function createMonitoredItems591Err022()

Test.Execute( { Procedure: createMonitoredItems591Err022 } );