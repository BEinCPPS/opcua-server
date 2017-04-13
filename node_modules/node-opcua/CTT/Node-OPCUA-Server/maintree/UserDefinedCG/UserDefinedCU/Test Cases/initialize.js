include( "./library/Base/safeInvoke.js" );

var GLOBAL_VARIABLES = new Object();

if( !Test.Connect() ) {
    addError( "Could not connect to the UA Server. Aborting conformance unit." );
    stopCurrentUnit();
}
else {
    print( "Do initialization here, or pre-processing etc." );
    GLOBAL_VARIABLES.Variable1 = "hello";
    GLOBAL_VARIABLES.Variable2 = 123;
    print( "Global variables: 'Variable1' = " + GLOBAL_VARIABLES.Variable1 + "; 'Variable2' = " + GLOBAL_VARIABLES.Variable2 );
}