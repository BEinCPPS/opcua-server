function TestRegisterNodesServiceErrorDiagnosticMask( Session, returnDiagnosticMask ) {
    addLog( "Testing RegisterNodes service error with RequestHeader.ReturnDiagnostics = " + returnDiagnosticMask );
    var request = new UaRegisterNodesRequest();
    var response = new UaRegisterNodesResponse();
    Session.buildRequestHeader( request.RequestHeader );
    request.RequestHeader.ReturnDiagnostics = returnDiagnosticMask;
    var uaStatus = Session.registerNodes( request, response );
    // check result
    if( uaStatus.isGood() ) UaResponseHeader.IsValid( { Service: { Name: "RegisterNodes", Request: request, Response: response }, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadNothingToDo ) } );
    else addError( "RegisterNodes() status " + uaStatus, uaStatus );
}