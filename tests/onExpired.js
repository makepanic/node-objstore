var Storage = require('../src/wrapper'),
    store,
    TOPIC = 'expired';

module.exports = {
    setUp: function (callback) {
        Storage.local();
        store = Storage.create({
            topic: TOPIC
        });
        callback();
    },

    'tests store expired event': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(store.size(), 0, 'Store is empty');
        store.on(TOPIC, function(value) {
            test.equal(KEY, value.key, 'expired key is correct');
            test.equal(VALUE, value.value, 'expired value is correct');
            test.done();
        });

        store.store(KEY, VALUE, 500);
    },

    tearDown: function (callback) {
        store.clear();
        callback();
    }
};