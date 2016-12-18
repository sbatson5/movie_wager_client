import Ember from 'ember';

const {
  Route,
  get,
  inject: { service },
  set
} = Ember;

export default Route.extend({
  session: service(),

  init() {
    get(this, 'session').fetchSession();
    this._super(...arguments);
  },

  model() {
    const session = get(this, 'session');
    return session.fetchSession().then(() => {
      return session.getUser();
    }).catch(() => {
      return null;
    });
  },

  setupController(controller, model) {
    set(controller, 'currentUser', model);
  },

  _setCurrentUser(controller) {
    const session = get(this, 'session');
    session.fetchSession().then(() => {
      let user = session.getUser();
      set(controller, 'currentUser', user);
    }).catch(() => {
      set(controller, 'currentUser', null);
    });
  },

  actions: {
    setCurrentUser() {
      let controller = get(this, 'controller');
      this._setCurrentUser(controller);
    },

    logout() {
      get(this, 'session').destroySession();
      set(this, 'controller.currentUser', null);
    }
  }
});
