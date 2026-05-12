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

let tl;

function setupAnimation() {

    const hero = document.querySelector(".hero");
    const wireImage = document.querySelector(".wire");

    if (!hero || !wireImage) return;

    const imageHeight = wireImage.offsetHeight;

    hero.style.height = imageHeight + "px";

    const bg1 = document.querySelector('[data-bg="slide1"]');
    const bg2 = document.querySelector('[data-bg="slide2"]');

    // kill previous animation before rebuilding
    if (tl) {
        tl.scrollTrigger.kill();
        tl.kill();
    }

    // initial states
    gsap.set(".reveal", { height: 0 });
    gsap.set(bg2, { opacity: 0 });

    tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".scrollClip",
            start: "top top",
            end: () => "+=" + imageHeight * 1.5,
            scrub: true,
            pin: true,
            invalidateOnRefresh: true
        }
    });

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


// init
setupAnimation();


// refresh on resize
window.addEventListener("resize", () => {
    setupAnimation();
    ScrollTrigger.refresh();
});



/* ------------------------------------------------ */
/* FIX FOR BOOTSTRAP ACCORDION HEIGHT CHANGE */
/* ------------------------------------------------ */

document.querySelectorAll('.accordion-collapse').forEach(el => {

    el.addEventListener('shown.bs.collapse', () => {

        setTimeout(() => {
            setupAnimation();
            ScrollTrigger.refresh();
        }, 400);

    });

    el.addEventListener('hidden.bs.collapse', () => {

        setTimeout(() => {
            setupAnimation();
            ScrollTrigger.refresh();
        }, 400);

    });

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
            slidesPerView: 1.5,
        },
        320: {
            slidesPerView: 1.5,
        }
    }
});
/* dAndDSwiper Swiper js end */


/* testSwiper Swiper js start */
new Swiper('.testSwiper .swiper', {
    loop: false,
    slidesPerView: 2,
    spaceBetween:20,
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
            slidesPerView: 1.5,
        },
        320: {
            slidesPerView: 1.5,
        }
    }
});
/* dAndDSwiper Swiper js end */