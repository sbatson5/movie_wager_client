import Ember from 'ember';

const {
  Controller,
  computed,
  computed: { mapBy },
  get,
  isEmpty
} = Ember;

export default Controller.extend({
  userList: mapBy('wagers', 'user'),

  groupedUsers: computed('userList.@each.name', function() {
    let users = get(this, 'userList');
    let collection = [];

    users.forEach((user) => {
      let previousUser = collection.findBy('name', get(user, 'name'));
      if (isEmpty(previousUser)) {
        this._addUser(collection, user);
      } else {
        this._updateUser(collection, previousUser);
      }
    });
    return collection;
  }),

  _addUser(collection, user) {
    collection.pushObject({
      name: get(user, 'name'),
      profileImageUrl: get(user, 'profileImageUrl'),
      count: 1
    });
  },

  _updateUser(collection, user) {
    collection.removeObject(user);
    user.count += 1;
    collection.pushObject(user);
  }
});
