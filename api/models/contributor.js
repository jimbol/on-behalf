var Model = require('../models/model');

// Constructor
function Contributor(){
    this.query = {
        apikey: '66603c029b1b49428da28d6a783f795e'
    };
    this.endpoint = '/contributors.json';
    this.url = 'http://transparencydata.com/api/1.0/aggregates/pol/';
}

// cycle = 2012
// limit = 1

Contributor.prototype = new Model();

Contributor.prototype.findById = function( query, callback ){
    this.url += query.id;
    this.find( query, callback );
};

Contributor.prototype.formatResponse = function( body ){
    var parsedBody = JSON.parse( body ),
        results = parsedBody.filter(function(item){
            return item.id != null;
        });

    return {
        contributors: results
    };
};

module.exports = Contributor;