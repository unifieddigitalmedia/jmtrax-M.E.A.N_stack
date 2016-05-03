var TMClient = require('textmagic-rest-client');

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

var message;

router.get('/', function(req, res ) {



if(req.query.username !== undefined)

{




db.collection('users').find( 

  {


    'username' : req.query.username

   }

   ).sort( { "senderdetails.SendersLastName": 1 } ).toArray(function(e, results){


   if (e) return next(e);

   
     //res.json(results);

 res.json(results);

   });



}

else if (req.query.firstname == 'undefined' && req.query.lastname == 'undefined' && req.query.mobile == 'undefined')
{


db.collection('users').find( 

  {


   

   }

   ).sort( { "senderdetails.SendersLastName": 1 } ).toArray(function(e, results){


   if (e) return next(e);

   
     //res.json(results);

 res.json(results);

   });

}
else
{


var first3 = req.query.firstname.substring(0,3);

var last3 =  req.query.lastname.substring(0,3);

db.collection('users').find( 

  {


    $or: [ { 'senderdetails.SendersFirstName' : { $regex: first3 } }, { 'senderdetails.SendersLastName' :  { $regex: last3 }  } , {"senderdetails.Mobile" : req.query.mobile }] 


   }

   ).sort( { "senderdetails.SendersLastName": 1 } ).toArray(function(e, results){


   if (e) return next(e);

   
     //res.json(results);

 res.json(results);

   });




}



});



router.put('/', function(req,res) {

var o_id = new mongo.ObjectID(req.query.id);

waterfall([

function(callback){

db.collection('users').find( 



{




 'senderdetails.Mobile' : req.query.mobile ,"_id": { $ne: o_id } 
 


}

 ).toArray(function(e, results){



   if (e) return next(e);

   if (results.length !== 0) {

  
        var response = {"ERROR":"That senders mobile is already being used by another user"};
        
        res.json(response);
   
   

   }

  else 

    {  

       callback(null,o_id);
      
    }



   });  



},function(arg,callback){

db.collection('users').find( 



{




 'customerdetails.Email' : req.query.email ,"_id": { $ne: arg } 
 


}

 ).toArray(function(e, results){



   if (e) return next(e);

   if (results.length !== 0) {

  
        var response = {"ERROR":"That senders email is already being used by another user"};
        
        res.json( response);
   
   

   }

  else 

    {  

     callback(null,o_id);
      
    }



   });  



},function(arg,callback){



db.collection('users').find( 



{




 'username' : req.query.username , "_id": { $ne: arg } 
 


}

 ).toArray(function(e, results){



   if (e) return next(e);

   if (results.length !== 0) {

  
        var response = {"ERROR":"That username is already being used by another user"};
        
        res.json( response);
   
   

   }

  else 

    {  

     callback(null,o_id);
      
    }



   });  



}
,function(arg,callback){



 var date = new Date();
    
    var day = date.getDate();
    
    var monthIndex = date.getMonth();
    
    if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}

    var year = date.getFullYear();

    date = day+'-'+monthIndex+'-'+year ;

   db.collection('users').updateOne(

{ "_id" : arg  },


{ $set: {



        
        "datemodified":date,
        "customerdetails":{


                "FirstName":req.query.firstname,
                "LastName":req.query.lastname,
                "MobilePhone":req.query.mobile,
                "Email":req.query.email ,


        },
 "senderdetails": {


                "SendersFirstName":req.query.firstname,
                "SendersLastName":req.query.lastname,   
                "Mobile":req.query.mobile,
                "Email":req.query.email,
                "Line1":req.query.line1,
                "Line2":req.query.line2,
                "Line3":req.query.line3,
                "Town":req.query.town,
                "Postcode":req.query.postcode,
                "County":req.query.county,
                "Country":req.query.country,
                "Mobile":req.query.mobile,
                "Email":req.query.email,
          
                "Enabled":"on",
              



        },

        "enabled":"on",

    

}


});


  var response = {"ERROR":"That username has now been updated"};
        
        res.json(response);

}

  ], function (err, result) {
 

var response = {"ERROR":"There was an error contact web administrator"};
        
        res.json( response);


  });














});


router.post('/', function(req,res) {

console.log(req.query.id);
  if(req.query.id !== undefined)

  {

console.log(req.query.id);

var o_id = new mongo.ObjectID(req.query.id);

db.collection('users').remove( { "_id":o_id} , function(err, results) {

var response = {

"ERROR":"Sender has now been deleted from our database",
"RESULTS":results,
"QUERY ERROR":err


};
        
        res.json( response );
        

   });



  }

  else
  {




waterfall([


  function(callback){
   

   db.collection('users').findOne( {"senderdetails.Mobile" : req.query.mobile} ,function(e, results){



   if (e) return next(e);

   if (results) {

  
        var response = {"ERROR":"That senders mobile is already being used by another sender"};
        
        res.json( response);
   
   

   }

  else 

    {  


   

      callback(null);
      


    }



  });

   
 

   },function(callback){



   db.collection('users').findOne( {"customerdetails.Email" :req.query.email} ,function(e, results){



   if (e) return next(e);

   if (results) {

  
        var response = {"ERROR":"That email is already being used by another sender"};
        
        res.json( response);
   

   }

  else 

    {  


   

      callback(null);
      


    }



  });



   },
    
    function(callback){
   
       
    var temppassword = "";

    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        temppassword += possible.charAt(Math.floor(Math.random() * possible.length));

    var date = new Date();
    
    var day = date.getDate();
    
    var monthIndex = date.getMonth();
    
    var year = date.getFullYear();

if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}
    date = day+'-'+monthIndex+'-'+year ;

      db.collection('users').insert( [


{





        "username":req.query.email, 
        "password":temppassword,
        "secretquestion":req.query.secretquestion,
        "secretanswer":req.query.answer,
        "datemodified":date,
        "datecreated":date,
        "usertype":req.query.user_type,
        "limit":req.query.user_limit,
        "customerdetails":{


                "FirstName":req.query.firstname,
                "LastName":req.query.lastname,
                "Gender":"",
                "MobilePhone":req.query.mobile,
                "Email":req.query.email ,

        },
 "senderdetails": {


                "SendersFirstName":req.query.firstname,
                "SendersLastName":req.query.lastname,
                "Line1":req.query.line1,
                "Line2":req.query.line2,
                "Line3":req.query.line3,
                "Town":req.query.town,
                "Postcode":req.query.postcode,
                "County":req.query.county,
                "Country":req.query.country,
                "Mobile":req.query.mobile,
                "Email":req.query.email,
                "Sourceoffunds":"",
                "IDtype":req.query.IDtype,
                "IDnumber":req.query.IDnumber,
                "IDexpiry":req.query.IDexpiry,
                "IDcountry":req.query.IDcountry,
                "IDURL":"",
                "AddressURL":"",
                "IncomeURL":"",
                "Enabled":"on",
                "receipients":[],
                "transactions":[],
                "IDdetails":[],
                



        },
          "transactions":[],
                "IDdetails":[],
                "banking":[],
        "enabled":"on",
        "token":"",
        "shop":

        { 
                "name":req.query.shop_name,
                "address":"",

        },



}


        ],

function(err, results) {


var response = {"ERROR":"A new sender has been added to your database"};
        
        res.json( response);


/*var c = new TMClient('jmtrax', '3511481');

c.Messages.send({text: "Welcome to JM Transfers username -"+req.query.email+"password -"+temppassword, phones: req.query.mobile }, function(err, res){

    console.log('Messages.send()', err, res); });*/





    
   });


         
  

     }





  ], function (err, result) {
 

var response = {"ERROR":"There was an error contact web administrator"};
        
        res.json( response);


  });


  }



});


router.delete('/', function(req,res) {




});

module.exports = router;