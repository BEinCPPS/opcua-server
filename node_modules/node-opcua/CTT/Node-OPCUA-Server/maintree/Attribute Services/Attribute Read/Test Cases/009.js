/*  Test prepared by Mark Rice mrice@canarylabs.com
    Description: Read a data value with TimestampsToReturn = NEITHER. */

function read581009() {
    ReadHelper.Execute( { NodesToRead: originalScalarItems[0], TimestampsToReturn: TimestampsToReturn.Neither } );
    Assert.Equal( new UaDateTime(), ReadHelper.Response.Results[0].SourceTimestamp, "Read.Response.Results[0].SourceTimestamp should be empty." );
    Assert.Equal( new UaDateTime(), ReadHelper.Response.Results[0].ServerTimestamp, "Read.Response.Results[0].ServerTimestamp should be empty." );
    return( true );
}

Test.Execute( { Procedure: read581009 } );