/* Header js Start */

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

$("nav .headerOption > ul > li").each(function () {
    if ($(this).children("ul").length > 0) {
        $(this).addClass("hasUl");
        $(this).children("ul").addClass("subMenu");
    }
});
$("nav ul li").on("click", function () {
    $("li").removeClass("active")
    $(this).addClass("active")
})
$("nav ul li").each(function () {
    if ($(this).find("ul li.active").length > 0) {
        $(this).addClass("active");
    }
});
$(".toggleBtn").on("click", function () {
    $(".toggleBtn").toggleClass("closeBtn");
    $(".headerOption").toggleClass("openMenu");
})

/* Header js End */
