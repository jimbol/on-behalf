var Model = require('../models/model'),
    config = require('../config');

// Constructor
function Legislator(){
    this.query = null;
    this.responseKey = 'legislators';
    this.endpoint = 'legislators';
    this.url = config.urls.congress;
}

Legislator.prototype = new Model();

module.exports = Legislator;