include( "./library/Base/Objects/integerSet.js" );
include( "./library/Base/array.js" );
include( "./library/Base/safeInvoke.js" );

include( "./library/Base/SettingsUtilities/NodeIds.js" );
include( "./library/ServiceBased/SubscriptionServiceSet/SetPublishingMode/testParallelSubscriptions.js" );
include( "./library/ServiceBased/AttributeServiceSet/Write/write_attribute.js" );
include( "./library/ServiceBased/Helpers.js" );


const SUBSCRIPTION_PUBLISH_MIN_10_PUBLISHCALLCOUNT   = 10;   // how many times to call Publish() per session
const SUBSCRIPTION_PUBLISH_MIN_10_SESSIONCREATECOUNT = 5;    // how many sessions to create

if( !Test.Connect() ) {
    addError( "Session creation and activation failed, aborting testing of this conformance unit." );
    stopCurrentUnit();
}