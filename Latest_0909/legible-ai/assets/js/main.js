


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
        spaceBetween: 10,
        breakpoints: {
            1920: {
                slidesPerView: 10,

            },
            1600: {
                slidesPerView: 10,

            },
            1366: {
                slidesPerView: 8,

            },
            1024: {
                slidesPerView: 4,

                loop: true,
            },
            768: {
                slidesPerView: 4,
                loop: true,
            },
            480: {
                slidesPerView: 2,
                loop: true,
            },
            320: {
                slidesPerView: 2,
                loop: true,
            }
        }
    });


    workflowsSwiper = new Swiper('.workflowsSwiper .swiper', {
        loop: true,
        slidesPerView: 2,
        speed: 3000,
        /*   autoplay: {
              delay: 5000,
          }, */
        centeredSlides: true,
        spaceBetween: 70,
        breakpoints: {
            1920: {
                slidesPerView: 2,

            },
            1600: {
                slidesPerView: 2,

            },
            1366: {
                slidesPerView: 1.5,

            },
            1024: {
                slidesPerView: 1.2,
                spaceBetween: 40,
                loop: true,
            },
            768: {
                slidesPerView:1.2,
                spaceBetween: 20,
                loop: true,
            },
            480: {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
            },
            320: {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
            }
        }
    });

    /* timeLine js */
    var itemsLi = $(".timeLineWrapper li"),
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
            itemsLi.each(function () {
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