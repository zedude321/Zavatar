var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const male = new Image();
male.src = "./SRC/Guy.png";

const chefHat = new Image();
chefHat.src = "./SRC/chef.png";

function scaleIt(source, scaleFactor) {
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    var cw = w * scaleFactor;
    var ch = h * scaleFactor;
    c.width = cw;
    c.height = ch;
    ctx.drawImage(source, 0, 0, cw, ch);
    return (c);
}
console.log('OKO',canvas.height, canvas.width);

function drawMale() {
    var c1 = scaleIt(male, 4);
    canvas.width = w * 2;
    canvas.height = h * 2;
    ctx.drawImage(c1, 50, 35, canvas.width * 5 / 6, canvas.height * 5 / 6);
    // ctx.drawImage(c1, 0, 0, canvas.width, canvas.height);
    console.log('WJI',canvas.height, canvas.width);
}

drawMale();


function drawHat() {
    var c1 = scaleIt(chefHat, 4);
    // canvas.width = w * 2;
    // canvas.height = h * 2;
    ctx.drawImage(c1, 0, 0, canvas.width, canvas.height);
    console.log('SKO', canvas.height, canvas.width);
}
