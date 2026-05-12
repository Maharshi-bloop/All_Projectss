gsap.registerPlugin(ScrollTrigger);

const videoWrap = document.querySelector(".aboutBannerBgVideo");
const serveImage = document.querySelector(".serveThePeopleImage");
const bannerContent = document.querySelector(".aboutBannerInner");


gsap.to(bannerContent, {
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: ".aboutBanner",
        start: "top top",
        end: "top+=150 top", // 👈 fade out early
        scrub: true,
        invalidateOnRefresh: true
    }
});


/* PHASE 1 */
gsap.to(videoWrap, {
    scale: 0.2,
    opacity: 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".aboutBanner",
        start: "top top",
        endTrigger: ".serveThePeopleImage",
        end: "center center",
        scrub: true,
        pin: videoWrap,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
    }
});


/* PHASE 2 */
ScrollTrigger.create({
    trigger: ".serveThePeopleImage",
    start: "center center",
    once: true, // 🔑 critical
    onEnter: () => {

        // 🔑 wait until layout & pin are fully settled
        requestAnimationFrame(() => {

            const img = serveImage.getBoundingClientRect();

            const targetX =
                img.left + img.width / 2 - window.innerWidth / 2;
            const targetY =
                img.top + img.height / 2 - window.innerHeight / 2;

            gsap.to(videoWrap, {
                scale: 1,       // reset scale
                width: 300,
                height: 300,
                x: targetX,
                y: targetY,
                duration: 0.8,
                ease: "power2.inOut"
            });

        });
    }
});

/* RESET */
ScrollTrigger.addEventListener("refreshInit", () => {
    gsap.set(videoWrap, {
        clearProps: "width,height,x,y"
    });
    
});

/* ✅ FIX */
window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});
