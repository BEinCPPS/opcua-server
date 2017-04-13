function deleteNodesTest() {
    // delete the specified node (expected to fail since we don't actually know a NodeId to specify 
    result = DeleteNodeIdsHelper.Execute( { 
        NodesToDelete: [
            UaDeleteNodesItem.New( { NodeId: UaNodeId.fromString( "n2=2;i=14" ), DeleteTargetReferences: false } ), 
            UaDeleteNodesItem.New( { NodeId: UaNodeId.fromString( "ns=2;i=15" ), DeleteTargetReferences: false } ) ],
        ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) 
        } );

    return( result );
}

deleteNodesTest(); //Test.Execute( { Procedure: deleteNodesTest } );