var mySwiper = new Swiper('.patientSwiper .swiper', {
    slidesPerView: 1,
    spaceBetween: 30, // Distance between slides in px.
    loop: true,
    speed: 500,
    navigation: {
        nextEl: '.nextBtn',
        prevEl: '.prevBtn',
    },
    fadeEffect: {
        crossFade: true
    },
    /* autoplay: {
        delay: 2000,
        disableOnInteraction: false
    }, */
});