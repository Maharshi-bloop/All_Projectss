
$(document).ready(function () {

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
    $(".navbar > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });
    $(".navbar ul li").on("click", function () {
        $("li").removeClass("active")
        $(this).addClass("active")
    })
    $("nav ul li").each(function () {
        if ($(this).find("ul li.menu-item.active").length > 0) {
            $(this).addClass("active");
        }
    });
    $(".toggleBtn").on("click", function () {
        $(".toggleBtn").toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
    })
    /* $(".listImage").each(function (index) {
        console.log(` ${index},  ${$(this).attr("id")}`);
    }); */

    function moveButton() {
        if ($(window).width() < 1025) {
            if (!$('.ctaBtn').parent().is('.navbar')) {
                $('.ctaBtn').appendTo('.navbar');
            }
            $(".hasUl").on("click", function () {
                $(this).children(".subMenu").stop().slideToggle();
            });
        } else {
            if ($('.ctaBtn').parent().is('.navbar')) {
                $('.ctaBtn').appendTo('.headerCta');
            }
        }
    }
    moveButton();
    // Check on window resize
    $(window).resize(function () {
        moveButton();
    });

    $(".projectListText").hover(
        function () {
            var numberofChild = $(".listImage").length;
            console.log(`ffdf + ${numberofChild}`)
            const targetId = $(this).attr("href"); // Get the href value (e.g., "#image1")
            const targetIndex = $(targetId).index(); // Get the index of the target element
            const translateValue = `translateY(${-100 * targetIndex / numberofChild}%)`; // Calculate translateY value

            // Apply the transform to the corresponding element
            $(".projectListImageList").css("transform", translateValue);
        },
        function () {
            const targetId = $(this).attr("href");
            // Reset the transform when the hover ends
            $(".projectListImageList").css("transform", "translateY(0)");
        }
    );

    $(".facingDataList").on("mouseenter mouseleave", function (e) {
        const $this = $(this);
        const direction = getHoverDirection(e, this);

        if (e.type === "mouseenter") {
            // On mouse enter, apply the starting transform based on the entry direction
            const startingTransform = getTransformValue(direction, true);

            // Set the starting transform based on entry direction
            $this.css("--transform", startingTransform);
            $this.addClass("active");

            // Trigger animation to bring the gradient into view
            setTimeout(() => {
                $this.css("--transform", "translateX(0)");
            }, 0);
        } else if (e.type === "mouseleave") {
            // On mouse leave, set the exit transform based on the leave direction
            $this.css("--transform", getTransformValue(direction, false));
            $this.removeClass("active");
        }
    });

    // Function to calculate the transform value based on direction
    function getTransformValue(direction, isEntering) {
        if (isEntering) {
            if (direction === "left") return "translateX(-100%)";
            if (direction === "top") return "translateY(-100%)";
            if (direction === "right") return "translateX(100%)";
            if (direction === "bottom") return "translateY(100%)";
        } else {
            if (direction === "left") return "translateX(-100%)";
            if (direction === "top") return "translateY(-100%)";
            if (direction === "right") return "translateX(100%)";
            if (direction === "bottom") return "translateY(100%)";
        }
    }

    // Function to detect hover direction
    function getHoverDirection(e, element) {
        const $el = $(element);
        const offset = $el.offset();
        const width = $el.outerWidth();
        const height = $el.outerHeight();
        const x = e.pageX - offset.left - width / 2;
        const y = e.pageY - offset.top - height / 2;

        const angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle > -45 && angle <= 45) return "right";
        if (angle > 45 && angle <= 135) return "bottom";
        if (angle > 135 || angle <= -135) return "left";
        if (angle > -135 && angle <= -45) return "top";
    }

    const swiper = new Swiper(".projectSwiper .swiper", {
        loop: false,
        slidesPerView: 1.3,
        breakpoints: {
            0: {
                slidesPerView: 1.2,
                spaceBetween: 16,
            },
            576: {
                slidesPerView: 1.2,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            991: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 16,
            },
        },
    });


    const scrollToSwiper = new Swiper(".scrollToSwiper .swiper", {
        loop: false,
        slidesPerView: 3,
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1024: {
                slidesPerView: 2.8,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
            1920: {
                slidesPerView: 3,
                spaceBetween: 16,
            },
        },
    });

    const aboutBannerSwiper = new Swiper(".aboutBannerSwiper .swiper", {
        loop: true,
        slidesPerView: 1.2,
        speed: 1000,
        autoplay:
        {
            delay: 2000,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
                centeredSlides: true,
            },
            576: {
                slidesPerView: 1.4,
                spaceBetween: 10,
                centeredSlides: true,
            },
            992: {
                slidesPerView: 1.2,
                spaceBetween: 16,
            },
            1200: {
                slidesPerView: 1.3,
                spaceBetween: 16,
            },
            1600: {
                slidesPerView: 1.8,
                spaceBetween: 16,
            },
        },
    });

    $(".esgScrollToUl a").first().addClass("activeA")
    $('.esgScrollToUl a').on('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior
        $(".esgScrollToUl a").removeClass("activeA")
        $(this).addClass("activeA")
        var targetId = $(this).attr('href'); // Get the target ID
        var targetElement = $(targetId);

        if (targetElement.length) {
            var offset = 150; // Adjust scroll position by +100px
            var targetPosition = targetElement.offset().top - offset;

            $('html, body').animate({
                scrollTop: targetPosition
            }, 100); // 800ms smooth scroll
        }
    });



    $(document).on("wpcf7mailsent", function () {
        // Hide the default message
        $(".wpcf7-response-output").hide();
        // Show custom popup
        $(".popUpContent").addClass("showPopUp");
        // Automatically remove the popup after 15 seconds
        setTimeout(function () {
            $(".popUpContent").removeClass("showPopUp");
        }, 15000);
    });


    $('iframe').on('load', function () {
        const iframeDocument = this.contentDocument || this.contentWindow.document;
        const $attribution = $(iframeDocument).find('.gm-style-cc');
        if ($attribution.length) {
            $attribution.css('display', 'none');
        }
    });

    // Add 'accParent' class to already open accordion items
    $('.accordion-collapse.show').each(function () {
        $(this).closest('.accordion-item').addClass('accParent');
    });

    // Add 'accParent' class when an accordion is opened
    $('.accordion-collapse').on('shown.bs.collapse', function () {
        $(this).closest('.accordion-item').addClass('accParent');
    });

    // Remove 'accParent' class when an accordion is closed
    $('.accordion-collapse').on('hidden.bs.collapse', function () {
        $(this).closest('.accordion-item').removeClass('accParent');
    });

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

    AOS.init();
})