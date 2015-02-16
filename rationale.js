var timerPromise = function(arg) {
    var deferred = Q.defer();
    setTimeout(function() {deferred.resolve("timer " + arg + " ms")}, arg);
    return deferred.promise;
};

function raConnect(server, subs, func){
    var conn = new Asteroid(server);
    var _subs = [];
    for (i in subs) {
        _subs[i] = conn.subscribe(subs[i]).ready;
    }
    function params(result){
        for (i in subs){
            window[subs[i]] = conn.getCollection(subs[i])
        }
        return {result: result, params: {connection: conn, collections: subs}}
    };


    Q.all(_subs)
        .then(params)
        .then(func)
        .fail(function(fail) {console.log("fail", fail); return fail})
        .done();
}