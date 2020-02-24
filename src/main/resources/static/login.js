let username;

function loginButtonClick() {
    loginUser();
}

function loginUser() {
	username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let jsonObject = {"key":"value"};

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

        	username = session.username;
            send(message);
        } else {
        	document.getElementById("incorrectLoginDataMessage").innerHTML = "Incorrect login data";
        }
    });
}
