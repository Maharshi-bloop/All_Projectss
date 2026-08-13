/* gallery Swiper js start */
new Swiper('.clientSwiper .swiper', {
    loop: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 2,
    paginationClickable: true,
    speed: 1000,
    /* autoplay: {
        delay: 0,
        disableOnInteraction: false,
    }, */
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
        dragSize: 40,
    },
    spaceBetween: 20,
    breakpoints: {
        1920: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1366: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1280: {
            slidesPerView: 1.8,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
});
/* gallery Swiper js end */


const reveals = document.querySelectorAll(".bannerContent .heading5xl");
let timeOut = 200;
let animDuration = 6500; // match your CSS animation-duration

if (reveals.length > 0) {
    for (let reveal of reveals) {
        // initial reveal
        setTimeout(() => {
            reveal.classList.add("in");

            // after it completes, toggle back and forth forever
            let isIn = true;
            setInterval(() => {
                isIn = !isIn;
                reveal.classList.toggle("in", isIn);
            }, animDuration);

        }, timeOut);
    }
}