/* waveSlider js start */
new Swiper('.waveSlider .swiper', {
    loop: true,
    slidesPerView: 1.2,
    disableOnInteraction: true,
    draggable: false,
    speed: 20000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    spaceBetween: 0,
    breakpoints: {
        1920: {
            slidesPerView: 1.2,

        },
        1366: {
            slidesPerView: 1.2,
        },
        480: {
            slidesPerView: 1.2,
        },
        320: {
            slidesPerView: 1.2,
        }
    }
});
/* gallery Swiper js end */


// 🔹 Cards animation
gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".multiProductList");

/* INITIAL POSITION */
gsap.set(cards, {
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50
});

/* TIMELINE */
const tll = gsap.timeline({
    scrollTrigger: {
        trigger: ".multiProduct",
        start: "top top",
        end: `+=${cards.length * 600}`,
        pin: true,
        scrub: 1.5,
        anticipatePin: 1
    }
});

cards.forEach((card, i) => {

    tll.fromTo(card,
        {
            x: i % 2 === 0 ? "-150vw" : "150vw",
            rotate: i % 2 === 0 ? -12 : 12,
            scale: 0.92
        },
        {
            x: 0,

            // final slight rotation
            rotate: i % 2 === 0 ? -3 : 3,

            // slight vertical offset so bottom cards peek
            yPercent: -48,

            scale: 1,
            ease: "expo.out",
            duration: 1.2
        },
        i
    );

});


/* brandListingSwiper js start */
new Swiper('.brandListingSwiper .swiper', {
    loop: true,
    slidesPerView: 6.5,
    disableOnInteraction: true,
    draggable: false,
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
    spaceBetween: 0,
    breakpoints: {
        1920: {
            slidesPerView: 6.5,

        },
        1366: {
            slidesPerView: 6.5,
        },
        480: {
            slidesPerView: 2.2,
        },
        320: {
            slidesPerView: 2.2,
        }
    }
});
/* brandListingSwiper  js end */

/* brandListingSwiper1 js start */
new Swiper('.brandListingSwiper1 .swiper', {
    loop: true,
    slidesPerView: 6.5,
    disableOnInteraction: true,
    draggable: false,
    speed: 5000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
    },
    spaceBetween: 0,
    breakpoints: {
        1920: {
            slidesPerView: 6.5,

        },
        1366: {
            slidesPerView: 6.5,
        },
        480: {
            slidesPerView: 2.2,
        },
        320: {
            slidesPerView: 2.2,
        }
    }
});
/* brandListingSwiper  js end */



/* pyramidPopUpListing js start */
gsap.registerPlugin(ScrollTrigger);

const popups = gsap.utils.toArray(".pyramidPopUpList");

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".pyramid",
        start: "20% top",
        end: () => `+=${window.innerHeight * popups.length}`, // control scroll length
        scrub: 1,
        pin: true,
    }
});

// Animate each popup step-by-step
popups.forEach((popup, index) => {
    tl.to(popup, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
    }, index * 1.5); // spacing between each popup
});
/* pyramidPopUpListing js start */



/* productCata js start */
const items = document.querySelectorAll(".productCataList");
const wrapper = document.querySelector(".productCataListingWrapper");

const radius = 700;
const moveBottom = 0;

const leftItems = [...items].slice(0, 3);
const rightItems = [...items].slice(3, 6);

function placeItems() {

    const centerX = radius;
    const centerY = radius;

    // LEFT SIDE HALF CIRCLE
    const leftAngles = [198, 218, 238];

    leftItems.forEach((item, index) => {

        const angle = leftAngles[index] * (Math.PI / 180);

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        item.style.left = `${x - item.offsetWidth / 2}px`;
        item.style.top = `${y - item.offsetHeight / 2 + moveBottom}px`;
    });

    // RIGHT SIDE HALF CIRCLE
    const rightAngles = [-58, -38, -18];

    rightItems.forEach((item, index) => {

        const angle = rightAngles[index] * (Math.PI / 180);

        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        item.style.left = `${x - item.offsetWidth / 2}px`;
        item.style.top = `${y - item.offsetHeight / 2 + moveBottom}px`;
    });
}

placeItems();

window.addEventListener("resize", placeItems);

const $nameItems = $(".productCataNameListing");
const $productItems = $(".productListing");
const $cataItems = $(".productCataList");

let currentIndex = 0;

// DEFAULT ACTIVE
setActive(currentIndex);

function setActive(index) {

    $nameItems.removeClass("active");
    $productItems.removeClass("active");
    $cataItems.removeClass("active");

    $nameItems.eq(index).addClass("active");
    $productItems.eq(index).addClass("active");
    $cataItems.eq(index).addClass("active");
}

// NEXT BUTTON
$(".nextBtn").on("click", function () {

    currentIndex++;

    if (currentIndex >= $nameItems.length) {
        currentIndex = 0;
    }

    setActive(currentIndex);
});

// PREV BUTTON
$(".prevBtn").on("click", function () {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = $nameItems.length - 1;
    }

    setActive(currentIndex);
});

// CLICK ON productCataList
$(".productCataList").on("click", function () {

    const index = $(this).index();

    setActive(index);
});
/* productCata js end */


/* banner scroll animation start */
gsap.registerPlugin(ScrollTrigger);

const image = document.querySelector(".wire");

gsap.set(".reveal", {
    clipPath: "inset(100% 0 0 0)"
});

let pyramidTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".pyramid",
        start: "10% top",
        end: "+=1500",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
    }
});

pyramidTl.to(".reveal", {
    clipPath: "inset(0% 0 0 0)",
    ease: "none"
}, 0)

    .to(".scan-line", {
        bottom: image.offsetHeight,
        ease: "none"
    }, 0);
/* banner scroll animation end */
