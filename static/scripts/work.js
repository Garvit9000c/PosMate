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

navigator.mediaDevices.getUserMedia({ video: true }).then(function success(stream) {
    video.srcObject = stream;
    stream.getTracks().forEach(function(track) {
        let sys=track.getSettings();
        let width=sys.width;
        let height=sys.height;
        console.log(width);
        console.log(height);
        canvas.width=width;
	canvas.height=height;   
	video.width=width;
	video.height=height;
    })
});

async function Pose() {
      const poses = await detect.estimatePoses(video);
      console.log(poses[0].keypoints);
      context.drawImage(video, 0, 0, 640, 480);
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
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.srcObject = stream;
        video.play();
    });
}

document.getElementById("snap").addEventListener("click", function() {
	Pose();
});


