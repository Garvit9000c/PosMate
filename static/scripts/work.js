
// Variables Declared
var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var bt = document.getElementById('bt');
var context = canvas.getContext('2d');
let pose;
let data;
let detect;
let detect_flag;
let notification;
let constraint={video:{width: 640, height: 480}};
let mob=0;
detect_flag=0;

// Load function
async function load() {
      const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
      console.log('Detector Loaded');
      detect_flag=1;
      detect=detector;
}  
load(); 



// For mobile view
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
  canvas.width=480;
  canvas.height=640;
  canvas.style.width="90%"
  mob=1;
}

// Notifications

if(mob==0){
	console.log(Notification.permission);
	if (Notification.permission !== "denied") {
		Notification.requestPermission();
	}
	function showNotification(text) {
	 	notification = new Notification("PosMate", { body: text });
	}
}

function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);
	this.play = function(){
		this.sound.play();
	}
	this.stop = function(){
 		this.sound.pause();
	}
}
var wr = new sound("static/audio/wr_audio.mp3");
var la = new sound("static/audio/la_audio.mp3");
var lt = new sound("static/audio/lt_audio.mp3");



if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraint).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

// Model
async function Pose() {
      if(detect_flag==1){
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
}


async function dope(){
	if(detect_flag==1){
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
	                	if(jsonresult.msg==1){
	                		if(mob==0){
	                			showNotification("Please Sit Straight");
	                			setTimeout(function(){notification.close();},2000)
	                		}
	                		wr.play();
	                	}
	                }
	                if (jsonresult.state == 2) {
	                	bt.style.backgroundColor='#ffff00';
	                	if(jsonresult.msg==1){
	                		if(mob==0){
	                			showNotification("Don't Lean Towards Screen");
	                			setTimeout(function(){notification.close();},2000)
	                		}
	                		lt.play();	
	                	}
	                }
	                if (jsonresult.state == 3) {
	                	bt.style.backgroundColor='#000000';
	                	if(jsonresult.msg==1){
	                		if(mob==0){
	                			showNotification("Don't Lean Away from Screen");
	                			setTimeout(function(){notification.close();},2000)
	                		}
	                		la.play();
	                	}
	                }
	                if (jsonresult.state == 0) {
				bt.style.backgroundColor='#04AA6D';
	                }
	            }
	});
	}
}

// Toggle button actions
var myVar = setInterval(Pose, 100);
var myVar2 = setInterval(dope, 2500);
let flag=true;
document.getElementById("button").addEventListener("click", function() {
	if(flag){
		clearInterval(myVar);
		clearInterval(myVar2);
		document.getElementById("text").innerHTML = "Resume";
		flag=false;
		$(".toast").toast({ autohide: false });
		$(".toast").toast("show");
        
        
	}
	else{
		document.getElementById("text").innerHTML = "Pause";
		myVar = setInterval(Pose, 100);
		myVar2 = setInterval(dope, 2500);
		flag=true;
        
	}
});

// Chill area

function chill(){
	$('.container').fadeToggle("900");
	$('#chill').fadeToggle("3500").css({"display":"flex","justify-content":"center","align-items":"center","flex-direction":"column"});
}
function btw(){
	$('#chill').fadeToggle();
	$('.container').fadeToggle("slow").css("display","flex");
}

// SideBar
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
  
