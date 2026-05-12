$(document).ready(function () {
    $(".secondarySubHeading").on("click", function (event) {
        event.preventDefault();

        var $accordion = $(this).parent(".accordian");
        var $tabContent = $accordion.find(".tabContent");

        // Close all other accordion items
        $(".accordian").not($accordion).removeClass("active").find(".tabContent").stop().slideUp();

        // Toggle the clicked accordion item
        if ($accordion.hasClass("active")) {
            $accordion.removeClass("active");
            $tabContent.stop().slideUp();
        } else {
            $accordion.addClass("active");
            $tabContent.stop().slideDown();
        }
    });

    // Open the first accordion item by default
    $(".accordian:first-child .secondarySubHeading").trigger('click');
});
