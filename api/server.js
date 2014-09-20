var express = 	require( 'express' ),
	router = 	require( './router' );

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));

router.define( app );

// Set up port
// ========================================================
app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'));
});
