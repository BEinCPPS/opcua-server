/*    Test 5.7.1-3 prepared by Dale Pope dale.pope@matrikon.com
      Description:
          Given one node to browse
            And the node exists
            And the node has forward references
            And the node has inverse references
            And the node BrowseDirection is Inverse
          When Browse is called
          Then the server returns the Inverse references
          
          Validation is accomplished by first browsing all references on a node,
          storing the references flagged with "IsForward = false", and comparing
          the "IsForward = false" references to the "BrowseDirection = Inverse" 
          references (expecting them to be equal). So this test only validates 
          that "IsForward = false" is consistent with "BrowseDirection = Inverse".

      Revision History
          2009-08-17 Dale Pope: Initial version
          2009-11-25 NP: REVIEWED (verified using SERVER object nodeId).
          2012-04-10 NP: Reviewed.
*/

include( "./library/ServiceBased/ViewServiceSet/Browse/direction_test.js" );

function viewbasic003() {
    TestBrowseOneNodeInDirection( BrowseDirection.Inverse, 0, Test.Session.Session );
    TestBrowseOneNodeInDirection( BrowseDirection.Inverse, 0x3ff, Test.Session.Session );
    return( true );
}

Test.Execute( { Procedure: viewbasic003 } );