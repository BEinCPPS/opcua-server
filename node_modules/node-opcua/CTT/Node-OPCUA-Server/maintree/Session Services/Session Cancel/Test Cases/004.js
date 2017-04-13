/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Call cancel with an unknown request handle */

function cancel564004() {
    return( CancelHelper.Execute( { RequestHandle: 0x1234, ServiceResult: new ExpectedAndAcceptedResults( [ StatusCode.Good, StatusCode.BadNothingToDo ] ) } ) );
}

Test.Execute( { Procedure: cancel564004 } );