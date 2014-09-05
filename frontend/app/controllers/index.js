import Ember from 'ember';

export default Ember.Controller.extend({

	// Attributes
	results: [],
	addressValue: null,

	// Events
	actions: {
		actionSearch: function(){
			this.set('results', this.store.find('legislator', {
				address: this.get('addressValue')
			}));
		}
	}
});
