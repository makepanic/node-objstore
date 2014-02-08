var objstore = require('../src/objstore'),
    TOPIC = 'expired';

module.exports = {
    setUp: function (callback) {
        callback();
        objstore.config({
            topic: TOPIC
        });
    },

    'tests store expired event': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(objstore.size(), 0, 'Store is empty');
        objstore.on(TOPIC, function(key) {
            test.equal(KEY, key, 'expired item is correct');
            test.done();
        });

        objstore.store(KEY, VALUE, 1000);
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};