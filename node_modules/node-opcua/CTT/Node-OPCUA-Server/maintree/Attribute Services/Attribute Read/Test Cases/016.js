/*  Test prepared by Mark Rice: mrice@canarylabs.com
    Description: MaxAge > Int32. Perform 2 reads where each read has a MaxAge > Int32. Request both Server and Source timestamps.
        The cached value ServerTimestamp should update, but the SourceTimestamp should not – if the value hasn’t changed
    Expectation: ServiceResult = “Good”. Ideally, the server will return a cached value, but it may obtain and return a new value from the Device. If
        the SourceTimestamp was the same on both reads, the second value, at least, was probably from the cache. [Warning issued if no caching) */

function read581018() {
    var firstTimestamp, secondTimestamp;
    var firstValue, secondValue;

    const MAX_AGE = Constants.Int32_Max + 1;

    // Read() and log the timestamp
    if( ReadHelper.Execute( { NodesToRead: originalScalarItems[0], TimestampsToReturn: TimestampsToReturn.Both, MaxAge: MAX_AGE } ) ) {
        firstValue     = UaVariantToSimpleType( ReadHelper.Response.Results[0].Value );
        firstTimestamp = ReadHelper.Response.Results[0].SourceTimestamp;
    }
    // Read() again and log the timestamp
    if( ReadHelper.Execute( { NodesToRead: originalScalarItems[0], TimestampsToReturn: TimestampsToReturn.Both, MaxAge: MAX_AGE } ) ) {
        secondValue     = UaVariantToSimpleType( ReadHelper.Response.Results[0].Value );
        secondTimestamp = ReadHelper.Response.Results[0].SourceTimestamp;
    }

    // are the timestamps the same?
    if( firstTimestamp === secondTimestamp ) addLog( "The timestamps (Source) are the same." );
    else addLog( "The timestamps (Source) are different, which is acceptable. Perhaps caching is fast, or not implemented." );

    // are the values the same?
    if( firstValue === secondValue ) {
        addLog( "The two values are the same." );
        if( firstTimestamp === secondTimestamp ) addLog( "The timestamps (Source) are ALSO the same. This Server must be Caching." );
    }
    else addLog( "The two values are different, which is acceptable. Perhaps the caching is fast, or not implemented." );
    return( true );
}

Test.Execute( { Procedure: read581018 } );