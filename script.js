const mask = document.getElementById("mask");

let p = 0;

function loop() {
    p += 0.01;
    if (p > 1) p = 1;

    console.log("TEST progress:", p);

    mask.style.opacity = 1 - p;

    requestAnimationFrame(loop);
}

loop();
