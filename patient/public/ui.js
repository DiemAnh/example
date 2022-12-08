import { AuthErrorCodes } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js"

const loginErrorMessage = document.querySelector('#loginErrorMessage');
const signupErrorMessage = document.querySelector('#signupErrorMessage');

export const hideLoginError = () => loginErrorMessage.hidden = true;

export const showLoginError = (error) => {
    loginErrorMessage.hidden = false;
    if(error.code == AuthErrorCodes.INVALID_PASSWORD){
        loginErrorMessage.innerHTML = '<p>Wrong email/ password. Try again.</p>';
    } else {
        loginErrorMessage.innerHTML = '<p>Email is not existed. <a class="redirectToSignUp" href="#">Sign up</a></p>';
    }
}

export const hideSignupError = () => signupErrorMessage.style.display = 'none';

export const showSignupError = (error) => {
    signupErrorMessage.style.display = 'block';
    if (error === 1){
        signupErrorMessage.innerHTML = '<p>The password confirmation does not match</p>'
    } else {
        signupErrorMessage.innerHTML = '<p>Invalid credential for signing up</p>'
    }
}