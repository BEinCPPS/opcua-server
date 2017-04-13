/*  Test 5.10.6 Error test 1 prepared by Development; compiance@opcfoundation.org
    Description: Specifies an invalid subscriptionId. */

function deleteSubscription5106err001()
{
    basicSubscription1 = new Subscription();
    CreateSubscriptionHelper.Execute( { Subscription: basicSubscription1 } );

    var deleteSubscriptionRequest = new UaDeleteSubscriptionsRequest();
    var deleteSubscriptionResponse = new UaDeleteSubscriptionsResponse();
    Test.Session.Session.buildRequestHeader( deleteSubscriptionRequest.RequestHeader );

    deleteSubscriptionRequest.SubscriptionIds[0] = basicSubscription1.SubscriptionId + 0x1234;

    var uaStatus = Test.Session.Session.deleteSubscriptions( deleteSubscriptionRequest, deleteSubscriptionResponse );
    if( uaStatus.isGood() )
    {
        // this is an array of ExpectedAndAcceptedResult. Size of the array = number of SubscriptionIds
        var ExpectedOperationResultsArray = [ new ExpectedAndAcceptedResults( StatusCode.BadSubscriptionIdInvalid ) ];
        checkDeleteSubscriptionsError( deleteSubscriptionRequest, deleteSubscriptionResponse, ExpectedOperationResultsArray );
    }
    else
    {
        addError( "deleteSubscriptions() returned bad status: " + uaStatus, uaStatus );
    }

    // delete subscription added above
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: basicSubscription1 } );
    // clean-up
    basicSubscription1 = null;
    return( true );
}

Test.Execute( { Procedure: deleteSubscription5106err001 } );