var axios = require('axios');
var fetchJSONP = require('fetch-jsonp');

module.exports = {

	getDarkSky: function(coords, units) {
		var key = PRIVATE_API_KEY;
		var lat = coords.lat;
		var lon = coords.lng;
		var encodedURI = window.encodeURI('https://api.darksky.net/forecast/' + key + '/' + lat + ',' + lon + '?exclude=minutely,hourly,alerts,flags&units=' + units);
		return fetchJSONP(encodedURI)
			.then(function(res) {
				return res.json();
			})
			.then(function(json) {
		    return json;
		  })
		  .catch(function(ex) {
		  	return ex;
		  });
	},

	weather: function(city) {
		var encodedURI = window.encodeURI('https://maps.googleapis.com/maps/api/geocode/json?address=' + city);
		return axios.get(encodedURI)
			.then(function(response) {
				return response.data.results[0].geometry.location;
			})
			.catch(function(err) {
				return err;
			});
	}

}
