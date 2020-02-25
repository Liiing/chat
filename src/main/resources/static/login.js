let username;
let loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', loginUser);
userInfoStorage = localStorage;


function loginUser() {
	username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let jsonObject = {};

    jsonObject.username = username;
    jsonObject.password = password; 

	fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject),
    }).then((response) => {
        return response.json();
    }).then((session) => {
        if (session) {
        	let message = {};
        	message.command = "login";
        	message.token = session.token;
            message.username = username;

            userInfoStorage.setItem("username", username);
            userInfoStorage.setItem("token", session.token);

            send(message);

        } else {
        	document.getElementById("incorrectLoginDataMessage").innerHTML = "Incorrect login data";
        }
    });
}
