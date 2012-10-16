function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

var App = Ember.Application.create({
	ApplicationView: Ember.View.extend({
		templateName: 'application',
		classNames: ['application-view']
	}),

	ApplicationController: Ember.Controller.extend({
		slogan: 'A framework for creating ambitious web applications',
		isSlogan: true
	}),
	
	CarsView: Em.View.extend({
		templateName: 'cars'
	}),
	CarsController: Em.ArrayController.extend(),
	ShoesView: Em.View.extend({
		templateName: 'shoes'
	}),
	ShoesController: Em.ArrayController.extend(),
	SalutationView: Em.View.extend({
		templateName: 'salutation'
	}),
	SalutationController: Em.ObjectController.extend(),
	TraversalView: Em.View.extend({
		templateName: 'traversal'
	}),
	TraversalController: Em.ObjectController.extend(),
	HomeView: Em.View.extend({
		template: Em.Handlebars.compile('<p><a {{action goHome href=true}}><em>Go Home</em></a></p>')
	}),
	HomeController: Em.ObjectController.extend(),
	ready: function () {
		console.log("Created App namespace");
	},
	Router: Ember.Router.extend({
		enableLogging: true,
		goToCars: Ember.Route.transitionTo('cars'),
		goToShoes: Ember.Route.transitionTo('shoes'),
		goHome: Ember.Route.transitionTo('index'),
		goToRiders: Em.Route.transitionTo('riders'),
		root: Ember.Route.extend({
			index: Ember.Route.extend({
				route: '/',
				connectOutlets: function (router, context) {
					router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "My Ember App" });
					router.get('applicationController').connectOutlet('body', 'traversal');
				}
			}),
			riders: Em.Route.extend({
				route: '/riders'
			}),
			shoes: Ember.Route.extend({
				route: '/shoes',
				enter: function (router) {
					console.log("The shoes sub-state was entered.");
				},
				connectOutlets: function (router, context) {
					router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Shoes Route" });
					router.get('applicationController').connectOutlet('body', 'shoes');
					router.get('applicationController').connectOutlet('footer', 'traversal');
					router.get('traversalController').connectOutlet('home');
				}
			}),
			cars: Ember.Route.extend({
				route: '/cars',
				enter: function (router) {
					console.log("The cars sub-state was entered.");
				},
				connectOutlets: function (router, context) {
					router.get('applicationController').connectOutlet('greeting', 'salutation',
                                                            { greeting: "Cars Route" });
					router.get('applicationController').connectOutlet('body', 'cars');
					router.get('applicationController').connectOutlet('footer', 'traversal');
					router.get('traversalController').connectOutlet('home');
				}
			})
		})
	})
});

App.NavbarController = Em.Controller.extend();
App.NavbarView = Em.View.extend({
	templateName: 'topNav'
});

App.initialize();

//App.Ride = Em.Object.extend({
//	displayDetailedData: false,
//	detailedData: null,
//	isLoading: false,
//	averageSpeedMph: function () {
//		if (this.detailedData) {
//			return roundNumber(parseFloat(this.get('detailedData.averageSpeed')) * 0.000621371192237 * 60 * 60, 2);
//		}
//	} .property('detailedData.averageSpeed'),
//	distanceInMiles: function () {
//		if (this.detailedData) {
//			return roundNumber(parseFloat(this.get('detailedData.distance')) * 0.000621371192237, 2);
//		}
//	} .property('detailedData.distance')
//});


//App.ridesController = Ember.ArrayController.create({
//	content: [],
//	init: function () {
//		var self = this;

//		$.ajax({
//			url: 'http://query.yahooapis.com/v1/public/yql',
//			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
//			dataType: 'jsonp',
//			success: function (data) {
//				$(data.query.results.json.rides).each(function (i, el) {
//					self.pushObject(App.Ride.create(el));
//				});
//			}
//		});
//	}
//});


//App.RidesList = Em.View.extend({

//	click: function (el) {
//		var sel = this.get('content');
//		if (!sel.displayDetailedData) {
//			if (!sel.detailedData) {
//				var url = 'http://app.strava.com/api/v1/rides/' + sel.id;
//				sel.set('isLoading', true);
//				$.ajax({
//					url: 'http://query.yahooapis.com/v1/public/yql',
//					data: { format: 'json', q: 'select * from json where url="' + url + '"' },
//					dataType: 'jsonp',
//					success: function (data) {
//						sel.set('isLoading', false);

//						Em.set(sel, 'detailedData', data.query.results.ride);
//						Em.set(sel, 'displayDetailedData', true);

//					}
//				});
//			}
//			else {
//				//Em.set(sel, 'detailedData', data.query.results.ride);
//				Em.set(sel, 'displayDetailedData', true);
//			}
//			//Em.set(sel, 'name', 'blah');
//		}
//		else {
//			Em.set(sel, 'displayDetailedData', false);
//		}
//	}

//});

