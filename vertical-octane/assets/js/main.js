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

    $("nav > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });

    /*  $(".closeBtn").on("click", function () {
         $(".headerOption").removeClass("openMenu");
         $("body").removeClass("scrollOff");
     }); */
    $("nav > ul > li").on("click", function () {
        $("nav > ul > li").removeClass("active");
        $(this).addClass("active");
    });
    $("nav > ul > li").each(function () {
        if ($(this).find("ul li.active").length > 0) {
            $(this).addClass("active");
        }
    });
    $(".toggleBtn").on("click", function () {
        $(this).toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
        $("body").toggleClass("scrollOff");
    });
    if ($(window).width() <= 1366) {
        $("nav > ul > li")
            .off("click")
            .on("click", function (e) {
                e.stopPropagation();
                $(this).siblings().find("ul").slideUp();
                if ($(this).children("ul").length > 0) {
                    $(this).children("ul").stop().slideToggle();
                }
            });
    }


    /* oneAccordian js start */

    $(".accoheading").first().addClass("active");
    $(".oneAccordian").first().addClass("activeParent");

    let whatPowerAccordianWidth = $(".whatPowerAccordian").innerWidth();
    let AccordianWidth = $(".oneAccordian").outerWidth(true);
    let accordianCount = $(".oneAccordian").length;
    let accoContentWidth = whatPowerAccordianWidth - (AccordianWidth * accordianCount) + "px";
    $(".accoheading").first().next(".accoContent").addClass("open")/* .css("min-width", accoContentWidth) */;
    $(".accoheading, .oneAccordian a").on("click", function (e) {
        e.preventDefault();
        let parentAccordian = $(this).closest(".oneAccordian");
        $(".accoheading").removeClass("active");
        parentAccordian.find(".accoheading").addClass("active");
        parentAccordian.addClass("activeParent").siblings().removeClass("activeParent");

        $(".accoContent").removeClass("open");
        parentAccordian.find(".accoContent").addClass("open")/* .css("min-width", accoContentWidth) */;
    });


    console.log(accordianCount);

    /* oneAccordian js end */


    /* hoverContent js start */
    if ($(window).width() >= 768) {
        $(".hoverContentList").first().addClass("activeHover");
        $(".hoverContentList").hover(
            function () {
                $(".hoverContentList").removeClass("activeHover");
                $(this).addClass("activeHover");
                // Image movement
                var numberofChild = $(".hoverImageListing .hoverImageList").length;
                const targetId = $(this).attr("href");
                const targetIndex = $(targetId).index();
                const translateValue = `translateY(${-100 * targetIndex / numberofChild}%)`;
                $(".hoverImageListing").css("transform", translateValue);
            },
        );
    }
    /* hoverContent js end */



    /* upComingEventSwiper js start */
    new Swiper('.upComingEventSwiper .swiper', {
        loop: true,
        slidesPerView: 3,
        paginationClickable: true,
        spaceBetween: 20,
        /* centeredSlides: true, */
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1028: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10
            },
        }
    });
    /* upComingEventSwiper js end */


    /* growthSwiper js start */
    new Swiper('.growthSwiper .swiper', {
        loop: true,
        slidesPerView: 1.2,
        paginationClickable: true,
        spaceBetween: 20,
        centeredSlides: true,
        breakpoints: {
            1920: {
                slidesPerView: 1.2,
                spaceBetween: 30
            },
            1028: {
                slidesPerView: 1.2,
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
    /* growthSwiper js end */


})