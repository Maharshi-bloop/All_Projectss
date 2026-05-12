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


    /* swiper js start */
    var swiper = new Swiper('.testiSwiper .swiper', {
        loop: false,
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 20,
        speed: 1500,
        centeredSlides: false,
        allowTouchMove: true,
        autoplay: false,
        navigation: {
            nextEl: '.testiSwiper .nextBtn',
            prevEl: '.testiSwiper .prevBtn',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            1920: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2.5,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 3.2,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                loop: true,
            }
        }
    });
    /* swiper js end */

    /* swiper js start */
    var swiper = new Swiper('.bottomSwiperInner .swiper', {
        loop: false,
        slidesPerView: 2,
        paginationClickable: true,
        speed: 1500,
        spaceBetween: 20,
        centeredSlides: false,
        allowTouchMove: true,
        autoplay: false,
        navigation: {
            nextEl: '.bottomSwiperInner .nextBtn',
            prevEl: '.bottomSwiperInner .prevBtn',
        },
        breakpoints: {
            1920: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1600: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1366: {
                slidesPerView: 2.5,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 3.2,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 1.1,
                spaceBetween: 10,
                loop: false,
            },
            320: {
                slidesPerView: 1.1,
                spaceBetween: 10,
                loop: false,
            }
        }
    });
    /* swiper js end */


    /* swiper js start */
    var swiper = new Swiper('.popUpTestimonialListing .swiper', {
        loop: false,
        slidesPerView: 3,
        paginationClickable: true,
        speed: 1500,
        spaceBetween: 20,
        centeredSlides: false,
        allowTouchMove: true,
        autoplay: false,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1600: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 2.1,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 1.8,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 1.1,
                spaceBetween: 10,
                loop: false,
            },
            320: {
                slidesPerView: 1.1,
                spaceBetween: 10,
                loop: false,
            }
        }
    });
    /* swiper js end */

    /* popup js start */
    $('.popUpOpen').on('click', function () {
        $(this).closest('.productList').find('.productDetailOuter').addClass('activepopUp');
        $("body").addClass("scrollOff");
    });

    $('.popUpCloseBtn').on('click', function () {
        $(this).closest('.productList').find('.productDetailOuter').removeClass('activepopUp');
        $("body").removeClass("scrollOff");
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.productDetailOuter, .popUpOpen').length) {
            $('.productDetailOuter').removeClass('activepopUp');
        }
    });


    function adjustOtherDetailHeight() {
        $(window).on('resize', function () {
            $('.productList').each(function () {
                const headHeight = $(this).find('.productPopUpHead').outerHeight();
                $(this).find('.otherDetail').css({
                    height: `calc(100% - ${headHeight}px)`
                });
            });
        }).trigger('resize');
    }
    adjustOtherDetailHeight();
    /* popup js end */


    /* tabbing js start */
    /* if ($(window).width() > 991) { */
        $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
        $(".tabing-main .tab-titles li:first").addClass("active-li")
        $(".tabing-main .tab-titles li a").on("click", function (event) {
            event.preventDefault()
            $(".tabing-main .tab-titles li").removeClass("active-li")
            $(this).parent().addClass("active-li");
            $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
            $($(this).attr('href')).addClass("active");
        })
    /* } */

    /* if ($(window).width() < 992) {
        $(".tab-content-main .mobile-tab-title").on("click", function (event) {
            event.preventDefault();
            $(".tabContent").not($(this).siblings(".tabContent")).stop().slideUp();
            if ($(this).parent(".tab-content-main").hasClass("activeTab")) {
                $(".tab-content-main").removeClass("activeTab")
                $(this).siblings(".tabContent").stop().slideUp();
            }
            else {
                $(".tab-content-main").removeClass("activeTab")
                $(this).parent(".tab-content-main").addClass("activeTab")
                $(this).siblings(".tabContent").stop().slideDown();
            }
        })
    } */
    $(".tab-content-main:first-child .mobile-tab-title").trigger("click");

    /* tabbing js end */


})