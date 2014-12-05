import { test, moduleFor } from 'ember-qunit';
import startApp from '../../helpers/start-app';

var App;

moduleFor('route:index', 'Unit - IndexRoute', {
  setup: function () {},
  teardown: function () {}
});

test('it has a model', function(){

  var route = this.subject(),
    model = JSON.stringify( route.model() );

  ok( model === '{}', 'The model should be empty.' );
});
