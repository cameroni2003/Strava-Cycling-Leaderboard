require('ember-skeleton/core');
App.BaseView = Em.View.extend({
	didInsertElement: function ()
	{
		this.$().slideUp(0);
		this.$().slideDown(250, "easeInOutQuad");
	},

	willDestroyElement: function ()
	{
		var clone = this.$().clone();
		this.$().replaceWith(clone);
		clone.slideUp(250, "easeInOutQuad");
	}
});
App.ApplicationView = App.BaseView.extend({
  templateName: 'ember-skeleton/~templates/application'
});

App.FunView = App.BaseView.extend({
	templateName: 'ember-skeleton/~templates/fun'
});

App.RidesListView = App.BaseView.extend({
	click: function(el) {
		console.log('clicked!');
	}
});

App.RidesView = App.BaseView.extend({
	templateName: 'ember-skeleton/~templates/rides',

});

App.HomeBodyView = App.BaseView.extend({
	templateName: 'ember-skeleton/~templates/homeBody'
});