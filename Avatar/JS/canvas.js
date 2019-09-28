var canvas = document.getElementById("avatar");
var ctx = canvas.getContext("2d");
const h = canvas.height;
const w = canvas.width;

const male = new Image();
male.src = "./SRC/Guy.png";

const chefHat = new Image()

function start(){
    var c1=scaleIt(male, 2);
    canvas.width=c1.width/2;
    canvas.height=c1.height/2;
    ctx.drawImage(c1, 45, 60, 330 * 4 / 5, 790 * 4 / 5);
  }

function scaleIt(source,scaleFactor){
    var c=document.createElement('canvas');
    var ctx=c.getContext('2d');
    var w=source.width*scaleFactor;
    var h=source.height*scaleFactor;
    c.width=w;
    c.height=h;
    ctx.drawImage(source,0,0,w,h);
    return(c);
  }

start();

// function drawMale(){
//     ctx.drawImage(male, 10, 10, w - 40, h - 20);
// }

// function drawMale2(){
//     ctx.drawImage(male, 50, 10, 50, 50);
// }

// drawMale();