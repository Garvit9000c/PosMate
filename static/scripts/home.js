function openNav() {
  $(".cbtn").html(`<img role="button" onclick="closeNav()" src="/static/close-button.png" alt="#">`);
  $(".cbtn").css({"display": "block"});
  $('.lpage').css("z-index:3");
  $('#mySidebar').css({"display":"flex","flex-direction":"column","height":"100%","width":"100%","align-items":"center","z-index":"4"})
}


function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.height = "0";
  $('.lpage').css("z-index:6");
  $(".cbtn").css({"display": "none"});
  $('#mySidebar').css("display: none");
}



function validateForm() {
  var x = document.forms["myForm"]["login"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
};