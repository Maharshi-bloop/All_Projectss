/* banner scroll animation start */
/* gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero1");
const image = document.querySelector(".slide1");

function setupAnimation() {

    const imageHeight = image.offsetHeight;

    // ensure reveal starts hidden
    gsap.set(".reveal", { height: 0 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero1",
            start: "top top",
            end: "+=" + imageHeight, // enough scroll distance
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true
        }
    });

    tl.to(".reveal", {
        height: imageHeight,
        ease: "none"
    });

}

const sliceHeight = 60;

const bg1 = document.querySelector(".stageImage .bgImage");
const bg2 = document.querySelector(".revealOuter .bgImage");

const img1 = bg1.querySelector("img");
const img2 = bg2.querySelector("img");

const totalHeight = img1.offsetHeight;
const slices = Math.ceil(totalHeight / sliceHeight);

for (let i = 0; i < slices; i++) {

    let slice1 = document.createElement("div");
    slice1.classList.add("bgSlice");

    let slice2 = document.createElement("div");
    slice2.classList.add("bgSlice");

    slice1.style.top = i * sliceHeight + "px";
    slice2.style.top = i * sliceHeight + "px";

    let clone1 = img1.cloneNode();
    let clone2 = img2.cloneNode();

    clone1.style.top = -(i * sliceHeight) + "px";
    clone2.style.top = -(i * sliceHeight) + "px";

    slice1.appendChild(clone1);
    slice2.appendChild(clone2);

    bg1.appendChild(slice1);
    bg2.appendChild(slice2);
}

gsap.to(".stageImage .bgSlice", {
    y: -60,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero1",
        start: "top top",
        end: "+=800",
        scrub: true
    }
});

gsap.from(".revealOuter .bgSlice", {
    y: 60,
    stagger: 0.05,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero1",
        start: "top top",
        end: "+=800",
        scrub: true
    }
});

setupAnimation();

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
}); */
/* banner scroll animation end */



gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const wireImage = document.querySelector(".wire");

/* -----------------------------
   SPLIT TEXT INTO LINES
----------------------------- */

/* function splitLines(selector) {
    document.querySelectorAll(selector).forEach((el) => {
        let text = el.innerHTML;
        let lines = text.split("<br>").join("\n").split("\n");

        el.innerHTML = "";

        lines.forEach(line => {
            const lineDiv = document.createElement("div");
            lineDiv.classList.add("line");

            const span = document.createElement("span");
            span.innerHTML = line.trim();

            lineDiv.appendChild(span);
            el.appendChild(lineDiv);
        });
    });
}

splitLines(".textOnly span"); */


/* function animateText(container) {
    const heading = container.querySelector(".animateText");
    const textSpan = container.querySelectorAll(".textOnly span");
    const listItems = container.querySelectorAll("li");

    if (heading) {
        const lines = heading.querySelectorAll(".line span");
        gsap.fromTo(lines,
            { yPercent: 120 },
            {
                yPercent: 0,
                stagger: 0.05,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }

    if (textSpan.length) {
        gsap.fromTo(textSpan,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }

    if (listItems.length) {
        gsap.fromTo(listItems,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 1.2,
                ease: "power2.out"
            }
        );
    }
} */

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


/* dAndDSwiper Swiper js start */
new Swiper('.dAndDSwiper .swiper', {
    loop: false,
    slidesPerView: 3.2,
    paginationClickable: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 100,
    },
    speed: 1500,
    /*  autoplay: {
         delay: 2000,
         disableOnInteraction: false,
     }, */
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
        },
        320: {
            slidesPerView: 1.2,
        }
    }
});
/* dAndDSwiper Swiper js end */


/* testSwiper Swiper js start */
new Swiper('.testSwiper .swiper', {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 20,
    paginationClickable: true,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 100,
    },
    speed: 1500,
    /*  autoplay: {
         delay: 2000,
         disableOnInteraction: false,
     }, */

    breakpoints: {
        1920: {
            slidesPerView: 2,
        },
        1366: {
            slidesPerView: 2,
        },
        480: {
            slidesPerView: 1.1,
        },
        320: {
            slidesPerView: 1.1,
        }
    }
});
/* dAndDSwiper Swiper js end */