/*  Test 5.10.6 Test 1 prepared by Development; compliance@opcfoundation.org
    Description: Deletes a single subscription. */

function deleteSubscription5106001() {
    basicSubscription1 = new Subscription();
    if( CreateSubscriptionHelper.Execute( { Subscription: basicSubscription1 } ) ) {
        DeleteSubscriptionsHelper.Execute( { SubscriptionIds: basicSubscription1 } );
    }
    //clean-up
    basicSubscription1 = null;
    return( true );
}

Test.Execute( { Procedure: deleteSubscription5106001 } );