let connection = new WebSocket('ws://localhost:4444');
let inactivityTimer;

connection.onopen = function () {
    log('Websocket open!');
};

connection.onerror = function (error) {
    log('WebSocket Error ' + error);
};

connection.onmessage = function (messageEvent) {
    let messageAsString = messageEvent.data;

    sendToChatBox(messageAsString);
};


function sendToChatBox(message) {
    let chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = chatBox.innerHTML + message;
}

function messageButtonClick() {
    let textBox = document.getElementById("textBox");
    let message = textBox.value;

    send('message=' + message);
}

function loginButtonClick() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    send('login=' + username + ';' + password);
}

function send(text) {
    connection.send(text);
}

function log(s) {
    console.log(s);
}

function startTimoutWaitingForInactivity(fun) {
    if(inactivityTimer) {
        clearTimeout(inactivityTimer);
    }

    inactivityTimer = setTimeout(fun, 1000);
}