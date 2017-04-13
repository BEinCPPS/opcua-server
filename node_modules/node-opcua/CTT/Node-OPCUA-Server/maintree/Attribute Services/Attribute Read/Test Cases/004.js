/*  Test prepared by Mark Rice: mrice@canarylabs.com
    Description: Read multiple attributes from a valid node with maxAge = 0. */

function read581004() {
    var accesses = [ Attribute.AccessLevel, Attribute.BrowseName, Attribute.DataType,
                     Attribute.DisplayName, Attribute.Historizing, Attribute.NodeClass, 
                     Attribute.NodeId, Attribute.UserAccessLevel, Attribute.Value,
                     Attribute.ValueRank ];

    var coreItem = originalScalarItems[0].clone();

    var items = [];
    for( var i=0; i<accesses.length; i++ ) {
        items[i] = MonitoredItem.Clone( coreItem );
        items[i].AttributeId = accesses[i];
    }

    return( ReadHelper.Execute( { NodesToRead: items, MaxAge: 0 } ) );
}

Test.Execute( { Procedure: read581004 } );