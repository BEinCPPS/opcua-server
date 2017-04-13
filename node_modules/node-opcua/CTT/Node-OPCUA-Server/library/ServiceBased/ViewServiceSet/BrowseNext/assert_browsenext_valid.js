// the service is expected to succeed
// all operations are expected to succeed
function AssertBrowseNextValidParameter( request, response ) {
    if ( !Assert.Equal( AssertBrowseNextValidParameter.length, arguments.length, "AssertBrowseNextValidParameter(): wrong number of arguments!" ) ) return;
    // check response header
    UaResponseHeader.IsValid( { Service: { Name: "BrowseNext", Request: request, Response: response }, ServiceResult: new ExpectedAndAcceptedResults( StatusCode.Good ) } );
    // check number of results
    if( Assert.Equal( request.ContinuationPoints.length, response.Results.length, "The number of ContinuationPoints does not match the number of Results." ) ) {        
        // check each result
        for( var i=0; i<response.Results.length; i++ ) {
            var browseResult = response.Results[i];
            // status code
            if( browseResult.StatusCode.isNotGood() ) {
                addError( "Results[" + i + "].StatusCode is not good: " + browseResult.StatusCode, browseResult.StatusCode );
                continue;
            }
            if( !request.ReleaseContinuationPoints ) {
                if( browseResult.StatusCode.StatusCode === StatusCode.Good ) {
                    if( !browseResult.ContinuationPoint.isEmpty() ) addLog( "Results[" + i + "].ContinuationPoint is not empty" );
                }
                else addError( "Results[" + i + "].StatusCode is unexpected: " + browseResult.StatusCode, browseResult.StatusCode );
            }
            else {
                // ContinuationPoints should be released
                print( "Request.ReleaseContinuationPoints = true." );
                if( browseResult.StatusCode.StatusCode !== StatusCode.Good ) addError( "Results[" + i + "].StatusCode is not Good: " + browseResult.StatusCode, browseResult.StatusCode );
                Assert.True( browseResult.ContinuationPoint.isEmpty(), "Results[" + i + "].ContinuationPoint is not empty but should have been released." );
                Assert.Equal( 0, browseResult.References.length, "Results[" + i + "].References has wrong number of elements:" );
            }
        }
    }
    // check diagnostic infos no error is expected so the DiagnosticInfos should be empty
    AssertDiagnosticInfosEmpty( response.DiagnosticInfos );
}


// Perform a BrowseNext and validate that the (one) returned reference is as expected
function BrowseNextAndAssertReferencesMatch( Session, expectedReferences, firstReferenceIndex, lastReferenceIndex, request ) {
    var response = new UaBrowseNextResponse();
    // BrowseNext
    var uaStatus = Session.browseNext( request, response );
    // validate response
    if( uaStatus.isGood() ) {
        AssertBrowseNextValidParameter( request, response );
        if( !request.ReleaseContinuationPoints ) {
            // Validate that the reference from BrowseNext is as expected
            Assert.Equal( expectedReferences.length, response.Results.length, "Response did not have correct number of results." );
            for( var i = 0; i < response.Results.length; i++ ) {
                if( lastReferenceIndex < expectedReferences[i].length ) {
                    Assert.Equal( 1 + lastReferenceIndex - firstReferenceIndex, response.Results[i].References.length, "Results[ " + i + "] had the wrong number of references." );
                    for( var j = firstReferenceIndex; j <= lastReferenceIndex; j++ ) {
                        AssertReferenceDescriptionsEqual( expectedReferences[i][j], response.Results[i].References[j - firstReferenceIndex], "ReferenceDescription from BrowseNext is not expected." );
                    }
                }
                else Assert.Equal( 0, response.Results[i].References.length, "Results[ " + i + "] had references but should have had none." );
            }
        }
    }
    else addError( "BrowseNext() status " + uaStatus, uaStatus );
    return response;
}


// Using a previous Response, build a BrowseNextRequest, call BrowseNext, and validate.
function BrowseNextFromResponseAndAssertReferencesMatch( Session, expectedReferences, firstReferenceIndex, lastReferenceIndex, releaseContinuationPoints, previousResults ) {
    var request = CreateDefaultBrowseNextRequest( Session );
    // build request
    request.ReleaseContinuationPoints = releaseContinuationPoints;
    print( "\tAdding " + previousResults.length + " ContinuationPoints to the Request (copied from previous Response)." );
    for( var i = 0; i < previousResults.length; i++ ) request.ContinuationPoints[i] = previousResults[i].ContinuationPoint;
    return BrowseNextAndAssertReferencesMatch( Session, expectedReferences, firstReferenceIndex, lastReferenceIndex, request );
}


// BrowseNext for each element of expectedReferences[0] (other elements of the
// first dimension are ignored for now). Each BrowseNext is validated and its
// references checked against the expectedReferences. This only works with
// a RequestedMaxReferencesPerNode of 1.
function AssertBrowseNextReturnsReferences( Session, expectedReferences, referencesPerCall, response ) {
    var expectedNumberOfResults = response.Results.length;
    Assert.Equal( referencesPerCall, response.Results[0].References.length, "Wrong number of references returned." );
    var result;
    // BrowseNext and validate up to (but not including) the final call
    for( var i = referencesPerCall; i < expectedReferences[0].length - referencesPerCall; i += referencesPerCall ) {
        response = BrowseNextFromResponseAndAssertReferencesMatch( Session, expectedReferences, i, i + referencesPerCall - 1, false, response.Results );
        Assert.Equal( expectedNumberOfResults, response.Results.length );
        if( response.Results.length > 0 ) {
            result = response.Results[0];
            // Should return requested number of references
            Assert.Equal( referencesPerCall, result.References.length, "Wrong number of references returned." );
            // ContinuationPoint should not be empty
            if( StatusCode.Good !== result.StatusCode.StatusCode ) addError( "StatusCode from BrowseNext is not Good: " + result.StatusCode, result.StatusCode );
            Assert.False( result.ContinuationPoint.isEmpty(), "ContinuationPoint is empty: " + result.ContinuationPoint );
        }
    }
    // Should BrowseNext one last time
    response = BrowseNextFromResponseAndAssertReferencesMatch( Session, expectedReferences, i, expectedReferences[0].length - 1, false, response.Results );
    Assert.Equal( expectedNumberOfResults, response.Results.length );
    if( response.Results.length > 0 ) {
        result = response.Results[0];
        if( StatusCode.Good != result.StatusCode.StatusCode ) addError( "StatusCode from last BrowseNext is not Good: " + result.StatusCode, result.StatusCode );
        // Although the last reference has been retrieved, a ContinuationPoint may have
        // been returned. Servers are allowed to return a ContinuationPoint when they
        // are not sure if another reference exists at the device/source. In that case, 
        // the next call to BrowseNext must not return a ContinuationPoint.
        if( !result.ContinuationPoint.isEmpty() ) {
            response = BrowseNextFromResponseAndAssertReferencesMatch( Session, expectedReferences, i + 1, expectedReferences[0].length, false, response.Results );
            if( response.Results.length > 0 ) {
                result = response.Results[0];        
                if( StatusCode.Good != result.StatusCode.StatusCode ) addError( "StatusCode from final BrowseNext is not Good: " + result.StatusCode, result.StatusCode );
            }
        }
        // ContinuationPoint must be empty
        Assert.True( result.ContinuationPoint.isEmpty(), "ContinuationPoint from last BrowseNext is not empty: " + result.ContinuationPoint );
    }
}