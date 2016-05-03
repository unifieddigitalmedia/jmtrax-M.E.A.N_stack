var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);

var mongo = require('mongodb');

router.get('/', function(req, res ) {



db.collection('banks').find().toArray(function(e, results){


   if (e) return next(e);

   
     
     res.json(results);



   });


});



router.delete('/', function(req,res) {


var o_id = new mongo.ObjectID(req.query.id);



db.collection('banks').remove( { "_id":o_id} , function(err, results) {

var response = {

"ERROR":"Bank has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );
       

   });



 



});

router.post('/', function(req,res) {


      db.collection('banks').insert([ {


        "bankname":req.query.bank_name, 
        "bankholder":req.query.bank_holder,
        "accountnumber":req.query.accountnumber, 
        "sortcode":req.query.sortcode,
        "ref":req.query.ref, 
        "type":req.query.type, 
        
       

                       }


        ], function (err, result) {
 

var response = {"ERROR":"A new " + req.query.type + " bank has been added to our database"};
        
        res.json( response);
  });


         


});




router.delete('/', function(req,res) {

db.collection('banks').deleteOne( { "bankname":req.query.bankname} , function(err, results) {

var response = {

"ERROR":"Bank has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );
        

   });


});





module.exports = router;