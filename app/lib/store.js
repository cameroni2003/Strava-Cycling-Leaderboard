require('ember-skeleton/core');

function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

DS.Adapter.map('App.Club', {
	name: { key: 'club' }
});

App.adapter = DS.Adapter.create({
	find: function (store, type, id) {
		debugger;
		if (type == 'App.Club') {
			var url = type.url;
			url = url.fmt(id)
			var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/%@"'.fmt(url);

			var self = this;
			$.ajax({
				url: 'http://query.yahooapis.com/v1/public/yql',
				data: { format: 'json', q: queryUrl },
				dataType: 'jsonp',
				success: function (data) {

					var ar = new Array();
					$.each(data.query.results.json.members, function (i, el) {
						ar.push(el.id);
					});

					//debugger;
					//data.query.results.json.members = ar;
					store.load(type, id, data.query.results.json);
					for (var member in data.query.results.json.members) {
						store.load("App.Athlete", member.id, member);
					}

				}
			});
		}
		else if (type == 'App.Athlete') {

		}

	},
	findAll: function (store, type, ids) {
		if (type == 'App.Athlete') {
			var url = type.url;
			url = url.fmt(id)
			var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/%@"'.fmt(url);

			var self = this;
			$.ajax({
				url: 'http://query.yahooapis.com/v1/public/yql',
				data: { format: 'json', q: queryUrl },
				dataType: 'jsonp',
				success: function (data) {
					//debugger;

					var ar = new Array();
					$.each(data.query.results.json.members, function (i, el) {
						ar.push(el.id);
					});

					//debugger;
					//data.query.results.json.members = ar;
					store.load(type, id, data.query.results.json);

				}
			});
			return;
		}
		var url = type.url;
		url = url.fmt(ids)

		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
			dataType: 'jsonp',
			success: function (data) {
				//debugger;
				store.loadMany(type, data.query.results.json.rides);

				$.each(data.query.results.json.rides, function (i, el) {
					var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/rides/%@"'.fmt(el.id);

					$.ajax({
						url: 'http://query.yahooapis.com/v1/public/yql',
						data: { format: 'json', q: queryUrl },
						dataType: 'jsonp',
						success: function (data) {
							store.load(type, el.id, data.query.results.ride);
						}
					})
				});



			}
		});
	}

})

App.adapter.registerTransform('club', {
	fromJSON: function (serialized) {
		//debugger;
		if (Ember.none(serialized)) return;
		return serialized.name;
	},
	toJSON: function (deserialized) {
		debugger;
		return deserialized;
	}
});

App.adapter.registerTransform('array', {
	fromJSON: function (serialized) {

		if (Ember.isArray(serialized)) {
			var ar = new Array();
			for (var i in serialized) {
				ar.push(App.Athlete.createRecord(serialized[i]));
			}
			App.Athlete.commit();
			return ar;
		}
		return serialized;
	},
	toJSON: function (deserialized) {
		return deserialized;
	}
});

App.store = DS.Store.create({
  revision: 6,
  adapter: App.adapter
 });



App.RideDetail = DS.Model.extend({
	name: DS.attr('string')

});

App.Ride = DS.Model.extend({
	rideData: DS.belongsTo('App.RideDetail'),
	name: DS.attr('string'),
	averageSpeed: DS.attr('number'),
	distance: DS.attr('number'),

	averageSpeedMph: function () {
		return roundNumber(parseFloat(this.get('averageSpeed')) * 0.000621371192237 * 60 * 60, 2);	
	} .property('averageSpeed'),
	distanceInMiles: function () {
		return roundNumber(parseFloat(this.get('distance')) * 0.000621371192237, 2);
	} .property('distance')
});
App.Ride.reopenClass({
	url: 'rides/%@'
});

App.Athlete = DS.Model.extend({
	name: DS.attr('string'),
	blah: function () {
		return 'blah';
	}
});

/*App.Club = DS.Model.extend({
	name: DS.attr('club'),
	members: DS.attr('array'),
});
App.Club.reopenClass({
	url: 'clubs/%@/members'
});*/
