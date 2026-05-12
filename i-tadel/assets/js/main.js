$(document).ready(function () {


    /* HEADER AND AOS JS START */
    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization

    function stickyHeader() {
        var headerHeight = $("header").innerHeight();
        if ($(window).scrollTop() > headerHeight) {
            $("header").addClass("stickyHeader");
        } else {
            $("header").removeClass("stickyHeader");
        }
    }
    stickyHeader();
    jQuery(window).on("scroll", function (event) {
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

    /* HEADER AND AOS JS END */

    /* BANNER ANIMATION JS START */

    gsap.registerPlugin(SplitText);
    gsap.registerPlugin(CustomEase);
    gsap.registerPlugin(CSSRulePlugin);

    let tl = gsap.timeline();

    // Step 1: scale the banner image slightly more for a punchy effect
    tl.fromTo(
        ".bannerImage",
        { scale: 1 },
        {
            opacity: 1,
            scale: 0.8,
            ease: "power4.out",
            duration: 0.8,
        }
    );

    // Get all spans inside heading10xl
    let spans = document.querySelectorAll(".heading10xl span");

    // Step 2: animate first span (Solutions-based) with slight scale
    tl.fromTo(
        spans[0],
        { y: 50, opacity: 0, scale: 1 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "-=0.7" // overlap with previous animation by 0.2s
    );

     if (window.innerWidth > 480) {
    // Step 3: push first span down slightly as second appears
    tl.to(
        spans[0],
        {
            y: -30,
            scale: 0.95,
            duration: 0.4,
            ease: "power2.out",
        },
        "+=0"
    );
}

    if (window.innerWidth < 480) {
        tl.to(
            spans[0],
            {
                y: -30,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
            },
            "+=0"
        );
    }


    // Step 4: animate second span (Adaptive) with scale
    tl.fromTo(
        spans[1],
        { y: 50, opacity: 0, scale: 1 },
        { y: -30, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        "<"
    );

    // Step 5: animate third span (Chemistry) with delay and scale
    tl.fromTo(
        spans[2],
        { y: 50, opacity: 0, scale: 0.95 },
        { y: -30, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    if (window.innerWidth > 480) {
        // Step 5.1: move Chemistry slightly to the side before bubble animates
        tl.to(spans[2], {
            x: 20,
            duration: 0.3,
            ease: "power2.out",
        });
    }

    // Step 6: animate bannerBubble after Chemistry shift
    tl.fromTo(
        ".bannerBubble",
        { scale: 0, opacity: 0, y: -15, x: 10 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
    );

    gsap.to(".bannerBubble", {
        rotation: 360, // rotate full circle
        duration: 10, // rotation speed (5s per rotation)
        ease: "linear",
        repeat: -1, // infinite loop
    });

    gsap.fromTo(
        ".bannerContent > span",
        { y: 60, opacity: 0, scale: 1 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
    );

    tl.fromTo(
        ".bannerCard",
        { opacity: 0, y: 50, x: 10, delay: 1.5 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.8)" }
    );

    let spanss = document.querySelectorAll(".bannerContent > span");

    spanss.forEach((span, i) => {
        // Animate ::before
        gsap.to(span, {
            "--before-width": "100%",
            duration: 3,
            ease: "power2.out",
            delay: i * 0.2, // optional stagger between spans
        });

        // Animate ::after
        gsap.to(span, {
            "--after-width": "100%",
            duration: 3,
            ease: "power2.out",
            delay: i * 0.2 + 0.1, // start slightly after ::before
        });
    });

    /* BANNER ANIMATION JS END */


    /* SECTION APPEAR ANIMATION JS START */
    var sections = document.querySelectorAll(
        ".weAre,.aboutBannerImageInner, .imageTextWrapInner .row, .cta"
    );

    if (sections.length > 0) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            $(entry.target).addClass("in-viewport");
                        }, 150);
                    } else {
                        $(entry.target).removeClass("in-viewport");
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
    /* SECTION APPEAR ANIMATION JS END */

    /* PRIMARY BUTTON HOVER ANIMATION JS START */
    $(function () {
        $('.primaryBtn')
            .on('mouseenter', function (e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({ top: relY, left: relX })
            })
            .on('mouseout', function (e) {
                var parentOffset = $(this).offset(),
                    relX = e.pageX - parentOffset.left,
                    relY = e.pageY - parentOffset.top;
                $(this).find('span').css({ top: relY, left: relX })
            });
    });
    /* PRIMARY BUTTON HOVER ANIMATION JS END */



    // Hover In
    $(".specialtyList").on("mouseenter", function () {
        gsap.fromTo(
            $(this).find(".specialtyListImage .primaryLink "),
            { scale: 0, opacity: 0, y: 0, x: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)", delay: 0.2 }
        );
    });

    // Hover Out (optional reset)
    $(".specialtyList").on("mouseleave", function () {
        gsap.fromTo($(this).find(".specialtyListImage .primaryLink"), {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0,
            ease: "power2.in"
        }, { scale: 0, opacity: 0, y: 0, x: 0 });
    });



    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 5,
        slidesPerView: 7,
        loop: true,
        freeMode: true,
        loopedSlides: 5, //looped slides should be the same
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
        spaceBetween: 5,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        thumbs: {
            swiper: galleryThumbs,
        },
    });





});
