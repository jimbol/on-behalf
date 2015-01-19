// Snagged from http://ember.guru/2014/master-your-modals-in-ember-js
import Ember from 'ember';

export default Ember.Component.extend({
  address: null,
  zipcodeRegex: /(^\d{5}$)|(^\d{5}-\d{4}$)/,

  isZipcode: function(){
    var address = this.get('address');
    if(!address || !address.length){
      return true;
    }
    return this.get('zipcodeRegex').test(address);
  }.property('address'),

  actions: {
    actionSearch: function(){
      var address = this.get('address');
      if( address && this.get('isZipcode') ){
        this.sendAction('action', address);
      }
    }
  }
});