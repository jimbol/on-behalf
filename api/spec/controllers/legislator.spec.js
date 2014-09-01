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
});