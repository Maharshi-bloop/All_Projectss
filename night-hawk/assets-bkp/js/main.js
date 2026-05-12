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


    $(window).on("resize", function () {
        if ($(window).width() <= 1366) {
            $("nav > ul > li").find("ul").stop().slideUp();
            $("nav > ul > li")
                .off("click")
                .on("click", function (e) {
                    e.stopPropagation();
                    if ($(this).children("ul").length > 0) {
                        $("nav > ul > li").siblings().find("ul").stop().slideUp();
                        $(this).children("ul").stop().slideToggle();
                    }
                });
        }
        /* if ($(window).width() <= 768) {
            $(".headerCta").appendTo(".headerOption");
            $(".footerul ul li").appendTo(".headerOption nav > ul");
        } */
    }).trigger("resize");


    /* mixin plant js */
    $(function () {
        const $items = $('.requirementsList');
        const $firstItem = $items.first();

        // Set the first item as active on page load
        $firstItem.addClass('active');
        // Hover on item
        $items.on('mouseenter', function () {
            $items.removeClass('active');
            $(this).addClass('active');
        });
    });


    $(".resourcesFilterUl ul li:first-child a").addClass("active");
    $(".resourcesFilterUl ul a").on("click", function (e) {
        $(".resourcesFilterUl ul a").removeClass("active");
        $(this).addClass("active");

    });


})