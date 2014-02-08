var Storage = require('./objstore').Storage;
var globalStorage;

exports.global = function(conf){
    globalStorage = new Storage(conf);
};
exports.local = function(){
    globalStorage = null;
};
exports.create = function(opts){
    return globalStorage ? globalStorage : new Storage(opts);
};