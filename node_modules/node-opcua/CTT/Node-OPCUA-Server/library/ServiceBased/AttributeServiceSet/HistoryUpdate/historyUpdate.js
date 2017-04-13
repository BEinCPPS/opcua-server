/*    This class object is responsible for calling the HistoryUpdate() service and for also 
      performing any validation etc. This is a quick-use class.

      See the bottom of this file for an example on using it.

    Revision History
        13-Feb-2012: Initial Version.
*/

function HistoryUpdateHelper( session )
{
    if( !isDefined( session ) )
    {
        throw( "HistoryUpdateHelper() instanciation failed, argument 'session' is missing or not a Session object." );
    }

    this.Session = session;    // session object reference
    this.Request = null;       // copy of the last/current HistoryRead request header
    this.Response = null;      // copy of the last/current HistoryRead server response header
    this.Success  = false;     // simple flag indicating if the last/current call succeeded or not.

    /* Reads values.
         Default values shown in [ ]
          Parameters are: 
              HistoryUpdateDetails      = [empty] the HistoryReadDetails extensible parameter. */
    this.Execute = function( args )
    {
        // prepare our arguments
        if( !isDefined( args ) )
        {
            throw( "HistoryUpdate.Execute() arguments missing" );
        }
        if( !isDefined( args.HistoryUpdateDetails ) ) { throw( "Required parameter missing: HistoryUpdateDetails " ); }

        // prepare our return value, and the request
        var result = true;
        this.Request  = new UaHistoryUpdateRequest();
        this.Response = new UaHistoryUpdateResponse();
        this.Session.buildRequestHeader( this.Request.RequestHeader );

        // create the REQUEST. Specify the parameters in the order specified in UA Part 4 table 58.
        // history update details
        switch( args.HistoryUpdateDetails.Name )
        {
            case "UpdateDataDetails": 
                this.Request.HistoryUpdateDetails.setUpdateDataDetails( args.HistoryUpdateDetails );
                break;
            case "UpdateStrutureDataDetails":
                this.Request.HistoryUpdateDetails.setUpdateStructureDataDetails( args.HistoryUpdateDetails );
                break;
            case "UpdateEventDetails":
                this.Request.HistoryUpdateDetails.setUpdateEventDetails( args.HistoryUpdateDetails );
                break;
            case "DeleteRawModifiedDetails":
                this.Request.HistoryUpdateDetails.setDeleteRawModifiedDetails( args.HistoryUpdateDetails );
                break;
            case "DeleteAtTimeDetails":
                this.Request.HistoryUpdateDetails.setDeleteAtTimeDetails( args.HistoryUpdateDetails );
                break;
            case "DeleteEventDetails":
                this.Request.HistoryUpdateDetails.setDeleteEventDetails( args.HistoryUpdateDetails );
                break;
            default:
                throw( "HistoryUpdate.Execute() Unsupported HistoryUpdateDetails parameter: '" + args.HistoryUpdateDetails.Name + "'." );
        }

        var message = "HistoryUpdate for '" + args.HistoryUpdateDetails.length + "' records.";
        for( var m=0; m<args.HistoryUpdateDetails.length; m++ )
        {
            message += "\n\t[" + (1+m ) + "] " + args.HistoryUpdateDetails[m].Name;
        }

        // issue the update
        print( "Calling HistoryUpdate..." + message );
        var uaStatus = this.Session.historyUpdate( this.Request, this.Response );
        print( "HistoryUpdate call complete! next step is validation..." );

        // check result
        this.Success = uaStatus.isGood();
        if( uaStatus.isGood() )
        {
            if( args.Validation === "success" )
            {
                result = this.CheckHistoryUpdateValid( {
                        Request: this.Request, 
                        Response: this.Response,
                        ServiceResult: args.ServiceResults,
                        OperationResults: args.OperationResults,
                        DataResults: args.DataResults } );
            }
            else
            {
                result = this.CheckHistoryUpdateFailed( {
                        Request: this.Request, 
                        Response: this.Response, 
                        ServiceResult: args.ServiceResults } );
            }
        }
        else
        {
            addError( "HistoryUpdate() status " + uaStatus, uaStatus );
            result = false;
        }
        return( result );
    }// Execute


    /* Validates the UpdateHistory response.
        Parameters: 
            - Request 
            - Response 
            - StartTime 
            - EndTime 
            - ServiceResults
            - OperationResults
            - DataResults */
    this.CheckHistoryUpdateValid = function( args )
    {
        // check in parameters
        if( !isDefined( args ) ){ throw( "HistoryUpdateHelper.CheckHistoryUpdateValid missing required argument." ); }
        if( !isDefined( [ args.Request, args.Response ] ) ){ throw( "HistoryUpdateHelper.CheckHistoryUpdateValid missing required argument(s): Request or Response." ); }
        //TODO
        return( false );
    }


    this.CheckHistoryUpdateFailed = function( args )
    {
        // check in parameters
        if( !isDefined( args ) ){ throw( "HistoryUpdateHelper.CheckHistoryUpdateFailed missing required argument." ); }
        if( !isDefined( [ args.Request, args.Response ] ) ){ throw( "HistoryUpdateHelper.CheckHistoryUpdateFailed missing required argument(s): Request or Response." ); }
        //TODO
        return( false );
    }
}


/* Test code 
    // include files needed
    include( "./library/Base/Objects/monitoredItem.js" );
    include( "./library/Base/SettingsUtilities/NodeIds.js" );
    var nodes = MonitoredItem.fromSettings( Settings.ServerTest.NodeIds.Static.AllProfiles.Scalar.Settings );
    var hu;
    // instanciation
    try{ hu = new HistoryUpdateHelper(); }catch(ex){ print( "PASS: ctor. no params: " + ex ); }
    var sess = new UaSession();
    try{ hrh = new HistoryUpdateHelper( sess ); print("PASS: ctor. session arg"); }catch(ex){ print( "FAIL: Session in ctor param: " + ex ); }
    // */