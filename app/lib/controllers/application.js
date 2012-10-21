require('ember-skeleton/core');

App.ApplicationController = Ember.Controller.extend();



App.HomeController = Em.Controller.extend();

App.HomeBodyView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/homeBody'
});

App.ridesController = Ember.ArrayController.create({
	content: [],
	init: function () {
		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
			dataType: 'jsonp',
			success: function (data) {
				var time = 2000;
				var myAr = ['blah', 'meh', 'ok'];
				self.set('content',data.query.results.json.rides);
				
			}
		});
	}
});



