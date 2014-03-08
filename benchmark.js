var Storage = require('./src/wrapper'),
    Benchmark = require('benchmark');

Storage.global();

var store = Storage.create({
        size: 1000
    }),
    suite,
    objstoreKey = 0;

suite = new Benchmark.Suite('objstore');

// add tests
suite.add('objstore#store', {
    fn: function() {
        store.store('key' + objstoreKey++, 'value');
    },
    onStart: function(){
        store.beginStoreProperties();
    },
    onComplete: function(){
        store.endStoreProperties();
        store.clear();
    }
})
// add listeners
.on('cycle', function(event) {
    console.log(String(event.target));
})
// run async
.run({ 'async': true });