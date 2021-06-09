import anime from 'animejs/lib/anime.es.js';
function validateForm() {
    var x = document.forms["myForm"]["login"].value;
    if (x == "") {
      alert("Name must be filled out");
      return false;
    }
  };

const anime = require('animejs');
anime({
  targets: 'div',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});
