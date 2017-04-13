function TestingDurationToString() {
include( "./library/ClassBased/UaD.js" );
    print( "0 = " + DurationToString( 0 ) );
    print( "57 = " + DurationToString( 57 ) );
    print( "1000 = " + DurationToString( 1000 ) );
    print( "1010 = " + DurationToString( 1010 ) );
    print( "32256 = " + DurationToString( 32256 ) );
    print( "7200008 = " + DurationToString( 7200008 ) );
}

TestingDurationToString();