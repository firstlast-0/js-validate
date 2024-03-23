import './style.css';

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let email = document.querySelector('#email');
let emailError = document.querySelector('#email + span');

email.addEventListener("input", checkEmail);
email.addEventListener("focusout", checkEmail);

function checkEmail() {
    if (email.value.length === 0) {
        emailError.textContent = "This field is required";
        email.setCustomValidity('This field is required');
    } else if (!emailRegExp.test(email.value)) {
        emailError.textContent = "Entered value is not an email address";
        email.setCustomValidity('Entered value is not an email address');
    } else if (email.value.length < 8) {
        emailError.textContent = `Email should be at least 8 characters; you entered ${email.value.length}.`;
        email.setCustomValidity(`Email should be at least 8 characters; you entered ${email.value.length}.`);
    } else { 
        emailError.textContent = "";
        email.setCustomValidity('');
    }
}

document.querySelector('#country').onchange = checkZIP;
document.querySelector('#zip').addEventListener('input', checkZIP);

function checkZIP() {
    const constraints = {
        Switzerland: [
            "^(CH-)?\\d{4}$",
            "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
        ],
        France: [
            "^(F-)?\\d{5}$",
            "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
        ],
        Germany: [
            "^(D-)?\\d{5}$",
            "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
        ],      
    };
  
    const country = document.querySelector("#country").value;
    const zip = document.querySelector("#zip");
    let zipError = document.querySelector('#zip + span');
    const constraint = new RegExp(constraints[country][0], "");
  
    if (constraint.test(zip.value)) {
        zipError.textContent = '';
        zip.setCustomValidity('');
    } else {      
        zipError.textContent = constraints[country][1];
        zip.setCustomValidity(constraints[country][1]);
    }
}

let pass = document.querySelector('#pass');
let confirm = document.querySelector('#confirm');
let passError = document.querySelector('#pass + span');
let confirmError = document.querySelector('#confirm + span');
pass.addEventListener('input', checkPw);
pass.addEventListener('focusout', checkPw);

function checkPw() {
    if (pass.value.length === 0) {
        passError.textContent = "This field is required";
        pass.setCustomValidity('This field is required');
    } else if (pass.value.length < 6) {
        passError.textContent = `Email should be at least 6 characters; you entered ${pass.value.length}.`;
        pass.setCustomValidity(`Email should be at least 6 characters; you entered ${pass.value.length}.`);
    } else { 
        passError.textContent = "";
        pass.setCustomValidity('');
    }
}

confirm.addEventListener('input', checkConfirmPass);
confirm.addEventListener('focusout', checkConfirmPass);
function checkConfirmPass() {
    if (confirm.value.length === 0) {
        confirmError.textContent = "This field is required";
        confirm.setCustomValidity('This field is required');
    } else if (pass.value !== confirm.value) {
        confirmError.textContent = `Passwords do not match`;
        confirm.setCustomValidity(`Passwords do not match`);
    } else { 
        confirmError.textContent = "";
        confirm.setCustomValidity('');
    }
}

let result = document.querySelector('#result');
let form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkEmail();
    checkPw();
    checkConfirmPass();

    if (form.checkValidity()) {
        result.textContent = 'High five!';
    } else {
        result.textContent = 'Please fix invalid input / fill required fields';
    }
});