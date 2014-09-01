export default Ember.Controller.extend({
	
	// Attributes
	results: [],
	addressValue: '',

	// Events
	actions: {
		actionSearch: function(){
			this.set('results', this.store.find('legislator', {
				address: this.get('addressValue')
			}));
		},

		actionSelect: function(){
			// Select a congress person
		}
	}
});
