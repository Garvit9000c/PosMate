var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
let detect;

async function load() {
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      console.log('Detector Loaded');
      detect=detector;
}  
load(); 

function resize(x) {
  if (x.matches) { 
    let constraint={video:{width: 320, height: 240}};
    // var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
      canvas.width=320;
      canvas.height=240;
    
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraint).then(function(stream) {
          video.srcObject = stream;
          video.play();
      });
    }
    
  } else {
    let constraint={video:{width: 640, height: 480}};
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      canvas.width=480;
      canvas.height=640;
    }
    
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(constraint).then(function(stream) {
          video.srcObject = stream;
          video.play();
      });
    }
  }
}

var x = window.matchMedia("(max-width: 600px)")
resize(x) 
x.addListener(resize)



async function Pose() {
      const poses = await detect.estimatePoses(video);
      console.log(poses[0].keypoints);
      context.drawImage(video, 0, 0, canvas.width,canvas.height);
      context.fillStyle = "#D2691E";
      context.strokeStyle = "#F0F8FF";
      context.beginPath();
      context.moveTo(poses[0].keypoints[4].x,poses[0].keypoints[4].y);
      context.lineTo(poses[0].keypoints[2].x,poses[0].keypoints[2].y);
      context.lineTo(poses[0].keypoints[0].x,poses[0].keypoints[0].y);
      context.lineTo(poses[0].keypoints[1].x,poses[0].keypoints[1].y);
      context.lineTo(poses[0].keypoints[3].x,poses[0].keypoints[3].y);
      context.moveTo(poses[0].keypoints[5].x,poses[0].keypoints[5].y);
      context.lineTo(poses[0].keypoints[6].x,poses[0].keypoints[6].y);
      context.lineWidth = 5;
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[0].x,poses[0].keypoints[0].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[1].x,poses[0].keypoints[1].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[2].x,poses[0].keypoints[2].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[3].x,poses[0].keypoints[3].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[4].x,poses[0].keypoints[4].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.fillStyle = "#00FF00";
      context.arc(poses[0].keypoints[5].x,poses[0].keypoints[5].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
      context.beginPath();
      context.arc(poses[0].keypoints[6].x,poses[0].keypoints[6].y,10, 0, 2 * Math.PI);
      context.fill();
      context.stroke();
}




var myVar = setInterval(Pose, 100);
let flag=true;
document.getElementById("button").addEventListener("click", function() {
	if(flag){
		clearInterval(myVar);
		document.getElementById("text").innerHTML = "Resume";
		flag=false;
	}
	else{
		document.getElementById("text").innerHTML = "Pause";
		myVar = setInterval(Pose, 100);
		flag=true;
	}
});


