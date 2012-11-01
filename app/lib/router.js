require('ember-skeleton/core');

App.Router = Em.Router.extend({
	root: Em.Route.extend({
		goToFun: Em.Route.transitionTo('fun'),
		goToRides: Em.Route.transitionTo('rides'),
		//goToMyClub: Em.Route.transitionTo('club', 3957),
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
		}),
		club: Em.Route.extend({
			route: '/club/:club_id',
			serialize: function(router, context) {
				return { club_id: context.get('clubId') };
			},

			connectOutlets: function (router, club) {
				
				router.get('applicationController').connectOutlet('body', 'club', club);
			}
		})
	})
})