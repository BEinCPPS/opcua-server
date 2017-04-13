/*  Test prepared by Mark Rice: mrice@canarylabs.com
    Description: Read a data value with TimestampsToReturn = BOTH. */

function read581006() {
    if( ReadHelper.Execute( { NodesToRead: originalScalarItems, TimestampsToReturn: TimestampsToReturn.Both, MaxAge: 10000 } ) ) {
      addLog( "Timestamp SOURCE_0: " + ReadHelper.Response.Results[0].SourceTimestamp );
      addLog( "Timestamp SERVER_1: " + ReadHelper.Response.Results[0].ServerTimestamp );
      Assert.NotEqual( new UaDateTime(), ReadHelper.Response.Results[0].SourceTimestamp, "Expect a Source timestamp." );
      Assert.NotEqual( new UaDateTime(), ReadHelper.Response.Results[0].ServerTimestamp, "Expect a Server timestamp." );
    }
    return( true );
}

Test.Execute( { Procedure: read581006 } );