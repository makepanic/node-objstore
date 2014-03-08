var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        callback();
    },

    'tests store method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        store = Storage.create();
        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY + 1, VALUE);
        store.store(KEY + 2, VALUE);
        store.store(KEY + 3, VALUE);

        test.equal(store.size(), 3, 'added 3 objects');
        test.done();
    },

    'tests store method with the same key': function(test){
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        store = Storage.create();
        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY, VALUE);
        store.store(KEY, VALUE + ' 2.0');

        test.equal(store.size(), 1, 'added only 1 object');

        test.done();
    },

    'tests the store method with a set maximum size': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        store = Storage.create({
            perFree: 1,
            size: 4
        });

        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY + 1, VALUE);
        store.store(KEY + 2, VALUE);
        store.store(KEY + 3, VALUE);
        store.store(KEY + 4, VALUE);
        store.store(KEY + 5, VALUE);

        test.equal(store.size(), 4, 'Store has no more than size elements');
        test.ok(!store.find(KEY + 1), 'Store doesnt has the oldest value');

        store.store(KEY + 2, VALUE);
        store.store(KEY + 6, VALUE);

        test.equal(store.size(), 4, 'Store has no more than size elements');
        test.ok(store.find(KEY + 2), 'Store has second value because it was updated and isnt the oldest');
        test.ok(!store.find(KEY + 3), 'Store has nothing for third value because it wasnt updated');

        test.done();

    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};