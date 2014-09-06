// Contributor methods
var geocoder =      require('geocoder'),
    request =       require('request'),
    querystring =   require('querystring'),
    Influence =     require('../helpers/influence');

// Constructor
var Contributor = function(req, res){
    this.req = req;
    this.res = res;
};

Contributor.prototype = new Influence();


// Methods
Contributor.prototype.get = function() {
    var query = this.req.query;

    if ( query.latitude && query.longitude ) {
        this.getByCoods();
    } else if ( query.address ){
        this.getByAddress( query.address );
    } else {
        this.getAll();
    }
};

Contributor.prototype.getByCoods = function (){
    this.endpointOverride = 'legislators/locate';
    var options = this.createOptions( 'bioguide_id' );

    this.makeRequest( 'legislators', options, this.respond, this);
};

Contributor.prototype.getByAddress = function ( address ){
    var _this = this;
    geocoder.geocode( address, function( err, data ){
        _this.onGetCoordsForAddress( err, data );
    });
};

Contributor.prototype.onGetCoordsForAddress = function ( err, data ){
    var coords = data.results[0].geometry.location,
        req = this.req;

    req.query.latitude = coords.lat;
    req.query.longitude = coords.lng;
    delete req.query.address;

    this.getByCoods();
};

Contributor.prototype.respond = function ( response ){
    var res = this.res;
    res.setHeader( 'Access-Control-Allow-Origin', 'http://0.0.0.0:4200' );
    res.send( JSON.stringify( response ) );
};

Contributor.prototype.getAll = function (){

    var _this = this,
        options = this.createOptions( 'bioguide_id' );

    this.makeRequest( 'legislators', options, this.respond , this);
};


module.exports = Contributor;