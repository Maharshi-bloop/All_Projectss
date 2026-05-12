


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

    $(".toggleBtn").on("click", function () {
        $(".toggleBtn").toggleClass("closeBtn");
        $(".headerOption nav").toggleClass("openMenu");
        $("body").toggleClass("overflowHidden");
    })

    const ctaButton = $(".headerCta");

    const ctaParent = ctaButton.parent();

    function moveElementsBasedOnWidth() {
        if ($(window).width() < 769) {
            ctaButton.appendTo(".headerOption nav");
        } else {
            ctaButton.appendTo(ctaParent);
        }
    }

    moveElementsBasedOnWidth();
    $(window).on("resize", moveElementsBasedOnWidth);


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
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
            }
        }
    });


    document.addEventListener("wpcf7mailsent", function () {
        // Hide the default message
        $(".wpcf7-response-output").hide();
        // Show custom popup
        $(".popUpContent").addClass("showPopUp");
        // Automatically remove the popup after 15 seconds
        setTimeout(function () {
            $(".popUpContent").removeClass("showPopUp");
        }, 3000);
    });




    $(function () {
        const $videos = $(".videoDiv video");
        const $videoDivs = $(".videoDiv");
        const $lineWraps = $(".videoDetailInner .lineWrap");
        let currentIndex = 0;

        // Step 1: Setup — pause and hide all videos
        $videos.each(function (i, video) {
            video.pause();
            $(video).closest(".videoDiv").hide();

            // Add ended listener to play next video
            video.addEventListener("ended", () => {
                moveToNextVideo();
            });
        });

        // Step 2: Show and play the first video
        $videoDivs.eq(currentIndex).show();
        const firstVideo = $videos.get(currentIndex);
        firstVideo.currentTime = 0;
        firstVideo.play();

        // Step 3: Animate the lineWrap progress bar
        setInterval(() => {
            const video = $videos.get(currentIndex);
            const duration = video.duration || 1;
            const currentTime = video.currentTime || 0;
            const progress = (currentTime / duration) * 100;

            // Reset all progress bars
            $lineWraps.find("span > span").css("width", "0%");
            $lineWraps.removeClass("hidden");

            // Animate only current progress bar
            $lineWraps.eq(currentIndex).find("span > span").css("width", progress + "%");

            // Hide completed
            if (progress >= 100) {
                $lineWraps.eq(currentIndex).addClass("hidden");
            }
        }, 30);

        // Step 4: Manual click on .videoDetailInner
        $(".videoDetailContent div").on("click", function () {
            const clickedIndex = $(this).closest(".videoDetail .swiper-slide").index();

            if (clickedIndex === currentIndex) return; // Already playing

            // Pause and reset current
            $videos.get(currentIndex).pause();
            $videoDivs.eq(currentIndex).fadeOut(300);
            $lineWraps.eq(currentIndex).find("span > span").css("width", "0%");
            $lineWraps.eq(currentIndex).removeClass("hidden");

            // Update index and play selected video
            currentIndex = clickedIndex;

            const selectedVideo = $videos.get(currentIndex);
            $videoDivs.eq(currentIndex).fadeIn(300);
            selectedVideo.currentTime = 0;
            selectedVideo.play();
        });

        // Step 5: Auto play next video in loop
        function moveToNextVideo() {
            // Pause and reset current
            $videos.get(currentIndex).pause();
            $videoDivs.eq(currentIndex).fadeOut(300);
            $lineWraps.eq(currentIndex).find("span > span").css("width", "0%");
            $lineWraps.eq(currentIndex).removeClass("hidden");

            // Move to next
            currentIndex = (currentIndex + 1) % $videos.length;

            const nextVideo = $videos.get(currentIndex);
            $videoDivs.eq(currentIndex).fadeIn(300);
            nextVideo.currentTime = 0;
            nextVideo.play();
            swiper.slideTo(currentIndex);
        }
    });


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
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 10,
                loop: true,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: true,
            },
            320: {
                slidesPerView: 2,
                spaceBetween: 10,
                loop: true,
            }
        }
    });


   /*  // Find the iframe
    let iframe = $('.hs-form-frame iframe');

    // Wait until the iframe is fully loaded
    iframe.on('load', function () {
        // Find the button inside the iframe
        let button = iframe.contents().find('.hsfc-NavigationRow__Buttons button');

        // Attach click handler
        button.on('click', function () {
            alert('Button inside iframe clicked!');
        });

        // Trigger button click
        button.trigger('click');
    }); */


});