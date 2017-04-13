include( "./library/Base/Objects/integerSet.js" );
include( "./library/Base/Objects/event.js" );
include( "./library/Base/array.js" );
include( "./library/Base/safeInvoke.js" );
include( "./library/Base/SettingsUtilities/NodeIds.js" );

include( "./library/ServiceBased/MonitoredItemServiceSet/CreateMonitoredItems/basicCreateMonitoredItemsTest.js" );
include( "./library/ServiceBased/AttributeServiceSet/Write/write_attribute.js" );

const DISCARDOLDEST_TRUE = true;
const DISCARDOLDEST_FALSE = false;
const OVERFLOWBIT = 0x480;

MonitorQueueSize1Subscription = new Subscription();
if( !Test.Connect() ) stopCurrentUnit();
else {
    // create a subscription that can be used for all tests in this conformance unit
    MonitorQueueSize1Subscription.MaxKeepAliveCount = 15;
    MonitorQueueSize1Subscription.LifetimeCount = 200; // 100 * 200 = 20 second lifetime
    if( !CreateSubscriptionHelper.Execute( { Subscription: MonitorQueueSize1Subscription } ) ) { 
        stopCurrentUnit();
    }
    else Test.PreTestFunctions.push( clearPublish );
}

// after each test, lets Reset the PublishHelper
function clearPublish() {
    print( "\n\nPublish Clear - After Test\n" );
    PublishHelper.Execute( { AckAllAvailableSequenceNumbers: true, SkipValidation: true } );
    PublishHelper.Clear();
}