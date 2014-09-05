import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    classNames: 'legislator',
    legislator: null,

    fullName: function(){
        var legislator = this.get('legislator');
        return legislator.get('first_name') + ' ' + legislator.get('last_name');
    }.property('legislator.first_name', 'legislator.last_name'),

    chamber: function(){
        return this.get('legislator.chamber').capitalize();
    }.property('legislator.chamber')
});
