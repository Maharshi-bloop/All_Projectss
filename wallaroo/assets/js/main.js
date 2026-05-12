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

    // Timeline Scroll Section end


    $(".verticalAccoList").first().addClass("active");

    $(".verticalAccoHeading").on("click", function () {

        let parent = $(this).closest(".verticalAccoList");

        if (!parent.hasClass("active")) {

            $(".verticalAccoList").removeClass("active");

            parent.addClass("active");
        }

    });


})