var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter(),
    // function to return a unique now value
    _now = function(){
        var now = process.hrtime();
        return now[0] * 1E9 + now[1]
    },
    // object that holds all values
    _store = {},
    // map that stores timestamps and key for all values
    _expireMap = {},
    // method configurations
    _conf = {
        topic: 'expired',
        // number of values that are freed
        perFree: 100,
        // maximum size of storage
        size: 1000,
        // time in milliseconds when values are expired
        expire: 60000,
        // expire in ns
        expireNs: 60000 * 1E6
    };


/**
 * Sets the storage configuration
 * @param {{perFree: number, size: number, expire: number}} conf
 */
function config(conf) {
    _conf.topic = conf.hasOwnProperty('topic') ? conf.topic : 'expired';
    _conf.perFree = conf.hasOwnProperty('perFree') ? conf.perFree : 100;
    _conf.size = conf.hasOwnProperty('size') ? conf.size : 1000;
    _conf.expire = conf.hasOwnProperty('expire') ? conf.expire : 60000;
    _conf.expireNs = _conf.expire * 1E6;
}
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
 * @param {string} key
 * @private
 */
function _expire(key) {
    // emit event
    emitter.emit(_conf.topic, key);
    remove(key);
}

/**
 * Function that stores a value using a key
 * @param {string} key identifier for value
 * @param {*} value value that needs to be stored
 * @param {number} [expires]
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

    // call remove with key in _conf.expire milliseconds
    _store[key].id = setTimeout(_expire.bind(null, key), expires);

    // add key to expired map
    _expireMap[_store[key].now] = key;
}

/**
 * Function that clears the storage
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

// export functions
exports.config = config;
exports.find = find;
exports.store = store;
exports.remove = remove;
exports.clear = clear;
exports.size = size;
exports.free = free;
exports.all = all;
exports.on = function(topic, callback){
    emitter.on(topic, callback);
};
