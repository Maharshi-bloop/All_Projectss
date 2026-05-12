// open popup js start
$(".expertsList").on("click", function (e) {

    // Prevent opening if clicking inside popup
    if ($(e.target).closest(".expertProfilePopUpOuter").length) {
        return;
    }

    e.preventDefault();
    e.stopPropagation();

    $(this)
        .find(".expertProfilePopUpOuter")
        .removeClass("d-none")
        .addClass("activePopUp");
        $("body").addClass("scrollOff");
});


// close button
$(".closeBtn").on("click", function (e) {
    e.stopPropagation();
    $(this)
        .closest(".expertProfilePopUpOuter")
        .removeClass("activePopUp");
        $("body").removeClass("scrollOff");
});


// click outside closes popup
$(document).on("click", function () {
    $(".expertProfilePopUpOuter")
        .removeClass("activePopUp");
        $("body").removeClass("scrollOff");
});


// prevent closing when clicking inside popup
$(".expertProfilePopUp").on("click", function (e) {
    e.stopPropagation();
});

// open popup js end


/* swiper js start */
var swiper = new Swiper('.timeLineSwiper .swiper', {
    loop: false,
    slidesPerView: 8,
    paginationClickable: true,
    speed: 500,
    centeredSlides: false,
    allowTouchMove: true,
    autoplay: false,
    navigation: {
        nextEl: '.timeLineSwiper .nextBtn',
        prevEl: '.timeLineSwiper .prevBtn',
    },
    breakpoints: {
        1920: {
            slidesPerView: 8,

        },
        1600: {
            slidesPerView: 8,

        },
        1366: {
            slidesPerView: 8,

        },
        1024: {
            slidesPerView: 2.5,
            spaceBetween: 30,
            loop: false,
        },
        768: {
            slidesPerView: 3.2,
            spaceBetween: 10,
            loop: false,
        },
        480: {
            slidesPerView: 2.5,
            spaceBetween: 10,
            loop: false,
        },
        320: {
            slidesPerView: 2.5,
            spaceBetween: 10,
            loop: false,
        }
    }
});
/* swiper js end */