var Storage = require('./storage').Storage;
var globalStorage;

/**
 * Function to enable usage of one storage instance for all create calls
 * @param {object} conf Storage configuration object
 * @returns {void}
 */
exports.global = function(conf){
    globalStorage = new Storage(conf);
};
/**
 * Function to disable the global option
 * @returns {void}
 */
exports.local = function(){
    globalStorage = null;
};
/**
 * Function that creates a storage instance or returns the global instance
 * @param {object} opts Storage configuration object
 * @returns {Storage} Storage object
 */
exports.create = function(opts){
    return globalStorage ? globalStorage : new Storage(opts);
};