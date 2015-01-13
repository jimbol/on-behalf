import Ember from 'ember';

export default Ember.Controller.extend({

	// Attributes
	legislators: [],
	address: null,

	isZipcode: function(){
		return this.get('zipcodeRegex').test(this.get('address'));
	}.property('address'),

	zipcodeRegex: /(^\d{5}$)|(^\d{5}-\d{4}$)/,

	selectedRep: function(){
		return this.get('legislators').findBy('isSelected', true);
	}.property('legislators.@each.isSelected'),

	// Events
	actions: {
		actionSearch: function(){
			var address = this.get('address')
			if( address && this.get('isZipcode') ){
			  this.transitionToRoute('search', this.get('address'));
			}
		},
		actionClearSelection: function(){
			this.clearSelection();
		}
	},

	clearSelection: function(){
		var prevSelection = this.get('legislators').findBy('isSelected', true);

		if ( prevSelection ) {
			prevSelection.set('isSelected', false);
		}
	}
});
