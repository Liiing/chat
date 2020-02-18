let connection = new WebSocket('ws://localhost:4444');
let inactivityTimer;
let asd;

connection.onopen = function () {
    log('Websocket open!');
};

connection.onmessage = function (response) {
    let message = JSON.parse(response.data);
    sendToChatBox(message.message);
};

connection.onerror = function (error) {
    log('WebSocket Error ' + error);
};

function send(object) {
    connection.send(object);
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