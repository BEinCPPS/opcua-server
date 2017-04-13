print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Basic' TEST SCRIPTS COMPLETE ******\n" );

if( isDefined( MonitorBasicSubscription ) ) DeleteSubscriptionsHelper.Execute( { SubscriptionIds: MonitorBasicSubscription } );
Test.Disconnect();
Test.PostTestFunctions = [];

print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Basic' TESTING COMPLETE ******\n" );