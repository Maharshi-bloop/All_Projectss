let swiper;
// Swiper: Slider
swiper = new Swiper('.videoDetail .swiper', {
    loop: false,
    slidesPerView: 4,
    paginationClickable: true,
    spaceBetween: 20,
    speed: 1500,
    centeredSlides: false,
    allowTouchMove: true,
    autoplay:false,
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

    const SLIDE_DURATION = 5000;
    const PROGRESS_INTERVAL = 50;

    let currentIndex = 0;
    let slideTimer = null;
    let progressTimer = null;
    let slideStartTime = null;
    let sliderStarted = false;

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
       CLEAR TIMERS
    ----------------------------- */
    function clearTimers() {
        clearTimeout(slideTimer);
        clearInterval(progressTimer);
    }

    function syncSwiper(index) {
    if (!swiper) return;

    const spv = swiper.params.slidesPerView;
    const total = swiper.slides.length;

    // Desktop – normal
    if (window.innerWidth > 768) {
        swiper.slideTo(index, 600);
        return;
    }

    // Mobile fix:
    // Push active slide fully into view
    let targetIndex = index;

    // If near end → push left
    if (index >= total - spv) {
        targetIndex = total - spv;
    }

    targetIndex = Math.max(targetIndex, 0);

    swiper.slideTo(targetIndex, 600);
}


    /* -----------------------------
       START SLIDE (MASTER)
    ----------------------------- */
    function startSlide(index) {

        clearTimers();
        currentIndex = index;
        slideStartTime = Date.now();

        // reset UI
        $videoDivs.removeClass("active");
        $lineWraps.removeClass("hidden")
            .find("span > span")
            .css("width", "0%");

        // activate image
        $videoDivs.eq(currentIndex).addClass("active");
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

        // sync swiper (desktop + mobile)
        // if (window.swiper && swiper.realIndex !== index) {
        //     swiper.slideToLoop(index);
        // }
        syncSwiper(index);

    }

    /* -----------------------------
       NEXT SLIDE
    ----------------------------- */
    function moveToNextVideo() {
        const nextIndex = (currentIndex + 1) % $videoDivs.length;
        startSlide(nextIndex);
    }

    /* -----------------------------
       DESKTOP CLICK
    ----------------------------- */
    $(".videoDetailContent").on("click", function () {
        const clickedIndex = $(this).closest(".swiper-slide").index();
        if (clickedIndex !== currentIndex) {
            startSlide(clickedIndex);
        }
    });

    /* -----------------------------
       🔥 MOBILE SWIPE SYNC (KEY FIX)
    ----------------------------- */
    function bindSwiperEvents() {
        if (!window.swiper) return;

        swiper.on("slideChangeTransitionEnd", function () {
            if (!sliderStarted) return;
            startSlide(swiper.realIndex);
        });
    }

    /* -----------------------------
       START ON VIEWPORT
    ----------------------------- */
    const videoWrap = document.querySelector(".videoWrap");

    if (videoWrap) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !sliderStarted) {
                    sliderStarted = true;
                    startSlide(0);
                    bindSwiperEvents();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(videoWrap);
    }

});




// photos Auto Change js end


