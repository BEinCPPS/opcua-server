/*    Test 5.7.2-Gen-2 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given a continuation point
            And the continuation point does not exist
            And diagnostic info is not requested
          When Browse is called
          Then the server returns no diagnostic info. */

include( "./library/ServiceBased/ViewServiceSet/BrowseNext/diagnostic_mask_test.js" );
include( "./library/ClassBased/UaRequestHeader/5.4-002.js" );

function browseNextGeneral002() {
    TestDiagnosticMaskZero( Test.Session.Session, TestBrowseNextOperationErrorDiagnosticMask );
    TestDiagnosticMaskZero( Test.Session.Session, TestBrowseNextServiceErrorDiagnosticMask );
    return( true );
}

Test.Execute( { Procedure: browseNextGeneral002 } );