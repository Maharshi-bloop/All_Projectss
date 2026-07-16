$(document).ready(function () {

    var curPage = 1;
    var numOfSection = $(".section").length;
    var animTime = 1500;
    var scrolling = false;
    var section = ".section-";
    var direction = "down";
    function scrollAnimation() {

        scrolling = true;

        // Remove previous direction classes
        $(".section").removeClass("up down");

        // Show current section with direction
        $(section + curPage)
            .removeClass("hidden")
            .addClass("show " + direction);

        // Hide previous and next sections
        $(section + (curPage - 1)).addClass("hidden");
        $(section + (curPage + 1)).removeClass("show");

        setTimeout(function () {
            scrolling = false;
        }, animTime);
    }

    function scrollUp() {
        if (curPage === 1) return;

        direction = "up";
        curPage--;
        scrollAnimation();
    }
    function scrollDown() {
        if (curPage === numOfSection) return;

        direction = "down";
        curPage++;
        scrollAnimation();
    }


    $(document).on("mousewheel", function (e) {
        if (scrolling) return;  /* ==> if scrolling is already in progress, it doesn't execute further. */
        if (e.originalEvent.wheelDelta > 0) {
            scrollUp();
        } else {
            scrollDown();
        }
        /* if (curPage > 2 && curPage < 4 || curPage > 5) {
            $("body").addClass("blackNavabr")
        }
        else {
            $("body").removeClass("blackNavabr")
        } */
    });
});