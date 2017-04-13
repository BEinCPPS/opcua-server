
include( "./library/Base/Objects/integerSet.js" );
include( "./library/Base/Objects/event.js" );
include( "./library/Base/safeInvoke.js" );
include( "./library/Base/array.js" );
include( "./library/Base/SettingsUtilities/NodeIds.js" );
include( "./library/ServiceBased/Helpers.js" );

var MonitorEventsSubscription = new Subscription();

if( !Test.Connect() ) stopCurrentUnit();
else if( !CreateSubscriptionHelper.Execute( { Subscription: MonitorEventsSubscription } ) ) stopCurrentUnit();