// Helpers for the Congress API
// https://sunlightlabs.github.io/congress/index.html

var request =       require('request'),
    queryString =   require('querystring');

var headers = {
    'content-type': 'application/json; charset=UTF-8',
    'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
};

var formatResponse = function ( endpoint, body ) {
    var data = JSON.parse( body ),
        responseData = {};

    responseData[endpoint] = data.results;

    return responseData;

    // res.setHeader( 'Access-Control-Allow-Origin', 'http://0.0.0.0:4200' );
    // res.send( JSON.stringify(responseData) );
};

var createHashOptions = function( req, endpoint ){
    var query = queryString.stringify( req.query ),
        options = {
            url: 'https://congress.api.sunlightfoundation.com/' + endpoint,
            method: 'GET',
            headers: headers
        };

    if ( query ) {
        options.url = options.url  + '?' + query;
    }

    return options;
};

exports.createOptions = function( req, idKey, endpointOverride ){
    // endpointOverride gets passed when the sunlight
    // endpoint differs from the route name

    var params      = req.path.split('/'),
        endpoint    = endpointOverride || params[2],
        id          = params[3],
        options;

    if ( id && idKey ) {
        req.query[ idKey ] = id;
    }

    options = createHashOptions( req, endpoint );

    return options;
};

exports.makeRequest = function( endpoint, options, callback ){
    request( options, function ( error, response, body ){
        if (!error && response.statusCode == 200) {
            var responseData = formatResponse( endpoint, body );
            callback( responseData );
        }
    });
};