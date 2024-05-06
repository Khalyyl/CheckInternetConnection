let isOnLine = true, intervalID, timer = 10;
const popup = document.querySelector('.popup');
const wifiIcon = document.querySelector('.icon i');
const popupDesc = document.querySelector('.desc');
const popupTitle = document.querySelector('.title');

const checkConnection = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        isOnLine = response.status >= 200 && response.status < 300;
        console.log(response);
    } catch (error) {
        isOnLine = false;
    }
    
    timer = 10;
    clearInterval(intervalID);
    handlePopup(isOnLine);
}

const handlePopup = (status) => {
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popupTitle.innerText = "Restored Connection";
        popupDesc.innerHTML = "Your device is now connected to the internet";
        popup.classList.add("online");
        setTimeout(() => {
            popup.classList.remove("show", "online");
        }, 2000);
    } else {
        wifiIcon.className = "uil uil-wifi-slash";
        popupTitle.innerText = "Lost Connection";
        popupDesc.innerHTML = "Your Network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
        popup.classList.add("show")
        intervalID = setInterval(() => {
            timer--;
            if (timer == 0) checkConnection();
            popup.querySelector('.desc b').innerText = timer;
        }, 1000);
    }
}

setInterval(() => isOnLine && checkConnection(), 3000);
