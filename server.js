'use strict';

/*
var cl = console.log;
console.log = function(){
  console.trace();
  cl.apply(console,arguments);
};
*/

// Requires meanio .
var mean = require('meanio');

var cluster = require('cluster');

var deferred = require('q').defer();

var compression = require('compression');

var express = require('express');

var app = express();

app.use(compression());

var bodyParser = require('body-parser');

var async = require("async");

var routes = require('./routes');

app.use('/routes',routes);

app.use('/', express.static(__dirname + '/'));

app.use(express.static('public'));

app.use(express.static('bower_components'));

app.get('/', function (req, res) {

  res.sendFile(path.join(__dirname + "/index.html"));

});





var schedule = require('node-schedule');

var rule = new schedule.RecurrenceRule();

//rule.minute = new schedule.Range(0, 59, 5);
/*year: null,
  month: null,
  date: null,
  dayOfWeek: null,
  hour: null,
  minute: null,
  second: 0,
  seconds: 5 
  */
rule.seconds = 5;

schedule.scheduleJob(rule, function(){
    
});


app.listen(3000, function () {

  console.log('Example app listening on port 3000!');

});
