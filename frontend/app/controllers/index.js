import Ember from 'ember';

export default Ember.Controller.extend({

	// Attributes
	legislators: [],
	addressValue: null,
	isZipcode: true,

	zipcodeRegex: /(^\d{5}$)|(^\d{5}-\d{4}$)/,

	selectedRep: function(){
		return this.get('legislators').findBy('isSelected', true);
	}.property('legislators.@each.isSelected'),

	// isLoading: function(){
	// 	return this.get('legislators') && !this.get('legislators.isFulfilled');
	// }.property('legislators.isFulfilled'),

	// Events
	actions: {
		actionSearch: function(){
			var _this = this,
				address = this.get('addressValue');

			if ( !this.checkIsZipcode(address) ) {
				this.set('isZipcode', false);
				return;
			}

			this.set('isZipcode', true);

			var legislators = this.store.find('legislator', {
				address: this.get('addressValue')
			});

			this.set('legislators', legislators);
			this.set('isLoading', true);

			legislators.then( function() {
				_this.set('isLoading', false);

				if (!legislators.get('length')) {
					_this.set('isZipcode', false);
					return;
				}

				_this.clearSelection();
				legislators.set('firstObject.isSelected', true);
			});

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
	},

	checkIsZipcode: function(value){
		return this.get('zipcodeRegex').test(value);
	}
});
