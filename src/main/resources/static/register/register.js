let newUserPasswordsCorrect;
let validNewUsername;
let strongPassword;

function checkNewUsername() {
    let username = document.getElementById("newUsername").value;
    let usernameAlreadyExists = document.getElementById("usernameAlreadyExists");
    usernameAlreadyExists.innerHTML = "-";
    if(username === '') return;

    let jsonObject = new Object;
    jsonObject.username = username;
    
    fetch('/userExists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:jsonObject.username
    }).then((response) => {
        return response.json();
    }).then((userExists) => {
            if (userExists) {
                usernameAlreadyExists.innerHTML = "Available";
                validNewUsername = true;
            else {
                usernameAlreadyExists.innerHTML = "Taken";
            }
            return response;
        });
}

function checkNewUserPasswordStrength() {
    let passwordsStrength = document.getElementById("passwordsStrength");
    let password = document.getElementById("password").value;
    let strength = 0;

    passwordsStrength.innerHTML = "IN PASSWORDSTRENGTH";

    if (password.match(/[a-z]/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]/)) {
        strength += 1;
    }
    if (password.match(/[0-9]/)) {
        strength += 1;
    }
    if (password.match(/[$@#&!]/)) {
        strength += 1;
    }

    switch (strength) {
        case 1:
            passwordsStrength.innerHTML = "too weak";
            break;
        case 2:
            passwordsStrength.innerHTML = "weak";
            break;
        case 3:
            passwordsStrength.innerHTML = "medium";
            break;
        case 4:
            passwordsStrength.innerHTML = "strong";
            break;
        default:
            break;
    }

    if (strength == 4){
        strongPassword = true;
    }

}

function compareNewUserPasswords() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let passwordsNotSame = document.getElementById('passwordsNotSame');

    if (password == confirmPassword) {
        passwordsNotSame = "Same";
        newUserPasswordsCorrect = true;
    } 
    else {
        passwordsNotSame.innerHTML = "Passwords don't match";
        newUserPasswordsCorrect = false;
    }

    if (allRegisterInputsValid) {
        enableRegisterButton();
    }
}

function enableRegisterButton() {
    document.getElementById("registerButton").disabled = false;    
}

function allRegisterInputsValid() {
    return (newUserPasswordsCorrect && strongPassword && validNewUsername);
}

function registerButtonClick() {
    let username = document.getElementById("newUsername");
    let password = document.getElementById("password");
    let jsonObject = new Object();

    jsonObject.username = username.value;
    jsonObject.password = password.value;
    log()
    registerUser(jsonObject);
}

function registerUser(user) {
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then((response) => {
        return response.json();
    }).then((json) => {
        log(json);
        return json;
    });
}

function log(s) {
    console.log(s);
}