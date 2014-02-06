var _now = function(){ return Date.now(); },
    // object that holds all values
    _store = {},
    // map that stores timestamps and key for all values
    _expireMap = {},
    // method configurations
    _conf = {
        // number of values that are freed
        perFree: 100,
        // maximum size of storage
        size: 1000,
        // time in milliseconds when values are expired
        expire: 60000,
        // turns removing via setTimeout on or off
        useTimeout: false
    };

/**
 * Sets the storage configuration
 * @param {{perFree: number, size: number, expire: number, useTimeout: boolean}} conf
 */
function config(conf) {
    _conf = conf;
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
 * @returns {*} removed value
 */
function remove(key) {
    // backup old stored value (or undefined)
    var oldVal = _store[key];
    if (_store.hasOwnProperty(key)) {
        // delete keys
        delete _store[key];
        delete _expireMap[oldVal.now];
    }
    // returned removed value
    return oldVal.val;
}

/**
 * Function that tries to find a key and returns the stored value
 * @param {string} key identifier for value
 * @returns {*|undefined} result of value lookup
 */
function find(key) {
    var found;

    // check if store has key
    if (_store.hasOwnProperty(key)) {
        found = _store[key].val;

        if (_now() - _store[key].now > _conf.expire) {
            // value is expired, remove
            remove(key);
        }
    }
    return found;
}

/**
 * Frees a specified amount of values from the storage.
 * It removes the oldest stored values.
 * @param {number} [amount] number of values that needs to be freed
 */
function free(amount) {
    amount = amount || 1;
    // oldest items from expire map
    var toFree = Object.keys(_expireMap).slice(0, amount);
    toFree.forEach(function(timestamp){
        // remove each key
        remove(_expireMap[timestamp]);
    });
}

/**
 * Function that stores a value using a key
 * @param {string} key identifier for value
 * @param {*} value value that needs to be stored
 * @returns {{val: *, now: number}} stored object
 */
function store(key, value) {
    if (size() > _conf.size) {
        // remove oldest entries
        free(_conf.perFree);
    }

    // store new value
    _store[key] = {
        val: value,
        now: _now()
    };

    if (_conf.useTimeout) {
        // call remove with key in _conf.expire milliseconds
        _store[key].id = setTimeout(remove.bind(null, key), _conf.expire);
    }

    // add key to expired map
    _expireMap[_store[key].now] = key;

    return _store[key];
}

/**
 * Function that clears the storage
 */
function clear() {
    if (_conf.useTimeout) {
        // clear all timeouts
        Object.keys(_store).forEach(function(key){
            clearTimeout(_store[key].id);
        });
    }
    // reset store and expiremap
    _store = {};
    _expireMap = {};
}

// export functions
exports.config = config;
exports.find = find;
exports.store = store;
exports.remove = remove;
exports.clear = clear;
exports.size = size;
exports.free = free;