// Legislator
import DS from 'ember-data';

var attr 	= DS.attr,
	hasMany = DS.hasMany;

var Legislator = DS.Model.extend({
	birthday:  		attr('string'),
	first_name: 	attr('string'),
	last_name: 		attr('string'),
	chamber: 		attr('string'),
	party: 			attr('string'),

	contributors: 	hasMany('contributor')
});

export default Legislator;