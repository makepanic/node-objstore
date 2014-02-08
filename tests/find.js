var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store find method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');
        test.equal(store.find(KEY), undefined, 'Found nothing for ' + KEY);

        store.store(KEY, VALUE);
        test.equal(store.find(KEY), VALUE, 'found ' + VALUE + ' at ' + KEY);
        test.equal(store.size(), 1, 'Store is not empty');

        test.done();
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};