import Ember from 'ember';

var Router = Ember.Router.extend({
  location: OnBehalfENV.locationType
});

Router.map(function() {
  this.route("index", { path: "/" });
  this.route("search", { path: "/search/:query" });
});

Router.map(function() {
  this.resource('legislator', { path: '/legislator/:legislator_id' });
});

export default Router;
