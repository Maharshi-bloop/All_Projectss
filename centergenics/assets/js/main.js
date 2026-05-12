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
    $("nav > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });
    $("nav ul li").on("click", function () {
        $("li").removeClass("active")
        $(this).addClass("active")
    })
    /*  $("nav ul li").each(function () {
         if ($(this).find("ul li.menu-item.active").length > 0) {
             $(this).addClass("active");
         }
     }); */
    $(".toggleBtn").on("click", function () {
        $(".toggleBtn").toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
    })



    $(document).ready(function () {
        var video = $("#bannerVideo")[0];

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
    });

    var $swiperSelector = $('.testiSwiper .swiper');
    $swiperSelector.each(function (index) {
        var $this = $(this);
        var dragSize = $this.data('drag-size') ? $this.data('drag-size') : 50;
        // Swiper: Slider
        new Swiper('.testiSwiper .swiper', {
            loop: false,
            slidesPerView: 1.6,
            paginationClickable: true,
            spaceBetween: 20,
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                dragSize: 'auto',
            },
            breakpoints: {
                1920: {
                    slidesPerView: 1.6,
                    spaceBetween: 30
                },
                1028: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 10
                }
            }
        });
    })
});