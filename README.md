#node-objstore [![Build Status](https://travis-ci.org/makepanic/node-objstore.png?branch=develop)](https://travis-ci.org/makepanic/node-objstore)

JavaScript library for storing objects.

##NPM

`npm install objstore --save`

##Configuration

`Storage.create` accepts a configuration object:

default values:

```js
Storage.create({
    // remove 100 values if free is called or size is reached.
    perFree: 100,
    // storage can hold 1000 values
    size: 1000,
    // expire values after 60 secs
    expire: 60000
});
```

If `expire` equals -1 it will not automatically remove values.

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

##Methods

__Storage__

- `Storage.global(conf)` lets each `.create()` return the same instance.
- `Storage.local()` lets each `.create()` return a new storage instance.
- `Storage.create(conf)` creates a storage instance.
    If `.local()` was called it will use `opts` to configure the new instance.

__Storage.create() instance__

- `find(key)` tries to find a stored value using the given key. If nothing is found it returns undefined
- `store(key, value, expiresIn)` stores/updates a value using the given key. If `expiresIn` is negativ it won't expire values automatically.
- `remove(key)` removes a value from the storage
- `clear()` removes all values from teh storage
- `size()` returns the number of stored values
- `free(amount)` removes `amount` oldest values
- `all()` returns an array with all stored values
- `on(topic, callback)` subscribes to `topic` with a `callback`
- `beginStoreProperties()` to disable the size check before adding values.
    This can be useful if you want to add multiple values to the store and handle the size after all of them are added.
- `endStoreProperties()` to enable the size check before adding values.
    This will also free if the size is greater than `config.size`.

##TODO

- implementation without setTimeout
- Example
- Documentation
- Benchmark
- ES6 Map/Proxy

##How

`objstore` uses an object to store values under a given key. The stored value is wrapped in an object that contains a timestamp, an interval id and a the value.

To avoid too many stored objects there is an option to limit the amount of stored values.
If the limit is reached or the `free` method is called, the oldest values are removed from the storage.

Finding the oldest values is accomplished using a second object that uses the timestamp of stored objects as keys and keys of stored objects as values.
Using the `Object.keys` method an array is created that contains all timestamps. `Object.keys` automatically sorts the array items. The `array.slice` method is used to cut a chunk of the sorted expiration map.
The new array is used too loop through all timestamps and get the main storage keys to remove them.

The expiration is implemented using the `setTimeout` method.

##Documentation

For the documentation see [makepanic.github.io/node-objstore/](http://makepanic.github.io/node-objstore/global.html)
