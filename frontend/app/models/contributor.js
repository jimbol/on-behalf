// Contributor
var attr 		= DS.attr,
	hasMany 	= DS.hasMany,
	belongsTo 	= DS.belongsTo;

var Contributor = DS.Model.extend({
	name: 				attr('string'),
	employee_amount:  	attr('number'),
	employee_count: 	attr('number'),
	total_amount: 		attr('number'),
	total_count: 		attr('number'),
	direct_amount: 		attr('number'),
	direct_count: 		attr('number')
});

export default Contributor;