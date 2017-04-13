// Setting class to store CTT setting info.

/*globals readSetting */

function Setting()
{
    this.name = null;
    this.value = null;
}


// Read a given setting, storing info
Setting.prototype.read = function( settingName )
{
    this.name = settingName;
    this.value = readSetting( settingName );
    if( this.value !== undefined )
    {
        this.value = this.value.toString();
    }
};


// Static read: returns a new instance of Setting
Setting.read = function( settingName )
{
    var setting = new Setting();
    setting.read( settingName );
    return setting;
};

Setting.Configured = function( settings ) {
    if( !isDefined( settings ) ) return( true );
    if( !isDefined( settings.length ) ) settings = [ settings ];
    var results = [];
    for( var i=0; i<settings.length; i++ ) {
        results[i] = readSetting( settings[i] ).toString() === "";
    }
    return( results );
}

/*
var s = Setting.read( "/Server Test/Server URL" );
addLog( "" + s.name );
addLog( "" + s.value );

s = Setting.read( "/Server Test/Nada" );
addLog( "" + s.name );
addLog( "" + s.value );
*/