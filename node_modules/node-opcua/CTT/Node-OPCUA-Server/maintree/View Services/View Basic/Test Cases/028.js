/*    Test 5.7.1-Gen-2 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node does not exist
            And diagnostic info is not requested
          When Browse is called
          Then the server returns no diagnostic info */

include( "./library/ServiceBased/ViewServiceSet/Browse/diagnostic_mask_test.js" );
include( "./library/ClassBased/UaRequestHeader/5.4-002.js" );

TestDiagnosticMaskZero( Test.Session.Session, TestBrowseOperationErrorDiagnosticMask );
TestDiagnosticMaskZero( Test.Session.Session, TestBrowseServiceErrorDiagnosticMask );