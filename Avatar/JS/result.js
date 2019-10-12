const categories = firebase.firestore().collection('categories');
const users = firebase.firestore().collection('users');
let itemtype;
let acquired;


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userId = users.get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc.exists && doc.data().email == user.email) {
                        userId = doc.id;
                        console.log(userId);
                        acquired = doc.data().acquired;
                        console.log(acquired);
                        users.doc(userId).onSnapshot(function (doc) {
                            draw(acquired);
                            setTimeout(function () { draw(acquired); }, 5000);
                        });
                    }
                });
            })
    } else {
        window.location = "/index.html";
    }
});