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

var legislator = require('./controllers/legislator');


exports.define = function(app){

	app.get('/api/legislator*', legislator.get);

	// Wildcard
	app.get('/*', function(req, res) {
		console.log(req.path + ' requested');
		res.sendfile(req.path.substr(1));
	});

};



// Functions
// ========================================================

// Get influence explorer id
// var getInfluenceId = function(bioGuideID, callback){

// 	var options = {
// 		url: 'http://transparencydata.com/api/1.0/entities/id_lookup.json?bioguide_id=' + bioGuideID + '&apikey=66603c029b1b49428da28d6a783f795e',
// 		method: 'GET'
// 	};

// 	request(options, function(error, response, body){

// 		if (!error && response.statusCode == 200) {
// 			var id = JSON.parse(body)[0].id;
// 			callback(id);
// 		} else {
// 			console.log(' ! NO ID FROM INFLUENCE EXPLORER');
// 		}
// 	});
// };

// // Makes request based on options
// var makeRequest = function(res, endpoint, options){

// 	// Triggers upon a response
// 	function callback(error, response, body) {

// 		// Check the response is ok
// 		if (!error && response.statusCode == 200) {

// 			var data = JSON.parse(body),
// 				responseData = {};

// 			// Format Response the ember way
// 			// { 'legislators': [{ 'key': value }] }
// 			responseData[endpoint] = data.results;

// 			// Allow front end to read from this endpoint (CORS)
// 			res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');

// 			// Send back response!
// 			res.send(JSON.stringify(responseData));

// 		}
// 	}

// 	console.log(' - Requesting: ' + options.url);
// 	// Make the request
// 	request(options, callback);
// };







// // ROUTES
// // ========================================================
// app.get('/api/locations*', function(req, res) {
// 	if(req.query.address){

// 		// Make the location request
// 		geocoder.geocode(req.query.address, function ( err, data ) {
// 			var parsedLocations = [],
// 				index = 1;

// 			data.results.map(function(location){

// 				var coords = location.geometry.location,
// 					isInUSA = location.address_components.some(function(component){
// 						return component.short_name === 'US';
// 					});


// 				if(isInUSA){
// 					parsedLocations.push({
// 						id: index,
// 						address: location.formatted_address,
// 						latitude: coords.lat,
// 						longitude: coords.lng
// 					});

// 					index+=1;
// 				}

// 			});

// 			res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');
// 			res.send({ locations: parsedLocations });
// 		});
// 	}
// });


// app.get('/api/contributors*', function(req, res) {

// 	if(req.query.bioguide_id){

// 		// Get appropriate id and do something with it
// 		getInfluenceId(req.query.bioguide_id, function(id){


// 			console.log(' ** Influence Explorer ID: ' + id);

// 			var options = {
// 				url: 'http://transparencydata.com/api/1.0/aggregates/pol/' + id + '/contributors.json?apikey=66603c029b1b49428da28d6a783f795e',
// 				method: 'GET'
// 			};

// 			request(options, function(error, response, body){
// 				if (!error && response.statusCode == 200) {
// 					res.setHeader('Access-Control-Allow-Origin', 'http://0.0.0.0:4200');
// 					var responseData = {
// 						contributors: JSON.parse(body)
// 					};
// 					res.send(JSON.stringify(responseData));
// 				}
// 			});


// 		})
// 	}
// });
