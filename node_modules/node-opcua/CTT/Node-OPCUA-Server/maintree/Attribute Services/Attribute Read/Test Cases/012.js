/*  Test prepared by Mark Rice: mrice@canarylabs.com
    Description: Read all available attributes from multiple valid nodes of each different node type, in a single call.
        In the CTT, the attributes to read will come from a matrix containing the mandatory attributes of each node type. */

function read581012() {
    const VARIABLE_NODE = "/Server Test/NodeIds/NodeClasses/Variable";
    const VARIABLETYPE_SETTING = "/Server Test/NodeIds/NodeClasses/VariableType";
    const OBJECT_SETTING = "/Server Test/NodeIds/NodeClasses/Object";
    const OBJECTTYPE_SETTING = "/Server Test/NodeIds/NodeClasses/ObjectType";
    const REFERENCETYPE_SETTING = "/Server Test/NodeIds/NodeClasses/ReferenceType";
    const VIEW_SETTING = "/Server Test/NodeIds/NodeClasses/View";
    const DATATYPE_SETTING = "/Server Test/NodeIds/NodeClasses/DataType";
    const METHOD_SETTING = "/Server Test/NodeIds/NodeClasses/Method";
    var settings = [ VARIABLE_NODE, VARIABLETYPE_SETTING, OBJECT_SETTING, OBJECTTYPE_SETTING,
        REFERENCETYPE_SETTING, VIEW_SETTING, DATATYPE_SETTING, METHOD_SETTING ];

    var settingsItems = MonitoredItem.fromSettings( settings, 0 );
    if( settingsItems == null || settingsItems.length == 0 ) {
        addSkipped( SETTING_UNDEFINED_NODECLASSES );
        return( false );
    }

    var itemsToRead = [];
    var clientHandle = 0;

    // Get the list of attributes to read from the following matrix object.
    var attribs = new NodeTypeAttributesMatrix();

    // build a list of items to read...
    for( var i=0; i<settingsItems.length; i++ ) {
        // detect how many attributes we can read based on the currently selected type of Node.
        var attributes;
        var expectedNodeClass;
        switch( settingsItems[i].NodeSetting ) {
            case VARIABLE_NODE:
                attributes = attribs.Variable; 
                expectedNodeClass = NodeClass.Variable; break;
            case VARIABLETYPE_SETTING:
                attributes = attribs.VariableType; 
                expectedNodeClass = NodeClass.VariableType; break;
            case OBJECT_SETTING:
                attributes = attribs.Object;
                expectedNodeClass = NodeClass.Object; break;
            case OBJECTTYPE_SETTING:
                attributes = attribs.ObjectType;
                expectedNodeClass = NodeClass.ObjectType; break;
            case REFERENCETYPE_SETTING:
                attributes = attribs.ReferenceType;
                expectedNodeClass = NodeClass.ReferenceType; break;
            case VIEW_SETTING:
                attributes = attribs.View;
                expectedNodeClass = NodeClass.View; break;
            case DATATYPE_SETTING:
                attributes = attribs.DataType;
                expectedNodeClass = NodeClass.DataType; break;
            case METHOD_SETTING:
                attributes = attribs.Method;
                expectedNodeClass = NodeClass.Method; break;
        }
        // now prepare a read request for each attribute on this node
        for( var a=0; a<attributes.length; a++ ) {
            var newItem = MonitoredItem.fromSetting( settingsItems[i].NodeSetting, clientHandle++, attributes[a] );
            // the following 'ExpectedNodeClass' will be dynamically added to the type
            // but do this for the first item only, since its the only that matters
            if( a==0 ) newItem.ExpectedNodeClass = expectedNodeClass;
            itemsToRead.push( newItem );
        }
    }
    
    // now to read the nodes
    if( ReadHelper.Execute( { NodesToRead: itemsToRead } ) ) {
        addLog( "Successfully read all Nodes. Now to check the data-types expected were actually received." );
        // now to compare that data-types received vs what was expected
        for( var i=0; i<itemsToRead.length; i++ ) if( itemsToRead[i].ExpectednodeClass !== undefined ) Assert.Equal( itemsToRead[i].ExpectednodeClass, itemsToRead[i].Value.Value.DataType, "Did not receive the data-type expected." );
    }
    return( true );
}

Test.Execute( { Procedure: read581012 } );