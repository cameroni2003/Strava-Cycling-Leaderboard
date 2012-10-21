require('ember-skeleton/core');

App.ApplicationController = Ember.Controller.extend();



App.HomeController = Em.Controller.extend();

App.HomeBodyView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/homeBody'
});

App.ridesController = Ember.ArrayController.create({
	content: App.store.findQuery(App.Ride)
});