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


    // Back to Top function
    if ($(".backTop").length) {
        $(window).scroll(function () {

            // if ($(window).scrollTop() > 120) {
            //     $('#backtotop').fadeIn('250').css('display', 'flex');
            // } else {
            //     $('#backtotop').fadeOut('250');
            // }
            if ($(window).scrollTop() > 120) {
                $('.backTop').addClass("activeBackToTop")
            } else {
                $('.backTop').removeClass("activeBackToTop")
            }

        });
        $('.backTop').click(function () {
            scrlTop = 0;
            $('html, body').animate({
                scrollTop: scrlTop
            }, '500');
            return false;
        });
    };

    $(window).on('scroll', function () {
        stickyHeader();
    });


    // First accordion body is open by default
    $(".accordianBody").hide();
    $('.accordianItem:first-child')
        .addClass('active')
        .find('.accordianBody')
        .slideDown(0);

    $('.accordianHeading').on('click', function () {
        var $item = $(this).parent('.accordianItem');
        var $body = $item.find('.accordianBody');
        // Toggle current item
        $(".accordianBody").slideUp(400);
        $(this).parent('.accordianItem').siblings().removeClass('active');
        $item.toggleClass('active');
        $body.stop().slideToggle(400);

    });


    /* tabbing js start */
    $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".tabing-main .tab-titles li:first").addClass("active-li")
    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })
    /* tabbing js end */


    /* planDayWrap tabbing js start */
    $(".planDayWrap .tabing-main .tabContainer .tab-content-main:first").addClass("active");
    $(".planDayWrap .tabing-main .tab-titles li:first").addClass("active-li")
    $(".planDayWrap .tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault()
        $(".planDayWrap .tabing-main .tab-titles li").removeClass("active-li")
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
        $($(this).attr('href')).addClass("active");
    })
    /* planDayWrap tabbing js end */



    /* floating text animation start*/
    const $floatingTexts = $('.floatingText');
    const $connector = $('.connectorLine');

    let currentIndex = 0;

    function animateConnector() {

        const $center = $('.centerText');
        const $active = $floatingTexts.eq(currentIndex);

        const centerRect = $center[0].getBoundingClientRect();
        const activeRect = $active[0].getBoundingClientRect();
        const parentRect = $('.ideaRight')[0].getBoundingClientRect();

        const x1 = centerRect.left + centerRect.width / 2 - parentRect.left;
        const y1 = centerRect.top + centerRect.height / 2 - parentRect.top;

        const x2 = activeRect.left + activeRect.width / 2 - parentRect.left;
        const y2 = activeRect.top + activeRect.height / 2 - parentRect.top;

        // Reduce connector length by 60px
        const angle = Math.atan2(y2 - y1, x2 - x1);

        var newX2 = x2 - Math.cos(angle) * 60;
        var newY2 = y2 - Math.sin(angle) * 60;

        if ($(window).width() <= 1024) {
            var newX2 = x2 - Math.cos(angle) * 30;
            var newY2 = y2 - Math.sin(angle) * 30;
        }
        /* else if ($(window).width() <= 480) {
            var newX2 = x2 - Math.cos(angle) * 1000;
            var newY2 = y2 - Math.sin(angle) * 1000;
        } */

        // Draw line directly from center to floating text
        $connector.attr({
            x1: x1,
            y1: y1,
            x2: newX2,
            y2: newY2
        });

        // Show floating text
        $active.addClass('active');
    }

    function changeFloatingText() {

        // Hide current
        $floatingTexts.eq(currentIndex).removeClass('active');

        // Next
        currentIndex++;

        if (currentIndex >= $floatingTexts.length) {
            currentIndex = 0;
        }

        // Show next
        $floatingTexts.eq(currentIndex).addClass('active');

        // Animate connector
        animateConnector();
    }

    // First item
    $floatingTexts.eq(0).addClass('active');

    // Initial connector
    setTimeout(function () {
        animateConnector();
    }, 100);

    // Change every 3 seconds
    setInterval(changeFloatingText, 2000);

    /* floating text animation end*/

})