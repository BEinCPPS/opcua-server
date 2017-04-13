/*  Test prepared by <your name>: <email>
    Description: 
    Expectation:  */
    
function myCustomScript001() {
    print( "Hello world" );
    addLog( "Hello log" );
    addWarning( "Hello warning" );
    addError( "Hello error" );
    notImplemented( "Hello not-implemented" );
    addSkipped( "Hello skip" );
    notSupported( "Hello not-supported" );
    return( true );
}

Test.Execute( { Procedure: myCustomScript001 } );