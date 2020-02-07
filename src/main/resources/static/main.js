let connection = new WebSocket('ws://localhost:4444');
let textBox = document.getElementById("textBox");
let chatBox = document.getElementById("chatBox");
let username = document.getElementById("username");
let password = document.getElementById("password");


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

function registerButtonClick() {
    let user = new Object();
    user.username = username.value;
    user.password = password.value;
    //let user = username.value;
    //let password = password.value;

    registerUser(user);
}

function registerUser(user) {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
}

function sendToChatBox(message) {
    chatBox.innerHTML = chatBox.innerHTML + message;
}

function messageButtonClick() {
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