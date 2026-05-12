var galleryThumbs = new Swiper(".testiImageSwiper .swiper", {
    centeredSlides: true,
    centeredSlidesBounds: true,
    slidesPerView: 1,
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

});

var galleryMain = new Swiper(".testiContentSwiper .swiper", {
    watchOverflow: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    preventInteractionOnTransition: true,
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    navigation: {
        nextEl: '.nextBtn',
        prevEl: '.prevBtn',
    },
    thumbs: {
        swiper: galleryThumbs
    }
});

galleryMain.on('slideChangeTransitionStart', function () {
    galleryThumbs.slideTo(galleryMain.activeIndex);
});

galleryThumbs.on('transitionStart', function () {
    galleryMain.slideTo(galleryThumbs.activeIndex);
});