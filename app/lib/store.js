require('ember-skeleton/core');

App.adapter = DS.Adapter.create({
	find: function(store, type, id)
	{
		var self = this;
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
			dataType: 'jsonp',
			success: function (data) {
				store.load(type, id, { id: '123', name: 'blah'});
			}
		});
	},
	findQuery: function(store, ids, query, modelArray) {
		$.ajax({
			url: 'http://query.yahooapis.com/v1/public/yql',
			data: { format: 'json', q: 'select * from json where url="http://www.strava.com/api/v1/rides?clubId=3957"' },
			dataType: 'jsonp',
			success: function (data) {
				modelArray.load(data.query.results.json.rides);
			}
		});
	}
});

App.store = DS.Store.create({
  revision: 6,
  adapter: App.adapter
});

App.Ride = DS.Model.extend({
	//id: DS.attr('number'),
	name: DS.attr('string')
});

