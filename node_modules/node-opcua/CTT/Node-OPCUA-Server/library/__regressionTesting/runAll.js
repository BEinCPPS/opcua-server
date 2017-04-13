var scripts = [ 
    "_HA",
    "_Events", 
    "_includes", 
    "_Structures",
    "_Objects",
    "_UaVariant"
    ];
for( var z=0; z<scripts.length; z++ ) {
    print( "***** Testing of Script '" + scripts[z] + ".js' begins *****" );
    include( "./library/__regressionTesting/" + scripts[z] + ".js" );
    print( "***** Testing of Script '" + scripts[z] + ".js' ENDS *****" );
}