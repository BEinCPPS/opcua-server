print( "\n\n\n***** CONFORMANCE UNIT 'Data Access PercentDeadband' TEST SCRIPTS COMPLETE ******\n" );

if( isDefined( MonitorBasicSubscription ) ) DeleteSubscriptionsHelper.Execute( { SubscriptionIds: MonitorBasicSubscription } );
Test.Disconnect();

print( "\n\n\n***** CONFORMANCE UNIT 'Data Access PercentDeadband' TESTING COMPLETE ******\n" );