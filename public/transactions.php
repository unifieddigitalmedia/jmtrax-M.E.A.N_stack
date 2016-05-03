<?php


$servername = "localhost";
$username = "jmtrax";
$password = "s0na@bebe123";
$dbname = "jmtrax";

$conn = new mysqli($servername, $username, $password,$dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 



if(isset($_GET["excelreport"])) {

$root = realpath($_SERVER["DOCUMENT_ROOT"]);

require_once $root.'/api/PHPExcel/Classes/PHPExcel.php';

require_once $root.'/api/PHPExcel/Classes/PHPExcel/IOFactory.php';

PHPExcel_Settings::setZipClass(PHPExcel_Settings::PCLZIP);

$objPHPExcel = new PHPExcel();


$objPHPExcel->getProperties()->setCreator('JM Trax')
->setLastModifiedBy("Victor Amos")
->setTitle("Office 2007 XLSX Test Document")
->setSubject("Office 2007 XLSX Test Document")
->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
->setKeywords("office 2007 openxml php");


$objPHPExcel->setActiveSheetIndex(0)->setCellValue('A1','AGENCY');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('B1','SHOP');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('C1','DATE');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('D1','TRANSACTION NO.');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('E1','SENDER FIRST NAME');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('F1','SENDER LAST NAME');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('G1','AMOUNT GBP');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('H1','FEES GBP');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('I1','TOTAL GBP DUE');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('J1','TOTAL NGN DUE');
$objPHPExcel->setActiveSheetIndex(0)->setCellValue('K1','STATUS');


$value2 = trim($_REQUEST["fromdate"]) ;

$value3 = trim($_REQUEST["todate"]) ;

$startday=  substr("$value2",0,2);
$startmonth=  substr("$value2",3,2);
$startyear =  substr("$value2",8,2);


$endday =  substr("$value3",0,2);
$endmonth =substr("$value3",3,2);
$endyear =  substr("$value3",8,2);

$startdate = "20".$startyear."-".$startmonth."-".$startday;

$enddate = "20".$endyear."-".$endmonth."-".$endday;
	
	if(!$_REQUEST[status] || $_REQUEST[status] == "undefined" )
	{
		
	

     $sql2 = "SELECT * FROM transfers WHERE date >= '$startdate' && date <= '$enddate' ";


    }
    
else 

    {
	
          if($_REQUEST[status] == 'paid')
          {
          	
          	
          	$sql2 =  "SELECT * FROM transfers WHERE (date >= '$startdate' && date<= '$enddate' ) && status = '$_REQUEST[status]' ";

          }
          else{
          
          	$sql2 =  "SELECT * FROM transfers WHERE (date >= '$startdate' && date<= '$enddate' ) && status != 'paid' ";

          	
          }
	
	
    }

$transfers = array();



$result2 = $conn->query($sql2);


$counter = 2 ;

    while($row = $result2->fetch_assoc()) {


$value =  $row[date] ;
$day =  substr("$value",8,2);
$month = substr("$value",5,2);
$year =  substr("$value",0,4);
$date = $day."-".$month."-".$year;

$orderID = 'JM'.$row[id];

$cellAlias = PHPExcel_Cell::stringFromColumnIndex(0).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row[agentusername]);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(1).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['shop']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(2).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$date);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(3).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$orderID);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(4).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['senderfirstname']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(5).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['senderlasttname']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(6).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['amount']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(7).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['fee']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(8).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['totalgbp']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(9).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['ngn']);
$cellAlias = PHPExcel_Cell::stringFromColumnIndex(10).$counter;
$objPHPExcel->setActiveSheetIndex(0)->setCellValue($cellAlias,$row['status']);


$counter = $counter +1;








}






$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
ob_end_clean();

header('Content-type: application/vnd.ms-excel');
header('Content-Disposition: attachment; filename="report.xls"');
$objWriter->save('php://output');
	
	
	
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


<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

<title> Just Money Transfers | Transactions </title>


</head>

<body ng-cloak ng-app="justmoneytransfers" >

  

 


<header ng-controller="menucontroller">


<ul class="topnav">

<li class="logo_link"> <a href="index.html"><img src="/images/logo.png" class="logo" ></a> </li>

<li class="dropdown-link"> <a href="dashboard.php" class="dropbtn"> Dashboard</a>  

</li>  

<li class="dropdown-link" ng-hide="usertype"> <a class="dropbtn" >Administration</a> 

<div class="dropdown-content">

  <a href="banks.html"> Banks </a>  

  <a href="commission-fees.php"> Commission Fees</a>  

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

  <a href="transactions.html"> Transactions </a>  

</nav>

</li>  

<li class="dropdown-link"> <a href="index.html" class="dropbtn" >Log Out</a> 


</li>  

<li class="icon">
    <a href="javascript:void(0);" style="font-size:15px;" onclick="showResponsivemenu()">☰</a>
</li>



</ul></header>

  
<div class="container-fluid"  ng-controller='menucontroller'   >


&nbsp;

<div class="row">


    <div class="col-sm-4" >

<form name='transsearchform' >
<table class="table table-bordered"  >
    <thead>
      
    </thead>
    <tbody>
      <tr>
        <td>START DATE (dd/mm/yyyy) </td>
        <td><input type="text" class="form-control" id="datepicker" ng-model='startdate' required ></td>
        <td> 

<div class="radio">
  <label><input type="radio" name="status" value="paid" ng-model="status" ng-change="updatestatus()">Paid</label>
</div>

        </td>
      </tr>
      <tr>
        <td>END DATE (dd/mm/yyyy)</td>
        <td><input type="text" class="form-control" id="datepicker1" required ng-model="enddate"></td>
         <td> 
<div class="radio">
  <label><input type="radio" name="status" value="unpaid" ng-model="status" ng-change="updatestatus()"> UnPaid </label>
</div>


         </td>
      </tr>
      <tr>
        <td><button type="button" class="form-control" id="" ng-click='clear()' > CLEAR</button></td>
        <td colspan="2"><button type="button" class="form-control" id="" ng-click='gettransactionsbysearch()' > SEARCH</button></td>
 
      </tr>
    </tbody>
  </table>

</form>

</div>



    <div class="col-sm-8" > 




</div>


  </div>



<div class="row">
  <div class="col-sm-12" >
    <div style='float:right;'>
  <p>

<a href="reports.html" > Export to PDF </a>
  </p>
    <p>

<form action='' method="GET" >
<button type="submit" class="btn btn-link" ng-click="excel()">Export to Excel  </button>
<input type='hidden' class='fromdate' name='fromdate' />
<input type='hidden' class='todate' name='todate' />
<input type='hidden' class='status' name='status' />
<input type ='hidden' name='excelreport' value='submit' />

</form>
  </p>
  </div>
 </div>
</div>




<div class="table-responsive"  ng-init="getdaily()">


 <table class="table table-bordered">
    <thead>

   <tr>
        <th style='tablecells'>STAFF REF.</th>
        <th style='tablecells'>SHOP</th>
        <th  style='tablecells'>DATE</th>
        <th style='tablecells' >TRANS. NO.</th>
        <th style='tablecells'>SENDER FIRST NAME</th>
        <th style='tablecells'>SENDER LAST NAME</th>
        <th style='tablecells'>AMOUNT £</th>
        <th style='tablecells'>FEES £</th>
        <th style='tablecells'>TOTAL GBP DUE £</th>
        <th style='tablecells'>TOTAL NGN DUE</th>
        <th style='tablecells'>STATUS</th>
      </tr>
    </thead>
    <tbody>
      <tr ng-repeat='daily in ( filteredTransactions = ( dailytransactionlist |  todaystransfers : startdate : enddate : status ) )' ng-click="selecttransfer($index)" style="cursor:pointer">
        <td style='tablecells'>{{daily.agentusername}}</td>
        <td style='tablecells'>{{daily.shop}}</td>
        <td style='tablecells'>{{daily.date}}</td>
         <td style='tablecells'>JM{{daily.id}}</td>
        <td style='tablecells'>{{daily.senderfirstname}}</td>
        <td style='tablecells'>{{daily.senderlasttname}}</td>
        <td style='tablecells'>{{tocurrency(daily.amount)}}</td>
        <td style='tablecells' >{{daily.fee}}</td>
        <td style='tablecells'>{{tocurrency(daily.totalgbp)}}</td>
        <td style='tablecells'>{{tocurrency(daily.totalngn)}}</td>
        <td style='tablecells'>{{daily.status}}</td>

      </tr>

 <tr>
        <td colspan='6'></td>
        <td>AMOUNT £</td>
        <td>FEES £</td>
        <td>TOTAL GBP DUE £</td>
        <td>TOTAL NGN DUE</td>
        
      </tr>

 <tr>
        <td colspan='6'></td>
        <td>{{ TOTALAMOUNT }}</td>
        <td>{{ TOTALFEE }}</td>
        <td>{{ TOTALGBP }}</td>
        <td>{{ TOTALNGN }}</td>
  
        
      </tr>


    </tbody>
  </table>

</div>

</div>


<footer>
<div class="row">

  <div class="col-sm-6" id="footer_column_1">  


<p>Authorised User can log into JM Transfers by entering correct account information on the right hand side. The activity of authorized users may be monitored. If monitoring reveals evidence of criminal activity, systems personnel may provide the evidence to management and/or law enforcement officials. Just Computers trading as JM Transfer and JM Trax have a comprehensive compliance program within the organisation to ensure compliance with government rules, regulations and approved guidance. We do not want JM Transfer and JM Trax services to be used in illegal money laundering activities or terrorist activities. It is our policy that we follow both the letter and the spirit of the law and the regulations of both the United Kingdom and Nigeria in which JM Transfer and JM Trax operates. All remittances processed by JM Transfer and JM Trax are screened with enhanced controls to prevent money laundering and terrorist financing. It is JM Transfer and JM Trax policy to follow both the letter and spirit of the law and regulations. Throughout the world, Governments have reinforced their commitment to the fight against money laundering and terrorist financing. New laws have imposed additional obligations on firms and individuals in the financial services sector to join in the fight. JM Transfer and JM Trax has an extensive training and awareness programme, a rigorous transaction monitoring system and a robust culture of compliance. JM Transfer and JM Trax works closely with regulatory bodies.</p>


 </div>

  <div class="col-sm-6" id="footer_column_2">  

<img src='http://jmtrax.net/images/Photo2.png' alt="Collection of logo representing Nigeria Banks that Jm Trax are associated with" />

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


var app = angular.module('justmoneytransfers', ['ngResource','dailyFilter']);


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

$http.get("http://localhost:3000/api/transactions.php?agentusername="+ getCookie('agentusername')+"&agenttype="+getCookie('agenttype')).then(function(response) {

$scope.dailytransactionlist = response.data;




    });


$scope.$watch('filteredTransactions', function() {


$scope.TOTALAMOUNT = 0 ;

$scope.TOTALFEE = 0 ;

$scope.TOTALGBP = 0 ;

$scope.TOTALNGN  = 0 ;

var log = [];

angular.forEach($scope.filteredTransactions, function(value, key) {

$scope.TOTALAMOUNT += parseInt(value.amount.replace(",", "")) ;

$scope.TOTALFEE += parseInt(value.fee.replace(",", ""));

$scope.TOTALGBP += parseInt(value.totalgbp.replace(",", "")) ;

$scope.TOTALNGN += parseInt(value.totalngn.replace(",", "")) ;

}, log );



$scope.TOTALAMOUNT = $scope.tocurrency(Number($scope.TOTALAMOUNT).toFixed(2));

$scope.TOTALFEE = $scope.tocurrency(Number($scope.TOTALFEE).toFixed(2));

$scope.TOTALGBP = $scope.tocurrency(Number($scope.TOTALGBP).toFixed(2));

$scope.TOTALNGN = $scope.tocurrency(Number($scope.TOTALNGN).toFixed(2));



  
    });




$scope.tocurrency = function (para) {


var number = para.toString();

var dollars = number.split('.')[0];

var  cents = (number.split('.')[1] || '') +'00';

var dollars = dollars.split('').reverse().join('').replace(/(\d{3}(?!$))/g, '$1,').split('').reverse().join('');

var cent = cents.slice(0, 2);

var decimal = ".";

var cent2 = decimal.concat(cent);

var dollars = dollars.concat(cent2);

return dollars;




}

$scope.selecttransfer = function (para) {

document.cookie = "transaction_number=" + $scope.dailytransactionlist[para].id;
document.cookie = "fromdate=" + $scope.startdate;
document.cookie = "enddate=" + $scope.enddate;
document.cookie = "status=" + $scope.status;
document.cookie = "trans_pos=" + para;
window.location = "http://localhost:3000/editorder.html" ;

}


$scope.clear = function () {

$scope.status = undefined;

$scope.startdate = null;

$scope.enddate = null;

document.cookie = "fromdate=";
document.cookie = "enddate=";
document.cookie = "status=";


document.getElementsByClassName("fromdate")[0].setAttribute("value","");
document.getElementsByClassName("todate")[0].setAttribute("value","");
document.getElementsByClassName("status")[0].setAttribute("value","");


}


$scope.updatestatus = function() {
	
	
	document.cookie = "status=" + $scope.status;
	
	document.getElementsByClassName("status")[0].setAttribute("value",$scope.status);
	
}


$scope.excel = function () {

}



$scope.gettransactionsbysearch = function () {


$scope.startdate = document.getElementById('datepicker').value;

$scope.enddate = document.getElementById('datepicker1').value;

//$scope.filter_results = $filter('dailyFilter')($scope.dailytransactionlist,$scope.startdate,$scope.enddate,$scope.status);


document.cookie = "fromdate=" + document.getElementById('datepicker').value;
document.cookie = "enddate=" + document.getElementById('datepicker1').value;
document.cookie = "status=" + $scope.status;



document.getElementsByClassName("fromdate")[0].setAttribute("value",document.getElementById('datepicker').value);
document.getElementsByClassName("todate")[0].setAttribute("value",document.getElementById('datepicker1').value);
document.getElementsByClassName("status")[0].setAttribute("value",$scope.status);

}





};

init();





});



angular.module('dailyFilter', []).filter('todaystransfers', function() {

return function(input,para,para1,para2) {



   var log = [];

 

if(para2 == undefined )

{


if(para != undefined && para1 != undefined)

{



angular.forEach(input, function(value, key) {

if (value.date >= para && value.date  <= para1)  { 


this.push(value); 



}


}, log);


return log;


}



}
else if (para2 == 'paid')
{



if(para != undefined && para1 != undefined)

{



angular.forEach(input, function(value, key) {

if (value.date >= para && value.date  <= para1 && value.status == 'paid' )  { this.push(value);



 }


}, log);


return log;


}






}
else
{



if(para != undefined && para1 != undefined)

{



angular.forEach(input, function(value, key) {

if (value.date >= para && value.date  <= para1 && value.status != 'paid' )  { this.push(value); 


}


}, log);


return log;


}



}




}





});





</script>

<script src="//code.jquery.com/jquery-1.10.2.js"></script>

<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

<script type="text/javascript">

$(function() {

    $( "#datepicker" ).datepicker({ dateFormat: "d-mm-yy" });

    $( "#datepicker1" ).datepicker({ dateFormat: "d-mm-yy" });
  
  });


</script>

</body>

</html>