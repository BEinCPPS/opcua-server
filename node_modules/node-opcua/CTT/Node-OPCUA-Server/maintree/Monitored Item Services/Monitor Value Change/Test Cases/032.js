/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Script creates a MonitoredItem of type StringArray with IndexRange of “1,2”. */

function createMonitoredItems591059() {
    var item = MonitoredItem.fromSetting( "/Server Test/NodeIds/Static/All Profiles/Arrays/String" );
    if( !isDefined( item ) ) {
        addSkipped( "String array not defined in settings. Aborting test." );
        return( false );
    }

    // get the raw array values first
    ReadHelper.Execute( { NodesToRead: item } );
    var rawValue = item.Value.Value.toStringArray();
    print( "raw value: " + rawValue.toString() );

    // calculate the expected value for the specified indexrange.
    item.IndexRange = "1,2"; 
    var expectedValue = GetStringsAtIndexRange( rawValue, item.IndexRange );

    // create the monitored item and then compare the value in Publish matches expectations
    if( CreateMonitoredItemsHelper.Execute( { ItemsToCreate: item, TimestampsToReturn: TimestampsToReturn.Server, SubscriptionId: MonitorBasicSubscription } ) ) {
        PublishHelper.WaitInterval( { Items: item, Subscription: MonitorBasicSubscription } );
        PublishHelper.Execute( { FirstPublish: true } );

        if( Assert.True( PublishHelper.CurrentlyContainsData(), "Publish() expected to receive the initial value dataChange notification." ) ) {
            // compare value received vs. value expected
            var valueReceived = PublishHelper.CurrentDataChanges[0].MonitoredItems[0].Value.Value.toStringArray();
            Assert.Equal( expectedValue.length, valueReceived.length, "Publish() received a value where the array-length did not match the expected length." );
            Assert.Equal( expectedValue[0], valueReceived[0], "Publish() returned a value for the indexRange '" + item.IndexRange + "' that did not match expectations.\n", "Publish() returned expected value for IndexRange '" + item.IndexRange + "' expected: '" + expectedValue[0] + "'; received: '" + valueReceived[0] + "'." );
        }
        // clean-up
        DeleteMonitoredItemsHelper.Execute( { ItemsToDelete: item, SubscriptionId: MonitorBasicSubscription } );
    }
    return( true );
}// function createMonitoredItems591059()

Test.Execute( { Procedure: createMonitoredItems591059 } );