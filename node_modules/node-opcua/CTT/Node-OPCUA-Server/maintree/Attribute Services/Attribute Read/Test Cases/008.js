/*  Test prepared by Mark Rice mrice@canarylabs.com
    Description: Read a data value with timestampsToReturn = SERVER. */

function read581008() {
    ReadHelper.Execute( { NodesToRead: originalScalarItems[0], TimestampsToReturn: TimestampsToReturn.Server } );
    Assert.NotEqual( new UaDateTime(), ReadHelper.Response.Results[0].ServerTimestamp, "Read.Response.Results[0].ServerTimestamp should not be empty." );
    return( true );
}

Test.Execute( { Procedure: read581008 } );