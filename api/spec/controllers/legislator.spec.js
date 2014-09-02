var legislator = require('../../controllers/legislator'),
    helpers = require('../test-helpers');

describe('controllers/legislator', function () {
    var req,
        res;

    beforeEach(function(){
        req = helpers.getReqStub();
        res = helpers.getResStub();
    });

    it('should return all legislators', function (done) {
        helpers.onSend( res, function( result ){
            result = JSON.parse( result );
            expect( result.legislators.length ).toBeGreaterThan(3);
            done();
        });

        legislator.get( req, res );
    });

    it('should return legislators for lat/lon', function (done) {
        req.query = {
            latitude: 41.9281140,
            longitude: -87.7033310
        };

        helpers.onSend( res, function( result ){
            result = JSON.parse( result );
            expect( result.legislators.length ).toBe(3);
            done();
        });

        legislator.get( req, res );
    });

    it('should return legislators for zipcode', function (done) {
        req.query = {
            address: 60647
        };

        helpers.onSend( res, function( result ){
            var query = req.query;

            expect( query.address ).toBeUndefined();
            expect( query.latitude ).toBeDefined();
            expect( query.longitude ).toBeDefined();

            result = JSON.parse( result );
            expect( result.legislators.length ).toBe(3);
            done();
        });

        legislator.get( req, res );
    });

    it('should return single legislator for id', function (done) {
        req.path += '/K000360';

        helpers.onSend( res, function( result ){
            result = JSON.parse( result );
            expect( result.legislators.length ).toBe(1);
            done();
        });

        legislator.get( req, res, 'bioguide_id' );
    });
});