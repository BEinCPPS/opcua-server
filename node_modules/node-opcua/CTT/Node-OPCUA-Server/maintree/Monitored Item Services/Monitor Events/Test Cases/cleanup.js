print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Events' TEST SCRIPTS COMPLETE ******\n" );

DeleteSubscriptionsHelper.Execute( { SubscriptionIds: MonitorEventsSubscription } );
Test.Disconnect();

print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Events' TESTING COMPLETE ******\n" );