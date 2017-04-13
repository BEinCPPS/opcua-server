/*  function IsInteger( args )  - args.Value(UaVariant)
    function IsUInteger( args ) - args.Value(UaVariant)
*/

/* Validates a value is of type Integer, or a type that derives from it.
   Parameters:
       - Value: UaVariant */
function IsInteger( args ) {
    if( isDefined( args ) ) {
        if( isDefined( args.Value ) && isDefined( args.Value.DataType ) ) {
            return( args.Value.DataType === BuiltInType.SByte || 
                args.Value.DataType === BuiltInType.Int16 ||
                args.Value.DataType === BuiltInType.Int32 ||
                args.Value.DataType === BuiltInType.Int64 );
        }
    }
    return( false );
}// function IsInteger( args )



/* Validates a value is of type UInteger, or a type that derives from it.
   Parameters:
       - Value: UaVariant */
function IsUInteger( args ) {
    if( isDefined( args ) ) {
        if( isDefined( args.Value ) && isDefined( args.Value.DataType ) ) {
            return( args.Value.DataType === BuiltInType.Byte || 
                args.Value.DataType === BuiltInType.UInt16 ||
                args.Value.DataType === BuiltInType.UInt32 ||
                args.Value.DataType === BuiltInType.UInt64 );
        }
    }
    return( false );
}// function IsUInteger( args )