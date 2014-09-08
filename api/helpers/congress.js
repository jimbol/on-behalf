// Helpers for the Congress API
// https://sunlightlabs.github.io/congress/index.html
var request =       require('request'),
    queryString =   require('querystring');

// Constructor
function Congress(){
    this.endpointOverride = null;
}


// Properties
Congress.prototype.headers = {
    'content-type': 'application/json; charset=UTF-8',
    'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
};


// Methods
Congress.prototype.createHashOptions = function( endpoint ){
    var query = queryString.stringify( this.req.query ),
        options = {
            url: 'https://congress.api.sunlightfoundation.com/' + endpoint,
            method: 'GET',
            headers: this.headers
        };

    if ( query ) {
        options.url = options.url  + '?' + query;
    }

    return options;
};

Congress.prototype.createOptions = function( idKey ){

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
};

Congress.prototype.makeRequest = function( endpoint, options, callback, context ){
    var _this = context || this;

    request( options, function ( error, response, body ){

        if (!error && response.statusCode == 200) {
            _this.formatResponse(
                endpoint,
                body,
                function( responseData ){
                    callback.call( _this, responseData );
                }
            );
        }

    });
};

Congress.prototype.formatResponse = function ( endpoint, body, callback ) {
    var data = JSON.parse( body );

    this.parseResults( data.results, function( parsedResults ){
        var responseData = {};
        responseData[endpoint] = parsedResults;

        callback( responseData );
    });
};

Congress.prototype.parseResults = function ( results ){
    // This will get over written i9n a controller
    return results;
};

module.exports = Congress;