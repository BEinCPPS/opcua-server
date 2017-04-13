/*  Test prepared by OPC Foundation: compliance@opcfoundation.org
    Description: Use a referenceTypeId that has invalid syntax. */

function Browse571Err005( referenceTypeId, returnDiagnostics ) {
    var nodeToBrowse = UaNodeId.fromString( readSetting( "/Server Test/NodeIds/References/Has Inverse And Forward References" ).toString() );
    if( nodeToBrowse === undefined || nodeToBrowse === null ) {
        addSkipped( "[Configuration Issue?] Unable to conduct test. Check sysntax '/Server Test/NodeIds/NodeClasses/ReferenceType'." );
        return( false );
    }
    var request = GetDefaultBrowseRequest( Session, nodeToBrowse );
    var response = new UaBrowseResponse();

    request.RequestHeader.ReturnDiagnostics = returnDiagnostics;
    request.NodesToBrowse[0].ReferenceTypeId = referenceTypeId;

    var uaStatus = Session.browse( request, response );

    // check result
    if( uaStatus.isGood() ) {
        var expectedResults = [ new ExpectedAndAcceptedResults( StatusCode.BadReferenceTypeIdInvalid ) ];
        assertBrowseError( request, response, expectedResults );
    }
    else{ addError( "Browse() status " + uaStatus, uaStatus ); }
}

function doTest() {
    Browse571Err005( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/InvalidSyntaxNodeId1" ).toString() ), 0 );
    Browse571Err005( UaNodeId.fromString( readSetting( "/Advanced/NodeIds/Invalid/InvalidSyntaxNodeId2" ).toString() ), 0x3ff );
}

safelyInvoke( doTest );