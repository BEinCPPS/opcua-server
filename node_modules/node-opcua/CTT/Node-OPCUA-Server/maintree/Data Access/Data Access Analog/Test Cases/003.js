/*  Test prepared by Anand Taparia; ataparia@kepware.com
    Description: Read the EURange property of an analog node. */

function read613003() {
    if( AnalogItems == null || AnalogItems.length == 0 ) {
        addSkipped( "Static Analog" );
        return( false );
    }
    // Read the EURange property of a single analog node
    var analogNodeEURange = GetNodeIdEURange( AnalogItems[0].NodeSetting );
    if ( analogNodeEURange != null) addLog( "EURange property of analog node '" + AnalogItems[0].NodeSetting + "' is: " + analogNodeEURange );
    else addError( "Unable to read the EURange property of the analog node '" + AnalogItems[0].NodeSetting + "'." );
    return( true );
}// function read613003()

Test.Execute( { Procedure: read613003 } );