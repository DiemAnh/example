document.addEventListener('DOMContentLoaded', () => {
    const app = firebase.app();
    document.querySelector('button').onclick = googleLogin;
});


function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(result => {
            document.querySelector('h1').innerHTML = `Signed in as ${result.user}`;
            console.log(result);
        });
}