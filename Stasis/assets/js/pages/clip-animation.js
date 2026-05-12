gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const wireImage = document.querySelector(".wire");

function setupAnimation() {

    const imageHeight = wireImage.offsetHeight;
    hero.style.height = imageHeight + "px";

    const bg1 = document.querySelector('[data-bg="slide1"]');
    const bg2 = document.querySelector('[data-bg="slide2"]');
    const texts = document.querySelectorAll(".textOnly");

    

    // ✅ Default active
    texts[0].classList.add("slideActive");

    // initial states
    gsap.set(".reveal", { height: 0 });
    gsap.set(bg2, { opacity: 0 });

    let isSwitched = false; // prevent multiple triggers

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scrollClip",
            start: "top top",
            end: "+=" + imageHeight * 1.5,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true,

            onUpdate: (self) => {
                // 🔥 when scroll passes 50%
                if (self.progress > 0.5 && !isSwitched) {
                    isSwitched = true;

                    texts[0].classList.remove("slideActive");
                    texts[1].classList.add("slideActive");

                    /* animateText(texts[1]); */

                } else if (self.progress <= 0.5 && isSwitched) {
                    isSwitched = false;

                    texts[1].classList.remove("slideActive");
                    texts[0].classList.add("slideActive");

                    /* animateText(texts[0]); */
                }
            }
        }
    });

    // reveal animation
    tl.to(".reveal", {
        height: imageHeight,
        ease: "none"
    }, 0)

        .to(bg1, {
            opacity: 0,
            ease: "none"
        }, 0)

        .to(bg2, {
            opacity: 1,
            ease: "none"
        }, 0);
}

setupAnimation();

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});