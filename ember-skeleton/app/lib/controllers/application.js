require('ember-skeleton/core');

App.ApplicationController = Ember.Controller.extend();

App.FunController = Em.Controller.extend();

App.FunView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/fun'
});
App.HomeController = Em.Controller.extend();
App.HomeBodyView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/homeBody'
});

App.Router = Em.Router.extend({
	root: Em.Route.extend({
		goToFun: Em.Route.transitionTo('fun'),
		index: Em.Route.extend({
			route: '/',
			connectOutlets: function (router, context) {
				router.get('applicationController').connectOutlet('body', 'homeBody');
			}
		}),
		fun: Em.Route.extend({
			route: '/fun',
			connectOutlets: function (router, context) {
				router.get('applicationController').connectOutlet('body','fun');
			}
		})
	})
})