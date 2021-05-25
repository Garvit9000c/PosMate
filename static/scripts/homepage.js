let subm = document.getElementById('subm');


console.log(Notification.permission);

if (Notification.permission === "granted" ){
	showNotification(); 
}else if (Notification.permission !=="denied"){ 
	Notification.requestPermission().then( permission => {
		if(permission== "granted"){
			showNotification();
		}
	});
}

function showNotification() {
	const notification = new Notification("New message incoming", { body: "Hi there. How are you doing?"
	})
}


subm.addEventListener('click', () => {
    let loading=document.getElementById('loading');
    loading.style.display='block';
        
});


