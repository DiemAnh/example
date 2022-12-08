import * as ui from './ui.js'

const firebaseConfig = {
    // TODO: Add your our config here
    apiKey: "AIzaSyAAjpj33sBpAmqCsDJJx1Ukyg6c2K8g-eA",
    authDomain: "iomtproject.firebaseapp.com",
    databaseURL: "https://iomtproject-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "iomtproject",
    messagingSenderId: "859589064748",
    appId: "1:859589064748:web:64b1607da25b9a091df989",
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const notSignInView = document.querySelector('#notSignInView');
const login = document.querySelector('#login');
const signup = document.querySelector('#signup');
const app = document.querySelector('#app');
const welcome = document.querySelector('#heading-content');

async function loginEmailPassword(event){
    event.preventDefault();
    console.log('submitted');

    // take form data
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                console.log('Successfully login');
                console.log(userCredential);
            })
            .catch(error => {
                console.log(error);
                ui.showLoginError(error);
            });
}

const loginGoogle = async () => auth.signInWithPopup(provider)
    .then(result => {
        console.log('Successfully login');
        console.log(result);
    })
    .catch(error => console.log(error));
    
// auth state changing
const monitorAuthState = async () => {
    auth.onAuthStateChanged(user => {
        // The onAuthStateChanged method runs a callback function each time the user’s auth state changes.
        // If signed-in, the user param will be an object containing the user’s UID, email address, etc.
        // If signed-out it will be null.
    
        if(user){
            notSignInView.hidden = true;
            app.hidden = false;
            welcome.innerHTML = `<h1> Signed in as ${user.email} <//h1>`
        } else {
            notSignInView.hidden = false;
            app.hidden = true;

            ui.hideLoginError();
            ui.hideSignupError();
        }
    });
}

// Sign out
const signOut = async () => {
    await auth.signOut().then(result => {
        console.log("Log out successfully");
        console.log(result);
    });
}

// When - not - sign in, switch between  Login and Logout
function notSignIn(){
    document.addEventListener('click', event => {
        const element = event.target;
        if(element.className === 'redirectToSignUp'){
            // sign up view - on
            login.hidden = true;
            signup.hidden = false;
        } 
        else if(element.id === 'redirectToLogin'){
            // login view by default
            login.hidden = false;
            signup.hidden = true;
        }
    });
}

// Sign up with email and password
const signUp = async () => {

    // get sign up data form
    const displayName = document.querySelector('#first_name').value;
    const emailSignUp = document.querySelector('#email_signup').value;
    const passwordSignup = document.querySelector('#password_signup').value;
    const passwordConfirm = document.querySelector('#password_confirm').value;

    if (passwordSignup === passwordConfirm){
        auth.createUserWithEmailAndPassword(emailSignUp, passwordSignup)
            .then(userCredential => {
                // signed in
                console.log('signed in');
            })
            .catch(error => {
                console.log(error);
                ui.showSignupError(error);
            });
    } else {
        ui.showSignupError(1)
    }
    

}
document.querySelector('form').onsubmit = loginEmailPassword;
document.querySelector('#btnSignInGoogle').onclick = loginGoogle;
document.querySelector('#signOutBtn').onclick = signOut;
document.querySelector('#btnSignUp').onclick = signUp;
notSignIn()

monitorAuthState();