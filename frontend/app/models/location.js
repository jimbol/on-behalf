// Location
var attr 		= DS.attr;

var Location = DS.Model.extend({
	address:  		attr('string'),
	latitude: 		attr('string'),
	longitude: 		attr('string')
});

export default Location;