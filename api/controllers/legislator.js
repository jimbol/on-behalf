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
    var options = congressHelper.createOptions( req, res, 'bioguide_id', 'legislators/locate' );
    congressHelper.makeRequest( res, 'legislators', options );
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
    var options = congressHelper.createOptions( req, res, 'bioguide_id' );
    congressHelper.makeRequest( res, 'legislators', options );
}