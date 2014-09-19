var express = 		require('express'),
	geocoder = 		require('geocoder'),
	request = 		require('request'),
	http = 			require('http'),
	querystring = 	require('querystring'),
	Legislator = 	require('./controllers/legislator');


exports.define = function(app){

	app.get('/api/legislator*', function(req, res){
		var legislator = new Legislator( req, res );
		legislator.get();
	});

	// Wildcard
	app.get('/*', function(req, res) {
		console.log(req.path + ' requested');
		res.sendfile(req.path.substr(1));
	});

};