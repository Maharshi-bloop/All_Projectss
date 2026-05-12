function positionTeamPopup() {
    var $container = $('.container-xl');
    var $popup = $('.teamPopup');

    if ($container.length && $popup.length) {
        var containerOffset = $container.offset();
        var containerWidth = $container.outerWidth();
        var rightOffset = $(window).width() - (containerOffset.left + containerWidth);

        $popup.css('right', rightOffset + 'px');
    }
}

$(document).ready(function () {

    /*  AOS.init(); */


    positionTeamPopup();

    $(window).on('resize', function () {
        positionTeamPopup();
    });

    $('.teamProfile').on('click', function (e) {
        e.stopPropagation();

        var $currentPopup = $(this).siblings('.teamPopup');

        // If this one is already active, close it
        if ($currentPopup.hasClass('activePopup')) {
            $currentPopup.removeClass('activePopup');
            $('body').removeClass('scrollOff');
        } else {
            // Close others
            $('.teamPopup').removeClass('activePopup');
            // Show current
            $currentPopup.addClass('activePopup');
            $('body').addClass('scrollOff');
        }
    });
    $('.teamPopup .popUpCloseBtn').on('click', function (e) {
        e.stopPropagation();
        $(this).closest('.teamPopup').removeClass('activePopup');
        $('body').removeClass('scrollOff');
    }
    );

    // Click outside closes popup
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.teamPopup').length && !$(e.target).closest('.teamProfile').length) {
            $('.teamPopup').removeClass('activePopup');
            $('body').removeClass('scrollOff');
        }
    });

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
        $(".navbar ul").toggleClass("openMenu");
    })

    var video = $("#videoOnly")[0];

    $("#playPauseBtn").on("click", function (e) {
        e.preventDefault();
        if (video.paused) {
            video.play();
            $(this).addClass("pause");
        } else {
            video.pause();
            $(this).removeClass("pause");
        }
    });


    new Swiper('.videoListing .swiper', {
        loop: true,
        slidesPerView: 3,
        spaceBetween: 20,
        speed: 1000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1280: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            991: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            586: {
                slidesPerView: 2.2,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.4,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.4,
                spaceBetween: 10
            }
        }
    });
    new Swiper('.photoSwiper .swiper', {
        loop: true,
        slidesPerView: 2.9,
        speed: 5000,
        autoplay: {
            delay: 0,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3.5,
                spaceBetween: 30
            },
            1440: {
                slidesPerView: 3.5,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.3,
                spaceBetween: 10
            }

        }
    });
    new Swiper('.caseStudyListing .swiper', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1028: {
                slidesPerView: 2.7,
                spaceBetween: 30
            },
            991: {
                slidesPerView: 2.3,
                spaceBetween: 30
            },
            586: {
                slidesPerView: 2.1,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10
            }
        }
    });


    /*    // On page load, make first image active
       $('.scrollImage').removeClass('active').eq(0).addClass('active');
   
       function updateActiveImage() {
           $('.scrollConatent').each(function (index) {
               const scrollTop = $(window).scrollTop();
               const elementTop = $(this).offset().top;
               const elementHeight = $(this).outerHeight();
               const windowHeight = $(window).height();
               const elementMid = elementTop + elementHeight / 2;
   
               if (elementMid < scrollTop + windowHeight / 2 && elementMid > scrollTop) {
                   $('.scrollImage').removeClass('active');
                   $('.scrollImage').eq(index).addClass('active');
               }
           });
       }
   
       // Trigger on scroll and on load
       $(window).on('scroll load', updateActiveImage); */

    $('.scrollImage').removeClass('active').eq(0).addClass('active');

    function setActiveImageOnScroll() {
        $('.scrollConatent').each(function (index) {
            const rect = this.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight) {
                $('.scrollImage').removeClass('active');
                $('.scrollImage').eq(index).addClass('active');
                return false; // Stop after first match in viewport
            }
        });
    }

    // Trigger on scroll and on load
    $(window).on('scroll load', setActiveImageOnScroll);
})