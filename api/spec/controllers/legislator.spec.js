var legislator = require('../../controllers/legislator');

function getResStub(){
    return {
        setHeader: function(){},
        send: function(){}
    };
}

function getReqStub(){
    return {
        query: {},
        path: '/api/legislators'
    };
}

function onSend( res, callback ){
    res.send = callback;
}

describe('controllers/legislator', function () {
    var req,
        res;

    beforeEach(function(){
        req = getReqStub();
        res = getResStub();
    });

    it('should return all legislators', function (done) {
        onSend( res, function( result ){
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

        onSend( res, function( result ){
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

        onSend( res, function( result ){
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
});