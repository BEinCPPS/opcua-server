/*  Test prepared by Mark Rice; mrice@canarylabs.com
    Description: Read valid attributes (ids: 1, 3, 4, 5) from multiple nodes with invalid node id syntaxes. */

function read591Err010() {
    var allItems = [];
    var invalidNodeNames = MonitoredItem.fromSettings( Settings.Advanced.NodeIds.Invalid.Invalids );
    var attributesToRead = [ Attribute.NodeId, Attribute.BrowseName, Attribute.DisplayName, Attribute.Description ];
    var expectedResults = [];

    //dynamically construct the IDs of the nodes we want to read, specifically their values.
    for( var i=0; i<invalidNodeNames.length; i++ ) {
        for ( var j=0; j<attributesToRead.length; j++) {
            var newNode = invalidNodeNames[i].clone();
            newNode.AttributeId = attributesToRead[j];
            allItems.push( newNode );
            expectedResults.push( new ExpectedAndAcceptedResults( [ StatusCode.BadNodeIdUnknown, StatusCode.BadNodeIdInvalid ] ) );
        }
    }
    return( ReadHelper.Execute( { NodesToRead: allItems, OperationResults: expectedResults } ) );
}// function read591Err010()

Test.Execute( { Procedure: read591Err010 } );