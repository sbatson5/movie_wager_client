import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', function() {
    this.route('edit-round', { path: 'edit-round/:movie_round_id' });
  });
  this.route('authenticated');
  this.route('sign-in');
  this.route('wager', { path: 'wager/:movie_round_id' });
  this.route('round', { path: 'round/:movie_round_id' });
});

export default Router;
