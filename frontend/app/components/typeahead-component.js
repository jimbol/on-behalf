export default Ember.Component.extend({
	// Attributes
	modelName: 		'',
	displayPath: 	'',
	value: 			'',
	selection: 		null,

	// Properties
	options: function(){
		var value = this.get('value');
		if(value.length > 3){
			return this.store.find(this.get('modelName'), {
				address: value
			});
		}
	}.property('modelName', 'value'),

	displayOptions: function(){
		var displayOptions = [],
			displayPath = this.get('displayPath');

		this.get('options').forEach(function(option, i){

			var displayitem = {
				displayName: option.get(displayPath),
				index: i,
				value: option.get('id')
			};

			displayOptions.push(displayitem);
		});

		return displayOptions;
	}.property('options.content'),

	// Methods
	select: function(value){
		var selection = this.get('options').findBy('id', value);
		if(selection){
			this.set('selection', selection);
		}

		console.log(this.get('selection'));
	}


});
