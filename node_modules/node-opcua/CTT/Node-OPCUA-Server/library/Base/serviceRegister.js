include( "./library/Base/safeInvoke.js" );

var ServiceRegister = {
    _services: [],

    // Registers a service (see "UaService", below) to the list.
    Register: function( args ) {
        if( !isDefined( args ) ) throw( "args not specified." );
        if( !isDefined( args.Service ) ) throw( "args.Service not specified." );
        if( !isDefined( args.Service.length ) ) args.Service = [ args.Service ];
        for( var s=0; s<args.Service.length; s++ ){ 
            if( !ServiceRegister.Exists( { Service: args.Service[s] } ) ) ServiceRegister._services.push( args.Service[s] );
        }//for s
        }, // Register: function( args )

    // Returns an array of registered services.
    List: function( args ) {
        return( ServiceRegister._services );
        }, // List: function( args )

    // Checks if the specified service is already registered
    Exists: function( args ) { 
        if( !isDefined( args ) ) throw( "args not specified." );
        if( !isDefined( args.Service ) ) throw( "args.Service not specified." );
        for( var s=0; s<ServiceRegister._services.length; s++ ) {
            if( ServiceRegister._services[s].Name === args.Service.Name ) return( true );
        }
        return( false );
        }, // Exists: function( args ) 

    // Clears the list (mostly for testing purposes)
    Clear: function() { ServiceRegister._services = []; },

    // Marks a Service as failing a test
    SetFailed: function( args ) { 
        if( !isDefined( args ) ) throw( "args not specified." );
        if( !isDefined( args.Name ) ) throw( "args.Name not specified." );
        for( var i=0; i<ServiceRegister._services.length; i++ ) {
            if( ServiceRegister._services[i].Name === args.Name ) {
                ServiceRegister._services[i].Failed = true;
                break;
            }
        }//for i
        }, // SetFailed: function( args ) 

    // Marks a Service as not implemented
    SetNotSupported: function( args ) {
        if( !isDefined( args ) ) throw( "args not specified" );
        if( !isDefined( args.Name ) ) throw( "args.Name not specified." );
        for( var i=0; i<ServiceRegister._services.length; i++ ) {   // iterate thru all registered services
            if( ServiceRegister._services[i].Name === args.Name ) { // found a match?
                ServiceRegister._services[i].Available = false;     // available is false because it's not supported!
                break;
            }//if matched
        }//for i...
    },

    // Marks a Service as being tested 
    SetTested: function( args ) { 
        if( !isDefined( args ) ) throw( "args not specified." );
        if( !isDefined( args.Name ) ) throw( "args.Name not specified." );
        for( var i=0; i<ServiceRegister._services.length; i++ ) {
            if( ServiceRegister._services[i].Name === args.Name ) {
                ServiceRegister._services[i].Tested = true;
                break;
            }
        }//for i
    }, // SetTested: function( args )

    // Shows a report
    toString: function() {
        var str = "Service".pad( { Length: 20 } ) + "Available".pad( { Length: 20 } ) + "Tested".pad( { Length: 20 } ) + "Status".pad( { Length: 20 } ) + "\n";
        for( var s=0; s<ServiceRegister._services.length; s++ ){ 
            str += ServiceRegister._services[s].Name.toString().pad( { Length: 20 } ) + ServiceRegister._services[s].Available.toString().pad( { Length: 20 } );
            if( ServiceRegister._services[s].Available ) {
                str += ServiceRegister._services[s].Tested.toString().pad( { Length: 20 } );
                if( isDefined( ServiceRegister._services[s].Failed ) ) str += "Failed".toString().pad( { Length: 20 } ); else str += "Passed".toString().pad( { Length: 20 } )
            }
            str += "\n";
        }//for s
        return( str );
    },


    // UaService, namespace; represents a UA Service 
    UaService: function( args ) {
            if( !isDefined( args ) ) throw( "args not specified." );
            if( !isDefined( args.Name ) ) throw( "args.Name not specified" );
            if( !isDefined( args.Available ) ) throw( "args.Available not specified." ); 
            if( !isDefined( args.Tested ) ) args.Tested = false; else args.Tested = false;
            return( { Name: args.Name, Available: args.Available, Tested: args.Tested } );
            }, // UaService

}// var ServiceRegister = {