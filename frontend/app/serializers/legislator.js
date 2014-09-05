import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'bioguide_id'
});