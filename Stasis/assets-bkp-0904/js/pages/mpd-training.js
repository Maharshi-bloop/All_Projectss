/* gallery Swiper js start */
new Swiper('.challengeSwiper .swiper', {
    loop: false,
    slidesPerView: 4,
    paginationClickable: true,
    speed: 1500,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        1920: {
            slidesPerView: 4,
        },
        1366: {
            slidesPerView: 3.5,
        },
        480: {
            slidesPerView: 1.5,
        },
        320: {
            slidesPerView: 1.5,
        }
    }
});
/* gallery Swiper js end */


/* whyMpdListing Swiper js start */
new Swiper('.whyMpdListing .swiper', {
    loop: false,
    slidesPerView: 4,
    spaceBetween: 20,
    paginationClickable: true,
    speed: 1500,
    autoplay: {
        delay: 10000000,
        disableOnInteraction: false,
    },
    breakpoints: {
        1920: {
            slidesPerView: 4,
        },
        1366: {
            slidesPerView: 3.2,
        },
        480: {
            slidesPerView: 1.5,
            spaceBetween: 10,
        },
        320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
        }
    }
});
/* whyMpdListing Swiper js end */


/* =================================== */
/*  */
/* =================================== */

gsap.registerPlugin(ScrollTrigger);


/* -----------------------------
   SPLIT TEXT INTO LINES
----------------------------- */

function splitLines(selector) {
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

splitLines(".animateText");


/* -----------------------------
   IMAGE ANIMATION
----------------------------- */

function animateImageIn(slide) {

    const img = slide.querySelector(".howWorkImageInner");
    if (!img) return;

    gsap.fromTo(img,
        {
            scale: 1,
            y: 40,
            opacity: 0,
            rotate: 0
        },
        {
            scale: 1,
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 2,
            ease: "power4.out"
        });

}

function resetImage(slide) {

    const img = slide.querySelector(".howWorkImageInner");
    if (!img) return;

    gsap.set(img, {
        scale: 1.15,
        y: 80,
        opacity: 0
    });

}


/* -----------------------------
   SLIDE ANIMATION
----------------------------- */

function animateSlide(slide) {

    animateImageIn(slide);

    const heading = slide.querySelector(".animateText");
    const textSpan = slide.querySelector(".howWorkListText span");
    const listItems = slide.querySelectorAll(".howWorkListText ul li");

    if (heading) {

        const lines = heading.querySelectorAll(".line span");

        gsap.fromTo(lines,
            { yPercent: 120 },
            {
                yPercent: 0,
                duration: 1.2,
                stagger: 0.25,
                ease: "power4.out"
            });

    }

    if (textSpan) {

        gsap.fromTo(textSpan,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.3,
                ease: "power3.out"
            });

    }

    if (listItems.length) {

        gsap.fromTo(listItems,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                delay: 0.5,
                ease: "power3.out"
            });

    }
}


/* -----------------------------
   RESET SLIDE
----------------------------- */

function resetSlide(slide) {

    resetImage(slide);

    const heading = slide.querySelector(".animateText");
    const textSpan = slide.querySelector(".howWorkListText span");
    const listItems = slide.querySelectorAll(".howWorkListText ul li");

    if (heading) {
        const lines = heading.querySelectorAll(".line span");
        gsap.set(lines, { yPercent: 120 });
    }

    if (textSpan) {
        gsap.set(textSpan, { y: 60, opacity: 0 });
    }

    if (listItems.length) {
        gsap.set(listItems, { y: 40, opacity: 0 });
    }
}


/* -----------------------------
   SLIDE DATA
----------------------------- */

const slides = gsap.utils.toArray(".howWorkList");
const totalSlides = slides.length;

slides[0].classList.add("activeSlide");
animateSlide(slides[0]);


/* -----------------------------
   SCROLL SETTINGS
----------------------------- */

const scrollPerSlide = window.innerHeight * 3.5;

const container = document.querySelector(".howWorkListing");


ScrollTrigger.create({
    trigger: ".howWorkListing",
    start: "top 10%",
    end: "+=" + (scrollPerSlide * (totalSlides - 1)),
    pin: true,
    scrub: 1,
    snap: {
        snapTo: 1 / (totalSlides - 1),
        duration: 0.5,
        delay: 0.1,
        ease: "power2.out"
    },

    onUpdate: (self) => {

        /* -------------------------
           SLIDE TOGGLE
        ------------------------- */

        const index = Math.round(self.progress * (totalSlides - 1));

        slides.forEach((slide, i) => {

            if (i === index) {

                if (!slide.classList.contains("activeSlide")) {
                    slide.classList.add("activeSlide");
                    animateSlide(slide);
                }

            } else {

                slide.classList.remove("activeSlide");
                resetSlide(slide);

            }

        });


        /* -------------------------
           GRADIENT SCROLL MOTION
        ------------------------- */

        const p = self.progress;

        /* organic random motion */

        const x =
            50 +
            Math.sin(p * 5) * 18 +
            Math.cos(p * 3.2) * 12 +
            Math.sin(p * 8.1) * 6;

        const y =
            50 +
            Math.cos(p * 4.3) * 20 +
            Math.sin(p * 2.7) * 10 +
            Math.cos(p * 7.5) * 5;

        container.style.setProperty("--gx", x + "%");
        container.style.setProperty("--gy", y + "%");

        /* color shift */

        const color = gsap.utils.interpolate("#353D3E", "#e9c41e60", p);
        container.style.setProperty("--gcolor", color);

    }

});

/* =================================== */
/*  */
/* =================================== */