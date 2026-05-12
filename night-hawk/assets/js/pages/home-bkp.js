let swiper;
// Swiper: Slider
swiper = new Swiper('.videoDetail .swiper', {
    loop: false,
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 20,
    navigation: {
        nextEl: '.videoSwiperController .nextBtn',
        prevEl: '.videoSwiperController .prevBtn',
    },
    breakpoints: {
        1920: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1600: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1366: {
            slidesPerView: 4,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
        },
        480: {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
        },
        320: {
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
        }
    }
});



let partnerLogoSwiper;
// Swiper: Slider
partnerLogoSwiper = new Swiper('.partnerLogoListing.swiper', {
    loop: true,
    slidesPerView: 6,
    paginationClickable: true,
    spaceBetween: 20,
    speed: 5000,
    autoplay: {
        delay: 0,
    },
    /* navigation: {
        nextEl: '.videoSwiperController .nextBtn',
        prevEl: '.videoSwiperController .prevBtn',
    }, */
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
            slidesPerView: 3,
            spaceBetween: 10,
            loop: true,
        },
        480: {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
        },
        320: {
            slidesPerView: 4,
            spaceBetween: 10,
            loop: true,
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


// photos Auto Change js start
$(function () {

    const $videos = $(".videoDiv img");
    const $videoDivs = $(".videoDiv");
    const $lineWraps = $(".videoDetailInner .lineWrap");

    const SLIDE_DURATION = 5000; // 5 seconds
    const PROGRESS_INTERVAL = 50;

    let currentIndex = 0;
    let slideTimer = null;
    let progressTimer = null;
    let slideStartTime = null;

    /* -----------------------------
       ACTIVE SLIDE UI
    ----------------------------- */
    function setActiveSlide(index) {
        $(".videoDetail .swiper-slide")
            .removeClass("activeSlide")
            .eq(index)
            .addClass("activeSlide");
    }

    /* -----------------------------
       INITIAL SETUP (mobile safe)
    ----------------------------- */
    /* $videos.each(function (_, video) {
        video.pause();
    }); */

    $videoDivs.removeClass("active");

    /* -----------------------------
       CLEAR TIMERS
    ----------------------------- */
    function clearTimers() {
        clearTimeout(slideTimer);
        clearInterval(progressTimer);
    }

    /* -----------------------------
       START SLIDE
    ----------------------------- */
    function startSlide(index) {

        clearTimers();

        // pause previous
        /* if ($videos.get(currentIndex)) {
            $videos.get(currentIndex).pause();
        } */

        currentIndex = index;
        slideStartTime = Date.now();

        // reset UI
        $videoDivs.removeClass("active");
        $lineWraps.find("span > span").css("width", "0%");
        $lineWraps.removeClass("hidden");

        // activate current
        const video = $videos.get(currentIndex);
        $videoDivs.eq(currentIndex).addClass("active");

        video.currentTime = 0;
       /*  const playPromise = video.play(); */
        /* if (playPromise !== undefined) {
            playPromise.catch(() => {});
        } */

        setActiveSlide(currentIndex);

        // progress bar
        progressTimer = setInterval(() => {
            const elapsed = Date.now() - slideStartTime;
            const progress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);

            $lineWraps.eq(currentIndex)
                .find("span > span")
                .css("width", progress + "%");

            if (progress >= 100) {
                $lineWraps.eq(currentIndex).addClass("hidden");
            }
        }, PROGRESS_INTERVAL);

        // auto next
        slideTimer = setTimeout(moveToNextVideo, SLIDE_DURATION);

        // swiper sync
        if (typeof swiper !== "undefined") {
            swiper.slideTo(currentIndex);
        }
    }

    /* -----------------------------
       NEXT SLIDE
    ----------------------------- */
    function moveToNextVideo() {
        const nextIndex = (currentIndex + 1) % $videos.length;
        startSlide(nextIndex);
    }

    /* -----------------------------
       MANUAL CLICK
    ----------------------------- */
    $(".videoDetailContent").on("click", function () {

        const clickedIndex = $(this)
            .closest(".swiper-slide")
            .index();

        if (clickedIndex === currentIndex) return;

        startSlide(clickedIndex);
    });

    /* -----------------------------
       START ON VIEWPORT
    ----------------------------- */
    let sliderStarted = false;
    const videoWrap = document.querySelector(".videoWrap");

    if (videoWrap) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !sliderStarted) {
                    sliderStarted = true;
                    startSlide(0);
                    observer.disconnect();
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(videoWrap);
    }

});

// photos Auto Change js end


