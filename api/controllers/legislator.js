// Legislator methods

var geocoder =      require('geocoder'),
    request =       require('request'),
    querystring =   require('querystring'),
    congressHelper = require('../helpers/congress');

exports.get = function(req, res) {
    var query = req.query;

    if ( query.latitude && query.longitude ) {
        getByCoods( req, res );
    } else if ( query.address ){
        getByAddress( req, res, query.address );
    } else {
        getAll( req, res );
    }
};


function getByCoods( req, res ){
    var options = congressHelper.createOptions(
        req,
        'bioguide_id',
        'legislators/locate'
    );

    congressHelper.makeRequest( 'legislators', options, function( response ){
        respond( response, res );
    });
}

function getByAddress( req, res, address ){
    geocoder.geocode( address, function( err, data ){
        onGetCoordsForAddress( err, data, req, res );
    });
}

function onGetCoordsForAddress( err, data, req, res ){
    var coords = data.results[0].geometry.location;

    req.query.latitude = coords.lat;
    req.query.longitude = coords.lng;
    delete req.query.address;

    getByCoods( req, res );
}

function getAll( req, res ){
    var options = congressHelper.createOptions(
        req,
        'bioguide_id'
    );

    congressHelper.makeRequest( 'legislators', options, function( response ){
        respond( response, res );
    });
}

function respond( response, res ){
    res.setHeader( 'Access-Control-Allow-Origin', 'http://0.0.0.0:4200' );
    res.send( JSON.stringify( response ) );
}



