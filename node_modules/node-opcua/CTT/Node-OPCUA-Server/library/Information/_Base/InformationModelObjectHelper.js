/*  Base class for defining an object for use with information model checking.

    Revision History:
        25-May-2011 NP: Initial version.
*/

const ARRAY    = true;
const NOTARRAY = false;
const REQUIRED = true;
const OPTIONAL = false;

/*  Base InformationModel object class. Used for InformationModel testing.

    Revision History:
        25-May-2011 NP: Initial version.
*/
function IM() {
    this.Name = "";
    this.References = [];
    this.toString = function() {
        var s = this.Name + "; References size: " + this.References.length;
        for( r=0; r<this.References.length; r++ ) {
            s += "\n" + (1 + r) + ". " + this.References[r].toString();
        }
        return( s );
    }

    // Returns a FLAT list of ALL references, including those on any nested types.
    this.GetFlatAllReferences = function( refs ) {
        if( !isDefined( refs ) ) refs = this.References;
        var allRefs = [];
        for( var r=0; r<refs.length; r++ ) { 
            allRefs.push( refs[r] );
            // recursively check any nested objects 
            if( isDefined( refs[r].TypeInstance ) )
                allRefs = allRefs.concat( this.GetFlatAllReferences( refs[r].TypeInstance.References ) );
        }//for r...
        return( allRefs );
    }
}


/*  Helper function for defining Attribute details. Used for InformationModel testing.

    Arguments:
        name: string - The name of the attribute
        id: number - AttributeId 
        dataType: number - Identifier data type
        required: bool - Mandatory requirement?
        isArray: bool - If the data-type is an array

    Revision History:
        25-May-2011 NP: Initial version.
*/
function IM_AttributeDetail( args ) {
    this.Name = "";
    this.DataType = Identifier.BaseDataType;
    this.Required = false;
    this.AttributeId = Attribute.Value;
    this.Array = false;

    // constructor
    if( !isDefined( args ) ) throw( "IM_AttributeDetail::args not set." );
    if( !isDefined( args.Name ) ) throw( "IM_AttributeDetails:Name not set." );
    if( !isDefined( args.AttributeId ) ) throw( "IM_AttributeDetails::AttributeId not set." );
    if( !isDefined( args.DataType ) ) throw( "IM_AttributeDetails::DataType not set." );
    if( !isDefined( args.Required ) ) args.Required = false;
    if( !isDefined( args.IsArray ) ) args.IsArray = false;

    this.Name = args.Name;
    this.AttributeId = args.AttributeId;
    this.DataType = args.DataType;
    this.Required = args.Required;
    this.Array = args.IsArray;

    this.toString = function() {
        var s = "AttributeDetail Name: " + this.Name +
            "; AttributeId: " + this.AttributeId +
            "; DataType: " + this.DataType + 
            "; Required: " + this.Required +
            "; IsArray: " + this.IsArray;
        return( s );
    }// this.toString = function()

}// function IM_AttributeDetail( args )

/*  Helper function for defining a REFERENCE. Used for InformationModel testing.

    Revision History:
        25-May-2011 NP: Initial version.
*/
function IM_ReferenceDefinition( args ) {
    this.BrowseName = "";//
    this.Required = false;
    this.ArrayMin = 0;
    this.ArrayMax = 0;
    this.ReferenceTypeId = null;//
    this.NodeClass = null;//
    this.TypeDefinition = null;
    this.DataType = null;
    this.IsArray = null;
    this.TypeInstance = null;

    // constructor
    if( !isDefined( args ) ) throw( "IM_ReferenceDefinition::args not set." );
    if( !isDefined( args.BrowseName ) ) throw( "IM_ReferenceDefinition::BrowseName not set." );
    if( !isDefined( args.ReferenceTypeId ) ) throw( "IM_ReferenceDefinition::ReferenceTypeId not set." );
    if( !isDefined( args.Required ) ) args.Required = false;
    if( !isDefined( args.ArrayMin ) ) args.ArrayMin = 0;
    if( !isDefined( args.ArrayMax ) ) args.ArrayMax = Infinity;
    if( !isDefined( args.IsArray ) ) args.IsArray = false;

    this.BrowseName = args.BrowseName;
    this.Required = args.Required;
    this.ArrayMin = args.ArrayMin;
    this.ArrayMax = args.ArrayMax;
    this.ReferenceTypeId = new UaNodeId( args.ReferenceTypeId );
    this.NodeClass = args.NodeClass;
    this.TypeDefinition = args.TypeDefinition;
    this.DataType = args.DataType;
    this.IsArray = args.IsArray;    this.Req
    this.TypeInstance = args.TypeInstance;

    this.toString = function() { 
        var s = "ReferenceDescription BrowseName: " + this.BrowseName + 
            "; Required: " + this.Required +
            "; ArrayMin: " + this.ArrayMin +
            "; ArrayMax: " + this.ArrayMax +
            "; ReferenceTypeId: " + this.ReferenceTypeId +
            "; NodeClass: " + this.NodeClass +
            "; TypeDefinition: " + this.TypeDefinition +
            "; DataType: " + this.DataType +
            "; IsArray: " + this.IsArray +
            "; TypeInstance: " + ( isDefined( this.TypeInstance )? this.TypeInstance.toString() : "n/a" );
        return( s );
    }// this.toString = function()
}


/*  Helper function for defining a STANDARD PROPERTY. Used for InformationModel testing.

    Revision History:
        25-May-2011 NP: Initial version.
*/
function IM_PropertyDefinition( args ) {
    this.Name = "";
    this.Required = false;
    this.DataType = Identifier.Integer;
    this.Array = false;

    // constructor
    if( !isDefined( args ) ) throw( "IM_PropertyDefinition::args not specified." );
    if( !isDefined( args.Name ) ) throw( "IM_PropertyDefinition:Name not specified." );
    if( !isDefined( args.DataType ) ) throw( "IM_PropertyDefinition::DataType not specified." );
    if( !isDefined( args.Required ) ) args.Required = false;
    if( !isDefined( args.IsArray ) ) args.IsArray = false;

    this.Name = args.Name;
    this.Required = args.Required;
    this.DataType = args.DataType;
    this.Array = args.IsArray;

    this.toString = function() { 
        var s = "PropertyDefinition Name: " + this.Name +
            "; Required: " + this.Required +
            "; DataType: " + this.DataType +
            "; Array: " + this.Array;
        return( s );
    }
}// function IM_PropertyDefinition( args ) 


/*  Helper function for defining a NODECLASS. Used for InformationModel testing.

    Arguments:
        name: string - The name of the attribute
        attributeDetails: Array of IM_AttributeDetail objects.
        references: Array of IM_ReferenceDefinition objects.
        properties: Array of IM_PropertyDefinition objects.

    Revision History:
        25-May-2011 NP: Initial version.
*/
function IM_NodeClassDefinition( name, attributes, references, properties ) {
    this.Name = "";
    this.Attributes = [];
    this.References = [];
    this.Properties = [];

    // constructor
    if( arguments.length > 0 ) {
        if( name !== undefined && name !== null ){ this.Name = name; }
        if( attributes !== undefined && attributes !== null ){ this.Attributes = attributes; }
        if( references !== undefined && references !== null ){ this.References = references; }
        if( properties !== undefined && properties !== null ){ this.Properties = properties; }
    }

    this.toString = function() {
        var s = "NodeClassDefinition Name: " + this.Name +
            "; Attributes: (" + this.Attributes.length + ")" +
            "; Properties: (" + this.Properties.length + ")";
        return( s );
    }// this.toString = function()
}// function IM_NodeClassDefinition( name, attributes, references, properties )