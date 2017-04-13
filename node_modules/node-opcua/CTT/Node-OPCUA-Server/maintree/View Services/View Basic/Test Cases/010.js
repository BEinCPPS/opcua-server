/*    Test 5.7.1-11 prepared by Dale Pope dale.pope@matrikon.com
      Description: Given one node to browse; And the node has a reference; And the resultMask is set to one node class
          When Browse is called: Then the server returns Reference Description fields matching the mask Validation is accomplished by 
          first browsing all Reference Description fields of a node, storing the found fields, and comparing them to the requested fields.*/

include( "./library/ServiceBased/ViewServiceSet/Browse/result_mask_test.js" );

function Test571011() {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has Inverse And Forward References" ).toString() );
    if( !isDefined( nodeToBrowse ) ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check setting '/Server Test/NodeIds/References/Has Inverse And Forward References'." );
        return( false );
    }
    for( var i=0; i<6; i++ ) {
        var resultMask = 1 << i;
        TestBrowseOneNodeWithResultMask( Test.Session.Session, nodeToBrowse, resultMask, 0 );
        TestBrowseOneNodeWithResultMask( Test.Session.Session, nodeToBrowse, resultMask, 0x3FF );
    }
    return( true );
}// function Test571011()

Test.Execute( { Procedure: Test571011 } );