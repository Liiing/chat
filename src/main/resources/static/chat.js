let textBox = document.getElementById("textBox");
let messageButton = document.getElementById('messageButton');

textBox.addEventListener('keyup', (event) => {wasEnterKeyPressed(event)});
messageButton.addEventListener('click', messageButtonClick);

function wasEnterKeyPressed(event) {
    if (event.keyCode === 13 ) {
        messageButtonClick()
    }
}
function messageButtonClick() {

    let content = textBox.value;
    textBox.value='';
    let message = {};

    message.username = username;
    message.content = content;
    message.command = "messageToRoom";

    send(message);
}

function sendToChatBox(username, content, id) {
    let chatBox = document.getElementById("chatBox");
    let messageDiv = document.createElement('div');
    let messageSpan = document.createElement('span');
    let messageText = document.createTextNode("message id: " + id + " | " + username + ": " + content);
    messageSpan.setAttribute('id', 'messageSpan');
    messageDiv.setAttribute('id', 'messageDiv');

    messageSpan.appendChild(messageText);
    messageDiv.appendChild(messageSpan);
    chatBox.appendChild(messageDiv);
}

function logout() {
    let message = {};

    message.command = "logout";
    // message.token = token;
    send(message);
}
