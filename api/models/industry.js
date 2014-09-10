var Model = require('../models/model');

// Constructor
function Industry(){
    this.query = {
        apikey: '66603c029b1b49428da28d6a783f795e'
    };
    this.endpoint = '/contributors/industries.json';
    this.url = 'http://transparencydata.com/api/1.0/aggregates/pol/';
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