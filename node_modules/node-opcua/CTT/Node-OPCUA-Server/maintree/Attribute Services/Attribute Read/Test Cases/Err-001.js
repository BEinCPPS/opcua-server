/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read the 'executable' attribute from a valid node that is known NOT to have the attribute */

function read581Err001() {
    var items = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, Attribute.Executable, undefined, undefined, undefined, undefined, undefined, undefined, undefined, true );
    if( items == null || items.length == 0 ) {
        addSkipped( SETTING_UNDEFINED_SCALARSTATIC );
        return( false );
    }
    return( ReadHelper.Execute( { NodesToRead: items[0], TimestampsToReturn: TimestampsToReturn.Both, MaxAge: 100, OperationResults:  [ new ExpectedAndAcceptedResults( StatusCode.BadAttributeIdInvalid ) ] } ) );
}

Test.Execute( { Procedure: read581Err001 } );