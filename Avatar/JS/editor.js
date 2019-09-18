const categories = firebase.firestore().collection('categories');
function createItem(name, photoURL) {
    let category = document.createElement('div');
    category.addEventListener('click', function () {
        clicked(name);
    });
    category.className = 'item';
    category.style.backgroundImage = "url('" + photoURL + "')";
    return category;
}

categories.get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            let el = createItem(doc.id, doc.data().gsURL);
            document.getElementsByClassName('menu')[0].appendChild(el);
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

function clicked(name) {
    document.getElementsByClassName('menu')[0].innerHTML = "";
    categories.doc(name).get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let items = doc.data();

            Object.keys(items).forEach(function (key) {
                console.log(key); // key
                console.log(items[key]); // value
                let el = createItem(key, items[key].gsURL);
                document.getElementsByClassName('menu')[0].appendChild(el);
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}