var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store find method': function(test) {
        function someAsyncFunction(path, callback) {
            var cachedResult = store.find(path);
            if (cachedResult){
                callback(cachedResult);
            } else {
                setTimeout(function(){
                    var data = {
                        id: Math.floor(Math.random()*1E8),
                        content: 'lorem ipsum'
                    };
                    store.store(path, data);
                    callback(data)
                }, 1000);
            }
        }

        var KEY = 'FIND_KEY',
            PATH = '/ressource.json?t=' + Date.now();

        test.equal(store.size(), 0, 'Store is empty');
        test.equal(store.find(KEY), undefined, 'Found nothing for ' + KEY);

        someAsyncFunction(PATH, function(data){
            // check if store has only 1 item
            test.equal(store.size(), 1, 'Store is empty');
            // async function is called again
            someAsyncFunction(PATH, function(storedData){
                // check if store has only 1 item
                test.equal(store.size(), 1, 'Store is empty');
                test.deepEqual(storedData, data, 'has cached result');
                test.done();
            });
        });

    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};