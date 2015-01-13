import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sendSuggestion: function(){
      var suggestion = this.store.createRecord('suggestion', {
        name: this.get('name'),
        email: this.get('email'),
        subject: this.get('subject'),
        message: this.get('message')
      });

      if(this.get('hasName') && this.get('isValidEmail')){
        debugger
        suggestion.save();
      }
    }//,
    // done: function(){
    //   var _this = this;
    //   this.sendAction('close').then(function(){
    //     _this.clearSuggestion();
    //   });
    // }
  },

  clearSuggestion: function(){
    this.set('name', '');
    this.set('email', '');
    this.set('subject', '');
    this.set('message', '');
  },

  hasName: function(){
    return !!this.get('name');
  }.property('name'),

  hasMessage: function(){
    return !!this.get('message');
  }.property('message'),

  isValidEmail: function(){
    var email = this.get('email').trim();
    var splitEmail = email.split('@');

    if(splitEmail.length !== 2){
      return false;
    }

    if(splitEmail[1].indexOf('.') < 2){
      return false;
    }

    return true;

  }.property('email')
});