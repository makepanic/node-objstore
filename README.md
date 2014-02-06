#node-objcache

nodejs library for object caching

##TODO
- Documentation
- Tests
- Benchmark
- ES6 Map/Proxy

##features

- find value via key
- store value via key
- set expiration time for values
- limit number of stored values

##How

`Objcache` stores values in an JavaScript object using a key. The stored value is wrapped in an object that contains a timestamp and a the value.

To avoid too many stored objects there is an option to limit the amount of stored values.
If the limit is reached or the `free` method is called, the oldest values are removed from the storage.
Finding the oldest values is accomplished using a second object that uses timestamp of stored objects as keys and keys of stored objects as values.
Using the `Object.keys` method an array is created that contains all timestamps. `Object.keys` automatically sorts the array items.
The `array.slice` method is used to cut a chunk of the sorted expiration map.
The new array is used too loop through all timestamps and get the main storage keys to remove them.

##methods

###`find( key )`

Function that tries to find a key and returns the stored value.

If the stored object is expired it is removed before returning the value.

###`store( key, value )`

Function that stores a value using a key.

If `useTimeout` is enabled it calls `setTimeout` to automatically remove the value if it expires

###`remove( key )`

Function that removes a stored value using a given key.

###`clear()`

Function that clears the storage and stops all timeouts if `useTimeout` is enabled.

###`size()`

Function that returns the storage size.

###`free( [amount] )`

Function that removes a given amount of values from the storage.

###`config( config )`

Calling `store.config()` sets the internal configuration.

####`perFree` default: `100`

__Number__ How many values are removed from the store if the `free` method is called.

####`size` default: `1000`

__Number__ The maximum amount of values that can be stored in the storage without automatically calling the `free` method.

####`expire` default: `60000`

__Number__ Time in milliseconds until a value expires and is removed.

####`useTimeout` default: `false`

__Number__ Whether the `setTimeout` method is used to automatically remove an expired value
