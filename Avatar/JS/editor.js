const categories = firebase.firestore().collection('categories');
function createCategoryItem(name, photoURL) {
    let category = document.createElement('div');
    category.addEventListener('click', function () {
        choiceCategory(name)
    });
    category.className = 'item';
    category.style.backgroundImage = "url('" + photoURL + "')";
    return category;
}
function createItem(name, photoURL) {
    let category = document.createElement('div');
    category.addEventListener('click', function () {
        choiceItem(name)
    });
    category.className = 'item';
    category.style.backgroundImage = "url('" + photoURL + "')";
    return category;
}
function setCategories() {
    document.getElementsByClassName('menu')[0].innerHTML = "";
    categories.get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
                let el = createCategoryItem(doc.id, doc.data().gsURL);
                document.getElementsByClassName('menu')[0].appendChild(el);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}
setCategories();
function choiceCategory(name) {
    document.getElementsByClassName('menu')[0].innerHTML = "";
    document.getElementsByClassName('menu')[0].appendChild(createItem("back", "https://firebasestorage.googleapis.com/v0/b/zavatarapp.appspot.com/o/categories%2Fbackcuttn.png?alt=media&token=e01e540f-40de-4958-b26c-1a948a690c90"));

    categories.doc(name).get().then(function (doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            let items = doc.data();

            Object.keys(items).forEach(function (key) {
                // console.log(key); // key
                // console.log(items[key]); // value
                if (key != 'gsURL') {
                    let el = createItem(key, items[key].gsURL);
                    document.getElementsByClassName('menu')[0].appendChild(el);
                }
            });
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });
}
function choiceItem(name) {
    if (name == "back") {
        setCategories();
    }
    else {
        alert(name);
    }
}