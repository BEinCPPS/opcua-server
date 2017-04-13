/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Specifies a null nodes array for reading. */

function read581Err011() {
    return( ReadHelper.Execute( { NodesToRead: [], MaxAge: 100, TimestampsToReturn: TimestampsToReturn.Neither, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: read581Err011 } );