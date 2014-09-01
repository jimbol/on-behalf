var express = 	require( 'express' ),
	router = 	require( './router' );

var app = express();

router.define( app );

// Set up port
// ========================================================
var server = app.listen( 3000, function() {
	console.log(' - Listen to port ' + server.address().port);
});
