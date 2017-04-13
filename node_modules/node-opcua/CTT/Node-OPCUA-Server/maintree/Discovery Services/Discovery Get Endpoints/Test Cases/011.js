/*  Test prepared by Ronaldo T. Duarte ronaldotd@smar.com.br
    Description: Unsupported profile URI. */

function GetUnsupportedProfileUri( supportedProfileUris ) {
    var profiles = [];
    profiles[0] = "http://opcfoundation.org/UAProfile/Transport/uactp-uasc-uabinary"; //"http://opcfoundation.org/UA/profiles/transport/uatcp";
    profiles[1] = "http://opcfoundation.org/UAProfile/Transport/soaphttp-wssc-uaxml"; //"http://opcfoundation.org/UA/profiles/transport/wsxml";
    profiles[2] = "http://opcfoundation.org/UAProfile/Transport/soaphttp-wssc-uaxml-uabinary"; //"http://opcfoundation.org/UA/profiles/transport/wsxmlorbinary";
    profiles[3] = "http://opcfoundation.org/UAProfile/Transport/uatcp-uasc-uabinary"; //"http://opcfoundation.org/UA/profiles/transport/wsbinary";

    var unsupportedProfile = null;
    for( var ii=0; ii<profiles.length; ii++ ) {
        var found = false;
        for ( var jj=0; jj<supportedProfileUris.length; jj++ ) {
            if ( profiles[ii] === supportedProfileUris[jj] ) {
                found = true;
                break;
            }
        }
        if ( found === false ) {
            unsupportedProfile = profiles[ii];
            break;
        }
    }
    return unsupportedProfile;
}

function getEndpoints552011() {
    var supportedProfileUris = [];
    if( GetEndpointsHelper.Execute2() ) {
        for( var ii=0; ii<GetEndpointsHelper.Response.Endpoints.length; ii++ ) supportedProfileUris[ii] = GetEndpointsHelper.Response.Endpoints[ii].TransportProfileUri;
        var unsupportedProfile = GetUnsupportedProfileUri( supportedProfileUris );
        if ( unsupportedProfile !== null ) {
            // Filter using the unsupported profile.
            if( GetEndpointsHelper.Execute2( { ProfileUris: unsupportedProfile } ) ) {
                Assert.Equal( 0, GetEndpointsHelper.Response.Endpoints.length, "GetEndpoints: server did not filter unsupported profile URI; returned wrong number of Endpoints" );
            }
        }
    }
    else addError( "GetEndpoints() status " + uaStatus, uaStatus );
    return( true );
}

Test.Execute( { Procedure: getEndpoints552011 } );