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
  this.contributors = [];
  this.industries = [];
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

Legislator.prototype.findByAddress = function (address){
  var _this = this;

  geocoder.geocode( address, function( err, data ){
    if (!data.results.length) {

      _this.respond({
          legislators:[]
      });

      return;
    }
    _this.onGetCoordsForAddress( err, data );

  });
};

Legislator.prototype.onGetCoordsForAddress = function (err, data){

  var coords = data.results[0].geometry.location,
    req = this.req;

  req.query.latitude = coords.lat;
  req.query.longitude = coords.lng;
  delete req.query.address;

  this.findByCoods();
};

Legislator.prototype.respond = function (response){

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

Legislator.prototype.getDependencies = function(responseData, callback){
  var queries = [],
    _this = this;

  responseData.legislators.map( function( legislator ){

    legislator.contributors = [];
    legislator.industries = [];

    queries.push( function( onFinish ){

      async.auto({
        getEntity: function(callback){
          _this.getEntityId(legislator, callback);
        },
        getContributors: ['getEntity', function(callback){
          _this.getContributors(legislator, callback);
        }],
        getIndustries: ['getEntity', function(callback){
          _this.getIndustries(legislator, callback);
        }]
      }, function(err, results) {
        onFinish();
      });
    });
  });

  async.parallel( queries, function(){
    responseData.contributors = _this.contributors;
    responseData.industries = _this.industries;
    callback( responseData, callback );
  });
};

Legislator.prototype.getEntityId = function(legislator, callback){

  var entity = new EntityModel();

  entity.findId({
    bioguide_id: legislator.bioguide_id
  }, function( entityId ){
    legislator.entityId = entityId;
    callback();
  });
};

Legislator.prototype.getContributors = function(legislator, callback){

  var contributor = new ContributorModel(),
    _this = this;

  contributor.findById({
    id: legislator.entityId,
    limit: 15
  }, function( response ){

    _this.contributors = _this.contributors.concat( response.contributors );

    response.contributors.map( function( item ){
      // combine ids to make it unique
      item.id += legislator.entityId;
      legislator.contributors.push( item.id );
    });
    callback();
  });
};

Legislator.prototype.getIndustries = function(legislator, callback){

  var industry = new IndustryModel(),
    _this = this;

  industry.findById({
    id: legislator.entityId,
    cycle: 2012,
    limit: 15
  }, function( response ){

    _this.industries = _this.industries.concat( response.industries );

    response.industries.map( function( item ){
      item.id += legislator.entityId;
      legislator.industries.push( item.id );
    });
    callback();
  });
};


module.exports = Legislator;