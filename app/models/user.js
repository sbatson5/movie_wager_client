import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  name: attr('string'),
  profileImageUrl: attr('string'),
  screenName: attr('string'),
  twitterId: attr()
});
