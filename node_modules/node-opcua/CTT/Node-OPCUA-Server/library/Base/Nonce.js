var Nonce = {
    Value: "",                                                                             // stores the current nonce
    ServerHistory: [],                                                                     // stores server nonce values
    ClientHistory: [],                                                                     // stores client nonce values
    Next: function( length ) {
        var s = "";                                                                        // will store our newly generate nonce
        var nonceLength = ( length !== undefined && length !== null ) ? length: 32;        // determine the length of the nonce to create 
        for( var i=0; i<nonceLength; i++ ) s += parseInt( 10 * Math.random() ).toString(); // randomize each character into a nonce-string
        this.Value = s;                                                                    // store the new nonce in the Value property
        this.ServerHistory.push( s );                                                      // store the new nonce in history
        return( s );                                                                       // return the nonce
    },
    Contains: function( nonceToFind ) {
        if( nonceToFind === undefined || nonceToFind === null ) return( false );            // no nonce specified
        for( var h=0; h<this.ServerHistory.length; h++ ) {                                  // iterate thru the specified history
            if( this.ServerHistory[h] === nonceToFind ) {                                   // found a match?
                return( true );
            }
        }//for h...
        this.ServerHistory.push( nonceToFind );                                             // we didn't find the nonce, so store it in history for next time.
        return( false );
    },
    IsValid: function( nonce ) {
        if( nonce === undefined || nonce === null ) return( false );
        if( !isDefined( nonce.length ) ) return( false );
        else return( nonce.length === 32 );
    }
};