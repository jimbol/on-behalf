// Legislator
import DS from 'ember-data';

var attr 	= DS.attr,
	hasMany = DS.hasMany;

var Legislator = DS.Model.extend({
	birthday:  		attr('string'),
	first_name: 	attr('string'),
  last_name:      attr('string'),
  state_name:     attr('string'),
	state_rank: 	attr('string'),
	chamber: 		attr('string'),
	party: 			attr('string'),

  contributors:   hasMany('contributor'),
	industries: 	hasMany('industries'),

  fullName: function(){
    return this.get('first_name') + ' ' + this.get('last_name');
  }.property('first_name', 'last_name'),

  chamberTitle: function(){
    return ( this.get('chamber') === 'senate' ) ? 'Senator' : 'Representative';
  }.property('chamber'),

  fullTitle: function(){

    var rank = this.get('state_rank'),
      chamberTitle = this.get('chamberTitle'),
      state = this.get('state_name').capitalize();

    rank = rank ? rank.capitalize() + ' ' : '';

    return rank + chamberTitle + ' from ' + state;
  }.property('chamber'),

  formattedChamber: function(){
    return this.get('chamber').capitalize();
  }.property('chamber')
});

export default Legislator;