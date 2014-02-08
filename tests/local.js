var Storage = require('../src/wrapper'),
    store1,
    store2;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store1 = Storage.create();
        store2 = Storage.create();
        callback();
    },

    'tests store find method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store1.size(), 0, 'Store 1 is empty');
        test.equal(store1.size(), 0, 'Store 2 is empty');

        store1.store(KEY, VALUE);

        test.equal(store1.size(), 1, 'Store 1 is not empty');
        test.equal(store2.size(), 0, 'Store 2 is empty');

        test.done();
    },

    tearDown: function (callback) {
        store1.clear();
        store2.clear();
        callback();
    }
};