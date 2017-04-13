/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read multiple valid attributes and one invalid attribute from the same node */

function read581Err002() {
    var items = [];
    var expectedResults = [];
    for( var i=0; i<5; i++ ) {
        expectedResults[i] = new ExpectedAndAcceptedResults( StatusCode.Good );
        // Check if we have enough nodes to test. If not clone the existing nodes
        if( isDefined ( originalScalarItems[i] ) ) items[i] = originalScalarItems[i].clone();
        else items[i] = originalScalarItems[originalScalarItems.length -1].clone();
        switch( i ) {
            case 0: items[i].AttributeId = Attribute.AccessLevel; break;
            case 1: items[i].AttributeId = Attribute.Value;  break;
            case 2: items[i].AttributeId = Attribute.DisplayName;  break;
            case 3: items[i].AttributeId = Attribute.BrowseName;  break;
            case 4: items[i].AttributeId = ATTRIBUTE_READ_INVALIDATTRIBUTEID; expectedResults[i] = new ExpectedAndAcceptedResults( StatusCode.BadAttributeIdInvalid ); break;
        }
    }
    return( ReadHelper.Execute( { NodesToRead: items, OperationResults: expectedResults } ) );
}

Test.Execute( { Procedure: read581Err002 } );