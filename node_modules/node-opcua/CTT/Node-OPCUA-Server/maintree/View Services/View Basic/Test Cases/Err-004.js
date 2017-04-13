/*    Test 5.7.1-Err-4 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node exists
            And the View request parameter is set to a non-empty ViewDescription
            And the ViewDescription.ViewId is a node that does not exist
          When Browse is called
          Then the server returns an service result of BadViewIdUnknown */

include( "./library/ServiceBased/ViewServiceSet/Browse/invalid_view_test.js" );

function Test571Err4() {
    var nodeId = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has Inverse And Forward References" ).toString() );
    if( nodeId === undefined || nodeId === null ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check setting '/Server Test/NodeIds/References/Has Inverse And Forward References'." );
        return( false );
    }
    var viewId = UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId1" ).toString() );
    TestBrowseNodeWithInvalidView( nodeId, viewId, 0, Test.Session.Session );
    TestBrowseNodeWithInvalidView( nodeId, viewId, 0x3ff, Test.Session.Session );
    return( true );
}

Test.Execute( { Procedure: Test571Err4 } );