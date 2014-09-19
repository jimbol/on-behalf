var Model = require('../models/model'),
    config = require('../config');

// Constructor
function Entity(){
    this.query = {
        apikey: config.apiKey
    };
    this.endpoint = 'entities/id_lookup.json';
    this.url = config.urls.transparency;
}

Entity.prototype = new Model();

Entity.prototype.findId = function( query, callback ){
    this.find( query, callback );
};

Entity.prototype.formatResponse = function( body ){
    return JSON.parse( body )[0].id;
};

module.exports = Entity;