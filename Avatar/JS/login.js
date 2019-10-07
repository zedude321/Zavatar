const db = firebase.firestore();
function createUser(uid, name, email) {
    console.log(uid);
    var userRef = db.collection("users").doc(uid);
    userRef.set({
        name: name,
        email: email,
        acquired: {}
    })
        .then(function () {
            console.log("User created!");
        })
        .catch(function (error) {
            console.error("Error creating user: ", error);
        })
        .finally(function () {
            window.location = "/loader.html";
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        var userRef = db.collection("users").doc(user.uid);
        userRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("User exists:", doc.data());
            } else {
                createUser(user.uid, user.displayName, user.email);
            }
        }).catch(function (error) {
            console.log("Error getting user:", error);
        }).finally(function () {
            window.location = "/loader.html";
        });
    }
});



function googleLogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('Auth error', errorCode, errorMessage);
    });
}

function facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user);
    }).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('Auth error', errorCode, errorMessage);
    });
}




let images = document.getElementsByClassName('image');
let visibleImage = 1;

setInterval(() => {

    for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = 0;
    }
    images[visibleImage - 1].style.opacity = 1;

    visibleImage++;
    if (visibleImage === 6) {
        visibleImage = 1;
    }
}, 2000)