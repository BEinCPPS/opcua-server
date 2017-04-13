/*  Test 5.10.4 Error 1 prepared by Development: compliance@opcfoundation.org
    Description: Calls publish when no subscriptions exist. */

function publish5104Err001() {
    return( PublishHelper.Execute( { ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNoSubscription ) } ) );
}

Test.Execute( { Procedure: publish5104Err001 } );