/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read a valid attribute from a non-existent node. */

function read581Err004() {
    const NODESETTING = "/Advanced/NodeIds/Invalid/InvalidNodeId1";
    var item = MonitoredItem.fromSettings( NODESETTING )[0];
    item.AttributeId = Attribute.BrowseName;
    return( ReadHelper.Execute( { NodesToRead: item, OperationResults: [ new ExpectedAndAcceptedResults( [ StatusCode.BadNodeIdUnknown, StatusCode.BadNodeIdInvalid ] ) ] } ) );
}

Test.Execute( { Procedure: read581Err004 } );