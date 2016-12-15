import DS from 'ember-data';

const {
  Model,
  attr
} = DS;

export default Model.extend({
  name: attr(),
  profileImageUrl: attr(),
  screenName: attr(),
  twitterId: attr()
});
