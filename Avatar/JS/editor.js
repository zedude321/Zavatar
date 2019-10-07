const categories = firebase.firestore().collection('categories');
const users = firebase.firestore().collection('users');
let itemtype;
let acquired;

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementsByClassName('name')[0].innerHTML = user.displayName.split(' ')[0];
        console.log(user.email);
        userId = users.get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                if (doc.exists && doc.data().email == user.email){
                    userId = doc.id;
                    console.log(userId);
                    acquired = doc.data().acquired;
                    users.doc(userId).onSnapshot(function(doc) {
                        draw(acquired);
                    });
                }
            });
        })
    } else {
        window.location = "/index.html";
    }
});


function createCategoryItem(name, photoURL) {
    let category = document.createElement('div');
    category.addEventListener('click', function () {
        choiceCategory(name)
    });
    category.className = 'item';
    category.style.backgroundImage = "url('" + photoURL + "')";
    return category;
}
function createItem(name, indx, photoURL) {
    let category = document.createElement('div');
    category.addEventListener('click', function () {
        choiceItem(name, indx)
    });
    if (name == "back"){
        category.className = 'item';
    } else {
        category.className = 'itemv2';
    }
    category.style.backgroundImage = "url('" + photoURL + "')";
    return category;
}
function setCategories() {
    document.getElementsByClassName('menu')[0].classList.add('slide');

    setTimeout(function(){
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
    }, 500);

    setTimeout(function(){
        document.getElementsByClassName('menu')[0].classList.remove('slide');
    }, 1000);   
}
setCategories();

function choiceCategory(name) {
    document.getElementsByClassName('menu')[0].classList.add('slide');

    setTimeout(function(){
        document.getElementsByClassName('menu')[0].innerHTML = "";
        document.getElementsByClassName('menu')[0].appendChild(createItem("back", 0, "https://firebasestorage.googleapis.com/v0/b/zavatarapp.appspot.com/o/categories%2Fbackcuttn.png?alt=media&token=e01e540f-40de-4958-b26c-1a948a690c90"));

        categories.doc(name).get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data().items);
                let items = doc.data().items;

                items.forEach(function (item, index) {
                    // console.log(name, index, item.gsURL);
                    let el = createItem(name, index, item.gsURL);
                    document.getElementsByClassName('menu')[0].appendChild(el);
                });
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, 500);

    setTimeout(function(){
        document.getElementsByClassName('menu')[0].classList.remove('slide');
    }, 1000);
    
}
function choiceItem(name, index) {
    if (name == "back") {
        setCategories();
    }
    else {
        acquired[name] = index;
        console.log(acquired);
        users.doc(userId).update({acquired: acquired});
    }
}
function gender() {

}
function share() {

}