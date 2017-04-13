/*  Test prepared by compliance@opcfoundation.org; original work by: Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Repeat test #17, 10 times. (essentially repeats test #4 1000 times) Must complete within 30-seconds. */

// include the script that we'll invoke
include( "./maintree/Discovery Services/Discovery Find Servers Filter/Test Cases/004.js" );

function findServers551017() {
    const MAXCOUNT = 1000;
    for( var i=0; i<MAXCOUNT-1; i++ ) findServers551008();
    return( true );
}

Test.Execute( { Procedure: findServers551017 } );