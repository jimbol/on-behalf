var congressHelpers = require('../../helpers/congress'),
    helpers = require('../test-helpers');

describe('helpers/congress', function () {
    var req,
        res,
        baseUrl = 'https://congress.api.sunlightfoundation.com/legislators';

    beforeEach(function(){
        req = helpers.getReqStub();
        res = helpers.getResStub();
    });

    it('should create options', function () {
        var options = congressHelpers.createOptions( req, res );

        expect( options.url ).toBe( baseUrl );
    });

    it('should create options with an idKey', function () {
        req.path += '/K000360';

        var idKey = 'bioguide_id',
            options = congressHelpers.createOptions( req, res, idKey );

        expect( req.query.bioguide_id ).toBe( 'K000360' );
    });

    it('should create options with endpoint override', function () {
        // endpointOverride gets passed when the sunlight
        // endpoint differs from the route name

        var url = baseUrl + '/locate',
            options = congressHelpers.createOptions(
                req,
                res,
                'bioguide_id',
                'legislators/locate'
            );

        expect( options.url ).toBe( url );
    });

    it('should add query to the url in options', function () {
        req.query = {
            a: 123
        };

        var url = baseUrl + '?a=123',
            options = congressHelpers.createOptions(
                req,
                res
            );

        expect( options.url ).toBe( url );
    });

    it('should make requests', function () {
        var url = baseUrl + '?latitude=41.9281140&longitude=-87.7033310',
            options = congressHelpers.createOptions(
                req,
                res
            );

        helpers.onSend( res, function( result ){
            result = JSON.parse( result );
            expect( result.legislators.length ).toBe(3);
            done();
        });

        congressHelpers.makeRequest( res, 'legislators', options );
    });
});