import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    sendSuggestion: function(){
      var data = {
        name: this.get('name'),
        email: this.get('email'),
        subject: this.get('subject'),
        message: this.get('message')
      };

      console.log(data);
      // START HERE
      // Validate name, email, message
      // Create instance of model with this data
      // Post data

    }
  }
});