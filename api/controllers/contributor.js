// Contributor methods
var geocoder =      require('geocoder'),
    request =       require('request'),
    querystring =   require('querystring'),
    Influence =     require('../helpers/influence');

// Constructor
var Contributor = function(req, res){
    this.req = req;
    this.res = res;
};

Contributor.prototype = new Influence();

// Coming soon!

module.exports = Contributor;