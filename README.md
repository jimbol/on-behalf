OnBehalf
==================

It is almost common knowledge that our national lawmakers do not serve the American people, but rather, various corporate interests.  The goal of OnBehalf is to shine a light on corporations' influence on your representatives so that you can better interpret their actions.  Eventually, we'd like to draw a direct correlation between a lawmaker's contributors and their voting habits.

#Install Locally
##Requires
- NodeJS
- NPM

##Set Up Front End
Install [Ember-CLI](http://iamstef.net/ember-cli/) to start it up

    npm install -g ember-cli

Then install dependencies

    cd frontend
    npm install
    bower install

Run with

    ember server

##Set Up API
In a seperate tab, move into api folder.

    cd api

Install node and npm (if you haven't already).  Then install dependencies and run it!

    npm install

Run with

    node server


#Usage

##Request an individual legislator

Request by `id`

    this.store.find('legislator', {
        id: 'J000296'
    });

Calls

    /api/legislators/J000296

Which is the same as querying directly by `bioguide_id`

    this.store.find('legislator', {
        bioguide_id: 'J000296'
    });

Calls

    /api/legislators?bioguide_id=J000296


Find a user's reps based on address

    this.store.find('legislator', {
	    address: '1740 Washington Rd, MI'
    });
    // Returns all legislators for that address

Or zip code

	this.store.find('legislator', {
	    address: '60647'
    });
