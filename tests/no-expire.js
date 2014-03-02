var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        store = Storage.create();
        callback();
    },

    'tests store with negative expire value': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY, VALUE, -1);
        store.store(KEY + 1, VALUE, 100);

        test.equal(store.size(), 2, 'Store has 2 values stored');

        setTimeout(function(){
            test.equal(store.size(), 1, 'Store expired only 1 value');
            test.done();
        }, 200);
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};