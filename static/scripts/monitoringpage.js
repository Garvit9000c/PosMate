jQuery(document).ready(function($){
 
     var bArray = [];
     var sArray = [12,14,16,18];
 
    for (var i = 0; i < $('.bubbles').width(); i++) {
        bArray.push(i);
    }
     
    function randomValue(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
 
    
    setInterval(function(){
         
        
        var size = randomValue(sArray);
        
        $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
         
        
        $('.individual-bubble').animate({
            'bottom': '100%',
            'opacity' : '-=0.7'
        }, 3000, function(){
            $(this).remove()
        }
        );
 
 
    }, 350);
 
});