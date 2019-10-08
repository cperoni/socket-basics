var moment = require('moment');
var now = moment();
// console.log(now.format('X')); //unix timestamp
// console.log(now.valueOf()); //javascript timestamp

var timestamp = now.valueOf();
var timestampMoment = moment.utc(timestamp).local().format('h:mm a');
console.log(timestampMoment);

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));