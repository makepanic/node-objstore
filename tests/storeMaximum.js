var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create({
            perFree: 50,
            size: 100,
            expire: 60000
        });
        callback();
    },

    'tests store free method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');

        for(var i = 0; i < 150; i++) {
            store.store(KEY + i, VALUE);
        }

        for(var j = 0; j < 50; j++) {
            test.equal(store.find(KEY + j), undefined, 'old item ' + j + ' was freed')
        }
        test.ok(store.find(KEY + 51), 'old item not in perFree exists');
        test.equal(store.size(), 100, 'all object cleared');
        test.done();
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};