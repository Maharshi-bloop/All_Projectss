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


    /* whatMakeSwiper Swiper js start */
    new Swiper('.whatMakeSwiper .swiper', {
        loop: true,
        slidesPerView: 4,
        paginationClickable: true,
        speed: 800,
        navigation: {
            nextEl: '.whatMakeSwiperControl .nextBtn',
            prevEl: '.whatMakeSwiperControl .prevBtn',
        },
       /*  autoplay: {
            delay: 0,
            disableOnInteraction: false,
        }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 4,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3,
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
    /* whatMakeSwiper Swiper js end */


    /* testimonialSwiper Swiper js start */
    new Swiper('.testimonialSwiper .swiper', {
        loop: true,
        slidesPerView: 3,
        paginationClickable: true,
        speed: 800,
        navigation: {
            nextEl: '.testimonialSwiperControl .nextBtn',
            prevEl: '.testimonialSwiperControl .prevBtn',
        },
       /*  autoplay: {
            delay: 0,
            disableOnInteraction: false,
        }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 20
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
    /* testimonialSwiper Swiper js end */
    



    /* hori scroll js start */

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(".receiveWrap");
    const line = document.querySelector(".threeTownsHoriListing");
    const receiveWrapInner = document.querySelector(".receiveWrapInner");
    const items = gsap.utils.toArray(".threeTownsHoriList");

    console.log($(receiveWrapInner).width());

    if (section && line && items.length) {

        ScrollTrigger.create({
            trigger: section,
            start: "10% 30%",
            end: "+=200%",
            scrub: true,
            pin: true,
            /* markers: true, */
            anticipatePin: 1,

            onUpdate: (self) => {

                // line width progress
                const lineWidth = self.progress * $(receiveWrapInner).width();

                // update CSS variable
                line.style.setProperty("--line-width", `${lineWidth}px`);

                // line start position
                const lineStart = line.getBoundingClientRect().left - 50;

                // current line end position
                const lineEnd = lineStart + lineWidth;

                items.forEach((item) => {

                    // diamond position
                    const diamond = item.querySelector(":scope");

                    const itemLeft = item.getBoundingClientRect().left;

                    // toggle when line touches diamond
                    if (lineEnd >= itemLeft) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }

                });

            }
        });

    }

    /* hori scroll js end */


    $(".faqList .subTextMd").first().slideDown();
    $(".faqList .subTextMd").not(":first").hide();
    $(".faqList .headingxl").on("click", function () {
        $(".faqList .subTextMd").stop().slideUp();
        $(this).next(".faqList .subTextMd").stop().slideToggle();
    });

    /* $(".faqList:first-child").addClass("active");
    $(".subTextMd").slideUp();
    $(".faqList:first-child .subTextMd").slideDown();
    $(".faqList .headingxl").on("click", function () {
        $(this).parent().toggleClass("active");
        $(this).siblings().slideToggle();
    }); */


})