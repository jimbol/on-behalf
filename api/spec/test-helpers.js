exports.getResStub = function(){
    return {
        setHeader: function(){},
        send: function(){}
    };
};

exports.getReqStub = function(){
    return {
        query: {},
        path: '/api/legislators'
    };
};

exports.onSend = function( res, callback ){
    res.send = callback;
};