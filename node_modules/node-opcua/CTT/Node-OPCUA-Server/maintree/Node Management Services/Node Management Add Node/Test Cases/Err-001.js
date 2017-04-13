/*  Test prepared by Development; compliance@opcfoundation.org
    Description: add a node but do not specify any properties. */

function addNodesTest() {
    return( AddNodeIdsHelper.Execute( { 
                Debug: CUVariables.Debug,
                ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } ) );
}

Test.Execute( { Procedure: addNodesTest } );