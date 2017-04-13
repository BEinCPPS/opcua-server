/*  Test prepared by Development; compliance@opcfoundation.org
    Description: add a node using typical parameters. Then add it again: BadNodeIdExists */

function addNodesTest() {
    // add a variable and specify all attributes that are currently listed as supported (in settings)
    var parameters = { 
        Debug: CUVariables.Debug,
        NodesToAdd: [
                UaAddNodesItem.New( { 
                        BrowseName: BrowseName.New( { NodeClass: NodeClass.Variable } ),
                        RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                        NodeAttributes: UaVariableAttributes.New( {
                                AccessLevel: AccessLevel.CurrentReadOrWrite, 
                                DataType: new UaNodeId( BuiltInType.Double ),
                                Description: "My test variable",
                                DisplayName: "variable_double",
                                Historizing: false,
                                MinimumSamplingInterval: 100,
                                SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                UserAccessLevel: AccessLevel.CurrentReadOrWrite, 
                                UserWriteMask: 0,
                                Value: UaVariant.New( { Value: 16.1234, Type: BuiltInType.Double} ),
                                ValueRank: ValueRank.Scalar,
                                WriteMask: 0,
                                ToExtensionObject: true } ), 
                        ParentNodeId: CUVariables.RootNode.NodeId, 
                        TypeDefinition:  new UaNodeId( Identifier.BaseDataVariableType ), 
                        ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                        NodeClass: NodeClass.Variable } )
            ],
        OperationResults: [ new ExpectedAndAcceptedResults( StatusCode.Good ) ],
        ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) };

    // add the node
    var result = AddNodeIdsHelper.Execute( parameters );

    // add the EXACT SAME node again, but expect a fail; vary the BrowseName 
    if( result ) {
        parameters.NodesToAdd[0].BrowseName.Name = BrowseName.New( { NodeClass: NodeClass.Variable } );
        parameters.OperationResults[0] = new ExpectedAndAcceptedResults( StatusCode.BadNodeIdExists );

        if( !AddNodeIdsHelper.Execute( parameters ) ) result = false;
    }

    return( result );
}

Test.Execute( { Procedure: addNodesTest } );