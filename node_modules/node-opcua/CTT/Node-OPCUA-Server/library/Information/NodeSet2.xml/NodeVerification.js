include( "./library/ServiceBased/Helpers.js" );
include( "./library/Base/Objects/keyPairCollection.js" );


/* Checks the attributes of a named item:
    args.Item: an item to check */ 
function CheckAttributes( args ) {
    var result = true;
    var expectedResults = [];
    var itemsToRead = [];
    var msg = "Testing BrowseName: " + args.Item.BrowseName + "; Attributes on NodeId: " + args.Item.NodeId + "; comply with '" + args.Item.Type + "' definition. Attributes include: ";
    for( a in args.Item ) {
        if( a === "Type" || a === "References" || a === "SymbolicName" || a === "ParentNodeId" ) continue;
        msg += a + " ";
        var mClone = MonitoredItem.Clone( args.Item );
        mClone.AttributeId = Attribute.fromString( a );
        itemsToRead.push( mClone );
        var expectedResult = new ExpectedAndAcceptedResults( StatusCode.Good );
        expectedResult.addAcceptedResult( [ StatusCode.UncertainInitialValue, StatusCode.BadNotReadable ] );
        expectedResults.push( expectedResult );
    }//for a=... (a = attributes)
    addLog( msg );

    // Read all of the attributes
    return( args.ReadHelper.Execute( {
            NodesToRead: itemsToRead, 
            TimestampsToReturn: TimestampsToReturn.Both, 
            MaxAge: 0, 
            OperationResults: expectedResults, 
            SuppressMessaging: true } ) );
}// function CheckAttributes( args ) 


/* Simple function that checks the references for an item.
    args.Item : the item to check */
function CheckReferences( args ) { 
    var result = true;
    if( isDefined( args.Item.References ) && args.Item.References.length > 0 ) {
        args.Item.BrowseDirection = BrowseDirection.Forward;
        args.Item.IncludeSubtypes = true;
        args.Item.NodeClass = NodeClass.Unspecified;
        args.Item.ReferenceTypeId = new UaNodeId( Identifier.References );
        args.Item.ResultMask = BrowseResultMask.All;
        args.BrowseHelper.Execute( { 
                NodesToBrowse: args.Item,
                OperationResults: new ExpectedAndAcceptedResults( StatusCode.Good ),
                SuppressMessaging: true
                } );
        // do we need to follow references? this will check for structures
        if( isDefined( args.Follow ) && isDefined( args.NodeSet ) ) {
            for( r in args.Item.References ) {
                var currRef = args.Item.References[r];
                print( "\tTODO: check ref: " + currRef.ReferenceTypeId + "; NodeId: " + currRef.NodeId );
                var itemInNodeSet = args.NodeSet[currRef.NodeId];
                if( !isDefined( itemInNodeSet ) ) addError( "Reference definition not found. Sought NodeId: '" + currRef.NodeId + "'; ReferenceTypeId: '" + currRef.ReferenceTypeId + "'." );
                else {
                    print( "check the attribs and refs of nodeId '" + currRef.NodeId + "'; ReferenceTypeId: '" + currRef.ReferenceTypeId + "'." );
                }
            }
        }
    }
    else {
        print( "No references on item: " + args.Item.BrowseName + " (NodeId: " + args.Item.NodeId + ")" );
    }
    return( result );
}// function CheckReferences( args ) 


/* Simple wrapper function that checks the attributes, and then the references, on a named item.
    args.Item : the item whose references need checking.
    args.ReadHelper: instance of the ReadService helper object
    args.BrowseHelper: instance of the BrowseService helper object */
function CheckNodeDefinition( args ) { 
    // check inbound parameters first
    if( !isDefined( args.Item ) ) throw( "args.Item not specified." );
    if( !isDefined( args.ReadHelper ) ) throw( "Args.ReadHelper not specified." );
    if( !isDefined( args.BrowseHelper ) ) throw( "Args.BrowseHelper not specified." );
    // now to validate the item
    var result = false;
    if( !isDefined( args.Item.NodeId.NamespaceIndex ) ) args.Item.NodeId = UaNodeId.fromString( args.Item.NodeId );
    if( ( result = CheckAttributes( args ) ) ) {
        return( CheckReferences( args ) );
    }
    return( result );
}// function CheckNodeDefinition( args )