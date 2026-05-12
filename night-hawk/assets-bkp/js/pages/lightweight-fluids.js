
let scrollswiper;
// Swiper: Slider
scrollswiper = new Swiper('.scrollswiper .swiper', {
    loop: false,
    spaceBetween: 20,
    speed: 1000,
    /* autoplay: {
        delay: 1500,
    }, */
    /* navigation: {
        nextEl: '.videoSwiperController .nextBtn',
        prevEl: '.videoSwiperController .prevBtn',
    }, */
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true,
    },
    breakpoints: {
        1920: {
            slidesPerView: 6,
            spaceBetween: 30
        },
        1600: {
            slidesPerView: 6,
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
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 10,
            loop: false,
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: false,
        }
    }
});


// Timeline Scroll Section
// --------------------------------------------------------------
var items = $(".timeLineWrapper li"),
    greyLine = $('.timeLineWrapper .default-line'),
    lineToDraw = $('.timeLineWrapper .draw-line');

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

// Timeline Scroll Section end

$('.deskRow .scrollImage')
    .removeClass('active')
    .eq(0)
    .addClass('active');

function setActiveImageOnScroll() {
    const triggerPoint = window.innerHeight * 0.3; // 50% of viewport

    $('.deskRow .scrollConatent').each(function (index) {
        const rect = this.getBoundingClientRect();

        // element crosses 50% viewport line
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            $('.deskRow .scrollImage').removeClass('active');
            $('.deskRow .scrollImage').eq(index).addClass('active');
            return false; // stop loop after first match
        }
    });
}

// bind scroll
$(window).on('scroll', setActiveImageOnScroll);




/*  */
function initScrollLine() {

    const $drawLine = $(".draw-line1");
    const $defaultLine = $(".default-line1");
    const $contentWrap = $(".scrollConatentWrp");

    if (!$drawLine.length || !$contentWrap.length) return;

    // Reset
    $drawLine.height(0);

    // Fixed visual height
    const visualHeight = window.innerHeight * 0.7;
    $defaultLine.height(visualHeight);

    $(window).off("scroll.scrollLine").on("scroll.scrollLine", function () {

        const scrollTop = $(window).scrollTop();
        const windowMid = scrollTop + ($(window).height() / 2);

        const wrapTop = $contentWrap.offset().top;
        const wrapHeight = $contentWrap.outerHeight();
        const wrapBottom = wrapTop + wrapHeight;

        let progress = (windowMid - wrapTop) / (wrapBottom - wrapTop);
        progress = Math.max(0, Math.min(progress, 1));

        const drawHeight = visualHeight * progress;
        $drawLine.height(drawHeight);

    });

    $(window).trigger("scroll.scrollLine");
}

/* INIT */
initScrollLine();

/* REINIT ON RESIZE */
$(window).on("resize", function () {
    initScrollLine();
});


