var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store store method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY + 1, VALUE);
        store.store(KEY + 2, VALUE);
        store.store(KEY + 3, VALUE);
        store.store(KEY + 3, VALUE);
        test.equal(store.size(), 3, 'added 3 objects');

        test.done();
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};