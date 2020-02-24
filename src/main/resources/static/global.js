let connection = new WebSocket('ws://localhost:4444');
let inactivityTimer;

connection.onopen = function () {
    log('Websocket open!');
};

connection.onmessage = function (response) {
    let message = JSON.parse(response.data);
    if (message.command === "Login successful") {
        showInfoBox("Login successful")
    } else {
        sendToChatBox(message.sender, message.content);
    }
};


connection.onerror = function (error) {
    log('WebSocket Error ' + error);
};

function send(object) {
    connection.send(JSON.stringify(object));
}

function log(s) {
    console.log(s);
}

function showInfoBox(info) {
    let infoBox = document.getElementById("infoBox");
    window.setTimeout(function () {fadeout(infoBox)}, 5000);
    infoBox.hidden=false;
    infoBox.innerHTML = info;
}

function fadeout(element) {
    element.style.opacity = "0";
}

function startTimoutWaitingForInactivity(fun) {
    if(inactivityTimer) {
        clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(fun, 1000);
}