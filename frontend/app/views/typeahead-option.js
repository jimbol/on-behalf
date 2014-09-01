export default Ember.View.extend({

	// Attributes
	tagName: 'li',
	classNames: ['typeahead-result'],
	attributeBindings: 'value:value',

	// Events
	click: function(e){
		this.get('parentView').select($(e.currentTarget).attr('value'));
	}
});