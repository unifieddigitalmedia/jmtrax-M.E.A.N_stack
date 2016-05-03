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



   db.collection('users').findOne({"customerdetails.Email":req.query.email},function(e, results){

   if (e) return next(e);

   if (results) {


        var temppassword = "";

        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
        temppassword += possible.charAt(Math.floor(Math.random() * possible.length));


   db.collection('users').updateOne( { "customerdetails.Email":req.query.email }, { $set: { "password": temppassword } }, function(err, results) {
  
    if (e) return next(e);


     var response = {"ERROR":"Please use the temporary password "+temppassword+ " to log in and change."};
        
        res.json(response);


   });


        
   
   

   }

  else 

    {  


      
        var response = {"ERROR":"Email not found"};
        
        res.json(response);




    }

   });

  

});

module.exports = router;