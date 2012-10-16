function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

var App = Em.Application.create();

App.Ride = Em.Object.extend({
	displayDetailedData: false,
	detailedData: null,
	isLoading: false,
	averageSpeedMph: function () {
		if (this.detailedData) {
			return roundNumber(parseFloat(this.get('detailedData.averageSpeed')) * 0.000621371192237 * 60 * 60, 2);
		}
	} .property('detailedData.averageSpeed'),
	distanceInMiles: function () {
		if (this.detailedData) {
			return roundNumber(parseFloat(this.get('detailedData.distance')) * 0.000621371192237, 2);
		}
	} .property('detailedData.distance')
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
				$(data.query.results.json.rides).each(function (i, el) {
					self.pushObject(App.Ride.create(el));
				});
			}
		});
	}
});


App.RidesList = Em.View.extend({

	click: function (el) {
		var sel = this.get('content');
		if (!sel.displayDetailedData) {
			if (!sel.detailedData) {
				var url = 'http://app.strava.com/api/v1/rides/' + sel.id;
				sel.set('isLoading', true);
				$.ajax({
					url: 'http://query.yahooapis.com/v1/public/yql',
					data: { format: 'json', q: 'select * from json where url="' + url + '"' },
					dataType: 'jsonp',
					success: function (data) {
						sel.set('isLoading', false);

						Em.set(sel, 'detailedData', data.query.results.ride);
						Em.set(sel, 'displayDetailedData', true);

					}
				});
			}
			else {
				//Em.set(sel, 'detailedData', data.query.results.ride);
				Em.set(sel, 'displayDetailedData', true);
			}
			//Em.set(sel, 'name', 'blah');
		}
		else {
			Em.set(sel, 'displayDetailedData', false);
		}
	}

});

