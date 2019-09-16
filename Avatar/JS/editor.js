const categories = firebase.firestore().collection('categories');

function createCategory(name, photoURL){
    var category = document.createElement('div');
    category.addEventListener('click', function(){
        clicked(name);
    });
    category.className = 'item';
    category.style.backgroundImage = "url('" + photoURL + "')";
    // category.src = photoURL;
    return category;
}


function clicked(name){
    alert(name);
}

categories.get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            var el = createCategory(doc.id, doc.data().gsURL);
            document.getElementsByClassName('menu')[0].appendChild(el);
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });