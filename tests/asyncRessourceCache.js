var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        objstore.clear();
        callback();
    },

    'tests store find method': function(test) {
        function someAsyncFunction(path, callback) {
            var cachedResult = objstore.find(path);
            if (cachedResult){
                callback(cachedResult);
            } else {
                setTimeout(function(){
                    var data = {
                        id: Math.floor(Math.random()*1E8),
                        content: 'lorem ipsum'
                    };
                    objstore.store(path, data);
                    callback(data)
                }, 1000);
            }
        }

        var KEY = 'FIND_KEY',
            PATH = '/ressource.json?t=' + Date.now();

        test.equal(objstore.size(), 0, 'Store is empty');
        test.equal(objstore.find(KEY), undefined, 'Found nothing for ' + KEY);

        someAsyncFunction(PATH, function(data){
            // check if store has only 1 item
            test.equal(objstore.size(), 1, 'Store is empty');
            // async function is called again
            someAsyncFunction(PATH, function(storedData){
                // check if store has only 1 item
                test.equal(objstore.size(), 1, 'Store is empty');
                test.deepEqual(storedData, data, 'has cached result');
                test.done();
            });
        });

    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};