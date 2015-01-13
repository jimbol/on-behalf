import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnBehalfENV.locationType
});

Router.map(function() {
  this.route("index", { path: "/" });
  this.route("search", { path: "/search/:query" });
});

export default Router;
