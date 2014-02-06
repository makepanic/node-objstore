var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        callback();
    },

    'tests store find method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(objstore.size(), 0, 'Store is empty');
        test.equal(objstore.find(KEY), undefined, 'Found nothing for ' + KEY);

        objstore.store(KEY, VALUE);
        test.equal(objstore.find(KEY), VALUE, 'found ' + VALUE + ' at ' + KEY);
        test.equal(objstore.size(), 1, 'Store is not empty');

        test.done();
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};