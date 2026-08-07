/* $(".accordianBody").hide().first().show();
$(".accordianList").first().addClass("active");

$(".accordianHeading").on("click", function () {
    const item = $(this).closest(".accordianList");
    const body = $(this).next(".accordianBody");

    $(".accordianList").not(item).removeClass("active");
    $(".accordianBody").not(body).slideUp("slow");

    item.toggleClass("active");
    body.stop(true, true).slideToggle("slow");
}); */

$(".accordianWrapper").each(function () {
    const $wrapper = $(this);

    $wrapper.find(".accordianBody").hide();
    $wrapper.find(".accordianList").removeClass("active");

    $wrapper.find(".accordianList").first().addClass("active");
    $wrapper.find(".accordianBody").first().show();
});

$(".accordianHeading").on("click", function () {

    const $wrapper = $(this).closest(".accordianWrapper");
    const $item = $(this).closest(".accordianList");
    const $body = $item.find(".accordianBody");

    $wrapper.find(".accordianList").not($item).removeClass("active");
    $wrapper.find(".accordianBody").not($body).slideUp("slow");

    $item.toggleClass("active");
    $body.stop(true, true).slideToggle("slow");

});