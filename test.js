

var timeoutObj = setTimeout(function(){
    console.log('timeout');
}, 30000);
var intervalObj = setInterval(function(){
    console.log('interval');
}, 60000);
var intermediateObj = setImmediate(function(){
   console.log('intermediate');
});

console.log('end');