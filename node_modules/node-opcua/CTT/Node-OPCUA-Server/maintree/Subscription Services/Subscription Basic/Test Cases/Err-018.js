/*  Test 5.10.5 Error Test 1 prepared by Anand Taparia; ataparia@kepwaare.com
    Description: Script calls republish when no subscriptions have been created. */

function republish5105err001() {
    return( RepublishHelper.Execute( { SubscriptionId: { SubscriptionId: 1 }, RetransmitSequenceNumber: 1, ServiceResult: new ExpectedAndAcceptedResults( [ StatusCode.BadSubscriptionIdInvalid, StatusCode.BadMessageNotAvailable ] ) } ) );
}

Test.Execute( { Procedure: republish5105err001 } );