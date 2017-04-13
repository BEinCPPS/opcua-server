include( "./library/Base/safeInvoke.js" );

var CUVariables = new Object();

// this function is called by the AddNodes service to cache previously added nodeids
CUVariables.CacheAddedNodeIds = function() { 
    if( CUVariables.Debug ) print( "Caching NodeIds that were successfully added to address-space..." );
    if( AddNodeIdsHelper.Response.ResponseHeader.ServiceResult.isGood() ) {
        if( CUVariables.Debug ) print( "\tItems attempted: " + AddNodeIdsHelper.Response.Results.length );
        for( var i=0; i<AddNodeIdsHelper.Response.Results.length; i++ ) {
            if( AddNodeIdsHelper.Response.Results[i].StatusCode.isGood() ) CUVariables.AddedNodeIds.push( AddNodeIdsHelper.Response.Results[i].AddedNodeId );
        }
    }
}

// this function will remove previously added NodeId(s)
CUVariables.PostTestCleanup = function() {
    if( CUVariables.Debug ) print( "PostTestCleanup: Requested cleanup of " + CUVariables.AddedNodeIds.length + " NodeIds." );
    if( isDefined( CUVariables.AddedNodeIds ) && CUVariables.AddedNodeIds.length > 0 ) { 
        if( CUVariables.Debug ) print( "PostTestCleanup: Removing " + CUVariables.AddedNodeIds.length + " NodeIds." );
        var nodes = [];
        for( var i=0; i<CUVariables.AddedNodeIds.length; i++ ) nodes[i] = UaDeleteNodesItem.New( { NodeId: CUVariables.AddedNodeIds[i], DeleteTargetReferences: true } );
        DeleteNodeIdsHelper.Execute( { NodesToDelete: nodes, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ), Debug: CUVariables.Debug } );
    }
}

// Connect to the UA Server using default parameters (settings)
if( !Test.Connect() ) { addError( "Unable to connect to Server. Aborting tests." ); stopCurrentUnit(); }
else {
    // check the settings are configured for our attributes: 
    CUVariables.SupportedAttributes = NodeAttributesMask.fromSettings();
    if( CUVariables.SupportedAttributes.Value === 0 ) { 
        addSkipped( "Cannot conduct tests.\nNo attributes specified in Settings (/Server Test/NodeIds/NodeManagement).\nCannot test AddNodes if we cannot specify the Attributes for the Node." );
        stopCurrentUnit();
    }
    else {
        // prepare the variables needed for this conformance unit
        CUVariables.AddedNodeIds = [];
        CUVariables.Debug = true;
        AddNodeIdsHelper.PostServiceCallFunction = CUVariables.CacheAddedNodeIds;
        Test.PostTestFunctions[0] = CUVariables.PostTestCleanup;

        // reat the node-management settings and cache their values in the CUVariables for quick/easy reading
        CUVariables.RootNode = MonitoredItem.fromSettings( [ "/Server Test/NodeIds/NodeManagement/RootNode" ] )[0];
        if( !isDefined( CUVariables.RootNode ) ) {
            addSkipped( "Cannot conduct tests.\nRootNode not specified in Settings (/Server Test/NodeIds/NodeManagement/RootNode)" );
            stopCurrentUnit();
        }
        else {

            // store the supported references in our variables object
            // and also create useful helper functions to simplify scripting
            var sPath = "/Server Test/NodeIds/NodeManagement/SupportedReferences/";
            CUVariables.References = new Object();
            CUVariables.References = {
                Organizes:      readSetting( sPath + "Organizes" ) == 2 ? true : false,
                HasEventSource: readSetting( sPath + "HasEventSource" ) == 2 ? true : false,
                HasModellingRule: readSetting( sPath + "HasModellingRule" ) == 2 ? true : false,
                HasEncoding:    readSetting( sPath + "HasEncoding" ) == 2 ? true : false,
                HasDescription: readSetting( sPath + "HasDescription" ) == 2 ? true : false,
                HasTypeDefinition: readSetting( sPath + "HasTypeDefinition" ) == 2 ? true : false,
                GeneratesEvent: readSetting( sPath + "GeneratesEvent" ) == 2 ? true : false,
                AlwaysGeneratesEvent: readSetting( sPath + "AlwaysGeneratesEvent" ) == 2 ? true : false,
                HasSubtype: readSetting( sPath + "HasSubtype" ) == 2 ? true : false,
                HasProperty: readSetting( sPath + "HasProperty" ) == 2 ? true : false,
                HasComponent: readSetting( sPath + "HasComponent" ) == 2 ? true : false,
                HasNotifier: readSetting( sPath + "HasNotifier" ) == 2 ? true : false,
                FromState: readSetting( sPath + "FromState" ) == 2 ? true : false,
                HasCause: readSetting( sPath + "HasCause" ) == 2 ? true : false,
                HasEffect: readSetting( sPath + "HasEffect" ) == 2 ? true : false,
                HasSubStateMachine: readSetting( sPath + "HasSubStateMachine" ) == 2 ? true : false,
                HasHistoricalConfiguration: readSetting( sPath + "HasHistoricalConfiguration" ) == 2 ? true : false,
                HasTrueSubState: readSetting( sPath + "HasTrueSubState" ) == 2 ? true : false,
                HasFalseSubState: readSetting( sPath + "HasFalseSubState" ) == 2 ? true : false,
                HasCondition: readSetting( sPath + "HasCondition" ) == 2 ? true : false,
                SupportedReferences: function() {
                    var sr = [];
                    if( CUVariables.References.Organizes )        sr.push( UaNodeId( Identifier.Organizes ) );
                    if( CUVariables.References.HasEventSource )   sr.push( UaNodeId( Identifier.HasEventSource ) );
                    if( CUVariables.References.HasModellingRule ) sr.push( UaNodeId( Identifier.HasModellingRule ) );
                    if( CUVariables.References.HasEncoding )      sr.push( UaNodeId( Identifier.HasEncoding ) );
                    if( CUVariables.References.HasDescription )   sr.push( UaNodeId( Identifier.HasDescription ) );
                    if( CUVariables.References.HasTypeDefinition ) sr.push( UaNodeId( Identifier.HasTypeDefinition ) );
                    if( CUVariables.References.GeneratesEvent )    sr.push( UaNodeId( Identifier.GeneratesEvent ) );
                    if( CUVariables.References.AlwaysGeneratesEvent ) sr.push( UaNodeId( Identifier.AlwaysGeneratesEvent ) );
                    if( CUVariables.References.HasSubtype )   sr.push( UaNodeId( Identifier.HasSubtype ) );
                    if( CUVariables.References.HasProperty )  sr.push( UaNodeId( Identifier.HasProperty ) );
                    if( CUVariables.References.HasComponent ) sr.push( UaNodeId( Identifier.HasComponent ) );
                    if( CUVariables.References.HasNotifier )  sr.push( UaNodeId( Identifier.HasNotifier ) );
                    if( CUVariables.References.FromState )    sr.push( UaNodeId( Identifier.FromState ) );
                    if( CUVariables.References.HasCause )     sr.push( UaNodeId( Identifier.HasCause ) );
                    if( CUVariables.References.HasEffect )    sr.push( UaNodeId( Identifier.HasEffect ) );
                    if( CUVariables.References.HasSubStateMachine )         sr.push( UaNodeId( Identifier.HasSubStateMachine ) );
                    if( CUVariables.References.HasHistoricalConfiguration ) sr.push( UaNodeId( Identifier.HasHistoricalConfiguration ) );
                    if( CUVariables.References.HasTrueSubState )            sr.push( UaNodeId( Identifier.HasTrueSubState ) );
                    if( CUVariables.References.HasFalseSubState )           sr.push( UaNodeId( Identifier.HasFalseSubState ) );
                    if( CUVariables.References.HasCondition )               sr.push( UaNodeId( Identifier.HasCondition ) );
                    return( sr );
                    }
            };

            // store the supported nodeClasses, and provide some simple helper functions
            sPath = "/Server Test/NodeIds/NodeManagement/SupportedNodeClasses/";
            CUVariables.NodeClasses = new Object();
            CUVariables.NodeClasses = {
                DataType: readSetting( sPath + "DataType" ) == 2 ? true : false,
                Method:   readSetting( sPath + "Method" )   == 2 ? true : false,
                Object:   readSetting( sPath + "Object" )   == 2 ? true : false,
                ObjectType:    readSetting( sPath + "ObjectType" )    == 2 ? true : false,
                ReferenceType: readSetting( sPath + "ReferenceType" ) == 2 ? true : false,
                Variable:      readSetting( sPath + "Variable" )      == 2 ? true : false,
                VariableType:  readSetting( sPath + "VariableType" )  == 2 ? true : false,
                View: readSetting( sPath + "View" ) == 2 ? true : false,
                SupportedNodeClasses: function() {
                    var sn = [];
                    if( CUVariables.NodeClasses.DataType ) sn.push( NodeClass.DataType );
                    if( CUVariables.NodeClasses.Method ) sn.push( NodeClass.Method );
                    if( CUVariables.NodeClasses.Object ) sn.push( NodeClass.Object );
                    if( CUVariables.NodeClasses.ObjectType ) sn.push( NodeClass.ObjectType );
                    if( CUVariables.NodeClasses.ReferenceType ) sn.push( NodeClass.ReferenceType );
                    if( CUVariables.NodeClasses.Variable ) sn.push( NodeClass.Variable );
                    if( CUVariables.NodeClasses.VariableType ) sn.push( NodeClass.VariableType );
                    if( CUVariables.NodeClasses.View ) sn.push( NodeClass.View );
                    return( sn );
                }
            };
        };

        // a simple function used for creating new and UNIQUE nodeIds, if supported. This function uses ALL of the 
        // settings that define just HOW a NodeId should be defined.
        CUVariables.RequestedNewNodeId = function( args ) { 
            var n = new UaNodeId();
            if( (readSetting( "/Server Test/NodeIds/NodeManagement/RequestedNodeId" ) == 2 ) || ( isDefined( args ) && isDefined( args.Force ) && args.Force === true ) ) {
                // namespace
                if( isDefined( args ) && isDefined( args.NamespaceIndex ) ) n.NamespaceIndex = args.NamespaceIndex;
                else n.NamespaceIndex = parseInt( readSetting( "/Server Test/NodeIds/NodeManagement/RequestedNodeId_Namespace" ) );
                // see if string is supported 
                if( readSetting( "/Server Test/NodeIds/NodeManagement/RequestedNodeId_IdString" ) == 2 ) {
                    if( !isDefined( CUVariables._NodeIdS ) ) CUVariables._NodeIdS = 1;
                    n.setIdentifierString( "string" + "".toString().padDigits( parseInt( CUVariables._NodeIdS++ ), 3 ) );
                }
                // otherwise try guid
                else if( readSetting( "/Server Test/NodeIds/NodeManagement/RequestedNodeId_IdGuid" ) == 2 ) {
                    if( !isDefined( CUVariables._NodeIdG ) ) CUVariables._NodeIdG = 1;
                    n.setIdentifierGuid( UaGuid.fromString( "0000000-0000-0000-0000-" + "".toString().padDigits( parseInt( CUVariables._NodeIdG++ ), 12 ) ) );
                }
                // otherwise default to numeric
                else {
                    if( !isDefined( CUVariables._NodeIdI ) ) CUVariables._NodeIdI = 1;
                    n.setIdentifierNumeric( CUVariables._NodeIdI++ );
                }
            }
            return( n );
        };
    }
}