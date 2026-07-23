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
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.5,
                spaceBetween: 10
            }
        }
    });
    /* gallery Swiper js end */