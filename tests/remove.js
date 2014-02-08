var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store remove method': function(test) {
        test.equal(store.size(), 0, 'Store is empty');

        store.store('foo', 1);
        store.remove('foo');

        test.equal(store.size(), 0, 'Store size is 0');
        test.done();
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};