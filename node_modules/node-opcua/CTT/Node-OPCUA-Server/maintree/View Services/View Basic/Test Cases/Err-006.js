/*    Test 5.7.1-Err-6 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node exists
            And the ReferenceTypeId is set to a node ID
            And the ReferenceTypeId does not exist
          When Browse is called
          Then the server returns an operation result of BadReferenceTypeIdInvalid */

include( "./library/ServiceBased/ViewServiceSet/Browse/bad_referencetypeid_test.js" );

function testErr006(){
    TestBrowseBadReferenceTypeId( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId1" ).toString() ), 0, Test.Session.Session );
    TestBrowseBadReferenceTypeId( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId1" ).toString() ), 0x3ff, Test.Session.Session );
    return( true );
}

Test.Execute( { Procedure: testErr006 } );