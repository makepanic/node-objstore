var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        objstore.config({
            perFree: 50,
            size: 100,
            expire: 60000,
            useTimeout: false
        });
        callback();
    },

    'tests store free method': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(objstore.size(), 0, 'Store is empty');

        for(var i = 0; i < 150; i++) {
            objstore.store(KEY + i, VALUE);
        }

        for(var j = 0; j < 50; j++) {
            test.equal(objstore.find(KEY + j), undefined, 'old item ' + j + ' was freed')
        }
        test.ok(objstore.find(KEY + 51), 'old item not in perFree exists');
        test.equal(objstore.size(), 100, 'all object cleared');
        test.done();
    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};