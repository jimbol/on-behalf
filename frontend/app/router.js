
import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("index", { path: "/" });
  this.route("search", { path: "/search/:query" });
});

Router.map(function() {
  this.resource('legislator', { path: '/legislator/:legislator_id' });
});

export default Router;
