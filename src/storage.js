var EventEmitter = require('events').EventEmitter;

/**
 * Sets the storage configuration
 * @param {{perFree: number, size: number, expire: number}} conf Storage configuration
 * @returns {{find: find, store: store, remove: remove, clear: clear, size: size, free: free, all: all, on: on}} Storage Object
 * @constructor
 */
var Storage = function(conf){
    conf = conf || {};

    var // function to return a unique now value
        _now = function(){
            var now = process.hrtime();
            return now[0] * 1E9 + now[1];
        },
        // object that holds all values
        _store = {},
        // map that stores timestamps and key for all values
        _expireMap = {},
        // method configurations
        _conf = {
            topic: conf.hasOwnProperty('topic') ? conf.topic : 'expired',
            // number of values that are freed
            perFree: conf.hasOwnProperty('perFree') ? conf.perFree : 100,
            // maximum size of storage
            size: conf.hasOwnProperty('size') ? conf.size : 1000,
            // time in milliseconds when values are expired
            expire: conf.hasOwnProperty('expire') ? conf.expire : 60000
        },
        _emitter = new EventEmitter();

    // "computed properties"
    _conf.expireNs = _conf.expire * 1E6;


    /**
     * Function that returns the storage size
     * @returns {number} storage size
     */
    function size() {
        return Object.getOwnPropertyNames(_store).length;
    }

    /**
     * Removes a value using a key
     * @param {string} key identifier for value
     * @returns {void}
     */
    function remove(key) {
        if (_store.hasOwnProperty(key)) {
            // clear timeout
            clearTimeout(_store[key].id);
            // delete stored data
            delete _expireMap[_store[key].now];
            delete _store[key];
        }
    }

    /**
     * Function that tries to find a key and returns the stored value
     * @param {string} key identifier for value
     * @returns {*|undefined} result of value lookup
     */
    function find(key) {
        // check if store has key
        return _store.hasOwnProperty(key) ? _store[key].val : undefined;
    }

    /**
     * Frees a specified amount of values from the storage.
     * It removes the oldest stored values.
     * @param {number} [amount=1] number of values that needs to be freed
     * @returns {void}
     */
    function free(amount) {
        amount = amount || 1;
        // oldest items from expire map
        Object.keys(_expireMap).slice(0, amount).forEach(function(timestamp){
            // remove each key
            remove(_expireMap[timestamp]);
        });
    }

    /**
     * Function that expires a value using a key. Emits an event.
     * @param {string} key Storage value identifier
     * @private
     * @returns {void}
     */
    function _expire(key) {
        if (_store.hasOwnProperty(key)){
            // emit event
            _emitter.emit(_conf.topic, {
                key: key,
                value: _store[key].val
            });
            remove(key);
        }
    }

    /**
     * Function that stores a value using a key
     * @param {string} key identifier for value
     * @param {*} value value that needs to be stored
     * @param {number} [expires] Time in milliseconds until value expires
     * @returns {void}
     */
    function store(key, value, expires) {
        expires = expires || _conf.expire;

        if (size() + 1 > _conf.size) {
            // free storage
            free(_conf.perFree);
        }

        if (_store.hasOwnProperty(key)) {
            // already stored something

            // remove expiredmap entry
            delete _expireMap[_store[key].now];

            // clear old timeout
            clearTimeout(_store[key].id);

            // remove old stored value
            _store[key].val = value;
            _store[key].now = _now();

        } else {
            // hasn't stored anything for key
            // store new value
            _store[key] = {
                val: value,
                now: _now()
            };
        }

        // if expires is positive start timeout
        if (expires > -1) {
            // call remove with key in _conf.expire milliseconds
            _store[key].id = setTimeout(_expire.bind(null, key), expires);
        }

        // add key to expired map
        _expireMap[_store[key].now] = key;
    }

    /**
     * Function that clears the storage
     * @returns {void}
     */
    function clear() {
        // clear all timeouts
        Object.keys(_store).forEach(function(key){
            clearTimeout(_store[key].id);
        });

        // reset store and expiremap
        _store = {};
        _expireMap = {};
    }

    /**
     * Function to get all stored items
     * @returns {Array} All stored items with value and key
     */
    function all() {
        return Object.keys(_store).map(function(key){
            return {
                value: _store[key].val,
                key: key
            };
        });
    }

    /**
     * Function to register an listener for a specific topic
     * @param {string} topic EventEmitter topic
     * @param {function()} callback Function that is called once the emitter emits a message under the topic
     * @returns {*} emitter.on result
     */
    function on(topic, callback) {
        return _emitter.on(topic, callback);
    }

    // return public methods
    return {
        find: find,
        store: store,
        remove: remove,
        clear: clear,
        size: size,
        free: free,
        all: all,
        on: on
    };
};

exports.Storage = Storage;