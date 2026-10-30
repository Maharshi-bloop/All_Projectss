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

    /* gallery Swiper js start */
    new Swiper('.newsSwiper .swiper', {
        loop: true,
        slidesPerView: 3,
        paginationClickable: true,
        speed: 1000,
        /* autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.5,
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


    /* thumb Swiper  start*/
    /* document.addEventListener("DOMContentLoaded", function () { */

    // Timeline navigation
    const galleryThumbs = new Swiper(".gallery-thumbs", {
        slidesPerView: 6,
        spaceBetween: 10,
        watchSlidesProgress: true,
        slideToClickedSlide: true,
        loop: false,
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            576: {
                slidesPerView: 3
            },
            768: {
                slidesPerView: 4
            },
            992: {
                slidesPerView: 6
            }
        }
    });

    // Main content slider
    const galleryTop = new Swiper(".gallery-top", {
        spaceBetween: 10,
        slidesPerView: 1,
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: ".swiperController .swiperNext",
            prevEl: ".swiperController .swiperPrev"
        },
        effect: "fade",

        fadeEffect: {
            crossFade: true
        },

         watchSlidesProgress: true,

        thumbs: {
            swiper: galleryThumbs
        }
    });

    // Counter update function with padding
    function updateCounter(swiperInstance) {
    let current = (swiperInstance.realIndex + 1).toString().padStart(2, '0');
    let total = swiperInstance.slides.length;

    if (swiperInstance.params.loop) {
        total = swiperInstance.slides.length - (swiperInstance.loopedSlides * 2);
    }

    total = total.toString().padStart(2, '0');

    $('.counter').html(`
        <span class="counter__current">
            MILESTONE <span>${current}</span>
        </span>
        OF
        <span class="counter__total">${total}</span>
    `);
}


    // On change & init
    galleryTop.on("slideChange", function () {
        updateCounter(this);
    });
    galleryTop.on("init", function () {
        updateCounter(this);
    });
    // Trigger once manually
    galleryTop.emit("init");

    /* }); */
    /* thumb Swiper end */

    $(".primaryBtn").mouseenter(function (e) {
        var parentOffset = $(this).offset();

        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).children(".su_button_circle").css({ "left": relX, "top": relY });
        $(this).children(".su_button_circle").removeClass("desplode-circle");
        $(this).children(".su_button_circle").addClass("explode-circle");

    });

    $(".primaryBtn").mouseleave(function (e) {

        var parentOffset = $(this).offset();

        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $(this).children(".su_button_circle").css({ "left": relX, "top": relY });
        $(this).children(".su_button_circle").removeClass("explode-circle");
        $(this).children(".su_button_circle").addClass("desplode-circle");

    });

    $(document).ready(function () {
        const $section = $(".businessListWrap");
        const $businesses = $(".Onebusiness");
        const $businessNames = $(".businessNameList h4");
        const $list = $(".businessNameList");

        if (
            !$section.length ||
            !$list.length ||
            !$businesses.length ||
            $businesses.length !== $businessNames.length
        ) {
            return;
        }

        const duration = 8000;

        let currentIndex = 0;
        let timer = null;
        let startTime = 0;
        let remainingTime = duration;
        let isInView = false;

        function showBusiness(index) {
            currentIndex = index;

            $businesses.removeClass("active");
            $businessNames.removeClass("active");

            $businesses.eq(index).addClass("active");
            $businessNames.eq(index).addClass("active");
        }

        function startTimeline(time) {
            if (!isInView) return;

            clearTimeout(timer);

            remainingTime = time;
            startTime = Date.now();

            const progress = 1 - time / duration;

            $list[0].style.setProperty("--timeline-start", progress);
            $list[0].style.setProperty("--timeline-duration", time + "ms");

            $list.removeClass("animate-timeline");
            void $list[0].offsetWidth;
            $list.addClass("animate-timeline");

            timer = setTimeout(function () {
                if (!isInView) return;

                currentIndex = (currentIndex + 1) % $businesses.length;
                remainingTime = duration;

                showBusiness(currentIndex);
                startTimeline(duration);
            }, time);
        }

        function stopAnimation() {
            isInView = false;

            clearTimeout(timer);
            timer = null;

            remainingTime = duration;

            $list.removeClass("animate-timeline");
            $list[0].style.removeProperty("--timeline-start");
            $list[0].style.removeProperty("--timeline-duration");
        }

        // Click a business name to activate it.
        $businessNames.on("click", function () {
            currentIndex = $(this).index();
            remainingTime = duration;

            showBusiness(currentIndex);

            if (isInView) {
                startTimeline(duration);
            }
        });

        // Start and stop animation based on section visibility.
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    isInView = true;
                    startTimeline(remainingTime);
                } else {
                    stopAnimation();
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe($section[0]);

        showBusiness(0);
    });
})