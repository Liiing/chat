let newUserPasswordsCorrect;
let validNewUsername;
let strongPassword;

let newUsernameTextBox = document.getElementById('newUsername');
let newPasswordTextBox = document.getElementById('password');
let confirmPasswordTextBox = document.getElementById('confirmPassword');
let registerButton = document.getElementById('registerButton');

newUsernameTextBox.addEventListener('keyup', function() { startTimoutWaitingForInactivity(checkNewUsername) });
//newUsernameTextBox.addEventListener('keyup', checkNewUsername);
newPasswordTextBox.addEventListener('keyup', () => {checkNewUserPasswordStrength(); compareNewUserPasswords(); } );
confirmPasswordTextBox.addEventListener('keyup', compareNewUserPasswords);
registerButton.addEventListener('click', registerButtonClick);

window.addEventListener('load', () => {
    let listOfElementsWithRegistrationInputs = document.querySelectorAll('#newUsername, #password, #confirmPassword');

    listOfElementsWithRegistrationInputs.forEach(element => 
            element.addEventListener('keyup', enableRegisterButtonIfAllInputsAreValid)
        );
});

function checkNewUsername() {
    let username = document.getElementById("newUsername").value;
    let usernameAlreadyExists = document.getElementById("usernameAlreadyExists");
    usernameAlreadyExists.innerHTML = "-";
    if(username === '') return;

    let jsonObject = {};
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
                usernameAlreadyExists.innerHTML = "Taken";
                validNewUsername = false;
            } else {
                usernameAlreadyExists.innerHTML = "Available";
                validNewUsername = true;
            }
            enableRegisterButtonIfAllInputsAreValid();
        });
}

function checkNewUserPasswordStrength() {
    let passwordsStrength = document.getElementById("passwordsStrength");
    let password = document.getElementById("password").value;
    let strength = 0;

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
            passwordsStrength.innerHTML = "strong \n valid password";
            break;
        default:
            break;
    }

    strongPassword = strength === 4;
}

function compareNewUserPasswords() {
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let passwordsNotSame = document.getElementById('passwordsNotSame');

    if (password === confirmPassword) {
        passwordsNotSame.innerHTML = "Same";
        newUserPasswordsCorrect = true;
    } else {
        passwordsNotSame.innerHTML = "Passwords don't match";
        newUserPasswordsCorrect = false;
    }
}

function registerButtonClick() {
    checkNewUsername();
    if (isRegisterInputValid) {
        let username = document.getElementById("newUsername");
        let password = document.getElementById("password");
        let jsonObject = {};

        jsonObject.username = username.value;
        jsonObject.password = password.value;

        registerUser(jsonObject); 
    }
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
    }).then((registerSuccessful) => {

        if(registerSuccessful) {
            window.location.href = "user-added.html";
        } else {
            window.location.href = "registration-failed.html";
        }
    });
}

function enableRegisterButtonIfAllInputsAreValid() {
    let registerButton = document.getElementById("registerButton");

    registerButton.disabled = !isRegisterInputValid();
}

function isRegisterInputValid() {
    return (newUserPasswordsCorrect && strongPassword && validNewUsername);
}

function log(s) {
    console.log(s);
}
