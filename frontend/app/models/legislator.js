// Legislator
var attr 		= DS.attr,
	hasMany 	= DS.hasMany,
	belongsTo 	= DS.belongsTo;

var Legislator = DS.Model.extend({
	birthday:  		attr('string'),
	first_name: 	attr('string'),
	last_name: 		attr('string'),
	chamber: 		attr('string'),
	party: 			attr('string'),

	contributors: 	function(){
		return this.store.find('contributor', {
			bioguide_id: this.get('id')
		});
	}.property('isLoaded')



});

export default Legislator;