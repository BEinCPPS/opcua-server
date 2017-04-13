print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Alternate Encoding'' TEST SCRIPTS COMPLETE ******\n" );

if( isDefined( defaultSubscription ) ) DeleteSubscriptionsHelper.Execute( { SubscriptionIds: defaultSubscription } );
Test.Disconnect();

print( "\n\n\n***** CONFORMANCE UNIT 'Monitor Alternate Encoding' TESTING COMPLETE ******\n" );