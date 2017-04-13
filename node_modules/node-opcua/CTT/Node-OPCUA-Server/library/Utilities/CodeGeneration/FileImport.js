/* In Excel, export the Sheet into a new XLS and the crop the headers.
   Export to CSV (first in the list).
   Clear any spurious LFs
   Replace any commas
   Make sure TestCase and ExpectedResults do not have spaces */

include( "./library/Base/safeInvoke.js" );

const EXCEL_EOL = String.fromCharCode( 9 ) + String.fromCharCode( 10 );

function UACTTFileImport() { }

/* PUBLIC functions include: 
        UACTTFileImport.FileExists = function( args ): returns True or False
        UACTTFileImport.OpenTXT = function( args )   : returns 2d array of lines and columns

   PRIVATE functions include: 
        UACTTFileImport.getLines = function( args )
        UACTTFileImport.getColumns = function( args )
*/


/* Parameters: 
    FirstLine: the first line that contains the headings
    Line: the line to parse
    Delimiter: the character/string to delimit on */
UACTTFileImport.getColumns = function( args ) {
    if( !isDefined( args ) ) throw( "arguments not specified. UACTTFileImport.getColumns" );
    if( !isDefined( args.FirstLine ) ) throw( "line not specified. UACTTFileImport.getColumns" );
    if( !isDefined( args.Line ) ) throw( "line not specified. UACTTFileImport.getColumns" );
    if( args.Line.length === 0 ) return( null );
    if( !isDefined( args.Delimiter ) ) args.Delimiter = ",";
    var object = new Object();
    var headings = args.FirstLine.split( args.Delimiter );
    var values   = args.Line.split( args.Delimiter );
    if( headings.length === 0 || values.length === 0 ) throw( "count mismatch: headings and values. UACTTFileImport.getColumns" );
    for( var c=0; c<headings.length; c++ ){
        var h = headings[c].toString().replace( /\"/gi, "" ).replace( /\" \"/gi, "" ).replace( /\s/gi, "" ).replace( /\./gi, "" );
        var v = values.length > c? values[c].toString().replace( /\"/gi, "" ) : "";
        object[h] = v;
    }
    return( object );
}// UACTTFileImport.getColumns = function( args )


UACTTFileImport.getLines = function( args ) {
    if( !isDefined( args ) ) throw( "arguments not specified. UACTTFileImport.FileExists" );
    if( !isDefined( args.Filename ) ) throw( "filename not specified. UACTTFileImport.FileExists" );
    if( !isDefined( args.Delimiter ) ) args.Delimiter = "\n";
    var lines = readFile( args.Filename ).toString().split( args.Delimiter );
    return( lines );
}// UACTTFileImport.getLines = function( args )


/* Returns true/false if a file exists/not */
UACTTFileImport.FileExists = function( args ) {
    return( isDefined( UACTTFileImport.getLines( { Filename: args.Filename } ) ) );
}// UACTTFileImport.FileExists = function( args )


/* Opens a text file and returns an array of lines, each array having an array of columns.
   Parameters include: 
     Filename: 
     Delimiter:
     LineDelimiter: */
UACTTFileImport.OpenTXT = function( args ) {
    if( !isDefined( args ) ) throw( "arguments not specified. UACTTFileImport.OpenTXT" );
    if( !isDefined( args.Filename ) ) throw( "filename not specified. UACTTFileImport.OpenTXT" );
    if( !UACTTFileImport.FileExists( { Filename: args.Filename } ) ) throw( "filename not found '" + args.Filename + ". UACTTFileImport.OpenTXT" );
    if( !isDefined( args.Delimiter ) ) args.Delimiter = ",";
    if( !isDefined( args.LineDelimiter ) ) args.LineDelimiter = "\n";
    var lines = UACTTFileImport.getLines( { Filename: args.Filename, Delimiter: args.LineDelimiter } );
    if( lines.length === 0 ) throw( "no data found in file '" + args.Filename + "'." );
    var records = [];
    for( var l=1; l<lines.length-1; l++ ) {
        var lineCols = UACTTFileImport.getColumns( { Line: lines[l], Delimiter: args.Delimiter, Object: lineCols, FirstLine: lines[0] } );
        if( lineCols !== null ) records.push( lineCols );
    }
    return( records );
}// UACTTFileImport.OpenTXT = function( args )

function TestCase( rec ) {
    this.toString = function() {
        var s= "<testcase name=\"" + this.Number + "\">\n" + 
                "\t<summary><![CDATA[" + this.Summary + "]]></summary>\n" +
                "\t<preconditions><![CDATA[" + this.PreConditions + "]]></preconditions>\n" +
                "\t<execution_type><![CDATA[1]]></execution_type>\n" +
                "\t<importance><![CDATA[2]]></importance>\n" + 
                "<steps>\n";
        for( var i=0; i<this.Steps.length; i++ ) s += this.Steps[i].toString();
        s += "</steps>\n" +
             "</testcase>\n";
        return( s );
    };
    this.AddStep = function( step ) {
        var newStep = new Object();
        newStep.Number = this.Steps.length;
        newStep.Actions = step.TestCase;
        newStep.ExpectedResults = step.ExpectedResults;
        newStep.toString = function() {
            var s = "<step>\n" +
                    "\t<step_number><![CDATA[" + ( 1 + this.Number ) + "]]></step_number>\n" +
                    "\t<actions><![CDATA[" + ( this.Actions.length > 0? this.Actions + TestCase.GetTestCaseDetails( step ) : TestCase.GetTestCaseDetails( step ) ) + "]]></actions>\n" +
                    "\t<expectedresults><![CDATA[" + this.ExpectedResults + "]]></expectedresults>\n" +
                    "\t<execution_type><![CDATA[1]]></execution_type>\n" +
                    "</step>\n";
            return( s );
        }
        this.Steps.push( newStep );
    };
    TestCase.GetTestCaseDetails = function( rec ) {
        var s = "\n\nParameter Details: ";
        for( field in rec ) {
            switch( field.toString() ) {
                case "TestCase": break;
                case "ExpectedResults": break;
                case "No": break;
                case "Script": break;
                case "ScriptY": break;
                case "ReviewStatus": break;
                case "CTT": break;
                case "Step": break;
                default: if( rec[field].toString().length > 0 ) s += field + "='" + rec[field] + "'. ";
            }//switch
        }//for field..
        return( s );
    }
    this.Number = ( rec.CTT.toLowerCase() !== "y" ? "Err-" + String.prototype.padDigits( rec.No, 3 ) : String.prototype.padDigits( rec.No, 3 ) );
    this.Summary = rec.TestCase + TestCase.GetTestCaseDetails( rec );
    this.PreConditions = rec.ExpectedResults;
    this.Steps = [];
}

TestLink = new Object();
TestLink.testcases = [];
TestLink.AddTest = function( tc ) { TestLink.testcases.push( tc ) };
TestLink.toString = function() {
    var s = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
            "<testcases>\n";
    for( var i=0; i<TestLink.testcases.length; i++ ) s += TestLink.testcases[i].toString();
    s += "</testcases>"
    return( s );
}









//var records = UACTTFileImport.OpenTXT( { Filename: "c:\\temp\\readraw.txt", Delimiter: "\t", LineDelimiter: EXCEL_EOL } );
var records = UACTTFileImport.OpenTXT( { Filename: "c:\\temp\\readraw.csv", Delimiter: ",", LineDelimiter: "\n" } );
var currRecord, lastRecord;
for( var r=0; r<records.length; r++ ) {
    currRecord = records[r];
    var currTL;
    if( currRecord.TestCase.length !== 0 ) {
        if( isDefined( currTL ) ) TestLink.AddTest( currTL );
        print( "Test # " + currRecord.No + "; TestCase: " + currRecord.TestCase + "; Expectation: " + currRecord.ExpectedResults );
        lastRecord = currRecord;
        currTL = new TestCase( currRecord );
    }
    else {
        if( !isDefined( lastRecord ) ) continue;
        print( "\t(continuation)\t # " + lastRecord.No );
        currTL.AddStep( currRecord );
    }
}
//writeFile( "c:\\temp\\testlink-testcases.xml", TestLink.toString() );
print( TestLink.toString() );