import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';
import startApp from '../../helpers/start-app';

var App;

moduleFor('controller:index', 'Unit - IndexController', {
  setup: function () {
    App = startApp();
  },
  teardown: function () {
    Ember.run(App, App.destroy);
  }
});

test('it has a controller', function(){
  var controller = this.subject();

  ok( controller, 'The controller does not exist.' );
});

test('it asks store for results', function(){
  expect(1);
  var controller = this.subject();

  controller.store = App.__container__.lookup('store:main');

  controller.set('addressValue', 60645);
  controller.send('actionSearch');

  andThen(function() {
    ok( controller.get('results.isFulfilled') === false, 'The results havent been requested.' );
  });
});
