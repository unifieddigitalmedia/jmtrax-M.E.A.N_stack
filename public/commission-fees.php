<?php



if($_POST[amendcomissiontable]){

if ($_SERVER['REQUEST_METHOD']=='POST')

{




$hostname = "localhost";
$username = "jmtrax";
$dbname = "jmtrax";

//These variable values need to be changed by you before deploying
$password = "s0na@bebe123";


//Connecting to your `Database`
$link =   mysql_connect($hostname, $username, $password) ;



if (!$link) {

die('Could not connect: ' . mysql_error());

}



mysql_select_db("jmtrax",$link);


$lower =  $_REQUEST[lower];
$upper = $_REQUEST[upper] ;
$fee = $_REQUEST[fees] ;

$id = $_REQUEST[id];



foreach ($lower as $key => $value)

{


$sql7 = "UPDATE commission SET lower= '$lower[$key]', upper = '$upper[$key]', fee= '$fee[$key]'  WHERE id = '$id[$key]' ";

if (!mysql_query($sql7 ,$link))
{

die('Error: ' . mysql_error());

}


}







}



}


?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"> 

<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="/styles/normal.css">

<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">

<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css">

<link rel="icon" 
      type="image/png" 
      href="/images/jmtrax_icon.png">



<title> Just Money Transfers | Commission Fees </title>


</head>

<body ng-cloak ng-app="justmoneytransfers">

  
<header ng-controller="menucontroller">


<ul class="topnav">

<li class="logo_link"> <a href="index.html"><img src="/images/logo.png" class="logo" ></a> </li>

<li class="dropdown-link"> <a href="dashboard.php" class="dropbtn"> Dashboard</a>  

</li>  

<li class="dropdown-link"> <a class="dropbtn" >Administration</a> 

<div class="dropdown-content">

  <a href="banks.html"> Banks </a>  

  <a> Commission Fees</a>  

  <a href="customers.html"> Customers </a>

  <a href="exchange-rates.html"> Exchange Rates</a>  

  <a href="shops.html"> Shops </a> 

  <a href="users.html"> Users </a>   

</div>


</li>  

<li class="dropdown-link"> <a class="dropbtn" >Reports</a>  

<nav class="dropdown-content">

  <a href="banking.html"> Banking</a> 

  <a href="daily-transactions-receipients.html"> Daily Transactions </a>

  <a href="daily-transactions-senders.html"> Daily Transactions </a>   

   <a href="receipients.html"> Recipients </a> 

    <a href="sales-report.html"> Sales Report </a> 

  <a href="senders.html"> Senders </a> 

  <a href="transactions.php"> Transactions </a>  

</nav>

</li>  

<li class="dropdown-link"> <a href="index.html" class="dropbtn" >Log Out</a> 


</li>  

<li class="icon">
    <a href="javascript:void(0);" style="font-size:15px;" onclick="showResponsivemenu()">☰</a>
</li>



</ul></header>



<div class="container-fluid" ng-controller="commissionfees">


<form action="" method='post' >
<table class="table table-responsive" ng-init="getcommissiontable()" >

    <thead>
      <tr>
        <th>LOWER AMOUNT </th>
        <th>UPPER AMOUNT</th>
        <th>COMMISSION FEE </th>
        <th><button type="submit" class="btn btn-primary btn-block" >UPDATE COMMISSION FEES</button>
        <input type='hidden' value='SUBMIT' name='amendcomissiontable' /> </th>
      </tr>
    </thead>

    <tbody>
      <tr ng-repeat='com in fees'>
       
 <td> 
<input type="hidden" class="form-control" id="usr" value='{{com.id}}' name="id[]">
  <label for="usr"></label>
  <input type="text" class="form-control" id="usr" value='{{com.lower}}' name="lower[]"></td>

 <td> 

  <label for="usr"></label>
  <input type="text" class="form-control" id="usr" value='{{com.upper}}' name="upper[]" ></td>

 <td> 

  <label  > <p ng-show="com.lower > 1000.00 "> % </p></label> 
  <input type='text' value='{{com.commission}}' class="form-control" name="fees[]"/ > </td>

      </tr>
     
    
    </tbody>
  </table>

</form>

</div>
<footer>
<div class="row">

  <div class="col-sm-6" id="footer_column_1">  


<p>Authorised User can log into JM Transfers by entering correct account information on the right hand side. The activity of authorized users may be monitored. If monitoring reveals evidence of criminal activity, systems personnel may provide the evidence to management and/or law enforcement officials. Just Computers trading as JM Transfer and JM Trax have a comprehensive compliance program within the organisation to ensure compliance with government rules, regulations and approved guidance. We do not want JM Transfer and JM Trax services to be used in illegal money laundering activities or terrorist activities. It is our policy that we follow both the letter and the spirit of the law and the regulations of both the United Kingdom and Nigeria in which JM Transfer and JM Trax operates. All remittances processed by JM Transfer and JM Trax are screened with enhanced controls to prevent money laundering and terrorist financing. It is JM Transfer and JM Trax policy to follow both the letter and spirit of the law and regulations. Throughout the world, Governments have reinforced their commitment to the fight against money laundering and terrorist financing. New laws have imposed additional obligations on firms and individuals in the financial services sector to join in the fight. JM Transfer and JM Trax has an extensive training and awareness programme, a rigorous transaction monitoring system and a robust culture of compliance. JM Transfer and JM Trax works closely with regulatory bodies.</p>


 </div>

  <div class="col-sm-6" id="footer_column_2" style="text-align:center;">  

<img src='/images/Photo2_small.png' class="footerimage"/>

   </div>

   

</div>

</footer>



<section class="copywright">

<p style='color:white;'>&copy; UNIFIED DIGITAL MEDIA  - http://www.unifieddigitalmedia.co.uk</p>

  </section>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js" ></script>

<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" ></script>

<script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js" ></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.3.15/angular-resource.js" ></script>

<script src="scripts/main.js"> </script>


<script type="text/javascript">


var app = angular.module('justmoneytransfers', ['ngResource']);

app.controller('menucontroller', function($scope,$http,$resource) {


function getCookie(cname) {

    var name = cname + "=";
  
    var ca = document.cookie.split(';');
  
    for(var i=0; i<ca.length; i++) {
  
        var c = ca[i];
  
        while (c.charAt(0)==' ') c = c.substring(1);
  
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  
    }
  
    return "";

}

var init = function () {
   

if(!getCookie('agentusername') || getCookie('agenttype') == 'customer' )

{


window.location = "http://localhost:3000/index.html" ;


}



if( getCookie('agenttype') == 'user'  )

{ 

$scope.usertype = true;


}


var counter = 0;

setInterval(function(){ counter = counter + 1 ;


window.addEventListener("mousemove",function getcoords() {


counter = 0;

});

if (counter == '1800')

{




window.location = "http://localhost:3000/index.html" ;



} },1000);


};

init();





});


app.factory('Money_Transfer_Service', ['$resource', function($resource) {



var resource = $resource('http://localhost:3000/api/fees',{


},{ 'update': { method:'PUT' } } );


return resource;


}]);


app.controller('commissionfees', function($scope,Money_Transfer_Service,$http,$resource) {

var init = function () {



$http.get("http://localhost:3000/api/charge").then(function(response) {

$scope.fees = response.data;



    });


};

init();


});


</script>


</body>

</html>