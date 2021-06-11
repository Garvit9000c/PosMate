let detect;
async function load() {
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      console.log('Detector Loaded');
      detect=detector;
}  
load(); 

var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var bt = document.getElementById('bt');
var context = canvas.getContext('2d');
let pose;
let data;

let notification;
console.log(Notification.permission);
if (Notification.permission !== "denied") {
	Notification.requestPermission();
}
function showNotification(text) {
	 notification = new Notification("Posture Mate", { body: text });
}

let constraint={video:{width: 640, height: 480}};
let mob=0;
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  canvas.width=480;
  canvas.height=640;
  canvas.style.width="90%"
  mob=1;
}

async function Pose() {
      const poses = await detect.estimatePoses(video);
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


if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraint).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

async function dope(){
	const poses = await detect.estimatePoses(video);
	pose=poses[0].keypoints;
	pose={0:pose[0],1:pose[1],2:pose[2],3:pose[3],4:pose[4],5:pose[5],6:pose[6],7:mob};
	data=JSON.stringify(pose);
	//console.log(pose);
	$.ajax({
	  	type : 'GET',
	  	url : "/image_info",
	  	data : {'data':data},
	  	success: function (jsonresult) {
	                if (jsonresult.state == 1) {
	                	bt.style.backgroundColor='#ff0000';
	                	//showNotification("Please Sit Straight");
	                }
	                if (jsonresult.state == 2) {
	                	bt.style.backgroundColor='#ffff00';
	                	//showNotification("Don't Lean Towards Screen");
	                }
	                if (jsonresult.state == 3) {
	                	bt.style.backgroundColor='#000000';
	                	//showNotification("Don't Lean Away from Screen");
	                }
	                if (jsonresult.state == 0) {
				bt.style.backgroundColor='#04AA6D';
				//notification.close();
	                }
	            }
	});
}
var myVar = setInterval(Pose, 100);
var myVar2 = setInterval(dope, 2500);
let flag=true;
document.getElementById("button").addEventListener("click", function() {
	if(flag){
		clearInterval(myVar);
		clearInterval(myVar2);
		document.getElementById("text").innerHTML = "Resume";
		flag=false;
	}
	else{
		document.getElementById("text").innerHTML = "Pause";
		myVar = setInterval(Pose, 100);
		myVar2 = setInterval(dope, 10000);
		flag=true;
	}
});


