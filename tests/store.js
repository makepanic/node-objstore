var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        callback();
    },

    'tests store store method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(objstore.size(), 0, 'Store is empty');

        objstore.store(KEY + 1, VALUE);
        objstore.store(KEY + 2, VALUE);
        objstore.store(KEY + 3, VALUE);
        objstore.store(KEY + 3, VALUE);
        test.equal(objstore.size(), 3, 'added 3 objects');

        test.done();
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};