//* UaVariantToSimpleType
include( "./library/Base/safeInvoke.js" );
include( "./library/Base/assertions.js" );
include( "./library/RunOnce/redefiners.js" );

// ExpectedResults
var success=0, fail=0;
try{ var er = new ExpectedResults(); success++; } catch( ex ) { addError( ex.toString() ); fail++; }
try{ var er = new ExpectedResults( { Expected: [ StatusCode.Good ] } ); success++; } catch( ex ) { addError( ex.toString() ); fail++; }
try{ var er = new ExpectedResults( { Expected: [ StatusCode.Good ] } ); if( er.containsExpectedStatus( StatusCode.Good ) ) success++; else fail++; } catch( ex ) { addError( ex.toString() + " or 'containsExpectedStatus'" ); fail++; }
try{ var er = new ExpectedResults( { Expected: [ StatusCode.Good ] } ); if( !er.containsExpectedStatus( 123 ) ) success++; else fail++; } catch( ex ) { addError( ex.toString() + " or '!containsExpectedStatus'" ); fail++; }
try{ var er = new ExpectedResults( { Accepted: [ StatusCode.Good ] } ); if( er.containsAcceptedStatus( StatusCode.Good ) ) success++; else fail++; } catch( ex ) { addError( ex.toString() + " or 'containsAcceptedStatus'" ); fail++; }
try{ var er = new ExpectedResults( { Accepted: [ StatusCode.Good ] } ); if( !er.containsAcceptedStatus( 123 ) ) success++; else fail++; } catch( ex ) { addError( ex.toString() + " or '!containsAcceptedStatus'" ); fail++; }

// ExpectedAndAcceptedResults
var exp = new ExpectedAndAcceptedResults( StatusCode.Good );
exp.addExpectedResult( StatusCode.BadUnexpectedError );
exp.addExpectedResult( [ StatusCode.BadInternalError, StatusCode.BadResourceUnavailable, StatusCode.BadCommunicationError ] );
exp.addAcceptedResult( StatusCode.BadOutOfMemory );
exp.addAcceptedResult( [ StatusCode.BadEncodingError, StatusCode.BadDecodingError ] );
print( exp.containsStatusCode( StatusCode.BadOutOfMemory ) );
print( "ExpectedResults contains:\n\t" + exp.ExpectedResults.toString() );
print( "AcceptedResults contains:\n\t" + exp.AcceptedResults.toString() );

// IncrementUaVariant
include( "./library/Base/UaVariantToSimpleType.js" );
var range = new UaRange();
range.Low = 10;
range.High = 15;
var func = "UaVariant.Increment:";
var v = new UaVariant();
v.setBoolean( false ); UaVariant.Increment( { Value: v } ); Assert.Equal( true,  v.toBoolean(), func + "Bool(true1)" );
                       UaVariant.Increment( { Value: v } ); Assert.Equal( false, v.toBoolean(), func + "Bool(false1)" );
                       UaVariant.Increment( { Value: v } ); Assert.Equal( true,  v.toBoolean(), func + "Bool(true2" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( false, v.toBoolean(), func + "Bool(false2) [range]", "Bool [range]" );
v.setByte( 0 );        UaVariant.Increment( { Value: v } ); Assert.Equal( 1, v.toByte(), func + "Byte", "Byte"  );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toByte(), func + "Byte [range]", "Byte [range]" );
v.setDouble( 10 );     UaVariant.Increment( { Value: v } ); Assert.Equal( 11, v.toDouble(), func + "Double", "Double" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( 11, v.toDouble(), func + "Double [range]", "Double [range]" );
v.setFloat( 25 );      UaVariant.Increment( { Value: v } ); Assert.Equal( 26, v.toFloat(), func + "Float", "Float" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toFloat(), func + "Float [range]", "Float [range]" );
v.setInt16( 50 );      UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toInt16(), func + "Int16" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toInt16(), func + "Int16 [range]" );
v.setInt32( 50 );      UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toInt32(), func + "Int32" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toInt32(), func + "Int32 [range]" );
v.setInt64( 50 );      UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toInt64(), func + "Int64" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toInt64(), func + "Int64 [range]" );
v.setUInt16( 50 );     UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toUInt16(), func + "UInt16" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toUInt16(), func + "UInt16 [range]" );
v.setUInt32( 50 );     UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toUInt32(), func + "UInt32" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toUInt32(), func + "UInt32 [range]" );
v.setUInt64( 50 );     UaVariant.Increment( { Value: v } ); Assert.Equal( 51, v.toUInt64(), func + "UInt64" );
                       UaVariant.Increment( { Value: v, Range: range } ); Assert.Equal( range.Low, v.toUInt64(), func + "UInt64 [range]" );
// */


// ExpectedAndAcceptedResults
include( "./library/Base/Objects/expectedResults.js" );
var v;
try{v=new ExpectedResults();}catch(e){addError("ExpectedResults() error: " + ex.toString());};
try{v=new ExpectedResults(1);if( v.ExpectedResults.length !== 0 ) addError("ExpectedErrors<>0");}catch(e){addError(e.toString());}
try{v=new ExpectedResults({Expected:StatusCode.Good});if(v.ExpectedResults.length !== 1 )addError("ExpectedResults<>1; len="+v.ExpectedResults.length);}catch(e){addError(e.toString());}
try{v=new ExpectedResults({Accepted:StatusCode.Good});if(v.AcceptedResults.length !== 1 )addError("AcceptedResults<>1; len="+v.AcceptedResults.length);}catch(e){addError(e.toString());}


// ServiceRegister
include( "./library/Base/serviceRegister.js" );
try{ var u = ServiceRegister.UaService(); print( "FAIL, ctor()" ); } catch(e){};
try{ var u = ServiceRegister.UaService( { Name: "Read" } ); print( "FAIL, ctor( name )" ); } catch(e){};
try{ var u = ServiceRegister.UaService( { Name: "Read", Available: true } ); } catch(e){ print( "FAIL, ctor( name, available ); error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: ServiceRegister.UaService( { Name: "Read", Available: true } ) } ); if( ServiceRegister._services.length !== 1 )print( "FAIL, length != 1. _services.length: " + ServiceRegister._services.length ); } catch(e){ print( "FAIL, Services.Add; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: ServiceRegister.UaService( { Name: "Read", Available: true } ) } ); if( ServiceRegister.List.length !== 1 )print( "FAIL, Services.List.length != 1. Length: " + ServiceRegister.List.length ); } catch(e){ print( "FAIL, Services.Add; error: " + e.toString() ); }
try{ var u = ServiceRegister.UaService( { Name: "Read", Available: true } ); ServiceRegister.Register( { Service: u } ); if( !ServiceRegister.Exists( { Service: u } ) ) print( "FAIL, Services.Exists() not found." ); ServiceRegister.Clear(); } catch(e){ print( "FAIL, Services.Exists; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: ServiceRegister.UaService( { Name: "Read", Available: true } ) } ); if( ServiceRegister._services.length !== 1 )print( "FAIL, length != 1. _services.length: " + ServiceRegister._services.length ); ServiceRegister.Clear(); if( ServiceRegister._services.length !== 0 ) print( "FAIL: length != 0 after clear!" ); } catch(e){ print( "FAIL, Services.Add; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: [ ServiceRegister.UaService( { Name: "Read", Available: true } ), ServiceRegister.UaService( { Name: "Write", Available: true } ) ] } ); print( "ServiceRegister.toString():\n" + ServiceRegister.toString() ); if( ServiceRegister._services.length !== 2 )print( "FAIL, length != 2. _services.length: " + ServiceRegister._services.length ); ServiceRegister.Clear(); if( ServiceRegister._services.length !== 0 ) print( "FAIL: length != 0 after clear!" ); } catch(e){ print( "FAIL, Services.Add[]; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: [ ServiceRegister.UaService( { Name: "Read", Available: true } ), ServiceRegister.UaService( { Name: "Write", Available: true } ) ] } ); ServiceRegister.SetTested( { Name: "Read" } ); print( "ServiceRegister.toString():\n" + ServiceRegister.toString() ); if( ServiceRegister._services[0].Tested !== true ) print( "FAIL, 'Read'.Tested not set." ); ServiceRegister.Clear(); } catch(e){ print( "FAIL, Services.SetTested; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: [ ServiceRegister.UaService( { Name: "Read", Available: true } ), ServiceRegister.UaService( { Name: "Read", Available: true } ), ServiceRegister.UaService( { Name: "Read", Available: true } ) ] } ); if( ServiceRegister._services.length !== 1 ) print( "FAIL: duplicates added!-->\n" + ServiceRegister.toString() + "\n<--" ); ServiceRegister.Clear(); } catch(e){ print( "FAIL, Services.SetTested; error: " + e.toString() ); }
try{ ServiceRegister.Register( { Service: [ ServiceRegister.UaService( { Name: "Read", Available: true } ), ServiceRegister.UaService( { Name: "Write", Available: true } ) ] } ); ServiceRegister.SetFailed( { Name: "Read" } ); print( "ServiceRegister.toString():\n" + ServiceRegister.toString() ); if( ServiceRegister._services[0].Failed !== true ) print( "FAIL, 'Read'.Failed not set." ); ServiceRegister.Clear(); } catch(e){ print( "FAIL, Services.SetFail; error: " + e.toString() ); }
print( "ServiceRegister testing, COMPLETE" );



// ResponseHeader 
var r = UaResponseHeader.New();
r = UaResponseHeader.New( { RequestHandle: 5 } );
r = UaResponseHeader.New( { RequestHandle: 5, ServiceResult: StatusCode.Good } );