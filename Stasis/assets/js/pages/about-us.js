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

gsap.registerPlugin(MotionPathPlugin);

const images = document.querySelectorAll(".image");

function initMotionAnimation() {
    // Kill old animations
    gsap.killTweensOf(images);

    const total = images.length;

    images.forEach((img, i) => {
        gsap.set(img, { x: 0, y: 0 }); // reset position

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
            }
        });
    });
}

// Init first time
initMotionAnimation();

// Re-init on resize (debounced)
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        initMotionAnimation();
    }, 200); // debounce
});

/* slide js end */


/* sliderSectionOuter Swiper js start */
new Swiper('.sliderSectionOuter .swiper', {
    loop: false,
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