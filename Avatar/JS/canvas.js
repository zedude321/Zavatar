var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const male2 = new Image();
male2.src = "SRC/african_man.png";

const male1 = new Image();
male1.src = "SRC/asian_man.png";

const male0 = new Image();
male0.src = "SRC/white_man.png";

let images = {};

function draw(acquired) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log(acquired);
    if ('l pose' in acquired) {
        switch (acquired['l pose']) {
            case 0:
                console.log("Ac", acquired['l pose']);
                ctx.drawImage(male0, (canvas.width - canvas.height * 2 / 5) / 2, canvas.height / 10, canvas.height * 2 / 5, canvas.height * 4 / 5);
                break;
            case 1:
                ctx.drawImage(male1, (canvas.width - canvas.height * 2 / 5) / 2, canvas.height / 10, canvas.height * 2 / 5, canvas.height * 4 / 5);
                break;
            case 2:
                ctx.drawImage(male2, (canvas.width - canvas.height * 2 / 5) / 2, canvas.height / 10, canvas.height * 2 / 5, canvas.height * 4 / 5);
                break;
        }
        // console.log("XAXA", acquired['l pose']);
    } else {
        ctx.drawImage(male0, (canvas.width - canvas.height * 2 / 5) / 2, canvas.height / 10, canvas.height * 2 / 5, canvas.height * 4 / 5);
    }

    Object.keys(acquired).forEach(function (key) {
        categories.doc(key).get().then(function (doc) {
            if (key != "l pose") {
                console.log(key); // key
                // console.log(acquired[key]); // value
                // console.log(doc.data().items[acquired[key]].gsURL);
                if (key in images){
                    if (images[key].src != doc.data().items[acquired[key]].gsURL){
                        var tmpImage = new Image();
                        tmpImage.src = doc.data().items[acquired[key]].gsURL;
                        images[key] = tmpImage;
                    }
                }
                else {
                    var tmpImage = new Image();
                    tmpImage.src = doc.data().items[acquired[key]].gsURL;
                    images[key] = tmpImage;
                }
                //console.log(tmpImage.src);
                //console.log(doc.data().items[acquired[key]].x, doc.data().items[acquired[key]].y, doc.data().items[acquired[key]].w, doc.data().items[acquired[key]].h);
                ctx.drawImage(images[key], doc.data().items[acquired[key]].x, doc.data().items[acquired[key]].y, doc.data().items[acquired[key]].w, doc.data().items[acquired[key]].h);
            }
        });
    });
}

draw(acquired)
// setInterval(function(){draw(acquired)}, 1000);
