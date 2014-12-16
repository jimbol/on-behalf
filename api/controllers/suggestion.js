// Suggestion methods
var SuggestionModel = require('../models/suggestion');

// Constructor
var Suggestion = function(req, res){
  this.req = req;
  this.res = res;
};

Suggestion.prototype.post = function() {
  var query = this.req.query;

  // send email
  // create model
  // store name, email, shouldSubscribe  in log file

  console.log('Im in')
  this.res.send('Thank you!')
};

module.exports = Suggestion