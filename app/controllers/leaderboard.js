import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { mapBy } from '@ember/object/computed';
import { isEmpty } from '@ember/utils';

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
