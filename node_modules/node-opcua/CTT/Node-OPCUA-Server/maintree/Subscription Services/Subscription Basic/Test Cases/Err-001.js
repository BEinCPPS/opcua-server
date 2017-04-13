/*  Test 5.10.1 Error test 1 prepared by Development; compliance@opcfoundation.org
    Description: Create a subscription where the requested publishing interval is a negative number. */

function createSubscription5101Err001() {
    const NEGATIVE_PUBLISHING_INTERVAL = -12.34;
    var subscription = new Subscription( NEGATIVE_PUBLISHING_INTERVAL, true, 15, 5, 0, 0 );
    if( CreateSubscriptionHelper.Execute( { Subscription: subscription } ) )     {
        Assert.NotEqual( NEGATIVE_PUBLISHING_INTERVAL, subscription.RevisedPublishingInterval, "Server expected to revise PublishingInterval from " + NEGATIVE_PUBLISHING_INTERVAL );
    }
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: subscription } );
    return( true );
}

Test.Execute( { Procedure: createSubscription5101Err001 } );