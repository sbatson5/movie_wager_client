import Ember from 'ember';

const {
  Service,
  RSVP: { Promise },
  get,
  inject: { service },
  isEmpty,
  set
} = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),
  currentUser: null,

  fetchSession() {
    return new Promise((resolve, reject) => {
      get(this, 'ajax').request('/api/v1/session', {
        method: 'GET'
      }).then((sessionUser) => {
        this._loadUser(sessionUser);
        resolve();
      }).catch(() => reject());
    });
  },

  destroySession() {
    get(this, 'ajax').request('/api/v1/session', {
      method: 'DELETE'
    }).then(() => {
      this._deleteUser();
    });
  },

  getUser() {
    if (isEmpty(get(this, 'currentUser'))) {
      this.fetchSession();
    }
    return get(this, 'currentUser');
  },

  _loadUser(payload) {
    let store = get(this, 'store');
    const modelClass = store.modelFor('user');
    const serializer = store.serializerFor('user');
    const normalizedPayload = serializer.normalizeSingleResponse(store, modelClass, payload, null, true);

    this._setUser(store.push(normalizedPayload));
  },

  _deleteUser() {
    set(this, 'currentUser', null);
  },

  _setUser(user) {
    set(this, 'currentUser', user);
  }
});
