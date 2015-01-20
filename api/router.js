var express = require('express'),
	geocoder = require('geocoder'),
	request = require('request'),
	http = require('http'),
	querystring = require('querystring');


var Legislator = 	require('./controllers/legislator');

exports.define = function(app){

	app.get('/api/legislator*', function(req, res){
		var legislator = new Legislator( req, res );
		legislator.get();
	});

	// app.options('/api/suggestions', function(req, res){
	// 	var suggestion = new Suggestion( req, res );
	// 	suggestion.post();
	// });

	// Wildcard
	// app.get('/*', function(req, res) {
	// 	console.log(req.path + ' requested');
	// 	res.sendfile(req.path.substr(1));
	// });

};