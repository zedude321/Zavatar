let images = document.getElementsByClassName('image');

let visibleImage = 1;

setInterval(() => { 

    for (let i = 0; i < images.length; i++) {
        images[i].style.opacity = 0;
    }
    images[visibleImage - 1].style.opacity = 1;

    visibleImage++;
    if (visibleImage === 6) {
        visibleImage = 1;
        window.location = "/songoh.html";
    }
}, 1500)