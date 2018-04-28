import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('admin', function() {
    this.route('edit-round', { path: 'edit-round/:round_id' });
  });
  this.route('sign-in');
  this.route('wager', { path: 'wager/:round_id' });
  this.route('round', { path: 'round/:round_id' });
  this.route('leaderboard');
  this.route('google-redirect');
});

export default Router;
