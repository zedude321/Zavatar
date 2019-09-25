var provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();


function createUser(uid, name, email) {
    console.log(uid);
    var userRef = db.collection("users").doc(uid);
    userRef.set({
        name: name,
        email: email,
        acquired: []
    })
        .then(function () {
            console.log("User created!");
        })
        .catch(function (error) {
            console.error("Error creating user: ", error);
        })
        .finally(function (){
            window.location = "/Editor.html";
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
        }).finally(function (){
            window.location = "/Editor.html";
        });
    }
});



function googleLogin() {
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



var imageSources = ["1.jpg", "2.jpg"]

var index = 1;
let image1 = document.getElementById('image-1');
let image2 = document.getElementById('image-2');

image1.style.opacity = 0;
image2.style.opacity = 1;

let isImage1Visibile = false;

setInterval(() => {
    if (isImage1Visibile === true) {
        image1.style.opacity = 0;
        image2.style.opacity = 1;
    } else {
        image1.style.opacity = 1;
        image2.style.opacity = 0;
    }

    isImage1Visibile = !isImage1Visibile;
}, 2000)