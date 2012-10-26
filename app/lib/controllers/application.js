require('ember-skeleton/core');

App.ApplicationController = Ember.Controller.extend();

App.Ride = Em.Object.extend({});
App.Athlete = Em.Object.extend({});

App.Club = Em.Object.extend({
	isLoaded: false,
	isError: false,
	init: function() {
		this.loadData();
	},
	loadData: function(){
		this.set('isLoaded', false);
		var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/%@"'.fmt('clubs/'+this.get('clubId')+'/members');
		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: queryUrl },
			dataType: 'jsonp',
			success: function (data) {

				
				console.log(data.query.results.json);
				if(!Ember.none(data.query.results.json))
				{
					// the strava api will return members as a single object instead of an array
					//	if there is only one member.
					//
					//	This is how we fix it.
					data.query.results.json.members = Ember.makeArray(data.query.results.json.members);

					App.currentClub.setProperties(data.query.results.json);
					self.set('isError', false);
				}
				else
					self.set('isError', true);

				self.set('isLoaded', true);
			}
		});
	}
});
App.Club.reopen({
	clubChanged: Ember.observer(function() {
		this.loadData();
  }, 'clubId')
});

App.Athlete = Em.Object.extend({
	init: function() {
	}
});

App.currentClub = App.Club.create({clubId: 3957});


App.HomeController = Em.Controller.extend();


App.ridesController = Ember.ArrayController.create({
	content: []
});


App.clubController = Em.ObjectController.create({
	contentBinding: 'App.currentClub'
});

App.athletesController = Em.ArrayController.create({
	contentBinding: 'App.currentClub.members'
});