var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store all method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY + 1, VALUE);
        store.store(KEY + 2, VALUE);
        store.store(KEY + 3, VALUE);
        test.equal(store.size(), 3, 'added 3 objects');

        store.all().forEach(function(stored, i){
            test.equal(stored.key, KEY + (i + 1), 'key is correct');
            test.equal(stored.value, VALUE, 'value is correct');
        });

        test.done();
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};