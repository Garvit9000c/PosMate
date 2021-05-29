console.log(Notification.permission);
			if (Notification.permission !== "denied") {
				Notification.requestPermission();
			}

			function showNotification(text) {
				const notification = new Notification("Posture Mate", { body: text });
			}

let video;
let poseNet;
let pose;
let skeleton;
let data;
let options = {
 detectionType: 'single',
}

function setup() {
  var canvas=createCanvas(320, 240);
  canvas.parent('myCanvas');
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded,options);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    data=JSON.stringify(pose)
    console.log(pose);
    $.ajax({
  	type : 'GET',
  	url : "/image_info",
  	data : {'data':data},
  	success: function (jsonresult) {
                if (jsonresult.state == 1) {
			showNotification(jsonresult.msg)
                }
            }
	});
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0,320,240);
//   filter(INVERT);
  if (pose) {
    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x/2, y/2, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x/2, a.position.y/2, b.position.x/2, b.position.y/2);
    }
  }
}


































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