$(".accordianBody").hide().first().show();
$(".accordianList").first().addClass("active");

$(".accordianHeading").on("click", function () {
    const item = $(this).closest(".accordianList");
    const body = $(this).next(".accordianBody");

    $(".accordianList").not(item).removeClass("active");
    $(".accordianBody").not(body).slideUp("slow");

    item.toggleClass("active");
    body.stop(true, true).slideToggle("slow");
});