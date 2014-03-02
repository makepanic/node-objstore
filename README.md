#node-objstore [![Build Status](https://travis-ci.org/makepanic/node-objstore.png?branch=develop)](https://travis-ci.org/makepanic/node-objstore)

nodejs library for object caching

##NPM

`npm install objstore --save`

##Examples

###Storing and accessing a value

```js
var Storage = require('objstore');
var myStorage = Storage.create();

// store myValue on foo
myStorage.store('foo', myValue);

// find at foo stored value
myStorage.find('foo')
```

###Using global storage object
```js
var Storage = require('objstore');
Storage.global();

var store1 = Storage.create();
var store2 = Storage.create();

// store1 equals store2

```

##TODO

- implementation without setTimeout
- Example
- Documentation
- Benchmark
- ES6 Map/Proxy

##features

- find value via key
- store value via key
- set expiration time for values
- limit number of stored values

##How

`Objcache` uses an object to store values under a given key. The stored value is wrapped in an object that contains a timestamp, an interval id and a the value.

To avoid too many stored objects there is an option to limit the amount of stored values.
If the limit is reached or the `free` method is called, the oldest values are removed from the storage.

Finding the oldest values is accomplished using a second object that uses the timestamp of stored objects as keys and keys of stored objects as values.
Using the `Object.keys` method an array is created that contains all timestamps. `Object.keys` automatically sorts the array items. The `array.slice` method is used to cut a chunk of the sorted expiration map.
The new array is used too loop through all timestamps and get the main storage keys to remove them.

The expiration is implemented using the `setTimeout` method.

##Documentation

For the documentation see [makepanic.github.io/node-objstore/](http://makepanic.github.io/node-objstore/global.html)
