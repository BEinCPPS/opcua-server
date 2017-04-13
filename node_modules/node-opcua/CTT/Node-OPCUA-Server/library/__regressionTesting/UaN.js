include( "./library/Base/safeInvoke.js" );

include( "./library/ClassBased/UaN.js" );
function UaNodeIdValidation() {
    var n = new UaNodeId();
    print( "1. true = " + UaNodeId.Validate( n ) );
    n.IdentifierType = 9;
    print( "2. false = " + UaNodeId.Validate( n ) );
    n.setIdentifierString( "hello" );
    print( "3a. true = " + UaNodeId.Validate( n ) );
    n.setIdentifierString( "" );
    print( "3b. false = " + UaNodeId.Validate( n ) );
}

// test code for NodeTypeAttributesMatrix
include( "./library/Base/NodeTypeAttributesMatrix.js" );
function NodeTypeAttributesMatrix() {
    var matrix = new NodeTypeAttributesMatrix();
    print( "Base.size = " + matrix.Base.length + "; contents: " + matrix.Base.toString() );
    print( "Base.Optional.size = " + matrix.Base_Optional.length + "; Contents: " + matrix.Base_Optional.toString() ) ;
    print( "ReferenceType.size = " + matrix.ReferenceType.length + "; contents " + matrix.ReferenceType.toString() );
    print( "ReferenceType.Optional.size = " + matrix.ReferenceType_Optional.length + "; contents " + matrix.ReferenceType_Optional.toString() );
    print( "Variable.size = " + matrix.Variable.length + "; contents " + matrix.Variable.toString() );
    print( "VariableType.size = " + matrix.VariableType.length + "; contents " + matrix.VariableType.toString() );
    print( "Object.size = " + matrix.Object.length + "; contents " + matrix.Object.toString() );
    print( "\tObject.Optional.size " + matrix.Object_Optional.length + "; contents " + matrix.Object_Optional.toString() );
    print( "ObjectType.size = " + matrix.ObjectType.length + "; contents " + matrix.ObjectType.toString() );
    print( "DataType.size = " + matrix.DataType.length + "; contents " + matrix.DataType.toString() );
    print( "Method.size = " + matrix.Method.length + "; contents " + matrix.Method.toString() );
    print( "View.size = " + matrix.View.length + "; contents " + matrix.View.toString() );
    print( "All.size = " + matrix.All.length + "; contents " + matrix.All.toString() );
    print( "All EXCEPT base, length: " + matrix.AllExcept( matrix.Base ).length );
    print( "All EXCEPT object, length: " + matrix.AllExcept( matrix.Object ).length + "; contents " + matrix.AllExcept( matrix.Object ).toString() );
    print( "All EXCEPT all, length: " + matrix.AllExcept( matrix.All ).length );
}

include( "./library/Base/Nonce.js" );
function NonceTesting() {
    Nonce.Next();
    if( Nonce.Value.length === 0  ) print( "Error: nonce.length = 0" );
    if( Nonce.Value.length !== 32 ) print( "Error: nonce.length != 32" );
    if( !Nonce.Contains( Nonce.Value ) ) print( "Error: current nonce not found" );
    if( !Nonce.Contains( Nonce.Value ) ) print( "sds" );
}

UaNodeIdValidation();
NodeTypeAttributesMatrix();
NonceTesting();