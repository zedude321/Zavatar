var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const male = new Image();
male.src = "./SRC/male.png";

function drawMale(){
    ctx.drawImage(male, 10, 10, w - 20, h - 20);
}

function drawMale2(){
    ctx.drawImage(male, 50, 10, 50, 50);
}

drawMale();