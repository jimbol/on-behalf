var Model = require('../models/model');

// Constructor
function Entity(){
    this.query = {
        apikey: '66603c029b1b49428da28d6a783f795e'
    };
    this.endpoint = 'entities/id_lookup.json';
    this.url = 'http://transparencydata.com/api/1.0/';
}

Entity.prototype = new Model();

Entity.prototype.findId = function( query, callback ){
    this.find( query, callback );
};

Entity.prototype.formatResponse = function( body ){
    return JSON.parse( body )[0].id;
};

module.exports = Entity;