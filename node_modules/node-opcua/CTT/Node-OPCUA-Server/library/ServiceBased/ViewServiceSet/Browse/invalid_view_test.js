// Browse a node with a view that is invalid
function TestBrowseNodeWithInvalidView( nodeToBrowse, viewId, returnDiagnostics, Session ) {
    var request = GetDefaultBrowseRequest( Session, nodeToBrowse );
    var response = new UaBrowseResponse();
    request.RequestHeader.ReturnDiagnostics = returnDiagnostics;
    request.View.ViewId = viewId;
    uaStatus = Session.browse( request, response );
    // check result
    if( uaStatus.isGood() ) UaResponseHeader.IsValid( { Service: { Name: "Browse", Request: request, Response: response }, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.BadViewIdUnknown ) } );
    else addError( "Browse() status " + uaStatus, uaStatus );
}