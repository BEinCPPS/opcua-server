/*  Test prepared by compliance@opcfoundation.org; original work by: Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Repeats test #8 100 times. Must complete within 10-seconds. */

// include the script that we'll invoke
include( "./maintree/Discovery Services/Discovery Find Servers Filter/Test Cases/008.js" );

function findServers551017() {
    const MAXCOUNT = 100;
    for( var i=0; i<MAXCOUNT-1; i++ ) findServers551008();
    return( true );
}

Test.Execute( { Procedure: findServers551017 } );