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
        $(".headerWrap").toggleClass("openParentMenu");
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

    /* $(document).ready(handleHeaderLayout);
    $(window).on("resize", handleHeaderLayout);

    function handleHeaderLayout() {
        const $cta = $(".headerCta");

        if ($(window).width() <= 480) {
            // Mobile: move CTA inside headerOption (with menu)
            if (!$cta.parent().is(".headerOption")) {
                $cta.appendTo(".headerOption");
            }
        } else {
            // Desktop: place CTA after headerOption
            if (!$cta.prev().is(".headerOption")) {
                $cta.insertAfter(".headerOption");
            }
        }
    } */

$('.pauseIcn').hide();

$('.playPauseBtn a').on('click', function (e) {
    e.preventDefault();

    const $btnWrap = $(this).closest('.playPauseBtn');
    const $video = $btnWrap.next('video'); // jQuery object
    const video = $video.get(0); // DOM element

    const $playBtn = $btnWrap.find('.playIcn');
    const $pauseBtn = $btnWrap.find('.pauseIcn');

    $video.toggleClass('activeVideo'); // ✅ now valid

    if (video.paused) {
        video.play();
        $playBtn.hide();
        $pauseBtn.show();
    } else {
        video.pause();
        $pauseBtn.hide();
        $playBtn.show();
    }
});




    /* popup js start */
    $(".PopUpOpenBtn a").on("click", function (e) {
        e.preventDefault();
        $("body").addClass("scrollOff");
        $(".accoContentPopUp").removeClass("activePopUp");
        $(this).parent(".PopUpOpenBtn").siblings(".accoContentPopUp").addClass("activePopUp");
    });

    $(".PopUpCloseBtn a").on("click", function (e) {
        e.preventDefault();
        $("body").removeClass("scrollOff");
        $(this).parents(".accoContentPopUp").removeClass("activePopUp");
    });
    /* popup js end */


    /* swiper js start */
    var swiper = new Swiper('.twoWayAdvantageSwiper .swiper', {
        loop: false,
        slidesPerView: 2.8,
        paginationClickable: true,
        spaceBetween: 20,
        speed: 1500,
        centeredSlides: false,
        allowTouchMove: true,
        autoplay: false,
        breakpoints: {
            1920: {
                slidesPerView: 2.8,
                spaceBetween: 30
            },
            1600: {
                slidesPerView: 2.9,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.9,
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
                slidesPerView: 1.5,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 1.5,
                spaceBetween: 10,
                loop: true,
            }
        }
    });
    /* swiper js end */



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



    /* oneAccordian js start */
    if ($(window).width() >= 480) {
        const $wrapper = $(".whatPowerAccordian");
        const $accordions = $(".oneAccordian");
        const totalCount = $accordions.length;

        function setWidths($active) {
            const wrapperWidth = $wrapper.innerWidth();

            const openWidth = wrapperWidth * 0.45; // 40%
            const otherWidth = (wrapperWidth * 0.55) / (totalCount - 1); // split 60%

            $accordions.each(function () {
                if ($(this).is($active)) {
                    $(this)
                        .addClass("open")
                        .css("width", openWidth + "px");
                } else {
                    $(this)
                        .removeClass("open")
                        .css("width", otherWidth + "px");
                }
            });
        }

        // DEFAULT ACTIVE
        setWidths($accordions.first());

        // CLICK HANDLER
        $accordions.on("click", function (e) {
            e.preventDefault();
            setWidths($(this));
        });

        // RESPONSIVE FIX
        $(window).on("resize", function () {
            setWidths($(".oneAccordian.open"));
        });
    };
    /* oneAccordian js end */


    /* add class for filter js start */
    $(".resourcesListingUl ul li:first-child a").addClass("active");
    $(".resourcesListingUl ul a").on("click", function (e) {
        $(".resourcesListingUl ul a").removeClass("active");
        $(this).addClass("active");

    });
    /* add class for filter js end */



    /* cicle animation */
    const itemss = Array.from(document.querySelectorAll(".insightList"));
    const dotWrapper = document.querySelector('.dotWrapper');
    // You can tweak these independently
    const centerX = 0;
    const centerY = 0;
    var radiusX = 500; // Horizontal stretch (left-right elements are farther)
    var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
    if (window.innerWidth < 1441) {
        var radiusX = 450; // Horizontal stretch (left-right elements are farther)
        var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
    }
    if (window.innerWidth < 1281) {
        var radiusX = 430; // Horizontal stretch (left-right elements are farther)
        var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
    }
    let angleStep = (2 * Math.PI) / itemss.length;
    let rotationIndex = 0;
    function positionItems() {
        const dots = document.querySelectorAll('.dotWrapper span');

        itemss.forEach((item, i) => {
            const angle = angleStep * ((i + rotationIndex) % itemss.length) - Math.PI / 2;
            const x = centerX + radiusX * Math.cos(angle);
            const y = centerY + radiusY * Math.sin(angle) + 280;
            gsap.to(item, {
                x: x,
                y: y,
                ease: "power1.inOut",
                duration: 1
            });

            // Correct way to toggle "active" based on rotation
            const isActive = (i + rotationIndex) % itemss.length === 0;
            item.classList.toggle("active", isActive);

            if (dots[i]) {
                dots[i].classList.toggle("active", isActive);
            }
        });

        gsap.to(dotWrapper, {
            rotate: (rotationIndex * (360 / itemss.length)), // counter-rotate for sync
            duration: 1,
            ease: "power1.inOut",
            transformOrigin: "50% 50%",
        });
    }

    const dots = Array.from(dotWrapper.querySelectorAll('span'));
    const dotRadiusX = 200; // smaller than item radius to fit inside
    const dotRadiusY = 200;
    let dotAngleStep = (2 * Math.PI) / dots.length;
    function positionDots() {
        dots.forEach((dot, i) => {
            const angle = dotAngleStep * i - Math.PI / 2;
            const x = dotRadiusX * Math.cos(angle) + 200; // half of .middelImageWrapper width
            const y = dotRadiusY * Math.sin(angle) + 200; // half of .middelImageWrapper height
            dot.style.left = `${x}px`;
            dot.style.top = `${y}px`;
        });
    }

    if (window.innerWidth > 1025) {
        positionItems();
        positionDots();
        setInterval(() => {
            rotationIndex = (rotationIndex + 1) % itemss.length;
            positionItems();
        }, 5000);
    }



})