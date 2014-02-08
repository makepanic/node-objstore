var Storage = require('../src/wrapper'),
    store;

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create();
        callback();
    },

    'tests store expire timeout feature': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');

        store.store(KEY + 1, VALUE, 100);
        test.equal(store.size(), 1, 'store has 1 item');

        setTimeout(function(){
            test.equal(store.size(), 0, 'store has 0 item');
            test.done();
        }, 200);
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};