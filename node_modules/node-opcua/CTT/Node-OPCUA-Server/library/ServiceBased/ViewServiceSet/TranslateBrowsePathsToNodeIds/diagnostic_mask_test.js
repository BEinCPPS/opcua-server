function TestTranslateBrowsePathsToNodeIdsOperationErrorDiagnosticMask( Session, returnDiagnosticMask ) {
    print( "Testing TranslateBrowsePathsToNodeIds operation error with RequestHeader.ReturnDiagnostics = " + returnDiagnosticMask );
    var startingNode = UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/UnknownNodeId1" ).toString() );
    var pathsToBrowse = [ new BrowsePathInfo() ];
    pathsToBrowse[0].browseNames = CreateQualifiedNamesArrayFromString( "0:NoSuchNodeHere" );
    pathsToBrowse[0].referenceTypeIds[0] = UaNodeId.fromString( "ns=4;i=4" );
    pathsToBrowse[0].targetNodeId = [];
    var expectedOperationResults = [1];
    expectedOperationResults[0] = new ExpectedAndAcceptedResults();
    expectedOperationResults[0].addExpectedResult( StatusCode.BadNodeIdUnknown );
    expectedOperationResults[0].addExpectedResult( StatusCode.BadNoMatch );
    TestTranslateBrowsePathsToNodeIdsMultiMix( Session, [ startingNode ], pathsToBrowse, expectedOperationResults );
}

// generate service error and validate diagnostics
function TestTranslateBrowsePathsToNodeIdsServiceErrorDiagnosticMask( Session, returnDiagnosticMask ) {
    print( "Testing TranslateBrowsePathsToNodeIds service error with RequestHeader.ReturnDiagnostics = " + returnDiagnosticMask );
    var request = new UaTranslateBrowsePathsToNodeIdsRequest();
    var response = new UaTranslateBrowsePathsToNodeIdsResponse();
    Session.buildRequestHeader( request.RequestHeader );
    request.RequestHeader.ReturnDiagnostics = returnDiagnosticMask;
    var uaStatus = Session.translateBrowsePathsToNodeIds( request, response );
    if( uaStatus.isGood() ) UaResponseHeader.IsValid( { Service: { Name: "TranslateBrowsePathsToNodeIds", Request: request, Response: response }, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } );
    else addError( "TranslateBrowsePathsToNodeIds() status " + uaStatus, uaStatus );
}