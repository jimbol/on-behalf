var Model = require('../models/model'),
  config = require('../config');

// Constructor
function Industry(){
  this.query = {
    apikey: config.apiKey
  };
  this.endpoint = '/contributors/industries.json';
  this.url = config.urls.transparency + 'aggregates/pol/';
}

// cycle = 2012
// limit = 1

Industry.prototype = new Model();

Industry.prototype.findById = function( query, callback ){
  this.url += query.id;
  this.find( query, callback );
};

Industry.prototype.formatResponse = function( body ){
  var parsedBody = JSON.parse( body ),

    results = parsedBody.filter(function(item){
      return item.id != null;
    });

  return {
    industries: results
  };
};

module.exports = Industry;