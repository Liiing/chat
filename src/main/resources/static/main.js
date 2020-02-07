let connection = new WebSocket('ws://localhost:4444');
let newUserPasswordsCorrect;
let newUsername;
let strongPassword;

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

function showRegisterElements() {
    document.getElementById("loginMask").hidden=true;
    document.getElementById("registerMask").hidden=false;
}

function checkNewUsername() {
    let username = document.getElementById("username");

}

function checkNewUserPasswordStrength() {
    let passwordInformation = document.getElementById("passwordInformation");
    let password = document.getElementById("password").value;
    let strength = 0;

    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
        strength += 1;
    }

    if (strength == 6){
        strongPassword = true;
    }
}

function compareNewUserPasswords() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if (password == confirmPassword) {
        newUserPasswordsCorrect = true;
    }
}

function registerButtonClick() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let user = new Object();

    user.username = username.value;
    user.password = password.value;

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