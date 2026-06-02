/* gallery Swiper js start */
new Swiper('.plBodySwiper .swiper', {
    loop: false,
    slidesPerView: 1,
    paginationClickable: true,
    dragable: true,
    speed: 800,
    /* autoplay: {
        delay: 0,
        disableOnInteraction: false,
    }, */
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.plBodySwiper .nextBtn',
        prevEl: '.plBodySwiper .prevBtn',
    },
    on: {
        slideChange: function () {
            this.pagination.update();
        }
    },
    spaceBetween: 20,
    breakpoints: {
        1920: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        1366: {
            slidesPerView: 1,
            spaceBetween: 30
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


$(".progressListBody").not(":first").slideUp();
$(".progressListHeading").first().addClass("active");
$(".progressListHeading").on("click", function () {
    $(this).toggleClass("active");
    $(this).next(".progressListBody").slideToggle();
});