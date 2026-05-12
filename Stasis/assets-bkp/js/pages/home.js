/* banner scroll animation start */
gsap.registerPlugin(ScrollTrigger);

const hero = document.querySelector(".hero");
const image = document.querySelector(".wire");

function setupAnimation() {

    const imageHeight = image.offsetHeight;

    // Hero height = image height
    hero.style.height = imageHeight + "px";

    // ✅ Start from 0
    gsap.set(".reveal", { height: 0 });
    gsap.set(".scan-line", { top: 0 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top 30%",

            // ✅ Animation finishes earlier (70% scroll)
            end: "+=" + (imageHeight * 0.8),

            scrub: true,
            invalidateOnRefresh: true
        }
    });

    tl.to(".reveal", {
        height: imageHeight,
        ease: "none"
    }, 0)

        .to(".scan-line", {
            top: imageHeight,
            ease: "none"
        }, 0);
}

setupAnimation();

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});
/* banner scroll animation end */


/*  logoSwiper swiper */
new Swiper('.logoSwiper .swiper', {
    loop: false,

    slidesPerView: 5,
    paginationClickable: true,
    speed: 1500,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    spaceBetween: 20,
    breakpoints: {
        1920: {
            slidesPerView: 5,
        },
        1366: {
            slidesPerView: 5,
        },
        480: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        320: {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
        }
    }
});

if ($(window).width() >= 480) {
    const $wrapper = $(".industriesServedListing");
    const $accordions = $(".industriesServedList");
    const totalCount = $accordions.length;

    function setWidths($active) {
        const wrapperWidth = $wrapper.innerWidth();

        const openWidth = wrapperWidth * 0.35; // 40%
        const otherWidth = (wrapperWidth * (1 - 0.35)) / (totalCount - 1); // split 60%

        $accordions.each(function () {
            if ($(this).is($active)) {
                $(this)
                    .addClass("open")
                    .css("width", openWidth + "px");
            } else {
                $(this)
                    .removeClass("open")
                    .css("width", otherWidth + "px");
            }
        });
    }

    // DEFAULT ACTIVE
    setWidths($accordions.first());

    // CLICK HANDLER
    $accordions.on("click", function (e) {
        e.preventDefault();
        setWidths($(this));
    });

    // RESPONSIVE FIX
    $(window).on("resize", function () {
        setWidths($(".oneAccordian.open"));
    });
};