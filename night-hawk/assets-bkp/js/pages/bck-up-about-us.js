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
    once: true,
    onEnter: () => {

        requestAnimationFrame(() => {

            const videoRect = videoWrap.getBoundingClientRect();
            const imgRect = serveImage.getBoundingClientRect();

            // 🔒 Lock current visual position
            gsap.set(videoWrap, {
                position: "absolute",
                top: videoRect.top + window.scrollY,
                left: videoRect.left + window.scrollX,
                x: 0,
                y: 0,
                scale: 1
            });

            // 🎯 Target center of serveThePeopleImage
            const targetLeft =
                imgRect.left + window.scrollX + imgRect.width / 2 - 150;
            const targetTop =
                imgRect.top + window.scrollY + imgRect.height / 2 - 150;

            // 🚀 Animate to final position & size (SCROLL-DRIVEN)
            gsap.to(videoWrap, {
                width: 300,
                height: 300,
                left: targetLeft,
                top: targetTop,
                ease: "none",
                scrollTrigger: {
                    trigger: ".serveThePeopleImage",
                    start: "top center",
                    end: "center center",
                    scrub: true,
                    invalidateOnRefresh: true
                }
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
