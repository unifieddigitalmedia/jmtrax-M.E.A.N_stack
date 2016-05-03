
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length} ;
  for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].classList.remove("active");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].classList.add("active");
}



function showResponsivemenu()   {




    document.getElementsByClassName("topnav")[0].classList.toggle("responsive");



    //.slideToggle("slow");






}



function toggle_drp_dwn_cnt() {



   document.getElementById("myDropdown").slideToggle("slow");

   //classList.toggle("show");

}



$(document).ready(function(){



    $(".dropdown-link").click(function(event){

    



    $(this).children("div.dropdown-content").slideToggle("slow");

       

    });



});


