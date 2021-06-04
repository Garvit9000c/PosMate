function validateForm() {
    var x = document.forms["myForm"]["login"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  }
 window.onload= function() {
  Particles.init({
    selector:'.background'
  });
};
