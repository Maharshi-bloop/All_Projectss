$(document).ready(function () {

    // Open Popup
    $(".systemsList").on("click", function (e) {
        e.preventDefault();

        let productId = $(this).attr("id");

        // Ignore if no id is present
        if (!productId) return;

        $(".popUpWrapperOuter")
            .attr("data-attr", productId)
            .addClass("activePopup");
    });

    // Close popup on close icon
    $(".popUpClose").on("click", function (e) {
        e.stopPropagation();
        $(".popUpWrapperOuter").removeClass("activePopup");
    });

    // Close popup when clicking outside popup
    $(".popUpWrapperOuter").on("click", function (e) {
        if ($(e.target).closest(".popUpWrapper").length === 0) {
            $(this).removeClass("activePopup");
        }
    });

});