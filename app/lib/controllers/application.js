require('ember-skeleton/core');

App.ApplicationController = Ember.Controller.extend();



App.HomeController = Em.Controller.extend();

App.HomeBodyView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/homeBody'
});

App.ridesController = Ember.ArrayController.create({
	content: App.store.findAll(App.Ride)
});


App.clubController = Em.ObjectController.create({
	club: App.store.find(App.Club, 3957)
});

App.athletesController = Em.ArrayController.create({
	contentBinding: App.clubController.get("club.members")
});