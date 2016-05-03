var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);


var sess;


router.get('/', function(req, res ) {



        sess = req.session;
        
        sess.username = req.query.username; 

        sess.email = arg3;

        sess.id = arg4; 

        sess.credit_limit = arg5; 

        var response = {"USERNAME":sess.username,"USERTYPE":sess.usertype,"EMAIL":sess.email,"LIMIT":sess.credit_limit,"ID":sess.id};
        
        res.json(response);




});
