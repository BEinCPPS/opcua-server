/*  Test prepared by Deepthi Teegala: deepthi.teegala@opcfoundation.org
    Description:  Create multiple monitored items by subscribing to all the attributes of the Node.Call Publish()three times and verify the response.*/

function createMonitoredItems591034() {
    var items = MonitoredItem.GetAttributesAsNodes( MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings )[0], new NodeTypeAttributesMatrix().Variable );
    var subscription = new Subscription();
    // create the subscription; create the items; call publish 2 times (initial + keepAlive)
    if( CreateSubscriptionHelper.Execute( { Subscription: subscription } ) ) {
        if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: items, TimestampsToReturn: TimestampsToReturn.Both, SubscriptionId: subscription } ) ){
            // publish 1, we expect ALL items to be in the data-change
            PublishHelper.WaitInterval( { Items: items, Subscription: subscription } );
            PublishHelper.Execute();
            if( Assert.True( PublishHelper.CurrentlyContainsData(), "Expected initial DataChange notification." ) ) {
                Assert.Equal( items.length, PublishHelper.CurrentDataChanges[0].MonitoredItems.length, "Publish.Response[1].NotificationMessage.NotificationData.MonitoredItems.length should have contained a value for ALL subscribed nodes, regardless of their attribute." );
            }
            // publish 2; either (a) keepAlive (b) item with the value attribute
            PublishHelper.WaitInterval( { Items: items, Subscription: subscription } );
            PublishHelper.Execute();
            if( PublishHelper.CurrentlyContainsData() ) {
                if( Assert.Equal( 1, PublishHelper.CurrentDataChanges[0].MonitoredItems.length, "Publish.Response[1].NotificationMessage.NotificationData.MonitoredItems.length should have contained either (a) a keep-alive, or (b) a value for the node subscribed to the Value attribute." ) ) {
                    // make sure the item is the one with the Value attribute
                    var nodeSought = null;
                    for( var i=0; i<items.length; i++ ) {
                        if( items[i].Attribute === Attribute.Value ) {
                            nodeSought = items[i];
                            break;
                        }
                    }
                    Assert.Equal( nodeSought.ClientHandle, PublishHelper.CurrentDataChanges[0].MonitoredItems[0].ClientHandle, "Publish.Response[1].NotificationMessage.NotificationData.MonitoredItems[0].ClientHandle is not the item that we subscribed to for monitoring the 'Value' attribute." );
                }
            }
            // clean-up
            DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: items, SubscriptionId: subscription } );
        }
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: subscription } );
    }
}

safelyInvoke( createMonitoredItems591034 ); 