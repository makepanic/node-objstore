var objstore = require('../src/objstore');

module.exports = {
    setUp: function (callback) {
        objstore.config({
            useTimeout: true,
            expire: 1000
        });
        callback();
    },

    'tests store expire timeout feature': function(test) {
        var KEY = 'FIND_KEY',
            VALUE = 'waldo';

        test.equal(objstore.size(), 0, 'Store is empty');

        objstore.store(KEY + 1, VALUE);
        test.equal(objstore.size(), 1, 'store has 1 item');

        setTimeout(function(){
            test.equal(objstore.size(), 0, 'store has 0 item');
            test.done();
        }, 2000);

    },

    tearDown: function (callback) {
        objstore.clear();
        callback();
    }
};