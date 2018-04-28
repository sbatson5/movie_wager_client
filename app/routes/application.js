import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  init() {
    this._super(...arguments);
    get(this, 'session').getCurrentSession();
  }
});
