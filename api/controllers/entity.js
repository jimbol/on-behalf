// Entity methods
var request =   require('request'),
  Influence = require('../helpers/influence');

// Constructor
var Entity = function(req, res){
  this.req = req;
  this.res = res;
};

Entity.prototype = new Influence();

Entity.prototype.baseUrl = 'http://transparencydata.com/api/1.0/entities/id_lookup.json?apikey=66603c029b1b49428da28d6a783f795e';

// Methods
Entity.prototype.get = function( bioGuideId, callback, context ) {
  var options = this.createOptions( bioGuideId );

  request( options, function ( error, response, body ){
    if ( !error && response.statusCode == 200 ) {
      var idObj = JSON.parse( body )[0];
      callback.call( context, idObj.id );
    }
  });
};

Entity.prototype.createOptions = function( bioGuideId ){
  var url = this.baseUrl + '&bioguide_id=' + bioGuideId;

  return {
    url: url,
    method: 'GET',
    headers: this.headers
  };
};


module.exports = new Entity();