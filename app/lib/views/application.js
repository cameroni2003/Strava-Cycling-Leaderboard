require('ember-skeleton/core');

App.ApplicationView = Ember.View.extend({
  templateName: 'ember-skeleton/~templates/application'
});

App.FunView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/fun'
});

App.RidesListView = Em.View.extend({
	click: function(el) {
		console.log('clicked!');
	}
})

App.RidesView = Em.View.extend({
	templateName: 'ember-skeleton/~templates/rides'
})