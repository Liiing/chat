let connection = new WebSocket('ws://localhost:4444');
let inactivityTimer;
let logoutButton = document.getElementById('logoutButton');
let signUp = document.getElementById('signUpButton');

signUp.addEventListener("click", function(){
    document.location.href = 'register/index.html';
});

connection.onopen = function () {
    log('Websocket open!');
};

connection.onmessage = function (response) {
    let message = JSON.parse(response.data);
    let command = message.command;


    switch (command) {
        case "Login successful":
            let infoBox = document.getElementById("infoBox");
            hideLogin(true);
            hideChat(false);
            showInfoBox("Login successful");
            break;
        case "messageToChatRoom":
            userInfoStorage.setItem("messageId", message.id);
            sendToChatBox(message.username, message.content, message.id);
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
    let chatMask = document.getElementById("chatMask");

    chatMask.hidden=boolean;
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

window.addEventListener('load', () => {
    let chatMask = document.getElementById('chatMask');

    logoutButton.addEventListener('click', logout);
});