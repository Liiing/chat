let connection = new WebSocket('ws://localhost:4444');
let textBox = document.getElementById("textBox");
let chatBox = document.getElementById("chatBox");

connection.onopen = function () {
    log('Websocket open!');

    let userName = document.getElementById("userName").value;
    let password = document.getElementById("password").value;


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

function log(s) {
    console.log(s);
}

function sendToChatBox(message) {
    chatBox.innerHTML = chatBox.innerHTML + message;
}

function sendButtonClick() {
    let message = textBox.value;

    send(message);
}

function send(text) {
    connection.send(JSON.stringify(text));
}
