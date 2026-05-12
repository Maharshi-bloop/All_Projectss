if ($(window).width() > 991) {
    $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".tabing-main .tab-titles li:first").addClass("active-li");

    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault();
        $(".tabing-main .tab-titles li").removeClass("active-li");
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr("href")).addClass("active");
        updateSurveyServicePadding();
    });
}

if ($(window).width() < 992) {
    $(".tab-content-main .mobile-tab-title").on("click", function (event) {
        event.preventDefault();
        const $thisTab = $(this).parent(".tab-content-main");

        if ($thisTab.hasClass("activeTab")) {
            $thisTab.removeClass("activeTab");
            $(this).siblings(".tabContent").stop().slideUp();
        } else {
            $(".tab-content-main").removeClass("activeTab");
            $(".tabContent").stop().slideUp(300);

            $thisTab.addClass("activeTab");
            $(this).siblings(".tabContent").stop().slideDown();
        }
        updateSurveyServicePadding();
    });

    // Open the first tab by default
    $(".tab-content-main:first-child .mobile-tab-title").trigger("click");
}

function updateSurveyServicePadding() {
    const fixedHeight = 670;
    const extraPadding = 170;

    // Try to get the visible tab content (desktop or mobile)
    const $activeTab = $(".tab-content-main.active");
    const activeTabHeight = $activeTab.outerHeight() || 0;

    // Compute and apply padding
    const paddingTopValue = (activeTabHeight - fixedHeight) + extraPadding;

    console.log("Visible Tab Height:", activeTabHeight);
    console.log("Padding Top Value:", paddingTopValue);

    $(".surveyService").css("padding-top", paddingTopValue + "px");
}



$(document).ready(function () {
    // Swiper: Slider
    new Swiper('.viewSwiper .swiper', {
        loop: true,
        speed: 7000,
        autoplay: {
            delay: 0,
        },
        slidesPerView: 3.2,
        paginationClickable: true,
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3.8,
                spaceBetween: 20
            },
            1600: {
                slidesPerView: 3.2,
                spaceBetween: 20
            },
            1028: {
                slidesPerView: 2.2,
                spaceBetween: 20
            },
            768: {
                slidesPerView: 2.2,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10
            }
        }
    });


    new Swiper('.etswiper .swiper', {
        loop: true,
        speed: 1500,
      /*   autoplay: {
            delay: 3000,
        }, */
        slidesPerView: 2,
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1600: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1028: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10
            }
        }
    });
});
