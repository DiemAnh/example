//// User authentication ////

const signInBtn = document.querySelector('#signInBtn');
const signOutBtn = document.querySelector('#signOutBtn');

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider).then(result => {
    console.log("Log in successfully");
    console.log(result);
});


signOutBtn.onclick = () => auth.signOut().then(result => {
    console.log("Log out successfully");
    console.log(result);
});

const signedInSection = document.querySelector("#signedInSection");
const signedOutSection = document.querySelector("#signedOutSection");
const userDetail = document.querySelector('#userDetail');

auth.onAuthStateChanged(user => {
    // The onAuthStateChanged method runs a callback function each time the user’s auth state changes.
    // If signed-in, the user param will be an object containing the user’s UID, email address, etc.
    // If signed-out it will be null.

    if(user){
        // signed in
        signedInSection.hidden = false;
        signedOutSection.hidden = true;
        userDetail.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`;
    } else {
        // not signed in
        signedInSection.hidden = true;
        signedOutSection.hidden = false;
        userDetail.innerHTML = '';
        document.querySelector('#firestore').style.display = 'none';
    }
    
});

//// FIRESTORE ////

// Init Firestore and get a reference to this service
const db = firebase.firestore();
let thingRef;
let unsubsribe;
createThing = document.querySelector('#create');
listThing = document.querySelector('#listThing');

auth.onAuthStateChanged(user => {
    if (user){
        // signed in
        document.querySelector('#firestore').style.display = 'block';

        // db ref
        thingRef = db.collection('things');

        const { serverTimestamp } = firebase.firestore.FieldValue;

        createThing.onclick = () => {

            thingRef.add({
                uid: user.uid,
                name: faker.commerce.productName(),
                createdAt: serverTimestamp()
            });
        };

        // Query
        unsubsribe = thingRef.where('uid', '==', user.uid)
                            .onSnapshot(result => {
                                // map result to an array of li 
                                const items = result.docs.map(doc => {
                                    return `<li>${doc.data().name}</li>`
                                });

                                listThing.innerHTML = items.join('');
                                
                            });

        
    } else {
        document.querySelector('#firestore').style.display = 'none';
        // unsubscribe when user signs out ??? confusing
        unsubsribe && unsubsribe()
        
    }
});