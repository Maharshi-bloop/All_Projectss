$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization


    function stickyHeader() {
        var headerHeight = $('header').innerHeight();
        if ($(window).scrollTop() > headerHeight) {
            $('header').addClass('stickyHeader')
        }
        else {
            $('header').removeClass('stickyHeader')
        }
    }
    stickyHeader();
    jQuery(window).on('scroll', function (event) {
        stickyHeader();
    });

    $("nav > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });

    /*  $(".closeBtn").on("click", function () {
         $(".headerOption").removeClass("openMenu");
         $("body").removeClass("scrollOff");
     }); */
    $("nav > ul > li").on("click", function () {
        $("nav > ul > li").removeClass("active");
        $(this).addClass("active");
    });
    $("nav > ul > li").each(function () {
        if ($(this).find("ul li.active").length > 0) {
            $(this).addClass("active");
        }
    });
    $(".toggleBtn").on("click", function () {
        $(this).toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
        $("body").toggleClass("scrollOff");
    });
    if ($(window).width() <= 1366) {
        $("nav > ul > li")
            .off("click")
            .on("click", function (e) {
                e.stopPropagation();
                $(this).siblings().find("ul").slideUp();
                if ($(this).children("ul").length > 0) {
                    $(this).children("ul").stop().slideToggle();
                }
            });
    }


    // Back to Top function
    if ($(".backTop").length) {
        $(window).scroll(function () {

            // if ($(window).scrollTop() > 120) {
            //     $('#backtotop').fadeIn('250').css('display', 'flex');
            // } else {
            //     $('#backtotop').fadeOut('250');
            // }
            if ($(window).scrollTop() > 120) {
                $('.backTop').addClass("activeBackToTop")
            } else {
                $('.backTop').removeClass("activeBackToTop")
            }

        });
        $('.backTop').click(function () {
            scrlTop = 0;
            $('html, body').animate({
                scrollTop: scrlTop
            }, '500');
            return false;
        });
    };

    $(window).on('scroll', function () {
        stickyHeader();
    });

    /* photoSlider Swiper js start */
    const sliderEl = document.querySelector('.photoSlider .swiper');

    const photoSlider = new Swiper(sliderEl, {
        loop: true,
        slidesPerView: 4,
        spaceBetween: 20,
        speed: 7000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        breakpoints: {
            1920: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3.5,
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
    const wrapper = sliderEl.querySelector('.swiper-wrapper');
    let isPaused = false;
    let currentPosition = 0;
    sliderEl.addEventListener('mouseenter', function () {
        if (isPaused) return;
        isPaused = true;
        currentPosition = photoSlider.getTranslate();
        photoSlider.setTransition(0);
        photoSlider.setTranslate(currentPosition);
        photoSlider.autoplay.stop();
    });
    sliderEl.addEventListener('mouseleave', function () {
        if (!isPaused) return;
        isPaused = false;
        currentPosition = photoSlider.getTranslate();
        const nextPosition = currentPosition - photoSlider.slidesGrid[1];
        photoSlider.setTransition(photoSlider.params.speed);
        photoSlider.setTranslate(nextPosition);
        photoSlider.autoplay.start();
    });
    /* photoSlider Swiper js end */

})