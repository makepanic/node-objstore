var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        callback();
    },

    'tests store remove method': function(test) {
        test.equal(objstore.size(), 0, 'Store is empty');

        objstore.store('foo', 1);
        objstore.remove('foo');

        test.equal(objstore.size(), 0, 'Store size is 0');
        test.done();
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};