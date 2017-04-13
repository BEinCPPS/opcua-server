/*  Test 5.10.6-Err-011 prepared by Nathan Pocock; nathan.pocock@opcfoundation.org
    Description:
        Script creates more Subscriptions than a server can handle.
        Expects to receive Bad_TooManyOperations when creating that subscription that is beyond the server's ability. */

function deleteSubsription5106err011() {
    // does the server impose a restriction or not? if not then lets arbitrarily try 1000 subscriptions
    var maxSubscriptions = ( gServerCapabilities.MaxSupportedSubscriptions === 0 ? 1000 : gServerCapabilities.MaxSupportedSubscriptions + 10 );

    // first, create more subscriptions than the server claims to support
    var subscriptions = [];

    var serviceResult = new ExpectedAndAcceptedResults( [ StatusCode.Good, StatusCode.BadTooManySubscriptions, StatusCode.BadTooManyOperations ] );
    // the test: invoke the createSubscriptions call
    for( var s=0; s<maxSubscriptions; s++ ) { 
        var sub = new Subscription();
        if( CreateSubscriptionHelper.Execute( { Subscription: sub, ServiceResult: serviceResult } ) ) {
            // did it fail? 
            if( CreateSubscriptionHelper.Response.ResponseHeader.ServiceResult.isBad() ) {
                addLog( "CreateSubscription() failed gracefully." );
                break;
            }
            else subscriptions.push( sub );
        }
    }

    if( !subscriptions.length > gServerCapabilities.MaxSupportedSubscriptions ) addLog( "Server supports more subscriptions than it currently advertises, or does not impose a limit on the number of subscriptions." );
    else if( subscriptions.length < gServerCapabilities.MaxSupportedSubscriptions ) addError( "Server does not support as many subscriptions as configured. Expected: " + gServerCapabilities.MaxSupportedSubscriptions + "; Actual: " + subscriptions.length );

    // lastly, try to delete the subscriptions, and allow for this call to fail also 
    DeleteSubscriptionsHelper.Execute( { SubscriptionIds: subscriptions, ServiceResult: serviceResult } );

    PublishHelper.Clear();
    return( true );
}

Test.Execute( { Procedure: deleteSubsription5106err011 } );