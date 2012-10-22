require('ember-skeleton/core');

function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

DS.Adapter.map('App.Ride', {
	rideData: { key: 'id' }
});
App.adapter = DS.Adapter.create({
	find: function(store, type, id)
	{
		var url = type.url;
		url = url.fmt(id)
		var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/%@"'.fmt(url);

		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: queryUrl },
			dataType: 'jsonp',
			success: function (data) {
				store.load(type, id, data.query.results.ride);
			}
		});
	},
	findAll: function(store, type, ids)
	{
		var url = type.url;
		url = url.fmt(ids)

		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
			dataType: 'jsonp',
			success: function (data) {

				store.loadMany(type, data.query.results.json.rides);
				var firstRide = [0];

				$.each(data.query.results.json.rides, function(i, el){
					var queryUrl = 'select * from json where url="http://www.strava.com/api/v1/rides/%@"'.fmt(el.id);

					$.ajax({
						url: 'http://query.yahooapis.com/v1/public/yql',
						data: { format: 'json', q: queryUrl },
						dataType: 'jsonp',
						success: function(data){
							store.load(type, el.id, data.query.results.ride);
						}
					})
				});
				


			}
		});
	}
	// findQuery: function(store, ids, query, modelArray) {

	// 	$.ajax({
	// 		url: 'http://query.yahooapis.com/v1/public/yql',
	// 		data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
	// 		dataType: 'jsonp',
	// 		success: function (data) {
	// 			modelArray.load(data.query.results.json.rides);
	// 		}
	// 	});
	// }
})

// App.adapter.registerTransform('rideKey', {
//   fromJSON: function(value) {
  	
//   },

//   toJSON: function(value) {
//   	debugger;
//     if (value === true) {
//       return 'YES';
//     } else if (value === false) {
//       return 'NO';
//     }
//   }
// });


App.store = DS.Store.create({
  revision: 6,
  adapter: App.adapter
});

App.RideDetail = DS.Model.extend({
	ride: DS.belongsTo('App.Ride')
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
})

