    $(document).ready(function () {
    
    var swiper = new Swiper('.tAndtSwiper .swiper', {
        loop: false, // or true – both are supported
        navigation: {
            nextEl: '.tAndtSwiperConroller .nextBtn',
            prevEl: '.tAndtSwiperConroller .preBtn',
        },
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 20,
    });

    // Counter update function with padding
    function updateCounter(swiperInstance) {
        let current = (swiperInstance.realIndex + 1).toString().padStart(2, '0');
        let total = swiperInstance.slides.length;

        if (swiperInstance.params.loop) {
            total = swiperInstance.slides.length - (swiperInstance.loopedSlides * 2);
        }
        total = total.toString().padStart(2, '0');

        document.querySelector('.counter').innerHTML = `
        <span class="counter__current">STEP ${current}</span> 
        / 
        <span class="counter__total">${total}</span>
    `;
    }

    // On change & init
    swiper.on("slideChange", function () {
        updateCounter(this);
    });
    swiper.on("init", function () {
        updateCounter(this);
    });

    // Trigger once manually
    swiper.emit("init");


        var deliverSwiper = new Swiper('.deliverSwiper .swiper', {
        loop: false, // or true – both are supported
        /* navigation: {
            nextEl: '.tAndtSwiperConroller .nextBtn',
            prevEl: '.tAndtSwiperConroller .preBtn',
        }, */
        slidesPerView: 5.5,
        paginationClickable: true,
        spaceBetween: 10,
        breakpoints: {
            1920: {
                slidesPerView: 5.5,
                spaceBetween: 20
            },
            1600: {
                slidesPerView: 4.5,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 2.8,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 2.1,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.7,
                spaceBetween: 10
            }
        }
    });

});