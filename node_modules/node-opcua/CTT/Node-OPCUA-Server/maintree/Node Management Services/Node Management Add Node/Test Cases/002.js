/*  Test prepared by Development; compliance@opcfoundation.org
    Description: add a node varying the browseName and reference type. */

function addNodesTest() {
    var result = false;

    // we will add nodes of type Variable, but each will have a different reference type as defined
    // in the settings
    var supportedRefs = CUVariables.References.SupportedReferences();
    for( var i=0; i<supportedRefs.length; i++ ) {

        // define the parameters for the AddNodes call
        var parameters = { 
            Debug: CUVariables.Debug,
            NodesToAdd: [
                    UaAddNodesItem.New( { 
                            BrowseName: BrowseName.New( { NodeClass: NodeClass.Variable } ),
                            RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                            NodeAttributes: UaVariableAttributes.New( {
                                    AccessLevel: AccessLevel.CurrentReadOrWrite, 
                                    BrowseName: BrowseName.New( { NodeClass: NodeClass.Variable } ),
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
                            ReferenceTypeId: supportedRefs[i], 
                            NodeClass: NodeClass.Variable } )
                ],
            OperationResults: [ new ExpectedAndAcceptedResults( StatusCode.Good ) ],
            ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) };

        var result = AddNodeIdsHelper.Execute( parameters );

    }// for i..
    return( result );
}

Test.Execute( { Procedure: addNodesTest } );