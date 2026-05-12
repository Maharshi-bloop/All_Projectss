

function syncAccordionImage($collapse) {
    const headingId = $collapse.attr("id");

    $(".accordianImage").removeClass("active");

    const $matchedImage = $('.accordianImage[data-id="' + headingId + '"]');

    if ($matchedImage.length) {
        $matchedImage.addClass("active");
    } else {
        // 🔹 Fallback → first image
        $(".accordianImage").first().addClass("active");
    }
}

// 🔹 On page load
const $defaultOpen = $(".accordion-collapse.show");

if ($defaultOpen.length) {
    syncAccordionImage($defaultOpen);
} else {
    // 🔹 If nothing is open, activate first image
    $(".accordianImage").first().addClass("active");
}

// 🔹 On accordion change
$(".accordion-collapse").on("shown.bs.collapse", function () {
    syncAccordionImage($(this));
});


// 🔹 Default: first accordion-item active
$(".accordion-item").first().addClass("activeAcco");

// 🔹 On accordion open
$(".accordion-collapse").on("shown.bs.collapse", function () {
    $(".accordion-item").removeClass("activeAcco");
    $(this).closest(".accordion-item").addClass("activeAcco");
});
