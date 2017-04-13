/*  Test 5.10.6 Error test 10 prepared by Development; compliance@opcfoundation.org
    Description: Specifies an empty subscriptionIds array. Expects "Bad_NothingToDo". */

function deleteSubscription5106err010() {
    return( DeleteSubscriptionsHelper.Execute( { ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: deleteSubscription5106err010 } );