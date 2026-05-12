$(".tabing-main .tabContainer .tab-content-main .tabContent").fadeOut(300);
$(".tabing-main .tabContainer .tab-content-main:first .tabContent").fadeIn(300);
$(".tabing-main .tab-titles li:first").addClass("active-li");
$(".tabing-main .tab-titles li a").on("click", function (event) {
    /* event.preventDefault(); */
    $(".tabing-main .tab-titles li").removeClass("active-li");
    $(this).parent().addClass("active-li");
    $(".tabing-main .tabContainer .tab-content-main .tabContent").fadeOut(300);
    $($(this).attr("href")).children(".tabContent").fadeIn(300);
});