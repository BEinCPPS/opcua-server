/* Simple queue object. Functions include: 
        this.Contains = function( obj ) 
        this.Push = function( obj )
        this.GetFirst = function()
        this.GetLast = function() 
        this.Length = function()
        this.GetMaxLength = function()
        this.Clear = function()
        this.toString = function() */
function JSQueue( length ) {
    var _length = ( length === undefined || length === null || parseInt( length ) <= 0 )? 10 : parseInt( length );
    var _items = [];
    var _i = 0;

    // gets the current length
    this.Length = function() { 
        if( _items.length === _length ) return ( _length );
        else return( _i );
    }// this.Length = function()

    // returns TRUE if specified object exists alredy
    this.Contains = function( obj ) { 
        for( var i=0; i<+_i; i++ ) { 
            if( _items[i] === obj ) return( true );
        }//for i
        return( false );
    }// this.Contains = function( obj ) 

    // add the specified object to the internal array
    this.Push = function( obj ) { 
        // wrap around to beginning to prevent overfill?
        if( _i >= _length ) _i = 0;
        _items[_i++] = obj;
    }// this.Push = function( obj ) 

    // returns the first object in the queue
    this.GetFirst = function() {
        return( _items[0] );
    }// this.GetFirst = function()

    // returns the last object in the queue
    this.GetLast = function() {
        return( _items[_i] );
    }// this.GetLast = function() 

    // return the max size of the queue
    this.GetMaxLength = function() {
        return( _length );
    }// this.GetMaxLength = function()

    // clear the queue
    this.Clear = function() {
        _items = [];
        _i = 0;
    }// this.Clear = function() 

    // show the queue contents
    this.toString = function() { 
        var s = "Length: " + _i + "; [";
        for( i=0; i<_i; i++ ) {
            s += _items[i].toString();
            if( i !== (_i - 1) ) s += "; ";
        }//for i
        s += "]";
        return( s );
    }// this.toString = function() 
}// function JSQueue() 

/* TEST CODE
var q = new JSQueue(); print( "length, expected 10, received: " + q.GetMaxLength() + "; pass? " + ( 10 === q.GetMaxLength() ) );
q = new JSQueue( 5 );  print( "length, expected 5,  received: " + q.GetMaxLength() + "; pass? " + ( 5  === q.GetMaxLength() ) );
q = new JSQueue( "0" );print( "length, expected 10, received: " + q.GetMaxLength() + "; pass? " + ( 10 === q.GetMaxLength() ) );
//fill queue
for( var i=0; i<10; i++ ) { q.Push( i.toString() ); }
print( "toString(), length>0?: " + q.toString() + "; pass?" + ( q.toString().length > 0 ) );
//exceed queue
for( var i=0; i<10; i++ ) { q.Push( (10 + i).toString() ); }
print( "toString(), length>0?: " + q.toString() + "; pass?" + ( q.toString().length > 0 ) );
//*/