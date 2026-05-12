$(".headingBox").on("click", function () {

    if ($(this).hasClass("active")) return;

    $(".headingBox").removeClass("active");
    $(".commitmentTabContent").removeClass("active");

    const $box = $(this).addClass("active");
    const target = $box.data("name");

    $("#" + target).addClass("active");

    const index = $box.index();

    let rotateValue = 45;
    let top = "-5px";
    let left = "0px";

    if (index === 1) {
        rotateValue = 280;
        top = "3px";
        left = "-3px";
    } else if (index === 2) {
        rotateValue = 180;
        top = "3px";
        left = "3px";
    }

    $(".activeWhite").css({
        transform: `rotate(${rotateValue}deg)`,
        top: top,
        left: left
    });

    // 👉 pulse animation (no delay)
    const el = $(".commitmentHeadWrapper")[0];
    el.classList.remove("animatePulse");

    requestAnimationFrame(() => {
        el.classList.add("animatePulse");
    });

});

$(".headingBox").first().trigger("click");