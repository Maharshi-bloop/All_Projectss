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

    /* gallery Swiper js start */
    new Swiper('.depulseGallerySwiper .swiper', {
        loop: true,
        slidesPerView: 2.5,
        paginationClickable: true,
        speed: 2000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
            dragSize: 150
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 2.5,
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


    // First accordion body is open by default
    $(".accordianBody").hide();
    $('.accordianItem:first-child')
        .addClass('active')
        .find('.accordianBody')
        .slideDown(0);

    $('.accordianHeading').on('click', function () {
        var $item = $(this).parent('.accordianItem');
        var $body = $item.find('.accordianBody');
        // Toggle current item
        $(".accordianBody").slideUp(400);
        $(this).parent('.accordianItem').siblings().removeClass('active');
        $item.toggleClass('active');
        $body.stop().slideToggle(400);

    });


    /* tabbing js start */
    $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".tabing-main .tab-titles li:first").addClass("active-li")
    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })
    /* tabbing js end */


    /* planDayWrap tabbing js start */
    $(".planDayWrap .tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".planDayWrap .tabing-main .tab-titles li:first").addClass("active-li")
    $(".planDayWrap .tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".planDayWrap .tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })
    /* planDayWrap tabbing js end */



    /* floating text animation start*/
    const $floatingTexts = $('.floatingText');
    const $connector = $('.connectorLine');

    let currentIndex = 0;

    function animateConnector() {

        const $center = $('.centerText');
        const $active = $floatingTexts.eq(currentIndex);

        const centerRect = $center[0].getBoundingClientRect();
        const activeRect = $active[0].getBoundingClientRect();
        const parentRect = $('.ideaRight')[0].getBoundingClientRect();

        const x1 = centerRect.left + centerRect.width / 2 - parentRect.left;
        const y1 = centerRect.top + centerRect.height / 2 - parentRect.top;

        const x2 = activeRect.left + activeRect.width / 2 - parentRect.left;
        const y2 = activeRect.top + activeRect.height / 2 - parentRect.top;

        // Reduce connector length by 60px
        const angle = Math.atan2(y2 - y1, x2 - x1);

        var newX2 = x2 - Math.cos(angle) * 60;
        var newY2 = y2 - Math.sin(angle) * 60;

        if ($(window).width() <= 1024) {
            var newX2 = x2 - Math.cos(angle) * 30;
            var newY2 = y2 - Math.sin(angle) * 30;
        }
        /* else if ($(window).width() <= 480) {
            var newX2 = x2 - Math.cos(angle) * 1000;
            var newY2 = y2 - Math.sin(angle) * 1000;
        } */

        // Draw line directly from center to floating text
        $connector.attr({
            x1: x1,
            y1: y1,
            x2: newX2,
            y2: newY2
        });

        // Show floating text
        $active.addClass('active');
    }

    function changeFloatingText() {

        // Hide current
        $floatingTexts.eq(currentIndex).removeClass('active');

        // Next
        currentIndex++;

        if (currentIndex >= $floatingTexts.length) {
            currentIndex = 0;
        }

        // Show next
        $floatingTexts.eq(currentIndex).addClass('active');

        // Animate connector
        animateConnector();
    }

    // First item
    $floatingTexts.eq(0).addClass('active');

    // Initial connector
    setTimeout(function () {
        animateConnector();
    }, 100);

    // Change every 3 seconds
    setInterval(changeFloatingText, 2000);

    /* floating text animation end*/


    /*  */

    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".whyDepulse",
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });


    // =====================================
    // EVERYTHING STARTS AT THE SAME TIME
    // =====================================

    tl.to(".oldLogoWrap", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, 0);

    tl.to(".newLogoWrap", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
    }, 0);


    // 2.0 comes from bottom
    tl.to(".versionNew", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.out"
    }, 0);


    // OLD TEXT GOES DOWN
    tl.to(".pulseTextOld", {
        y: "-100%",
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    }, 0);


    // NEW TEXT COMES FROM BOTTOM
    tl.to(".pulseTextNew", {
        y: "0%",
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
    }, 0);

    tl.to(".timelineLineProgress", {
        height: "100%",
        duration: 1,
        ease: "none"
    }, 0);

    tl.to(".timelineCircle", {
        backgroundColor: "#bd6b39",
        borderColor: "#bd6b39",
        duration: 0.2,
        ease: "none"
    }, 1);
    /*  */



    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener("load", function () {

        const section = document.querySelector(".mindfulism");
        const wrapper = document.querySelector(".mindfulismInner");
        const images = gsap.utils.toArray(".mindfulismImageList");
        const content = document.querySelector(".mindfulismContent");

        if (!section || !wrapper || !images.length) return;


        // ==========================================
        // INITIAL POSITION
        // ==========================================

        gsap.set(images, {
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0
        });

        gsap.set(images[0], {
            rotation: -2
        });

        gsap.set(images[1], {
            rotation: 2
        });

        gsap.set(images[2], {
            rotation: -1
        });

        gsap.set(images[3], {
            rotation: 1
        });


        // Center content
        gsap.set(content, {
            autoAlpha: 0,
            y: 30
        });


        // ==========================================
        // CALCULATE FINAL POSITIONS
        // ==========================================

        function getTargetPosition(element, position) {

            const wrapperRect = wrapper.getBoundingClientRect();
            const imageRect = element.getBoundingClientRect();

            let targetX = 0;
            let targetY = 0;

            // ------------------------------
            // TOP LEFT
            // ------------------------------

            if (position === "top-left") {

                const targetLeft = wrapperRect.width * 0.05;
                const targetTop = wrapperRect.height * 0.13;

                targetX =
                    targetLeft -
                    (wrapperRect.width / 2 - imageRect.width / 2);

                targetY =
                    targetTop -
                    (wrapperRect.height / 2 - imageRect.height / 2);
            }


            // ------------------------------
            // BOTTOM LEFT
            // ------------------------------

            if (position === "bottom-left") {

                const targetLeft = wrapperRect.width * 0.05;
                const bottomSpace = wrapperRect.height * 0.08;

                const targetTop =
                    wrapperRect.height -
                    bottomSpace -
                    imageRect.height;

                targetX =
                    targetLeft -
                    (wrapperRect.width / 2 - imageRect.width / 2);

                targetY =
                    targetTop -
                    (wrapperRect.height / 2 - imageRect.height / 2);
            }


            // ------------------------------
            // TOP RIGHT
            // ------------------------------

            if (position === "top-right") {

                const rightSpace = wrapperRect.width * 0.05;
                const targetLeft =
                    wrapperRect.width -
                    rightSpace -
                    imageRect.width;

                const targetTop = wrapperRect.height * 0.09;

                targetX =
                    targetLeft -
                    (wrapperRect.width / 2 - imageRect.width / 2);

                targetY =
                    targetTop -
                    (wrapperRect.height / 2 - imageRect.height / 2);
            }


            // ------------------------------
            // BOTTOM RIGHT
            // ------------------------------

            if (position === "bottom-right") {

                const rightSpace = wrapperRect.width * 0.05;

                const targetLeft =
                    wrapperRect.width -
                    rightSpace -
                    imageRect.width;

                const bottomSpace = wrapperRect.height * 0.08;

                const targetTop =
                    wrapperRect.height -
                    bottomSpace -
                    imageRect.height;

                targetX =
                    targetLeft -
                    (wrapperRect.width / 2 - imageRect.width / 2);

                targetY =
                    targetTop -
                    (wrapperRect.height / 2 - imageRect.height / 2);
            }


            return {
                x: targetX,
                y: targetY
            };
        }


        // ==========================================
        // GET ALL TARGET POSITIONS
        // ==========================================

        const positions = [
            getTargetPosition(images[0], "top-left"),
            getTargetPosition(images[1], "bottom-left"),
            getTargetPosition(images[2], "top-right"),
            getTargetPosition(images[3], "bottom-right")
        ];


        // ==========================================
        // SCROLL TIMELINE
        // ==========================================

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,

                start: "top top",

                end: "+=1800",

                scrub: 1.2,

                pin: true,

                anticipatePin: 1,

                invalidateOnRefresh: true
            }
        });


        // ==========================================
        // IMAGE 1
        // ==========================================

        tl.to(images[0], {
            x: positions[0].x,
            y: positions[0].y,
            rotation: 0,
            ease: "none",
            duration: 1
        }, 0);


        // ==========================================
        // IMAGE 2
        // ==========================================

        tl.to(images[1], {
            x: positions[1].x,
            y: positions[1].y,
            rotation: 0,
            ease: "none",
            duration: 1
        }, 0);


        // ==========================================
        // IMAGE 3
        // ==========================================

        tl.to(images[2], {
            x: positions[2].x,
            y: positions[2].y,
            rotation: 0,
            ease: "none",
            duration: 1
        }, 0);


        // ==========================================
        // IMAGE 4
        // ==========================================

        tl.to(images[3], {
            x: positions[3].x,
            y: positions[3].y,
            rotation: 0,
            ease: "none",
            duration: 1
        }, 0);


        // ==========================================
        // CENTER CONTENT
        // ==========================================

        tl.to(content, {
            autoAlpha: 1,
            y: 0,
            duration: 0.35,
            ease: "none"
        }, 0.72);


        ScrollTrigger.refresh();

    });
})