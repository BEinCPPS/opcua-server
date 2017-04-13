include( "./library/Base/safeInvoke.js" );
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds/create_request.js" );
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds/translateBrowsePathsToNodeIdsHelper.js" );
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds/test_translatebrowsepathstonodeids_basic.js" );
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds/test_translateBrowsePathsToNodeIds_mix.js" );
include( "./library/ServiceBased/ViewServiceSet/TranslateBrowsePathsToNodeIds/diagnostic_mask_test.js" );
include( "./library/ServiceBased/ViewServiceSet/Browse/get_references.js");
include( "./library/ClassBased/UaQualifiedName/create_qualified_name.js" );
include( "./library/ClassBased/UaNodeId/create_nodeid.js" );
include( "./library/ServiceBased/Helpers.js" );


function checkSettings() {
const SETTING = "/Server Test/NodeIds/NodeClasses/Variable";
    if( readSetting( SETTING ).toString() === "" ) {
        addError( "Please check setting: '" + SETTING + "'." );
        return( false );
    }
    return( true );
}

if( !checkSettings() ) {
    stopCurrentUnit();
}
else {
    if( !Test.Connect() ) {
        addError( "Connect failed. Stopping execution of current conformance unit." );
        stopCurrentUnit();
    }
}