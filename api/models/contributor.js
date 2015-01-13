var Model = require('../models/model'),
  config = require('../config');

// Constructor
function Contributor(){
  this.query = {
    apikey: config.apiKey
  };
  this.endpoint = '/contributors.json';
  this.url = config.urls.transparency + 'aggregates/pol/';
}

Contributor.prototype = new Model();

Contributor.prototype.findById = function( query, callback ){
  this.url += query.id;
  this.find( query, callback );
};

Contributor.prototype.formatResponse = function( body ){
  var parsedBody = JSON.parse( body ),
    results = parsedBody.filter(function(item){
      // `undefined != null` coerces undefined to null
      return item.id != null;
    });

  return {
    contributors: results
  };
};

module.exports = Contributor;