import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  familyName: attr('string'),
  gender: attr('string'),
  givenName: attr('string'),
  locale: attr('string'),
  name: attr('string'),
  picture: attr('string'),
  verifiedEmail: attr('boolean')
});
