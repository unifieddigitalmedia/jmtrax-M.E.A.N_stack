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




if(req.query.ngn == undefined && req.query.totalgbp == undefined && req.query.amount == undefined && req.query.remittance == undefined)
{

db.collection('fees').find( 

  { }

   ).toArray(function(e, results){

res.json(results);

});

}
else
{



var gbp = 0; 

var ngn = 0; 

var amount = 0 ;

var rate = 0 ;


waterfall([

function(callback){


db.collection('rates').find().toArray(function(e, results){


   if (e) return next(e);


if(results.length != 0)

{

     gbp = results[0].GBP;

     ngn = results[0].NGN;


}
   
   

     callback(null,gbp,ngn);

   });



},function(gbp,ngn,callback){


if(req.query.ngn !== undefined)

{


amount = Number(req.query.ngn) / Number(gbp);


rate = gbp; 

var totalngn = req.query.ngn ;

callback(null,amount,gbp,ngn,totalngn);



}

else if(req.query.totalngn !== undefined)

{


amount = Number(req.query.totalngn) / Number(gbp);

rate = gbp; 

var totalngn = req.query.totalngn ;

callback(null,amount,gbp,ngn,totalngn);



}

else if(req.query.totalgbp !== undefined)

{


var fee_array = {};


db.collection('fees').find( 

  { }

   ).toArray(function(e, results){


    if (e) return next(e);

    results.forEach(function(entry) {
    

    if ( Number(entry.lower) <= Number(req.query.totalgbp)  &&  Number(entry.upper) >= Number(req.query.totalgbp) )

    {


               fee_array = entry ;
    

    }
  

     });

     if (Number(req.query.totalgbp) > Number(1000.00))

    {

         fee = Number(amount) *  100  / Number(fee_array.commission) ;


    }

    else

    {


	    fee = fee_array.commission;


    }

    var totalngn = Number(Number(req.query.totalgbp) - fee) * Number(gbp);

    rate = gbp;

    var financials = { 


    	               "REMIITANCE":Number(req.query.totalgbp) - fee,

					   "AMOUNT": Number(req.query.totalgbp) - fee,

					   "FEES": fee,

					   "NGN": totalngn,

					   "TOTALGBP": Number(req.query.totalgbp),

             "RATE" : rate,


                     }
        
    

    res.json(financials);



   });






	
}

else if(req.query.amount !== undefined)

{


amount = Number(req.query.amount) ;

var totalngn = Number(amount) * Number(gbp);

rate = gbp;

callback(null,amount,gbp,ngn,totalngn);


	
}


else if(req.query.remittance !== undefined)

{



amount = Number(req.query.remittance) ;


var totalngn = Number(amount) * Number(gbp);

rate = gbp;

callback(null,amount,gbp,ngn,totalngn);


	
}



},function(amount,gbp,ngn,totalngn,callback) {



var fee_array = {};

db.collection('fees').find( 

  { }

   ).toArray(function(e, results){


    if (e) return next(e);

    results.forEach(function(entry) {
    
    

    if(Number(entry.lower) <= Number(amount)  &&  Number(entry.upper) >= Number(amount))

    {



               fee_array = entry ;
    

    }
  

     });



      if(amount > Number(1000.00))

{

 fee = Number(amount) * Number(fee_array.commission) / 100;

}

else

{


	fee = fee_array.commission;



}
    var financials = { "REMIITANCE":amount,"AMOUNT": amount,"FEES": fee,"NGN": totalngn,"TOTALGBP": Number(amount) + Number(fee) , "RATE" : rate }
        
    

    res.json(financials);



   });


}

], function(err, results) {




} );




  
}


});


module.exports = router;