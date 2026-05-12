gsap.registerPlugin(ScrollTrigger);

const scaleInner = document.querySelector(".scaleimageInner");
const imageTarget = document.querySelector(".imageTarget");

window.addEventListener("load", () => {

    function calculateAndAnimate() {

        // Reset transforms before measuring
        gsap.set(scaleInner, { clearProps: "transform" });

        const originalRect = scaleInner.getBoundingClientRect();
        const targetRect = imageTarget.getBoundingClientRect();

        const scaleX = targetRect.width / originalRect.width;
        const scaleY = targetRect.height / originalRect.height;
        const finalScale = Math.min(scaleX, scaleY);

        const moveX =
            targetRect.left + targetRect.width / 2 -
            (originalRect.left + originalRect.width / 2);

        const moveY =
            targetRect.top + targetRect.height / 2 -
            (originalRect.top + originalRect.height / 2);

        gsap.to(scaleInner, {
            scale: finalScale,
            x: moveX,
            y: moveY,

            ease: "none",
            scrollTrigger: {
                trigger: ".scaleimage",
                start: "top top",
                end: "90% top",
                scrub: true
            }
        });
    }

    calculateAndAnimate();
    window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
    });

});


/* slide js start */
/* const svg = document.querySelector(".path-svg");

function updateViewBox() {
    const width = window.innerWidth;

    if (width > 1600) {
        svg.setAttribute("viewBox", "0 0 1400 600"); // desktop
    }
    else if (width <= 1600) {
        svg.setAttribute("viewBox", "0 0 1000 600"); // tablet
    }
    else {
        svg.setAttribute("viewBox", "0 0 700 400"); // mobile
    }
}

// run on load
updateViewBox();

// run on resize
window.addEventListener("resize", updateViewBox); */

gsap.registerPlugin(MotionPathPlugin);

const images = document.querySelectorAll(".image");
const total = images.length;

images.forEach((img, i) => {

    gsap.to(img, {
        duration: 50,
        repeat: -1,
        ease: "none",

        motionPath: {
            path: "#motionPath",
            align: "#motionPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
            start: i / total,
            end: 1 + (i / total)
        },

        /* onUpdate: function rotation() {

            let p = (this.progress() + i / total) % 1;

            // top horizontal section
            if (p > 0.05 && p < 0.45) {
                this.vars.motionPath.alignOrigin = [0.5, -0.8];
            }
            // bottom horizontal section
            else if (p > 0.55 && p < 0.95) {
                this.vars.motionPath.alignOrigin = [0.5, 0.8];
            }

        } */

    });
    /* setInterval(rotation, 1000); */

});

/* slide js end */


/* sliderSectionOuter Swiper js start */
new Swiper('.sliderSectionOuter .swiper', {
    loop: true,
    slidesPerView: 3.2,
    paginationClickable: true,
    speed: 5000,
    autoplay: {
        delay: 0,
    },
    spaceBetween: 0,
    breakpoints: {
        1920: {
            slidesPerView: 3.2,
        },
        1366: {
            slidesPerView: 3.2,
        },
        480: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        },
        320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        }
    }
});
/* sliderSectionOuter Swiper js end */