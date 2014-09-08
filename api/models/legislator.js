var Model = require('../models/model');

// Constructor
function Legislator(){
    this.query = null;
    this.responseKey = 'legislators';
    this.endpoint = 'legislators';
    this.url = 'https://congress.api.sunlightfoundation.com/';
}

Legislator.prototype = new Model();

module.exports = Legislator;