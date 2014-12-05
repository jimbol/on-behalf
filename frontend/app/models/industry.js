// Industry
import DS from 'ember-data';

var attr 	= DS.attr;

var Industry = DS.Model.extend({
	amount: attr('string'),
  name:   attr('string'),
	count: 	attr('string'),

  displayName: function(){
    return this.get('name').toLowerCase().capitalize();
  }.property('name')
});

export default Industry;