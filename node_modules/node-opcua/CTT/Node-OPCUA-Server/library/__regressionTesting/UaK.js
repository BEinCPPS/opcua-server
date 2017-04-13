include( "./library/Base/Objects/keyPairCollection.js" );

function keyPairCollectionTests() {
    var kpc = new KeyPairCollection();
    kpc.Set( "1", { "Name": "hello" } );
    print( kpc.Get( "1" ).Name );
    print( kpc["1"].Name );
    print( kpc.Length() );
    print( "contains '1'" + kpc.Contains( "1" ) );
    kpc.Remove( "1" );
    print( "contains '1'" + kpc.Contains( "1" ) );
    print( kpc.Get( "1" ) === null );
    print( kpc.Length() );
    kpc.Set( "key1", 10 );
    kpc.Set( "key2", 20 );
    print( "Keys: " + kpc.Keys() );
    print( "Values: " + kpc.Values() );
    var keys = kpc.Keys();
    for( var k=0; k<keys.length; k++ ) print( keys[k] );
} 


keyPairCollectionTests();