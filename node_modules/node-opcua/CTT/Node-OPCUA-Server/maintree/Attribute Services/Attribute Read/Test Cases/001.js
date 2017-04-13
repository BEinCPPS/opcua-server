/*  Test prepared by Development; compliance@opcfoundation.org
    Description: Read a single attribute from a valid node. */

function read581001() {
    var monitoredItems = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings, 0, Attribute.Value, "", MonitoringMode.Reporting, true, null, 1, 0, TimestampsToReturn.Both, true );
    if( monitoredItems == null || monitoredItems.length == 0 ) { addSkipped( SETTING_UNDEFINED_SCALARSTATIC ); return( false ); }
    return( ReadHelper.Execute( { NodesToRead: monitoredItems[0], TimestampsToReturn: TimestampsToReturn.Server } ) );
}// function read581001() 

Test.Execute( { Procedure: read581001 } );