var objstore = require('./objstore');

exports.find = function(key){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.find(key);

    diff = process.hrtime(start);
    console.log('find took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};
exports.store = function(key, val){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.store(key, val);

    diff = process.hrtime(start);
    console.log('store took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};
exports.remove = function(key){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.remove(key);

    diff = process.hrtime(start);
    console.log('remove took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};
exports.clear = function(){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.clear();

    diff = process.hrtime(start);
    console.log('clear took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};
exports.size = function(){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.size();

    diff = process.hrtime(start);
    console.log('size took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};
exports.free = function(){
    var result,
        start = process.hrtime(),
        diff;

    result = objstore.free();

    diff = process.hrtime(start);
    console.log('free took', diff[0] * 1E9 + diff[1], 'ns');

    return result;
};