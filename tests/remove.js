var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        callback();
    },

    'tests store remove method': function(test) {
        var removed;

        test.equal(objstore.size(), 0, 'Store is empty');

        objstore.store('foo', 1);
        removed = objstore.remove('foo');

        test.equal(objstore.size(), 0, 'Store size is 0');
        test.equal(removed, 1, 'Removed item is correct');

        test.done();
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};