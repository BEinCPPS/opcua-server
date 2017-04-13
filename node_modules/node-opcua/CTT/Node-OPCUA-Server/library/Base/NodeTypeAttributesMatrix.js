include( "./library/Base/array.js" );

function NodeTypeAttributesMatrix() {
    // BASE - Part 3, 5.2.1
    this.Base = [ Attribute.NodeId, Attribute.NodeClass, Attribute.BrowseName, Attribute.DisplayName ];
    this.Base_Types = [ BuiltInType.NodeId, BuiltInType.Int32, BuiltInType.QualifiedName, BuiltInType.LocalizedText ];
    this.Base_Optional = [ Attribute.Description, Attribute.WriteMask, Attribute.UserWriteMask ];
    this.Base_Optional_Types = [ BuiltInType.LocalizedText, BuiltInType.UInt32, BuiltInType.UInt32 ];

    // REFERENCETYPE - Part 3, 5.3.1
    this.ReferenceType = [ Attribute.IsAbstract, Attribute.Symmetric ].concat( this.Base );
    this.ReferenceType_Types = [ BuiltInType.Boolean, BuiltInType.Boolean ].concat( this.Base_Types );
    this.ReferenceType_Optional = [ Attribute.InverseName ].concat( this.Base_Optional );
    this.ReferenceType_Optional_Types = [ BuiltInType.LocalizedText ].concat( this.Base_Optional_Types );

    // VIEW - Part 3, 5.4
    this.View = [ Attribute.ContainsNoLoops, Attribute.EventNotifier ].concat( this.Base );
    this.View_Types = [ BuiltInType.Boolean, BuiltInType.Byte ].concat( this.Base_Types );
    this.View_Optional = this.Base_Optional;
    this.View_Optional_Types = this.Base_Optional_Types;

    // OBJECT - Part 3, 5.5.1
    this.Object = [ Attribute.EventNotifier ].concat( this.Base );
    this.Object_Types = [ BuiltInType.Byte ].concat( this.Base_Types );
    this.Object_Optional = this.Base_Optional;
    this.Object_Optional_Types = this.Base_Optional_Types;

    // OBJECTTYPE - Part 3, 5.5.2
    this.ObjectType = [ Attribute.IsAbstract ].concat( this.Base );
    this.ObjectType_Types = [ BuiltInType.Boolean ].concat( this.Base_Types );
    this.ObjectType_Optional = this.Base_Optional;
    this.ObjectType_Optional_Types = this.Base_Optional_Types;

    // VARIABLE - Part 3, 5.6.2
    this.Variable = [ Attribute.Value, Attribute.DataType, Attribute.ValueRank, Attribute.AccessLevel, Attribute.UserAccessLevel, Attribute.Historizing ].concat( this.Base );
    this.Variable_Types = [ BuiltInType.DataValue, BuiltInType.NodeId, BuiltInType.Int32, BuiltInType.Byte, BuiltInType.Byte, BuiltInType.Boolean ].concat( this.Base_Types );
    this.Variable_Optional = [ Attribute.ArrayDimensions, Attribute.MinimumSamplingInterval ].concat( this.Base_Optional );
    this.Variable_Optional_Types = [ BuiltInType.UInt32, BuiltInType.Double ].concat( this.Base_Optional_Types );

    // VARIABLETYPE - Part 3, 5.6.5
    this.VariableType = [ Attribute.DataType, Attribute.ValueRank, Attribute.IsAbstract ].concat( this.Base );
    this.VariableType_Types = [ BuiltInType.NodeId, BuiltInType.Int32, BuiltInType.Boolean ].concat( this.Base_Types );
    this.VariableType_Optional = [ Attribute.Value, Attribute.ArrayDimensions ].concat( this.Base_Optional );
    this.VariableType_Optional_Types = [ BuiltInType.Variant, BuiltInType.UInt32 ].concat( this.Base_Optional_Types );

    // METHOD - Part 3, 5.7
    this.Method = [ Attribute.Executable, Attribute.UserExecutable ].concat( this.Base );
    this.Method_Types = [ BuiltInType.Boolean, BuiltInType.Boolean ].concat( this.Base_Types );
    this.Method_Optional = this.Base_Optional;
    this.Method_Optional_Types = this.Base_Optional_Types;

    //DATATYPE
    this.DataType = [ Attribute.IsAbstract ].concat( this.Base );
    this.DataType_Types = [ BuiltInType.Boolean ].concat( this.Base_Types );
    this.DataType_Optional = this.Base_Optional;
    this.DataType_Optional_Types = this.Base_Optional_Types;
    
    
    //ALL - for initial querying
    this.All = [ Attribute.NodeId, Attribute.NodeClass, Attribute.BrowseName, Attribute.DisplayName, Attribute.Description, Attribute.WriteMask, Attribute.UserWriteMask, Attribute.IsAbstract, Attribute.Symmetric, Attribute.InverseName, Attribute.ContainsNoLoops, Attribute.EventNotifier, Attribute.Value, Attribute.DataType, Attribute.ValueRank, Attribute.ArrayDimensions, Attribute.AccessLevel, Attribute.UserAccessLevel, Attribute.MinimumSamplingInterval, Attribute.Historizing, Attribute.Executable, Attribute.UserExecutable ];

    this.AllExcept = function( AttributesToExclude ) { 
        var allAttributes = this.All;
        var i=0;
        while( AttributesToExclude.length > 0 ) {
            ArrayRemoveElement( allAttributes, AttributesToExclude.pop() );
        }//for i
        return( allAttributes );
    }
}