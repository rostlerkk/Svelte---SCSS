const globalSettingsJson = 'assets/json/config.json'
var globalSettings = {};

$.getJSON( globalSettingsJson, function(data) {
})  .done(function(data) {
        $.each( data, function( key, val ) {
            globalSettings[key] = val;
        });
        console.log( "parse configuration from config.json success" );
        //console.log(globalSettings);
    })
    .fail(function() {
        console.log( "error parse configuration !" );
    })
;