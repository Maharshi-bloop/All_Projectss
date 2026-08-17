$(document).ready(function () {

    // Open Popup
    $(".teamList").on("click", function (e) {
        e.preventDefault();

        let productId = $(this).attr("id");

        // Ignore if no id is present
        if (!productId) return;

        // Remove active from all popup
        $(".popUpWrapperOuter").removeClass("activePopup");

        // Open only matching popup
        $('.popUpWrapperOuter[data-attr="' + productId + '"]')
            .addClass("activePopup");

        // Disable body scroll
        $("body").addClass("scrollOff");
    });


    // Close popup on close icon
    $(".popUpClose").on("click", function (e) {
        e.stopPropagation();

        $(this)
            .closest(".popUpWrapperOuter")
            .removeClass("activePopup");

        // Enable body scroll
        $("body").removeClass("scrollOff");
    });


    // Close popup when clicking outside popup
    $(".popUpWrapperOuter").on("click", function (e) {

        if ($(e.target).closest(".popUpWrapper").length === 0) {

            $(this).removeClass("activePopup");

            // Enable body scroll
            $("body").removeClass("scrollOff");
        }
    });

});