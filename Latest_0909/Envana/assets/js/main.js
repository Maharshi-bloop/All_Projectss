$(document).ready(function () {

    AOS.init();
    setTimeout(function () {
        AOS.refresh();
    }, 100);


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
            1280: {
                slidesPerView: 6,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 2.7,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 2.7,
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
                slidesPerView: 2.2,
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
        /* autoplay: {
            delay: 1500,
        }, */
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


    /* === teamSwiper js Start === */
    teamSwiperSwiper = new Swiper('.teamSwiper .swiper', {
        loop: true,
        slidesPerView: 2.8,
        speed: 7000,
        autoplay: {
            delay: 0,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3.5,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 3.5,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 3.5,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 3.5,
                spaceBetween: 10,
                loop: true,
            }
        }
    });
    /* === teamSwiper js End === */


    /* === milestoneSwiper js Start === */
    milestoneSwiper = new Swiper('.milestoneSwiper .swiper', {
        loop: true,
        slidesPerView: 2.8,
        speed: 3000,
        autoplay: {
            delay: 1500,
        },
        scrollbar: {
            el: '.milestoneSwiper .swiper-scrollbar',
            draggable: true,
            dragSize: 12,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 2.8,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 2.8,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.8,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 2.4,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 2.4,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 2.4,
                spaceBetween: 10,
                loop: true,
            }
        }
    });
    /* === milestoneSwiper js End === */


    /* === consulting js Start === */
    consulting = new Swiper('.consultingListing .swiper', {
        loop: true,
        slidesPerView: 4,
        speed: 3000,
        autoplay: {
            delay: 1500,
        },
        /*  scrollbar: {
             el: '.consulting .swiper-scrollbar',
             draggable: true,
             dragSize: 12,
         }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            1600: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            1366: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 3.5,
                spaceBetween: 0,
                loop: true,
            },
            768: {
                slidesPerView: 2.4,
                spaceBetween: 0,
                loop: true,
            },
            480: {
                slidesPerView: 2.4,
                spaceBetween: 0,
                loop: true,
            },
            320: {
                slidesPerView: 2.4,
                spaceBetween: 0,
                loop: true,
            }
        }
    });
    /* === consulting js End === */



    /*=== featuresList js start ===*/
    let $lists = $(".featuresList");

    // Add "active" class to first child by default
    $lists.first().addClass("active")

    // On hover
    $lists.hover(
        function () {
            $lists.removeClass("active"); // remove from all
            $(this).addClass("active");   // add to hovered one
        }
    );
    /*=== featuresList js end ===*/



    /* === in-viewport js start === */
    var sections = document.querySelectorAll('.sustainability, .videoOnlyObject, .organizations, .ourProgress, .readyToSeeInner, .contact, .bookAdemo, .thankyou, .aboutBannerObject, .bornFrom, .missionVissionTextWrap, .helping ,.fullTextVideo, .languageBtn, .onePlatformBtn, .halfTextVideo, .consultingBannerObject, .consultingSec ,.canHelp, .filterWrapper, .concerns ,.industriesBanner, .globalSolutionBanner');

    if (sections.length > 0) {
        var options = {
            threshold: window.innerWidth < 480 ? 0.15 : 0.3
        };
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
            options
        });
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
    /* === in-viewport js end === */



    // Timeline Scroll Section
    // --------------------------------------------------------------
    var items = $(".timeLineWrapper li"),
        greyLine = $('.default-line'),
        lineToDraw = $('.draw-line');

    // Run this function only if `.draw-line` exists
    if (lineToDraw.length) {
        $(window).on('scroll', function () {
            // Get key scroll values
            var redLineHeight = lineToDraw.height(),
                greyLineHeight = greyLine.height(),
                windowDistance = $(window).scrollTop(),
                windowHeight = $(window).height() / 2,
                timelineDistance = $(".timeLineWrapper").offset().top;

            // Update the height of `.draw-line`
            if (windowDistance >= timelineDistance - windowHeight) {
                var line = windowDistance - timelineDistance + windowHeight;

                if (line <= greyLineHeight) {
                    lineToDraw.css({
                        'height': line + 20 + 'px'
                    });
                }
            }

            // Determine the visibility of each `<li>` element
            var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true); // Bottom of the `.draw-line`
            items.each(function () {
                var circleTop = $(this).offset().top;
                var circleBottom = circleTop + $(this).outerHeight();

                // Add `in-view` to the current element
                if (bottom > circleTop && bottom <= circleBottom) {
                    $(this).removeClass('gone-view').addClass('in-view');
                }
                // Add `gone-view` to elements that have been passed
                else if (bottom > circleBottom) {
                    $(this).removeClass('in-view').addClass('gone-view');
                }
                // Remove all classes for future elements
                else {
                    $(this).removeClass('in-view gone-view');
                }
            });
        });
    }



    /*  */
    $(".costomizeUl ul li").hover(
        function () {
            let $this = $(this);
            let $ul = $this.closest("ul");
            let ulHeight = $ul.outerHeight();

            // White background expands to full UL height
            if ($this.is(":first-child")) {
                $this.find(".whiteLiBg").css({
                    top: "0",
                    bottom: "auto",
                    transform: "translateY(0)",
                    transformOrigin: "top",
                    height: ulHeight + "px"
                }).attr("data-origin", "top");
            } else if ($this.is(":last-child")) {
                $this.find(".whiteLiBg").css({
                    top: "auto",
                    bottom: "0",
                    transform: "translateY(0)",
                    transformOrigin: "bottom",
                    height: ulHeight + "px"
                }).attr("data-origin", "bottom");
            } else {
                $this.find(".whiteLiBg").css({
                    top: "50%",
                    bottom: "auto",
                    transform: "translateY(-50%)",
                    transformOrigin: "center",
                    height: ulHeight + "px"
                }).attr("data-origin", "center");
            }

            // move heading to UL top
            let liTop = $this.position().top;
            let heading = $this.find(".ulHeading");
            let headingHeight = heading.outerHeight();
            heading.css("transform", "translateY(" + (-liTop) + "px)");

            // content just below heading
            $this.find(".ulContent").css({
                opacity: "1",
                transform: "translateY(" + (-liTop) + "px)",
                top: headingHeight + 10 + "px",
                visibility: "visible"
            });
        },
        function () {
            let $this = $(this);
            let origin = $this.find(".whiteLiBg").attr("data-origin");

            // reset background based on origin
            if (origin === "top") {
                $this.find(".whiteLiBg").css({
                    height: "0",
                    top: "0",
                    bottom: "auto",
                    transform: "translateY(0)"
                });
            } else if (origin === "bottom") {
                $this.find(".whiteLiBg").css({
                    height: "0",
                    top: "auto",
                    bottom: "0",
                    transform: "translateY(0)"
                });
            } else { // center
                $this.find(".whiteLiBg").css({
                    height: "0",
                    top: "50%",
                    bottom: "auto",
                    transform: "translateY(-50%)"
                });
            }

            // reset heading
            $this.find(".ulHeading").css("transform", "translateY(0)");

            // hide content
            $this.find(".ulContent").css({
                opacity: "0",
                transform: "translateY(20px)",
                top: "100%",
                visibility: "hidden"
            });
        }
    );


    $(".linearBtn").on("click", function (e) {
        e.stopPropagation();
        $(".challAdvantageLeft, .challAdvantageRight").removeClass("active");
        $(this).parents(".challAdvantageLeft, .challAdvantageRight").addClass("active");
    });


    $(document).on("click", function (e) {
        if (!$(e.target).closest(".challAdvantageLeft, .challAdvantageRight, .linearBtn").length) {
            $(".challAdvantageLeft, .challAdvantageRight").removeClass("active");
        }
    });



});