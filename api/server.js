// TODO
// ==================================
//  - More organized endpoint requests
//  - Pagination support
//  - Add more endpoints


var express = 		require('express'),
	geocoder = 		require('geocoder'),
	request = 		require('request'),
	http = 			require('http'),
	querystring = 	require('querystring'),
	app = 			express();



// Functions
// ========================================================

// Get influence explorer id
var getInfluenceId = function(bioGuideID, callback){
	
	var options = {
		url: 'http://transparencydata.com/api/1.0/entities/id_lookup.json?bioguide_id=' + bioGuideID + '&apikey=66603c029b1b49428da28d6a783f795e',
		method: 'GET'
	};

	request(options, function(error, response, body){

		if (!error && response.statusCode == 200) {
			var id = JSON.parse(body)[0].id;
			callback(id);
		} else {
			console.log(' ! NO ID FROM INFLUENCE EXPLORER')
		}
	});
};

// Makes request based on options
var makeRequest = function(res, endpoint, options){

	// Triggers upon a response 
	function callback(error, response, body) {

		// Check the response is ok
		if (!error && response.statusCode == 200) {
			
			var data = JSON.parse(body),
				responseData = {};
			
			// Format Response the ember way
			// { 'legislators': [{ 'key': value }] }
			responseData[endpoint] = data.results;

			// Allow front end to read from this endpoint (CORS)
			res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');

			// Send back response!
			res.send(JSON.stringify(responseData));

		}
	}

	console.log(' - Requesting: ' + options.url);
	// Make the request
	request(options, callback);
};




// Return Sunlight Foundation options
var createOptions = function(req, res, idKey, endpointOverride){
	var params = 	req.path.split('/'),
		endpoint = 	endpointOverride || params[2],
		id = 		params[3],
		query;

	// add id to query
	if(id && idKey) req.query[idKey] = id;

	query = querystring.stringify(req.query);

	// Options for the request
	var options = {
		url: 'https://congress.api.sunlightfoundation.com/' + endpoint,
		method: 'GET',
		headers: {
			'content-type': 'application/json; charset=UTF-8',
			'X-APIKEY': '66603c029b1b49428da28d6a783f795e'
		}
	};

	// Add query to request url
	if(query) options.url = options.url  + '?' + query;

	return options;
}



// ROUTES
// ========================================================
app.get('/api/locations*', function(req, res) {
	if(req.query.address){

		// Make the location request
		geocoder.geocode(req.query.address, function ( err, data ) {
			var parsedLocations = [],
				index = 1;

			data.results.map(function(location){

				var coords = location.geometry.location,
					isInUSA = location.address_components.some(function(component){
						return component.short_name === 'US';
					});


				if(isInUSA){
					parsedLocations.push({
						id: index,
						address: location.formatted_address,
						latitude: coords.lat,
						longitude: coords.lng
					});

					index+=1;
				}

			});

			res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');
			res.send({ locations: parsedLocations });
		});
	}
});



app.get('/api/legislators*', function(req, res) {
	
	if(req.query.latitude && req.query.longitude){
		// To locate use Coords primarily

		// Use the locate api in Sunlight
		makeRequest(res, 'legislators', createOptions(req, res, 'bioguide_id', 'legislators/locate'));
		
	}else if(req.query.address){
		// If there is an address, find the coords based on that 
		// address before making query
		
		// Make the location request
		geocoder.geocode(req.query.address, function ( err, data ) {

			// Get coords
			var coords = data.results[0].geometry.location;

			// Add cords to query
			req.query.latitude = coords.lat;
			req.query.longitude = coords.lng;

			// Remove address, its no longer needed
			delete req.query.address;

			makeRequest(res, 'legislators', createOptions(req, res, 'bioguide_id', 'legislators/locate'));
		});

	} else {
		// No address?  Handle it normally
		makeRequest(res, 'legislators', createOptions(req, res, 'bioguide_id'));	
	}
});



app.get('/api/contributors*', function(req, res) {
	
	if(req.query.bioguide_id){
		
		// Get appropriate id and do something with it
		getInfluenceId(req.query.bioguide_id, function(id){


			console.log(' ** Influence Explorer ID: ' + id);

			var options = {
				url: 'http://transparencydata.com/api/1.0/aggregates/pol/' + id + '/contributors.json?apikey=66603c029b1b49428da28d6a783f795e',
				method: 'GET'
			};

			request(options, function(error, response, body){
				if (!error && response.statusCode == 200) {
					res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');
					var responseData = {
						contributors: JSON.parse(body)
					};
					res.send(JSON.stringify(responseData));
				}
			});

			
		})
	}
});



//Wildcard route
app.get('/api/*', function(req, res) {
	var endpoint = req.path.split('/')[2];
	makeRequest(res, endpoint, createOptions(req, res));
});




// Set up port
// ========================================================
var server = app.listen(3000, function() {
	console.log(' - Listen to port ' + server.address().port);
});
