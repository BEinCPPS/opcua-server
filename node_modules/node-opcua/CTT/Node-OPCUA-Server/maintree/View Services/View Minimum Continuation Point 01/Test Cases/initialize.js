include( "./library/Base/Objects/expectedResults.js" );
include( "./library/Base/safeInvoke.js" );
include( "./library/Base/array.js" );
include( "./library/ServiceBased/Helpers.js" );
// include all library scripts specific to browse tests
include( "./library/ServiceBased/ViewServiceSet/Browse/get_default_request.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse/get_references.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse/assert_browse_error.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse.js" );
include( "./library/ServiceBased/ViewServiceSet/BrowseNext/assert_browsenext_valid.js" );
include( "./library/ServiceBased/ViewServiceSet/BrowseNext.js" );
include( "./library/ServiceBased/ViewServiceSet/BrowseNext/release_continuationpoints_test.js" );
include( "./library/ServiceBased/AttributeServiceSet/Read.js" );

// Connect to the server 
if( !Test.Connect() ) stopCurrentUnit();