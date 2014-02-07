#node-objcache [![Build Status](https://travis-ci.org/makepanic/node-objstore.png?branch=develop)](https://travis-ci.org/makepanic/node-objstore)

nodejs library for object caching

##TODO
- implementation without setTimeout
- Example
- Documentation
- Tests
- Benchmark
- ES6 Map/Proxy

##features

- find value via key
- store value via key
- set expiration time for values
- limit number of stored values

##Example


##How

`Objcache` stores values in an JavaScript object using a key. The stored value is wrapped in an object that contains a timestamp and a the value.

To avoid too many stored objects there is an option to limit the amount of stored values.
If the limit is reached or the `free` method is called, the oldest values are removed from the storage.
Finding the oldest values is accomplished using a second object that uses timestamp of stored objects as keys and keys of stored objects as values.
Using the `Object.keys` method an array is created that contains all timestamps. `Object.keys` automatically sorts the array items.
The `array.slice` method is used to cut a chunk of the sorted expiration map.
The new array is used too loop through all timestamps and get the main storage keys to remove them.

##Documentation

For the documentation see [makepanic.github.io/node-objstore/](http://makepanic.github.io/node-objstore/global.html)