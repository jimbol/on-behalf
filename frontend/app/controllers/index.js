import Ember from 'ember';

export default Ember.Controller.extend({

	// Attributes
	legislators: [],
	addressValue: null,

	selectedRep: function(){
		return this.get('legislators').findBy('isSelected', true);
	}.property('legislators.@each.isSelected'),

	// Events
	actions: {
		actionSearch: function(){
			var legislators = this.store.find('legislator', {
				address: this.get('addressValue')
			});

			legislators.then( function() {
				legislators.set('firstObject.isSelected', true);
			});

			this.set('legislators', legislators);
		},
		actionClearSelection: function(){
			var prevSelection = this.get('legislators').findBy('isSelected', true);

			if ( prevSelection ) {
				prevSelection.set('isSelected', false);
			}
		}
	}
});
