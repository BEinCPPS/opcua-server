/*  Test prepared by Mark Rice: mrice@canarylabs.com
    Description: Read a data value with timestampsToReturn = SOURCE. */

function read581007() {
    ReadHelper.Execute( { NodesToRead: originalScalarItems[0], TimestampsToReturn: TimestampsToReturn.Source } );
    Assert.NotEqual( new UaDateTime(), ReadHelper.Response.Results[0].SourceTimestamp, "Read.Response.Results[0].SourceTimestamp should not be empty." );
    return( true );
}

Test.Execute( { Procedure: read581007 } );