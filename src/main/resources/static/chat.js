function messageButtonClick() {
    let textBox = document.getElementById("textBox");
    let content = textBox.value;
    let message = {};

    message.sender = username;
    message.content = content;
    message.command = "messageToRoom";

    send(message);
}

function sendToChatBox(sender, content) {
    let chatBox = document.getElementById("chatBox");

    chatBox.innerHTML = chatBox.innerHTML + sender +  ": " + content;
}
