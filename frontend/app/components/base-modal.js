// Snagged from http://ember.guru/2014/master-your-modals-in-ember-js
import Ember from 'ember';

export default Ember.Component.extend({
  show: function() {
    this.$('.modal').show()
  }.on('didInsertElement'),

  actions: {
    done: function(){
      this.sendAction('close');
    }
  }
});