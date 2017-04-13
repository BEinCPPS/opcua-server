/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read the same invalid attribute from a valid node multiple times in the same service call.
*/

function read581Err003() {
    var items = [], expectedResults = [];
    for( var i=0; i<4; i++ ) {
        items[i] = originalScalarItems[0].clone();
        items[i].AttributeId = ATTRIBUTE_READ_INVALIDATTRIBUTEID;
        expectedResults.push( new ExpectedAndAcceptedResults( StatusCode.BadAttributeIdInvalid ) );
    }
    return( ReadHelper.Execute( { NodesToRead: items, OperationResults: expectedResults } ) );
}// function read581Err003()

Test.Execute( { Procedure: read581Err003 } );