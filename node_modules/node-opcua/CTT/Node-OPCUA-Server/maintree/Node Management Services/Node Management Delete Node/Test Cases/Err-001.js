/*  Test prepared by Development; compliance@opcfoundation.org
    Description: empty request. Expects BadNothingToDo. */

function deleteNodesTest() {
    return( DeleteNodeIdsHelper.Execute( { 
                Debug: CUVariables.Debug,
                ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: deleteNodesTest } );