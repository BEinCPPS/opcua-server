function TestUnregisterNodesServiceErrorDiagnosticMask( Session, returnDiagnosticMask ) {
    addLog( "Testing RegisterNodes service error with RequestHeader.ReturnDiagnostics = " + returnDiagnosticMask );
    var request = new UaUnregisterNodesRequest();
    var response = new UaUnregisterNodesResponse();
    Session.buildRequestHeader( request.RequestHeader );
    request.RequestHeader.ReturnDiagnostics = returnDiagnosticMask;
    var uaStatus = Session.unregisterNodes( request, response );
    if( uaStatus.isGood() ) UaResponseHeader.IsValid( { Service: { Name: "UnregisterNodes", Request: request, Response: response }, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } );
    else addError( "UnregisterNodes() status " + uaStatus, uaStatus );
}