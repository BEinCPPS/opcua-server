include( "./library/Base/array.js" );
include( "./library/Base/safeInvoke.js" );
// include all library scripts specific to browse tests
include( "./library/ServiceBased/ViewServiceSet/Browse/get_default_request.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse/get_references.js" );
include( "./library/ServiceBased/ViewServiceSet/BrowseNext/assert_browsenext_valid.js" );
include( "./library/ServiceBased/ViewServiceSet/BrowseNext/release_continuationpoints_test.js" );

// Connect to the server 
if( !Test.Connect() ) stopCurrentUnit();