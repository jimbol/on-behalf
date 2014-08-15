sunlight-dashboard
==================

Work-in-progress dashboard for viewing Sunlight Foundation data with Ember.
But its going to be awesome.

##For the Front End
Install Ember-CLI to get started and follow [their documentation](http://iamstef.net/ember-cli/) to start it up.  This is used for the frontend.

##For the API
In a seperate tab, move into api folder.

    cd api

Install node and npm (if you haven't already).  Then install dependencies and run it!

    npm install
    node server


##API Usage

Many of the normal Ember requests work just fine.

`http://localhost:3000/api/legislators/J000296` will return the legislator with a bioguide_id of J000296
`http://localhost:3000/api/legislators?bioguide_id=J000296` will too!

So we can make queries and requests by ID (just with legislators right now) or using the ember way of setting up queries.

    this.store.find('legislator', {
	    bioguide_id: J000296
    });
    // Makes this request to api 
    // http://localhost:3000/api/legislators?bioguide_id=J000296

    // Which routes to this request to Sunlight 
    // https://congress.api.sunlightfoundation.com/legislators?bioguide_id=J000296

Also we can find a user's reps based on address:

    this.store.find('legislator', {
	    address: '1740 Washington Rd, MI'
    });
    // Returns all congress folks for that address

Or zip code:

	this.store.find('legislator', {
	    address: '60647'
    });
    // Returns all congress folks for that zipcode




