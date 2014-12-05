import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper( function( value ) {
  value = Math.round( value ).toString();

  var arr = value.split(''),
    index = arr.length - 3;

  for ( ; index > 0; index -= 3 ){
    arr.splice( index, 0, ',');
  }

  return '$' + arr.join('');
});