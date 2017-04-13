/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read multiple attributes from a valid node. */

function read581002() {
    var items = [];
    var attributes = [ Attribute.BrowseName, Attribute.DisplayName, Attribute.NodeClass, Attribute.NodeId ];
    for( var i=0; i<attributes.length; i++ ) {
        var newNode = originalScalarItems[0].clone();
        newNode.AttributeId = attributes[i];
        items.push( newNode );
    }
    return( ReadHelper.Execute( { NodesToRead: items } ) );
}

Test.Execute( { Procedure: read581002 } );