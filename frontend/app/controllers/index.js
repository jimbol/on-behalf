import Ember from 'ember';

export default Ember.Controller.extend({

	// Attributes
	legislators: [],
	address: null,

	isZipcode: function(){
		return this.get('zipcodeRegex').test(this.get('address'));
	}.property('address'),

	zipcodeRegex: /(^\d{5}$)|(^\d{5}-\d{4}$)/,

	// Events
	actions: {
		actionSearch: function(){
			var address = this.get('address')
			if( address && this.get('isZipcode') ){
			  this.transitionToRoute('search', this.get('address'));
			}
		}
	}
});
