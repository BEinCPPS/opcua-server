/*  Test prepared by Mark Rice; mrice@canarylabs.com
    Description: Read valid attributes (ids: 1, 3, 4, 5) from multiple non-existent nodes */

function read581Err009() {
    var allItems = [];
    var unknownNodeNames = MonitoredItem.fromSettings( Settings.Advanced.NodeIds.Invalid.Unknowns );
    var attributesToRead = [ Attribute.NodeId, Attribute.BrowseName, Attribute.DisplayName, Attribute.Description ];
    var expectedResults = [];

    for( var i=0; i<unknownNodeNames.length; i++ ) {
        for ( var j=0; j<attributesToRead.length; j++) {
            var newItem = unknownNodeNames[i].clone();
            newItem.AttributeId = attributesToRead[j];
            allItems.push( newItem );
            expectedResults.push( new ExpectedAndAcceptedResults( [ StatusCode.BadNodeIdInvalid, StatusCode.BadNodeIdUnknown ] ) );
        }
    }
    return( ReadHelper.Execute( { NodesToRead: allItems, OperationResults: expectedResults } ) );
}// function read581Err009() 

Test.Execute( { Procedure: read581Err009 } );