var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const male = new Image();
male.src = "./SRC/Guy.png";

function draw(acquired){
    ctx.drawImage(male, 0, 50, canvas.width, canvas.height);
    Object.keys(acquired).forEach(function (key) {
        categories.doc(key).get().then(function (doc) {
            // console.log(key); // key
            // console.log(acquired[key]); // value
            // console.log(doc.data().items[acquired[key]].gsURL);
            var tmpImage = new Image();
            tmpImage.src = doc.data().items[acquired[key]].gsURL;
            console.log(doc.data().items[acquired[key]].x, doc.data().items[acquired[key]].y, doc.data().items[acquired[key]].w, doc.data().items[acquired[key]].h);
            ctx.drawImage(tmpImage, doc.data().items[acquired[key]].x, doc.data().items[acquired[key]].y, doc.data().items[acquired[key]].w, doc.data().items[acquired[key]].h);
        });
    });
}

// setInterval(function(){draw(acquired)}, 100);
