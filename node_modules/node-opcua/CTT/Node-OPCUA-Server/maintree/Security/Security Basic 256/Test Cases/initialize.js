const CU_NAME = "Security Basic 256";
const SECURITY_POLICYURI_BASIC128RSA15 = "http://opcfoundation.org/UA/SecurityPolicy#Basic128Rsa15";
const SECURITY_POLICYURI_BASIC256 = "http://opcfoundation.org/UA/SecurityPolicy#Basic256";

include( "./library/Base/safeInvoke.js" );


// Some functions useful to this CU
function findUsernameInEndpoints( endpoint ) {
    var s = false;
    for( var u=0; u<endpoint.UserIdentityTokens.length; u++ ) {
        if( endpoint.UserIdentityTokens[u].TokenType === UserTokenType.UserName ) {
            s = true;
            break;
        }
    }
    return( s );
}

function findAnonymousInEndpoints( endpoint ) {
    var s = false;
    for( var u=0; u<endpoint.UserIdentityTokens.length; u++ ) {
        if( endpoint.UserIdentityTokens[u].TokenType === UserTokenType.Anonymous ) {
            s = true;
            break;
        }
    }
    return( s );
}


if( gServerCapabilities.Endpoints.length === 0 ) {
    if( !Test.Connect( { SkipCreateSession: true } ) ) stopCurrentUnit();
    else Test.Disconnect( { SkipCloseSession: true } );
}

// initialize some endpoints that will be useful to scripts
var epSecureSign = null;    // secure channel, no security
var epSecureEncrypt = null; // secure channel, message encryption

// check the endpoints received
var totalEndpoints = gServerCapabilities.Endpoints.length;
for( var e=0; e<gServerCapabilities.Endpoints.length; e++ )
{
    // We are not interested in the HTTP protocol, so filter those out.
    var strEndpoint = gServerCapabilities.Endpoints[e].EndpointUrl;
    if( strEndpoint.substring( 0, 4 ) == "http" ) continue;
    var ep = gServerCapabilities.Endpoints[e];
    if( ep.SecurityPolicyUri === SECURITY_POLICYURI_BASIC256 ) {
        // find a secure endpoint, usinn Sign&Encrypt
        if( ep.SecurityMode === MessageSecurityMode.SignAndEncrypt ) epSecureEncrypt = ep;
        // find a secure endpoint, using Sign only
        if( ep.SecurityMode === MessageSecurityMode.Sign ) epSecureSign = ep;
    }
}

// we NEED a secure channel 128Rsa15 for this CU!
if( epSecureEncrypt === null && epSecureSign === null ) {
    addSkipped( "Secure endpoint using 256 not found! Aborting conformance-unit." );
    stopCurrentUnit();
}

print( "\n\n\n***** CONFORMANCE UNIT '" + CU_NAME + "' INITIALIZATION COMPLETE - TESTS STARTING ******\n" );