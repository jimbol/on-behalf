var Model = require('../models/model'),
  config = require('../config');

// Constructor
function Suggestion(){}

Suggestion.prototype = new Model();

Suggestion.prototype.storeMessage = function( message ){
  // create message
  // send message
};
