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



var o_id = new mongo.ObjectID(req.query.id);


if(req.query.id != undefined)
{

var receipients_array = [];

db.collection('users').find( 

  { "_id": o_id  },{ "receipients": 1, _id:0 } 

   ).toArray(function(e, results){



   if (e) return next(e);

   results.forEach(function(entry) {
    

    if(entry.receipients !== undefined)

    {

       res.json(entry.receipients);

  }
  
     });


  });

  

}

else if (req.query.firstname === 'undefined' && req.query.lastname === 'undefined')

{



db.collection('users').find( 

  { },{ "receipients": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);

   results.forEach(function(entry) {
    

    if(entry.receipients !== undefined)

    {

     entry.receipients.forEach(function(entry) {
    

     receipients_array.push(entry);


     });

  }
  
     });


  
     res.json(receipients_array);



   });


}
else if(req.query.firstname !== undefined  && req.query.lastname === undefined )
{


 var first3 = req.query.firstname.substring(0,3);


 db.collection('users').find( 

  {


   'receipients' : { $elemMatch: { ReceipientFirstName: { $regex: first3 ,$options:"$i" } } }

   },{ "receipients": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);

  
   results.forEach(function(entry) {
    

    if(entry.receipients !== undefined)

    {

     entry.receipients.forEach(function(entry) {
    

    receipients_array.push(entry);


     });

  }
  
     });



     res.json(receipients_array);



   });



}
else if(req.query.firstname === undefined && req.query.lastname !== undefined )
{

var last3 =  req.query.lastname.substring(0,3);


 db.collection('users').find( 

  {


   'senderdetails.receipients' : { $elemMatch: { ReceipientLastName: { $regex: last3 ,$options:"$i" } } }

   },{ "senderdetails.receipients": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  
   results.forEach(function(entry) {
    

    if(entry.senderdetails.receipients !== undefined)

    {

     entry.senderdetails.receipients.forEach(function(entry) {
    

    receipients_array.push(entry);


     });

  }
  
     });



     res.json(receipients_array);



   });




}
else if(req.query.firstname !== undefined && req.query.lastname !== undefined)
{

var first3 = req.query.firstname.substring(0,3);

var last3 =  req.query.lastname.substring(0,3);


 db.collection('users').find( 

  {

$and : [  



          { 'receipients' : { $elemMatch: { ReceipientFirstName: { $regex: first3 ,$options:"$i"} } } }, 

          { 'receipients' : { $elemMatch: { ReceipientLastName: { $regex: last3 ,$options:"$i" } } } }



        ]
   

   },{ "receipients": 1, _id:0 } 

   ).toArray(function(e, results){


   if (e) return next(e);


  
   results.forEach(function(entry) {
    

    if(entry.receipients !== undefined)

    {

     entry.receipients.forEach(function(entry) {
    

    receipients_array.push(entry);


     });

  }
  
     });



     res.json(receipients_array);



   });




}


});

//$and: [ { "senderdetails.transaction.ReceipientFirstName": "value2"}, {  "senderdetails.transaction.ReceipientLastName ": "value2"  } ]

router.post('/', function(req,res) {

var o_id = new mongo.ObjectID(req.query.id);



db.collection('users').findOne( 

  {

$and : [  
          {'receipients' : { $elemMatch: { "ReceipientFirstName": req.query.receipientfname } } }, 

          {'receipients' : { $elemMatch: { "ReceipientLastName": req.query.receipientlname } } },

          {'receipients' : { $elemMatch: { "ReceipientBank": req.query.receipientbank } } },

          {'receipients' : { $elemMatch: { "ReceipientAccountNumber": req.query.receipientaccountnumber } } }


]
   } , { "receipients": 1, _id:1 } , function(e, results){
          

 if (e) return next(e);



 if(results != null)

{



var response = {

"ERROR":"That receipient is already registered. Simply update or search and select to process a transfer.",



};
        
        res.json( response );


}

else

{


//db.collection('users').update({ "username": req.query.username },{ $push: { "receipients": 

db.collection('users').update({ "_id": o_id },{ $push: { "receipients": 

{ 

"ReceipientFirstName" : req.query.receipientfname,
"ReceipientLastName" : req.query.receipientlname,
"ReceipientBank" : req.query.receipientbank, 
"ReceipientAccountNumber": req.query.receipientaccountnumber,
"ReceipientReasonForTransfer": req.query.receipientreasonfortransfer,
"ReceipientPaymentReference" : req.query.receipientpaymentreference,
"ReceipientPhone" : req.query.receipientphone,
"ReceipientPayPal"  : req.query.receipientpaypal,
"ReceipientShopAccount"  : req.query.receipientshopacc,
"ReceipientThirdPartyPaymentComment" : req.query.receipientthirdpartycomment

} 



} } , function(err, results) { 



var response = {

"ERROR":"",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );



}) ;


}


}) ;





	});


router.put('/', function(req,res) {


waterfall([

function(callback){
   

 
db.collection('users').findOne( 

  {

$and : [ 
          {'receipients' : { $elemMatch: { "ReceipientFirstName": req.query.receipientfname } } } , 

          {'receipients' : { $elemMatch: { "ReceipientLastName": req.query.receipientlname } } },

          {'receipients' : { $elemMatch: { "ReceipientBank": req.query.updatedreceipientbank } } },

          {'receipients' : { $elemMatch: { "ReceipientAccountNumber": req.query.updatedreceipientaccountnumber } } }

        ]


   } , { "username":1 , "receipients": 1, "_id":1} , function(e, results){
          
 if (e) return next(e);

if(results)
 {


  results.receipients.forEach(function(entry,i) {
    
    if( entry.ReceipientFirstName == req.query.receipientfname  && entry.ReceipientLastName == req.query.receipientlname && entry.ReceipientBank == req.query.updatedreceipientbank && entry.ReceipientAccountNumber == req.query.updatedreceipientaccountnumber   )

    {



                      callback(null,results._id,i);

    }
  

    });

  
 }


       
           
   });


   }
   ,
function(arg,arg1,callback){
   

 

   //db.collection('users').findOne( { "username" : arg } , { "receipients": 1, _id:0 } , function(e,results) {

    var o_id = new mongo.ObjectID(String(arg));

    db.collection('users').findOne( { "_id" : o_id } , { "receipients": 1, _id:0 } , function(e,results) {


      callback(null,results,arg1,o_id);
    

    });

   
 

   }, function(arg1,arg2,arg3,callback){




var receipients = arg1.receipients;

receipients.splice(arg2,1) ;


callback(null,receipients,arg3);



   }

, function(arg1,arg2, callback){


arg1.push(

{ 

"ReceipientFirstName" : req.query.receipientfname,
"ReceipientLastName" : req.query.receipientlname,
"ReceipientBank" : req.query.receipientbank, 
"ReceipientAccountNumber": req.query.receipientaccountnumber,
"ReceipientReasonForTransfer": req.query.receipientreasonfortransfer,
"ReceipientPaymentReference" : req.query.receipientpaymentreference,
"ReceipientPhone" : req.query.receipientphone,
"ReceipientPayPal"  : req.query.receipientpaypal,
"ReceipientShopAccount"  : req.query.receipientshopacc,
"ReceipientThirdPartyPaymentComment" : req.query.receipientthirdpartycomment

} 

);



callback(null,arg1,arg2);


   },function(arg1,arg2,callback){


//db.collection('users').update( { "username" : req.query.username } ,  { $unset: { "receipients"  :  "" } } , function(e,results) {

db.collection('users').update( { "_id" : arg2 } ,  { $unset: { "receipients"  :  "" } } , function(e,results) {


      callback(null,arg1,arg2);
    

    });

   },

function(arg1,arg2,callback){


 


  //db.collection('users').update( { "username" : req.query.username } ,  { $set: {"receipients": arg1 } } , function(e,results) {

db.collection('users').update( { "_id" : arg2 } ,  { $set: {"receipients": arg1 } } , function(e,results) {



     var response = {

"ERROR":"A  receipient has now been updated",



};
        
        res.json( response );

    

    });


}


   ], function (err, result) {
 



  });




  });


router.delete('/', function(req,res) {


waterfall([

function(callback){
   




db.collection('users').findOne( 

  {

$and : [  
          {'receipients' : { $elemMatch: { "ReceipientFirstName": req.query.receipientfname } } }, 

          {'receipients' : { $elemMatch: { "ReceipientLastName": req.query.receipientlname } } },

          {'receipients' : { $elemMatch: { "ReceipientBank": req.query.receipientbank } } },

          {'receipients' : { $elemMatch: { "ReceipientAccountNumber": req.query.receipientaccountnumber } } }


]


   } , { "username":1 , "receipients": 1, _id:0 } , function(e, results){
          
 if (e) return next(e);



db.collection('users').update(

  { "username" : results.username } ,
  { $pull: { receipients: { ReceipientFirstName: req.query.receipientfname , ReceipientLastName: req.query.receipientlname , ReceipientBank : req.query.receipientbank , ReceipientAccountNumber : req.query.receipientaccountnumber} } },
  { multi: true }

, function(e, results){


var response = {

"ERROR":"A receipient has now been removed",



};
        
        res.json( response );

});

       
           
   });


   }



   ], function (err, result) {
 



  });





});




module.exports = router;