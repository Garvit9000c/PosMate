function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("mySidebar").style.height = "50rem";
  document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  $(".ic").html(`<img role="button" onclick="closeNav()" src="/static/close-button.png" alt="#">`);
}


function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("mySidebar").style.height = "0";
  document.body.style.backgroundColor = "white";
  $(".ic").html(`<img role="button" onclick="openNav()" src="/static/hamburger.png" alt="#">`);
 
}



function validateForm() {
  var x = document.forms["myForm"]["login"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
};