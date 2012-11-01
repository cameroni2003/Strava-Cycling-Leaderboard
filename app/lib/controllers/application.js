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
		
	}
});
App.Club.reopenClass({
	club: null,
	rides: [],
	find: function(id) {
		//this.setProperty('isLoaded', false);
		var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/%@"'.fmt('clubs/'+ id +'/members');
		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: queryUrl },
			dataType: 'jsonp',
			success: function (data) {
				
				if(!Ember.none(data.query.results.json))
				{
					// the strava api will return members as a single object instead of an array
					//	if there is only one member.
					//
					//	This is how we fix it.
					data.query.results.json.members = Ember.makeArray(data.query.results.json.members);
					Ember.setProperties(self.club, App.Club.create(data.query.results.json));
				}
			}
		});
		this.club = App.Club.create({clubId: id});
		return this.club;
	},
	getRides: function(clubId, endDate) {
		
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

App.ClubController = Em.ObjectController.extend({

});


App.clubController = Em.ObjectController.create({
	content: App.currentClub
});

App.athletesController = Em.ArrayController.create({
	contentBinding: 'App.currentClub.members'
});