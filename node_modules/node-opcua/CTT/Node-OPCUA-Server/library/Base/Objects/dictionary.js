/* Simple dictionary container.
   
   Revision History:
       02-May-2012 NP: Initial version.
*/
function Dictionary( initialValues ) {
    this._values = [];

    // Add new values to the array (at the end)
    this.Add = function( values ) {
        if( values !== undefined && values !== null )
        {
            if( values.length === undefined ){ values = [ values ]; }
            this._values = this._values.concat( values );
        }
    }

    // a wrapper for 'Add'
    this.push = function( values ) {
        this.Add( values );
    }

    // returns the length of the collection
    this.length = function() {
        return( this._values.length );
    }

    // Insert new values into the specified position
    this.Insert = function( position, values ) {
        if( position === undefined || position === null ){ this.Add( values ); }
        if( values.length === undefined ){ values = [ values ]; }
        for( var v=0; v<values.length; v++ ) {
            this._values.splice( position, 0, values[v] );
        }
    }

    // Remove specific values from the array
    this.Remove = function( values ) {
        if( values !== undefined && values !== null )  {
            if( typeof values === "string" || values.length === undefined ){ values = [ values ]; }
            for( var v=0; v<values.length; v++ ) {
                for( var a=0; a<this._values.length; a++ ) {
                    if( values[v] === this._values[a] ) {
                        this._values.splice( a, 1 );
                        break;
                    }
                }
            }//for v
        }
    }

    // Remove values from specific positions within the array
    this.RemoveAt = function( position, number ) {
        if( position === undefined || position === null )return;
        if( number === undefined || number === null ){ number = 1; }
        for( var i=0; i<number; i++ ) {
            this._values.splice( position, 1 );
        }
    }
 
     // returns the position of the first-found value 
    this.IndexOf = function( value ) {
        var pos = -1;
        for( var i=0; i<this._values.length; i++ ) {
            if( this._values[i] === value ) {
                pos = i;
                break;
            }
        }
        return( pos );
    }

    // returns TRUE/FALSE if the specified value exists in the collection
    this.Contains = function( value ) { 
        return( this.IndexOf( value ) >= 0 );
    }// this.Contains = function( value ) 
    
    // Output the array as a string
    this.toString = function() {
        return( this._values.toString() );
    }

    /* returns an object of 2-arrays:
            - Values: each unique value stored in the dictionary
            - Count: how many times that value appears */
    this.ToCountSummary = function() {
        var result = new Object();
        result.Values = new Dictionary();
        result.Count = new Dictionary();
        // loop one, create the unique values 
        for( var i=0; i<this._values.length; i++ ) {
            var index = this.IndexOf( this._values[i] );
            if( index >= 0 ) {
                // only add unique values 
                if( result.Values.IndexOf( this._values[i] ) < 0 ) {
                    result.Values.Add( this._values[i] );
                    result.Count.Add( 0 );
                }
            }
        }//for i
        // loop two, count the values 
        for( var i=0; i<this._values.length; i++ ) {
            var index = result.Values.IndexOf( this._values[i] );
            result.Count._values[index] = ( 1 + parseInt( result.Count._values[index] ) );
        }//for i
        return( result );
    }

    // returns the Value and Count of the object stored in the dictionary the most
    this.ToHighestOccurrence = function() {
        var summary = this.ToCountSummary();
        // loop one, find the biggest number
        var biggestNumber=0;
        for( var i=0; i<summary.Count._values.length; i++ ) { 
            if( biggestNumber < summary.Count._values[i] ) {
                biggestNumber = summary.Count._values[i]; 
            }
        }
        // now to prepare the results
        var result = new Object();
        result.Values = new Dictionary();
        result.Count = new Dictionary();
        // loop through the values searching for matches of the biggest number
        for( var i=0; i<summary.Count._values.length; i++ ) {
            if( summary.Count._values[i] === biggestNumber ) {
                result.Values.Add( summary.Values._values[i] );
                result.Count.Add( summary.Count._values[i] );
            }
        }
        return( result );
    }


    if( initialValues !== undefined ){ this.Add( initialValues ); }
}

/*// test code
var d = new Dictionary( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );
print( "Dictionary: " + d.toString() );
d.Insert( 2, [ "a", "b", "c" ] );
print( "Dictionary (inserted): " + d.toString() );
d.Remove( "b" );
print( "Dictionary (removed): " + d.toString() );
d.Remove( [ "a", "c" ] );
print( "Dictionary (removed): " + d.toString() );
d.RemoveAt( 0, 5 );
print( "Dictionary (removed first 5): " + d.toString() );
d.RemoveAt( 10 );
print( "Dictionary (removed 10): " + d.toString() );
var d = new Dictionary();
d.Add( "hello" );
d.Add( "world" );
d.Add( "Free" );
print( "Contains 'Dictionary'?: " + d.Contains( "Dictionary" ) );
d.Add( "Dictionary" );
print( "Contains 'Dictionary'?: " + d.Contains( "Dictionary" ) );
print( "d: " + d.toString() );
d.Remove( "Free" );
print( "d: " + d.toString() );
d.Remove( "world" );
print( "d: " + d.toString() );
d.Add( [ 1, 1, 2, 3, 4, 1, 1, 2, 1, 3, 1, 1, 1, 3, 1, 2, 2, 2] );
print( "d: " + d.toString() );
var summary = d.ToCountSummary();
print( "Summary:\n\tValues: " + summary.Values.toString() + "\n\tCounts: "+ summary.Count.toString() );
summary = d.ToHighestOccurrence();
print( "Most occurrences:\n\tValues: " + summary.Values.toString() + "\n\tCounts: "+ summary.Count.toString() );
d.Add( [ 2, 2, 2, 2 ] );
summary = d.ToHighestOccurrence();
print( "Most occurrences:\n\tValues: " + summary.Values.toString() + "\n\tCounts: "+ summary.Count.toString() );
//*/