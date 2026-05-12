$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization


    /* === Header js Start === */
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
    /* === Header js End === */

    /* === maarqee js Start === */
    maarqeeSwiper = new Swiper('.maarqee .swiper', {
        loop: true,
        slidesPerView: 10,
        speed: 3000,
        autoplay: {
            delay: 0,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 10,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 10,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 6,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: true,
            }
        }
    });
    /* === maarqee js End === */


    /* === organizations js Start === */
    organizationsSwiper = new Swiper('.organizations .swiper', {
        loop: false,
        slidesPerView: 3.2,
        speed: 3000,
        autoplay: {
            delay: 1500,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3.2,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2.8,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 2.5,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 1.8,
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
    /* === organizations js End === */


    /* === ourProgress js Start === */
    ourProgressSwiper = new Swiper('.ourProgress .swiper', {
        loop: true,
        slidesPerView: 2.8,
        speed: 1000,
        autoplay: {
            delay: 1500,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 2.2,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 2.2,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.2,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 2.2,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 1.3,
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
    /* === ourProgress js End === */





    var sections = document.querySelectorAll('.sustainability, .videoOnlyObject, .organizations, .ourProgress, .readyToSeeInner, .contact, .bookAdemo, .thankyou');

    if (sections.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {

                    setTimeout(function () {
                        $(entry.target).addClass('in-viewport');
                    }, 150);
                } else {
                    $(entry.target).removeClass('in-viewport');
                }
            });
        }, {
            threshold: 0.3
        });
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

})