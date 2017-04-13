/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read all attributes from a valid node of type 'variable'. */

function read581003() {
    var item = originalScalarItems[0].clone();
    var itemsToRead = [];

    var attribs = new NodeTypeAttributesMatrix();
    var attributeSize = attribs.Variable.length;
    for( var i=0; i<attributeSize; i++ ) {
        itemsToRead[i] = MonitoredItem.Clone( item );
        itemsToRead[i].AttributeId = attribs.Variable[i];
    }
    return( ReadHelper.Execute( { NodesToRead: itemsToRead } ) );
}

Test.Execute( { Procedure: read581003 } );