/*    Test 5.7.1-Err-11 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node exists
            And the ReferenceTypeId is set to an existent node ID
            And the ReferenceTypeId is not a reference type
          When Browse is called
          Then the server returns an operation result of BadReferenceTypeIdInvalid */

include( "./library/ServiceBased/ViewServiceSet/Browse/bad_referencetypeid_test.js" );

function view571err011() {
    const NODE_SETTING = "/Server Test/NodeIds/NodeClasses/Variable";
    var item = MonitoredItem.fromSetting( NODE_SETTING, 0 );
    if( item == undefined || item == null ) {
        addSkipped( "Setting not configured! Setting: '" + NODE_SETTING + "'" );
        return( false );
    }
    TestBrowseBadReferenceTypeId( item.NodeId, 0, Test.Session.Session );
    TestBrowseBadReferenceTypeId( item.NodeId, 0x3ff, Test.Session.Session );
    return( true );
}

Test.Execute( { Procedure: view571err011 } );