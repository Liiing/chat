let connection = new WebSocket('ws://localhost:4444');
let inactivityTimer;
let logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', logout);

connection.onopen = function () {
    log('Websocket open!');
};

connection.onmessage = function (response) {
    let message = JSON.parse(response.data);
    let command = message.command;

    switch (command) {
        case "Login successful":
            let infoBox = document.getElementById("infoBox");
            hideChat(false);
            hideLogin(true);
            showInfoBox("Login successful");
            break;
        case "messageToChatRoom":
            sendToChatBox(message.username, message.content);
            break;
        case "Logged out":
            window.location.href = "logged-out.html";
            break;
        default:
            break;
    }
};

connection.onerror = function (error) {
    log('WebSocket Error ' + error);
};

function send(object) {
    connection.send(JSON.stringify(object));
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

function hideChat(boolean) {
    let chat = document.getElementById("chat");

    chat.hidden=boolean;
}

function hideLogin(boolean) {
    let loginMask = document.getElementById("loginMask");

    loginMask.hidden=boolean;
}

function startTimoutWaitingForInactivity(fun) {
    if(inactivityTimer) {
        clearTimeout(inactivityTimer);
    }
    inactivityTimer = setTimeout(fun, 1000);
}

function logout() {
    let message = {};
    message.username = userInfoStorage.getItem('username');
    message.token = userInfoStorage.getItem('token');
    message.command = "logout";

    send(message);

    // fetch('/logout', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(message),
    // }).then((response) => {
    //     return response.json();
    // })
}

function log(s) {
    console.log(s);
}
