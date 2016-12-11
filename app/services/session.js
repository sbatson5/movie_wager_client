import Ember from 'ember';

const {
  Service,
  get,
  inject: { service },
  set
} = Ember;

export default Service.extend({
  ajax: service(),
  store: service(),
  currentUser: null,

  fetchSession() {
    get(this, 'ajax').request('/api/v1/session/movie-wager', {
      method: 'GET'
    }).then((sessionUser) => {
      this._loadUser(sessionUser);
    });
  },

  getUser() {
    return get(this, 'currentUser');
  },

  _loadUser(payload) {
    let store = get(this, 'store');
    const modelClass = store.modelFor('user');
    const serializer = store.serializerFor('user');
    const normalizedPayload = serializer.normalizeSingleResponse(store, modelClass, payload, null, true);

    this._setUser(store.push(normalizedPayload));
  },

  _setUser(user) {
    set(this, 'currentUser', user);
  }
});
