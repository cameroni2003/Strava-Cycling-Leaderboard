require('ember-skeleton/core');

App.Router = Em.Router.extend({
	root: Em.Route.extend({
		goToFun: Em.Route.transitionTo('fun'),
		goToRides: Em.Route.transitionTo('rides'),
		index: Em.Route.extend({
			route: '/',
			connectOutlets: function (router, context) {
				router.get('applicationController').connectOutlet('body', 'homeBody');
			}
		}),
		rides: Em.Route.extend({
			route: '/rides',
			connectOutlets: function (router, context) {
				router.get('applicationController').connectOutlet('body','rides');
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