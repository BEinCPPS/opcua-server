/*  Test prepared by Development; compliance@opcfoundation.org
    Description: add a node using typical parameters. */

function addNodesTest() {
    var result = true;

    // we will add nodes of each nodeClass as defined in the settings
    var supportedNodeClasses = CUVariables.NodeClasses.SupportedNodeClasses();
    var serviceResult = new ExpectedAndAcceptedResults( StatusCode.Good );
    var operationResults = [ new ExpectedAndAcceptedResults( StatusCode.Good ) ];

    for( var i=0; i<supportedNodeClasses.length; i++ ) {
        var parameters = null;

        // craft our node depending on the node class
        switch( supportedNodeClasses[i] ) { 



            case NodeClass.DataType: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.FolderType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.DataType,
                                    NodeAttributes: UaDataTypeAttributes.New( {
                                                    Description: "CTTTest-DataType-" + "".toString().padDigits( i, 3 ),
                                                    DisplayName: "DataType" + "".toString().padDigits( i, 3 ),
                                                    IsAbstract: false,
                                                    SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                                    UserWriteMask: 0,
                                                    WriteMask: 0,
                                                    ToExtensionObject: true } ) } ) ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//data type



            case NodeClass.Method: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.MethodNode ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.MethodNode ), 
                                    NodeClass: NodeClass.Method,
                                    NodeAttributes: UaMethodAttributes.New( {
                                                    Description: "CTTTest-Method-" + "".toString().padDigits( i, 3 ),
                                                    DisplayName: "Method" + "".toString().padDigits( i, 3 ),
                                                    Executable: false,
                                                    SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                                    UserExecutable: false,
                                                    UserWriteMask: 0,
                                                    WriteMask: 0,
                                                    ToExtensionObject: true } ) } ) ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                    break;
                }//method



            case NodeClass.Object: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.FolderType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.Object,
                                    NodeAttributes: UaObjectAttributes.New( {
                                                    Description: "CTTTest-Object-" + "".toString().padDigits( i, 3 ),
                                                    DisplayName: "Object" + "".toString().padDigits( i, 3 ),
                                                    SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                                    UserWriteMask: 0,
                                                    WriteMask: 0,
                                                    ToExtensionObject: true } ) } ) ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//object



            case NodeClass.ObjectType: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.FolderType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.ObjectType,
                                    NodeAttributes: UaObjectAttributes.New( {
                                                    Description: "CTTTest-ObjectType-" + "".toString().padDigits( i, 3 ),
                                                    DisplayName: "ObjectType" + "".toString().padDigits( i, 3 ),
                                                    IsAbstract: false,
                                                    SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                                    UserWriteMask: 0,
                                                    WriteMask: 0,
                                                    ToExtensionObject: true } ) } ) ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//object type



            case NodeClass.ReferenceType: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.FolderType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.ReferenceType,
                                    NodeAttributes: UaReferenceTypeAttributes.New( {
                                                    Description: "CTTTest-ReferenceType-" + "".toString().padDigits( i, 3 ),
                                                    DisplayName: "ReferenceType" + "".toString().padDigits( i, 3 ),
                                                    InverseName: "eptYecnerefeR",
                                                    IsAbstract: false,
                                                    SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                                    UserWriteMask: 0,
                                                    WriteMask: 0,
                                                    ToExtensionObject: true } ) } ) ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }// reference type



            case NodeClass.Variable: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    NodeAttributes: UaVariableAttributes.New( {
                                            AccessLevel: AccessLevel.CurrentReadOrWrite, 
                                            BrowseName: BrowseName.New( { NodeClass: NodeClass.Variable } ),
                                            DataType: new UaNodeId( BuiltInType.Double ),
                                            Description: "CTTTest-Variable-" + "".toString().padDigits( i, 3 ),
                                            DisplayName: "Variable" + "".toString().padDigits( i, 3 ),
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
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//variable



            case NodeClass.VariableType: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    NodeAttributes: UaVariableTypeAttributes.New( {
                                            ArrayDimensions: 0, 
                                            BrowseName: BrowseName.New( { NodeClass: NodeClass.VariableType } ),
                                            DataType: new UaNodeId( BuiltInType.Double ),
                                            Description: "CTTTest-VariableType-" + "".toString().padDigits( i, 3 ),
                                            DisplayName: "VariableType" + "".toString().padDigits( i, 3 ),
                                            IsAbstract: false,
                                            SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                            UserWriteMask: 0,
                                            Value: UaVariant.New( { Value: 16.1234, Type: BuiltInType.Double} ),
                                            ValueRank: ValueRank.Scalar,
                                            WriteMask: 0,
                                            ToExtensionObject: true } ), 
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.BaseDataVariableType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.VariableType } )
                        ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//variable type



            case NodeClass.View: {
                parameters = { 
                    Debug: CUVariables.Debug,
                    NodesToAdd: [
                            UaAddNodesItem.New( { 
                                    BrowseName: BrowseName.New( { NodeClass: supportedNodeClasses[i] } ),
                                    RequestedNewNodeId: CUVariables.RequestedNewNodeId(),
                                    NodeAttributes: UaViewAttributes.New( {
                                            ContainsNoLoops: true,
                                            Description: "CTTTest-VIEW-" + "".toString().padDigits( i, 3 ),
                                            DisplayName: "View" + "".toString().padDigits( i, 3 ),
                                            EventNotifier: false,
                                            SpecifiedAttributes: CUVariables.SupportedAttributes.Value,
                                            UserWriteMask: 0,
                                            WriteMask: 0,
                                            ToExtensionObject: true } ), 
                                    ParentNodeId: CUVariables.RootNode.NodeId, 
                                    TypeDefinition:  new UaNodeId( Identifier.BaseDataVariableType ), 
                                    ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                                    NodeClass: NodeClass.View } )
                        ],
                        OperationResults: operationResults,
                        ServiceResult: serviceResult };
                break;
                }//view
        }

        // go ahead and try to add the node; record the failed attempt
        var callResult = AddNodeIdsHelper.Execute( parameters );
        if( !callResult ) result = false;
        addLog( "NodeClass: " + NodeClass.toString( supportedNodeClasses[i] ) + " result: " + callResult );

    }// for i...
    
    return( result );
}

Test.Execute( { Procedure: addNodesTest } );