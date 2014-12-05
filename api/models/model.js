var request =       require('request'),
  queryString =   require('querystring'),
  merge =         require('merge');

// Constructor
function Model(){
  this.query = null;
  this.responseKey = null;
  this.endpoint = null;
  this.url = null;
}

// Properties
Model.prototype.headers = {
  'content-type': 'application/json; charset=UTF-8',
  'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
};


Model.prototype.find = function( query, callback ){
  this.query = merge(this.query, query);
  this.options = createHashOptions.call( this );
  makeRequest.call( this, callback );
};


function createHashOptions(){
  var query = queryString.stringify( this.query ),
    options = {
      url: this.url + this.endpoint,
      method: 'GET',
      headers: this.headers
    };

  if ( query ) {
    options.url = options.url  + '?' + query;
  }

  return options;
}

function makeRequest( callback ){
  var _this = this,
    options = this.options;

  request( options, function ( error, response, body ){
    var responseData;

    if (!error && response.statusCode == 200) {
      responseData = _this.formatResponse( body );
      callback( responseData );
    }
  });
}

Model.prototype.formatResponse = function( body ){
  var responseData = {};
  responseData[ this.responseKey ] = JSON.parse( body ).results;
  return responseData;
};

module.exports = Model;