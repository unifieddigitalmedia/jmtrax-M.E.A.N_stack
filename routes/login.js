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


waterfall([

  function(callback){
   

   db.collection('users').findOne({username:req.query.username},function(e, results){

   if (e) return next(e);

   if (results) {


   

   callback(null,results.password,results.usertype,results.customerdetails.Email,results._id,results.limit,results.senderdetails.SendersFirstName,
    results.senderdetails.SendersLastName,results.datemodified,results._id);
   
   

   }

  else 

  	{  


      
        var response = {"ERROR":"Username not found"};
        
        res.json(response);




    }

   });

   
  },

  function(arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,callback){
   
       if ( arg1 === req.query.password ) { 

    

var pastdate = new Date();

pastdate.setDate(pastdate.getDate() - 90);
    
var monthIndex = pastdate.getMonth();
    

if(monthIndex === 12)
{

monthIndex = 1; 

}else {

monthIndex = monthIndex + 1 ; 

}

//pastdate = pastdate.getDate()+'-'+monthIndex+'-'+ pastdate.getFullYear() ;

pastdate = new Date(pastdate.getFullYear() , monthIndex , pastdate.getDate());

var month = arg8.substr(3,1) - 1;

var modifieddate = new Date(arg8.substr(5, 4) ,month , arg8.substr(0, 2));



if(pastdate >= modifieddate)

{



  var response = {"ERROR":"Your password has expired. Please reset by clicking the fortgot password link below." }

         res.json(response);


}
else
{


  var response = {"ERROR":"","USERTYPE":arg2,"EMAIL":arg3,"AGENTID":arg4,"AGENTUSERNAME":req.query.username,"CREDITLIMIT":arg5,"SENDERFIRSTNAME":arg6,"SENDERLASTNAME":arg7,"sendersID":arg9};
        
         res.json(response);


}

       


        //callback(null,req.query.username,results.password);


     } else { 





        var response = {"ERROR":"Password dos not match our records","USERTYPE":arg2,"EMAIL":arg3};
        
        res.json(response);




   }


         
  

  }



  ], function (err, result) {
 


  }


)






  

});

module.exports = router;