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


    /* SECTION APPEAR ANIMATION JS START */
    var sections = document.querySelectorAll(
        ".banner, .aboutBanner, .solutionBanner, .founder, .howWeWorkBanner"
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



    /* banner member hover effect js start */

    if (window.innerWidth > 481) {
        $(".bannerMemberList").each(function () {
            const wrapper = $(this);
            const file = wrapper.find(".memberFile");

            let targetX = 0, targetY = 0;
            let currentX = 0, currentY = 0;
            let isMoving = false;

            function smoothFollow() {
                if (!isMoving) return;

                // Smooth lerp movement
                currentX += (targetX - currentX) * 0.15;
                currentY += (targetY - currentY) * 0.15;

                file.css({
                    left: currentX + "px",
                    top: currentY + "px"
                });

                requestAnimationFrame(smoothFollow);
            }

            wrapper.on("mouseenter", function (e) {

                // ADD CLASS TO CURRENT
                $(".bannerMemberList").removeClass("currentlyShow");
                wrapper.addClass("currentlyShow");

                const rect = wrapper[0].getBoundingClientRect();

                // Entry cursor position
                targetX = currentX = e.clientX - rect.left;
                targetY = currentY = e.clientY - rect.top;

                // Set initial position
                file.css({
                    left: currentX + "px",
                    top: currentY + "px",
                    opacity: "1",
                    transform: "translate(-50%, -50%) scale(1)"
                });

                isMoving = true;
                requestAnimationFrame(smoothFollow);
            });

            wrapper.on("mousemove", function (e) {
                const rect = wrapper[0].getBoundingClientRect();

                targetX = e.clientX - rect.left;
                targetY = e.clientY - rect.top;
            });

            wrapper.on("mouseleave", function () {
                isMoving = false;

                // REMOVE CLASS ON LEAVE
                wrapper.removeClass("currentlyShow");

                file.css({
                    opacity: "0",
                    transform: "translate(-50%, -50%) scale(0.5)"
                });
            });
        });

    }


    if (window.innerWidth < 480) {

        $(".bannerMemberList").each(function () {
            const wrapper = $(this);
            const file = wrapper.find(".memberFile");

            wrapper.on("click", function (e) {
                e.stopPropagation();

                // If already open → close it
                if (wrapper.hasClass("currentlyShow")) {
                    wrapper.removeClass("currentlyShow");
                    file.css({
                        opacity: "0",
                        transform: "translate(-50%, -50%) scale(0.5)"
                    });
                    return;
                }

                // CLOSE OTHERS
                $(".bannerMemberList").removeClass("currentlyShow");
                $(".memberFile").css({
                    opacity: "0",
                    transform: "translate(-50%, -50%) scale(0.5)"
                });

                wrapper.addClass("currentlyShow");

                // Show file centered inside wrapper
                file.css({
                    left: "50%",
                    top: "50%",
                    opacity: "1",
                    transform: "translate(-50%, -50%) scale(1)"
                });
            });
        });

        // Tap outside to close
        $(document).on("click", function () {
            $(".bannerMemberList").removeClass("currentlyShow");
            $(".memberFile").css({
                opacity: "0",
                transform: "translate(-50%, -50%) scale(0.5)"
            });
        });
    }
    /* banner member hover effect js end */



    var eleRot = (eleItr = 360 / $(".industriesListOuter").length);
    var radialRot = 0;

    $(".industriesListOuter").each(function (index, ele) {
        var listRot = index * eleRot;
        $(this).css("transform", "translateX(-50%) rotate(" + listRot + "deg)");
    });
    $(".industriesList").each(function (index, ele) {
        var listRot = index * eleRot;
        $(this).css("transform", "rotate(" + (-listRot) + "deg)");
    });

    /* $(".list").on("click", function (index) {
            var listRot = index * eleRot;
            console.log($(this).index());
            finalRot = index * listRot;
            console.log(finalRot);
            $(".listing").css("transform", "rotate( " + listRot + "deg)");
    });

    $(".swiper-next").on("click", function (event) {
            event.preventDefault();
            radialRot += eleItr;
            $(".listing").css("transform", "rotate(" + radialRot + "deg)");
    });

    $(".swiper-prev").on("click", function (event) {
            event.preventDefault();
            radialRot -= eleItr;
            $(".listing").css("transform", "rotate(" + radialRot + "deg)");
    }); */





    /* Odometer js start */

    const createOdometer = (el, value) => {
        if (!el) return;

        const odometer = new Odometer({
            el: el,
            value: 0,
        });

        let hasRun = false;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasRun) {
                        odometer.update(value);
                        hasRun = true;
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
    }

    const clientsOdometer = document.querySelector(".yearsOfLeading");
    createOdometer(clientsOdometer, 18);

    const experienceOdometer = document.querySelector(".resumesWritten");
    createOdometer(experienceOdometer, 120);

    const projectOdometer = document.querySelector(".interviews");
    createOdometer(projectOdometer, 850);

    const employeesOdometer = document.querySelector(".industriesServed");
    createOdometer(employeesOdometer, 10);
    /* Odometer js end */


    /* hovertoChangeDetail js start */
    var firstLink = $(".hovertoChangeDetail ul li a").first();
    firstLink.addClass("activeA");

    var firstTarget = firstLink.attr("href");
    $(firstTarget).addClass("activeImage");

    // On click, update active classes for the link and image
    $(".hovertoChangeDetail ul li a").on("click", function (e) {
        e.preventDefault();

        var target = $(this).attr("href");

        // Remove active class from all <a> and images
        $(".hovertoChangeDetail ul li a").removeClass("activeA");
        $(".activeImage").removeClass("activeImage");

        // Add active class to clicked <a> and corresponding image
        $(this).addClass("activeA");
        $(target).addClass("activeImage");
    });
    /* hovertoChangeDetail js end */



    /* storiesSwiper Swiper js start */
    new Swiper('.storiesSwiper .swiper', {
        loop: true,


        navigation: {
            nextEl: '.storiesSwiper .nextBtn',
            prevEl: '.storiesSwiper .prevBtn',
        },
        centeredSlides: true,
        slidesPerView: 3,
        paginationClickable: true,
        speed: 1500,
        /*  autoplay: {
             delay: 3000,
             disableOnInteraction: false,
         }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.3,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.3,
                spaceBetween: 10
            }
        }
    });
    /* storiesSwiper Swiper js end */



    /* serviceSwiper Swiper js start */
    new Swiper('.serviceSwiper .swiper', {
        loop: false,
        /*  navigation: {
             nextEl: '.storiesSwiper .nextBtn',
             prevEl: '.storiesSwiper .prevBtn',
         }, */
        /* centeredSlides: true, */
        slidesPerView: 3.2,
        paginationClickable: true,
        speed: 1500,
        /*  autoplay: {
             delay: 3000,
             disableOnInteraction: false,
         }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3.2,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3.2,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.1,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.1,
                spaceBetween: 10
            }
        }
    });
    /* serviceSwiper Swiper js end */


    /* whatHappenSwiper Swiper js start */
    new Swiper('.whatHappenSwiper .swiper', {
        loop: false,
        navigation: {
            nextEl: '.whatHappenHeading .nextBtn',
            prevEl: '.whatHappenHeading .prevBtn',
        },
        /* centeredSlides: true, */
        slidesPerView: 1.2,
        paginationClickable: true,
        speed: 1000,
        /*  autoplay: {
             delay: 3000,
             disableOnInteraction: false,
         }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 1.2,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 1.2,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.1,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.1,
                spaceBetween: 10
            }
        }
    });
    /* whatHappenSwiper Swiper js end */


    /* clientSwiper Swiper js start */
    new Swiper('.clientSwiper .swiper', {
        loop: true,
        navigation: {
            nextEl: '.clientSwiper .nextBtn',
            prevEl: '.clientSwiper .prevBtn',
        },
        centeredSlides: true,
        slidesPerView: 1.5,
        paginationClickable: true,
        loopFillGroupBlank: false,
        speed: 1000,
        /*  autoplay: {
             delay: 3000,
             disableOnInteraction: false,
         }, */
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 1.5,
                spaceBetween: 80
            },
            1366: {
                slidesPerView: 1.5,
                spaceBetween: 80
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        },
        // 🔥 KEY PART
        on: {
            slideChange: function () {
                // Pause ALL videos when slide changes
                $("video").each(function () {
                    this.pause();
                    const parent = $(this).closest(".clientSlideVideo");
                    parent.find(".pauseIcon").hide();
                    parent.find(".playIcon").show();
                });
            }
        }
    });
    /* clientSwiper Swiper js end */



    // Timeline Scroll Section (timeLineWrapper ) start
    // --------------------------------------------------------------
    if ($("body").hasClass("our-solutions")) {
        var items = $(".mentorship .timeLineWrapper li"),
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
                    timelineDistance = $(".mentorship .timeLineWrapper").offset().top;

                // Update the height of `.draw-line`
                if (windowDistance >= timelineDistance - windowHeight) {
                    var line = windowDistance - timelineDistance + windowHeight;

                    if (line <= greyLineHeight) {
                        lineToDraw.css({
                            'height': line + 'px'
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
    }

    // Timeline Scroll Section (timeLineWrapper ) end



    // Timeline Scroll Section (timeLineWrapper ) start
    // --------------------------------------------------------------
    if ($("body").hasClass("how-we-work")) {
        var items = $(".processStep .timeLineWrapperOne li"),
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
                    timelineDistance = $(".processStep .timeLineWrapperOne").offset().top;

                // Update the height of `.draw-line`
                if (windowDistance >= timelineDistance - windowHeight) {
                    var line = windowDistance - timelineDistance + windowHeight;

                    if (line <= greyLineHeight) {
                        lineToDraw.css({
                            'height': line + 'px'
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
    }

    // Timeline Scroll Section (timeLineWrapper ) end


    function impactTimelineInit() {

        var isDesktop = window.innerWidth > 767;

        if (!$("body").hasClass("testimonials")) return;

        var items = $(".impactTestiHeadingWrap li"),
            lineToDraw = $(".draw-line"),
            greyLine = $(".default-line"),
            headingWrap = $(".impactTestiHeadingWrap"),
            headingList = $(".impactTestiHeadingWrap ul"),
            cardContainer = $(".impactTestiCardListing");

        if (!items.length || !lineToDraw.length || !headingList.length) return;

        /* -----------------------------
           RESET
        ------------------------------ */
        $(window).off("scroll.impactTimeline");
        lineToDraw.height(0);
        items.removeClass("in-view gone-view");
        $(".impactTestiCardWrap").removeClass("in-view gone-view");

        /* -----------------------------
           SET FULL LINE HEIGHT (UL-based)
        ------------------------------ */
        var fullLineHeight = headingList.outerHeight();
        greyLine.height(fullLineHeight);

        /* -----------------------------
           DEFAULT FIRST ACTIVE
        ------------------------------ */
        var $firstLi = items.first();
        var firstId = $firstLi.data("id");

        $firstLi.addClass("in-view");
        $("#" + firstId).addClass("in-view");

        /* -----------------------------
           SCROLL HANDLER
        ------------------------------ */
        $(window).on("scroll.impactTimeline", function () {

            var scrollMiddle = $(window).scrollTop() + ($(window).height() / 2);
            var progress = 0;

            /* ===== DESKTOP LOGIC ===== */
            if (isDesktop && cardContainer.length) {

                var containerTop = cardContainer.offset().top;
                var containerBottom = containerTop + cardContainer.outerHeight();

                progress = (scrollMiddle - containerTop) / (containerBottom - containerTop);

            }
            /* ===== MOBILE LOGIC ===== */
            else {

                var ulTop = headingList.offset().top;
                var ulBottom = ulTop + headingList.outerHeight();

                progress = (scrollMiddle - ulTop) / (ulBottom - ulTop);
            }

            progress = Math.max(0, Math.min(progress, 1));

            var newHeight = fullLineHeight * progress;
            lineToDraw.height(newHeight);

            if (newHeight <= 0) return;

            var lineBottom = lineToDraw.offset().top + newHeight;

            /* -----------------------------
               ACTIVATE LI + CARD
            ------------------------------ */
            items.each(function () {

                var $li = $(this);
                var id = $li.data("id");
                var $targetCard = $("#" + id);

                var liTop = $li.offset().top;
                var liBottom = liTop + $li.outerHeight();

                if (lineBottom > liTop && lineBottom <= liBottom) {
                    $li.addClass("in-view").removeClass("gone-view");
                    $targetCard.addClass("in-view").removeClass("gone-view");
                }
                else if (lineBottom > liBottom) {
                    $li.addClass("gone-view").removeClass("in-view");
                    $targetCard.addClass("gone-view").removeClass("in-view");
                }
                else {
                    $li.removeClass("in-view gone-view");
                    $targetCard.removeClass("in-view gone-view");
                }
            });

        });

        $(window).trigger("scroll.impactTimeline");
    }

    /* INIT */
    impactTimelineInit();

    /* RE-INIT ON RESIZE */
    $(window).on("resize", function () {
        impactTimelineInit();
    });


    /*  clientSwiper video play pause js start */

    $(".videoControl").on("click", function () {
        var wrap = $(this).closest(".clientSlideVideo");
        var video = wrap.find("video").get(0);
        var playIcon = wrap.find(".playIcon");
        var pauseIcon = wrap.find(".pauseIcon");

        // Pause all other videos
        $("video").each(function () {
            if (this !== video) {
                this.pause();
                $(this).closest(".clientSlideVideo").find(".pauseIcon").hide();
                $(this).closest(".clientSlideVideo").find(".playIcon").show();
            }
        });

        // Toggle play / pause
        if (video.paused) {
            video.play();
            playIcon.hide();
            pauseIcon.show();
        } else {
            video.pause();
            pauseIcon.hide();
            playIcon.show();
        }
    });

    // When video stops, show play icon again
    $("video").on("pause ended", function () {
        var parent = $(this).closest(".clientSlideVideo");
        parent.find(".pauseIcon").hide();
        parent.find(".playIcon").show();
    });

    /*  clientSwiper video play pause js end */



    /* cardds hover effect  js start*/

    $("#cards").on("mousemove", function (e) {
        $(".card").each(function () {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            $(this).css("--mouse-x", x + "px");
            $(this).css("--mouse-y", y + "px");
        });
    });

    /* cardds hover effect  js end*/







})
