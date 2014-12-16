// Suggestion
import DS from 'ember-data';

var attr 	= DS.attr;

var Suggestion = DS.Model.extend({
	name: attr('string'),
  email: attr('string'),
  subject: attr('string'),
	message: attr('string'),

  save: function(){
    if(this.isValid){
      this._super();
    }
  },

  validate: function(){

  }.property('email', 'name', 'message')
});

export default Suggestion;