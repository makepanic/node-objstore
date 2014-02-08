var Storage = require('./../src/wrapper');
Storage.global({
    topic: 'new-topic'
});

var store = Storage.create();
var store2 = Storage.create();

store.store('foo', 'bar');
console.log(store.size());
console.log(store2.size());