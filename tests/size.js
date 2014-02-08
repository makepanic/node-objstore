var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },
    'tests objectstore size function': function(test) {

        test.equal(store.size(), 0, 'Store is empty');

        store.store('foo', 1);
        store.store('bar', 1);
        store.store('x', 1);
        store.store('y', 1);

        test.equal(store.size(), 4, 'Store size is 4');

        test.done();
    },
    tearDown: function (callback) {
        store.clear();
        callback();
    }
};