import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    logoutTransition() {
      this.transitionToRoute('sign-in');
    }
  }
});
