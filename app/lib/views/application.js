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

App.ClubView = App.BaseView.extend({
	templateName: 'ember-skeleton/~templates/club',
	loadRides: function()
	{
		debugger;
	}
	
});

App.ShowMore = App.BaseView.extend({
	click: function() {

		var endDate = Date.create().beginningOfMonth().format("{yyyy}-{MM}-{dd}");
		var clubId = this.get('content.clubId');
		var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=%@&endDate=%@"'.fmt(clubId, endDate) ;
		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: queryUrl },
			dataType: 'jsonp',
			success: function (data) {
				
				if(!Ember.none(data.query.results.json))
				{
					$.each(data.query.results.json.rides, function (i, el) {
						var queryUrl2 = 'select * from json where url="http://www.strava.com/api/v1/rides/%@"'.fmt(el.id);

						
						$.ajax({
							url: 'http://query.yahooapis.com/v1/public/yql',
							data: { format: 'json', q: queryUrl2 },
							dataType: 'jsonp',
							success: function (rideData) {
								
								data.query.results.json.rides[i] = rideData.query.results.ride;
								var meber = $.grep(self.get('content.members'), function(e){ return e.id == rideData.query.results.ride.athlete.id; });
								debugger//self.get('content.members')[]
							}
						})
					});
				}
				self.content.set('rides', data.query.results.json.rides);
			}
		});
		
		return this.rides;		
	}
})