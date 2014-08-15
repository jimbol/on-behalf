import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnBehalfENV.locationType
});

Router.map(function() {
});

export default Router;
