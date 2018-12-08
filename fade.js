// Animate
function animate(draw, duration) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        }

    });
}

animate(function (timePassed) {
    train.style.opacity = timePassed / 5 + 'px';
}, 2000);

// function FadeOut(el) {
//     el.style.opacity = 1;

//     (function fade() {
//         if ((el.style.opacity -= .1) < 0) {
//             el.style.display = "none";
//         } else {
//             requestAnimationFrame(fade);
//         }
//     })();
// }

// // fade in

// function FadeIn(el, display) {
//     el.style.opacity = 0;
//     el.style.display = display;

//     (function fade() {
//         var val = parseFloat(el.style.opacity);
//         if (!((val += .1) > 1)) {
//             el.style.opacity = val;
//             requestAnimationFrame(fade);
//         }
//     })();
// }

// FadeIn(document.querySelector('.box'), 'block')