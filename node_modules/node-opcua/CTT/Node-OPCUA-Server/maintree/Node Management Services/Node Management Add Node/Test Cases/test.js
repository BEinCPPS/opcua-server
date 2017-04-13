include( "./library/ServiceBased/NodeManagementServiceSet/AddNodes.js" );

// opc.tcp://wincc01:4855
// christian.autrand@siemens.com
function addNodesTest() {
    // create an instance of our AddNodes helper object
    var AddNodesHelper = new AddNodesService( Test.Session );

    // add a folder
    var callParameters = { 
        Debug: true,
        NodesToAdd: [
                UaAddNodesItem.New( { 
                        BrowseName: "folder1", 
                        //RequestedNewNodeId: UaNodeId.fromString( "ns=2;i=1000" ),
                        NodeAttributes: UaObjectAttributes.New( {
                                            Description: "My New Folder Description",
                                            DisplayName: "My New Folder",
                                            SpecifiedAttributes: Constants.Int32_Max,
                                            UserWriteMask: 0,
                                            WriteMask: 0,
                                            ToExtensionObject: true } ),
                        ParentNodeId: UaNodeId.fromString( "ns=2;i=12" ), 
                        TypeDefinition:  new UaNodeId( Identifier.FolderType ), 
                        ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                        NodeClass: NodeClass.Object } )
            ],
        OperationResults: [ new ExpectedAndAcceptedResults( StatusCode.Good ) ],
        ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) };

    var result = AddNodesHelper.Execute( callParameters );
    var addedFolderId = AddNodesHelper.Response.Results[0].AddedNodeId;


    // add a variable
    callParameters = { 
        Debug: true,
        NodesToAdd: [
                UaAddNodesItem.New( { 
                        BrowseName: "variable1", 
                        //RequestedNewNodeId: UaNodeId.fromString( "ns=2;i=1000" ),
                        NodeAttributes: UaVariableAttributes.New( {
                                AccessLevel: AccessLevel.CurrentReadOrWrite | AccessLevel.HistoryReadOrWrite,
                                DataType: new UaNodeId( Identifier.Int16 ),
                                Description: "My int16 test node",
                                DisplayName: "Int16",
                                Historizing: false,
                                MinimumSamplingInterval: 100,
                                SpecifiedAttributes: Constants.Int32_Max,
                                UserAccessLevel: AccessLevel.CurrentReadOrWrite | AccessLevel.HistoryReadOrWrite,
                                UserWriteMask: 0,
                                Value: UaVariant.New( { Value: 16, Type: BuiltInType.Int16 } ),
                                ValueRank: ValueRank.Scalar,
                                WriteMask: 0,
                                ToExtensionObject: true } ), 
                        TypeDefinition:  new UaNodeId( Identifier.VariableNode ), 
                        ReferenceTypeId: new UaNodeId( Identifier.Organizes ), 
                        NodeClass: NodeClass.Variable } )
            ],
        OperationResults: [ new ExpectedAndAcceptedResults( StatusCode.Good ) ],
        ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) };

    var result = AddNodesHelper.Execute( callParameters );
    var addedVariableId = AddNodesHelper.Response.Results[0].AddedNodeId;


    print( "Created the following nodes in the address space: " );
    print( "\tFOLDER: " + addedFolderId.toString() );
    print( "\tVARIABLE: " + addedVariableId.toString() );


    return( result );
}

addNodesTest();// Test.Execute( { Procedure: addNodesTest } );