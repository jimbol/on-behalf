// Helpers for the Influence API
// https://sunlightlabs.github.io/congress/index.html
var request =       require('request'),
    queryString =   require('querystring'),
    util =          require('util');


// Constructor
function Influence(){
    this.endpointOverride = null;
}

Influence.prototype = {

    // Properties
    baseUrl: 'http://transparencydata.com/api/1.0/',
    apiQuery: '?apikey=66603c029b1b49428da28d6a783f795e',
    urls: {
        entity: 'entities/id_lookup.json',
        politician: 'aggregates/pols/top_%d.json'
    },

    headers: {
        'content-type': 'application/json; charset=UTF-8',
        'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
    },



    // Methods
    formatResponse: function ( endpoint, body ) {
        var data = JSON.parse( body ),
            parsedResults = this.parseResults( data.results ),
            responseData = {};

        responseData[endpoint] = parseResults;

        return responseData;

        // res.setHeader( 'Access-Control-Allow-Origin', 'http://0.0.0.0:4200' );
        // res.send( JSON.stringify(responseData) );
    },

    parseResults: function ( results ){
        // This will get over written i9n a controller
        return results;
    },

    createHashOptions: function( endpoint ){
        var query = queryString.stringify( this.req.query ),
            options = {
                url: 'http://transparencydata.com/api/1.0/entities/id_lookup.json?bioguide_id=' + bioGuideID + '&apikey=66603c029b1b49428da28d6a783f795e',
                method: 'GET',
                headers: this.headers
            };

        if ( query ) {
            options.url = options.url  + '?' + query;
        }

        return options;
    },

    createOptions: function( idKey ){

        var req = this.req,
            params      = req.path.split('/'),
            endpoint    = this.endpointOverride || params[2],
            id          = params[3],
            options;

        if ( id && idKey ) {
            req.query[ idKey ] = id;
        }

        options = this.createHashOptions( endpoint );

        return options;
    },

    makeRequest: function( endpoint, options, callback, context ){
        var _this = context || this;

        request( options, function ( error, response, body ){

            if (!error && response.statusCode == 200) {
                var responseData = _this.formatResponse( endpoint, body );
                callback.call( _this, responseData );
            }

        });
    }
};

module.exports = Influence;