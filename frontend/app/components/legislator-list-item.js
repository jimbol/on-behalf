import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNameBindings: [':legislator', 'legislator.isSelected:selected'],
    legislator: null,

    click: function(){
        this.sendAction();
        this.get( 'legislator' ).set( 'isSelected', true );
    }
});
