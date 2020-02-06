let connection = new WebSocket('ws://localhost:4444');
let textBox = document.getElementById("textBox");
let chatBox = document.getElementById("chatBox");
let userName = document.getElementById("userName").value;
let password = document.getElementById("password").value;


connection.onopen = function () {
    log('Websocket open!');

    //sende ein hallo nach dem verbinden
    //connection.send("Hallo")

};

connection.onerror = function (error) {
    log('WebSocket Error ' + error);
};

connection.onmessage = function (messageEvent) {
    let messageAsString = messageEvent.data;

    sendToChatBox(messageAsString);
};


function sendToChatBox(message) {
    chatBox.innerHTML = chatBox.innerHTML + message;
}

function messageButtonClick() {
    let message = textBox.value;

    send('message=' + message);
}

function loginButtonClick() {
    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;

    send('login=' + userName + ';' + password);
}

function send(text) {
    connection.send(text);
}

function log(s) {
    console.log(s);
}