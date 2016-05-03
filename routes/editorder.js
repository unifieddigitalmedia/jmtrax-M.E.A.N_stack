 var waterfall = require('async-waterfall');

var express = require('express');

var app = express();

var router = express.Router();

var mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient;

var mongo = require('mongodb');

var assert = require('assert');

var url = 'mongodb://localhost:27017/testdb';

var db = mongoose.createConnection(url);



router.get('/', function(req, res ) {

var o_id = new mongo.ObjectID(req.query.transaction_number);

db.collection('transfers').find( 



{




 '_id' : o_id
 


}

 ).toArray(function(e, results){



   if (e) return next(e);

console.log(results);

res.json(results);

   });  

});


router.put('/', function(req,res) {

var o_id = new mongo.ObjectID(req.query.id);

db.collection('transfers').updateOne(

{ "_id" : o_id },

{ $set: {



        "paymentdate":req.query.paymentdate, 
        "sendingbank":req.query.sendingbank,
        "paymentmethod":req.query.paymentmethod,
        "status":"paid"


}


},function (err, results) {
     

       var response = {"ERROR":"Payment has been accepted."};
        
        res.json( response);


    });




});



//$and: [ { "senderdetails.transaction.ReceipientFirstName": "value2"}, {  "senderdetails.transaction.ReceipientLastName ": "value2"  } ]



router.delete('/', function(req,res) {


var o_id = new mongo.ObjectID(req.query.id);

waterfall([

	function(callback) {

db.collection('transfers').remove( { "_id":o_id} , function(err, results) {

var response = {

"ERROR":"Transaction has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        //res.json( response );
        
        callback(null);

   });



	}
,
function(callback){
   

db.collection('users').remove( { "transactions._id" : req.query.id }  , function(err, results) {

var response = {

"ERROR":"Transaction has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );
        
        callback(null);

   });


 

   }

   ], function (err, result) {
 



  });



});

module.exports = router;