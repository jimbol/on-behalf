// Legislator methods
var geocoder =      require('geocoder'),
    request =       require('request'),
    querystring =   require('querystring'),
    async =         require('async'),

    LegislatorModel =   require('../models/legislator'),
    ContributorModel =  require('../models/contributor'),
    IndustryModel =     require('../models/industry'),
    EntityModel =       require('../models/entity');

// Constructor
var Legislator = function(req, res){
    this.req = req;
    this.res = res;
    this.model = new LegislatorModel();
};

Legislator.prototype.get = function() {
    var query = this.req.query;

    if ( query.latitude && query.longitude ) {
        this.findByCoods();
    } else if ( query.address ){
        this.findByAddress( query.address );
    } else {
        this.find({}, function( legislators ){

            _this.getDependencies( legislators, function( resBody ){
                _this.respond( resBody );
            });

        });
    }
};

Legislator.prototype.findByCoods = function (){
    var legislator = this.model,
        req = this.req,
        _this = this;

    legislator.endpoint = 'legislators/locate';

    legislator.find({
        latitude: req.query.latitude,
        longitude: req.query.longitude
    }, function( legislators ){

        _this.getDependencies( legislators, function( resBody ){
            _this.respond( resBody );
        });

    });
};

Legislator.prototype.findByAddress = function ( address ){

    var _this = this;
    geocoder.geocode( address, function( err, data ){
        _this.onGetCoordsForAddress( err, data );
    });
};

Legislator.prototype.onGetCoordsForAddress = function ( err, data ){

    var coords = data.results[0].geometry.location,
        req = this.req;

    req.query.latitude = coords.lat;
    req.query.longitude = coords.lng;
    delete req.query.address;

    this.findByCoods();
};

Legislator.prototype.respond = function ( response ){

    var res = this.res;

    res.setHeader( 'Access-Control-Allow-Origin', 'http://0.0.0.0:4200' );
    res.send( JSON.stringify( response ) );
};

Legislator.prototype.find = function (){

    var legislator = this.model,
        req = this.req,
        bioGuideId = req.path.split('/')[3],
        _this = this;

    legislator.find({
        bioguide_id: bioGuideId
    }, function( legislators ){

        _this.getDependencies( legislators, function( resBody ){
            _this.respond( resBody );
        });

    });
};

Legislator.prototype.getEntities = function( legislator, callback ){

    var entity = new EntityModel();

    entity.findId({
        bioguide_id: legislator.bioguide_id
    }, function( entityId ){
        legislator.entityId = entityId;
        callback();
    });
};


// TODO Clean this shit up!
Legislator.prototype.getDependencies = function( responseData, callback ){
    var queries = [],
        contributors = [],
        industries = [],
        _this = this;

    responseData.legislators.map( function( legislator ){

        legislator.contributors = [];
        legislator.industries = [];

        queries.push( function( onFinish ){

            async.series([
                function( callback ){
                    _this.getEntities( legislator, callback );
                },
                function( callback ){
                    async.parallel([
                        function(innerCallback){
                            var contributor = new ContributorModel();

                            contributor.findById({
                                id: legislator.entityId,
                                cycle: 2012,
                                limit: 7
                            }, function( response ){

                                contributors = contributors.concat( response.contributors );

                                response.contributors.map( function( item ){
                                    legislator.contributors.push( item.id );
                                });
                                innerCallback();
                            });
                        },
                        function(innerCallback){
                            var industry = new IndustryModel();

                            industry.findById({
                                id: legislator.entityId,
                                cycle: 2014,
                                limit: 7
                            }, function( response ){

                                industries = industries.concat( response.industries );

                                response.industries.map( function( item ){
                                    legislator.industries.push( item.id );
                                });
                                innerCallback();
                            });
                        }
                    ], function(){
                        callback();
                    });
                }
            ],

            function(err, results){
                onFinish();
            });
        });
    });

    async.parallel( queries, function(){
        responseData.contributors = contributors;
        responseData.industries = industries;
        callback( responseData, callback );
    });
};

module.exports = Legislator;