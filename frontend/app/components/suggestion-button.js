import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'div',
  classNames: 'suggestion-button',

  click: function(){
    this.sendAction('action', 'contact-modal');
  }
});
