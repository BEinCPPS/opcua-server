/*  Test 5.10.3 Error test case 5 prepared by Development; compliance@opcfoundation.org
    Description: Tries to enable publishing for multiple invalid subscriptions. */

function setPublishingMode5103Err005()
{
    var subscriptions = [ new Subscription( null, false ), new Subscription( null, false ) ];
    if( !Assert.Equal( true, CreateSubscriptionHelper.Execute( { 
                Subscription: subscriptions[0] } ) ) )
    {
        return( false );
    }
    if( !Assert.Equal( true, CreateSubscriptionHelper.Execute( { 
                Subscription: subscriptions[1] } ) ) )
    {
        return( false );
    }

    // break the subscriptionIds, we'll correct them when we delete the subscriptions
    subscriptions[0].SubscriptionId += 0x1234;
    subscriptions[1].SubscriptionId += 0x1234;

    // this is an array of ExpectedAndAcceptedResult. Size of the array = number of SubscriptionIds
    var expectedResults = [];
    expectedResults[0] = new ExpectedAndAcceptedResults( StatusCode.BadSubscriptionIdInvalid );
    expectedResults[1] = new ExpectedAndAcceptedResults( StatusCode.BadSubscriptionIdInvalid );

    SetPublishingModeHelper.Execute( { 
                SubscriptionIds: subscriptions, 
                PublishingEnabled: true, 
                OperationResults: expectedResults } );

    // delete all subscriptions added above, but correct the subscriptionIds first
    subscriptions[0].SubscriptionId -= 0x1234;
    subscriptions[1].SubscriptionId -= 0x1234;
    DeleteSubscriptionsHelper.Execute( { 
                SubscriptionIds: subscriptions[0] } );
    DeleteSubscriptionsHelper.Execute( { 
                SubscriptionIds: subscriptions[1] } );
    return( true );
}

Test.Execute( { Procedure: setPublishingMode5103Err005 } );