var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        callback();
    },
    'tests objectstore size function': function(test) {

        test.equal(objstore.size(), 0, 'Store is empty');

        objstore.store('foo', 1);
        objstore.store('bar', 1);
        objstore.store('x', 1);
        objstore.store('y', 1);

        test.equal(objstore.size(), 4, 'Store size is 4');

        test.done();
    },
    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};