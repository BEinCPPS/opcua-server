/*    Test 5.7.1-10 prepared by Dale Pope dale.pope@matrikon.com
      Description: Given one node to browse; And the node has more than one reference; And the nodeClassMask is 0
          When Browse is called: Then the server returns all references
          Validation is accomplished by first browsing all references on a node with nodeClassMask = 0xFF, storing the found references, and comparing
          them to the returned references when nodeClassMask is 0. */

include("./library/ServiceBased/ViewServiceSet/Browse/node_class_mask_test.js")

function test571010() {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has Inverse And Forward References" ).toString() );
    if( !isDefined( nodeToBrowse ) ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check setting '/Server Test/NodeIds/References/Has Inverse And Forward References'." );
        return( false );
    }
    TestBrowseOneNodeWithClassMask( Test.Session.Session, nodeToBrowse, 0, 0 );
    TestBrowseOneNodeWithClassMask( Test.Session.Session, nodeToBrowse, 0, 0x3ff );
    return( true );
}

Test.Execute( { Procedure: test571010 } );