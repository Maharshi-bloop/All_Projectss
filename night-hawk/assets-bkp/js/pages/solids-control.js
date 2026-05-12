$('.deskRow .scrollImage').removeClass('active').eq(0).addClass('active');

function setActiveImageOnScroll() {
    $('.deskRow .scrollConatent').each(function (index) {
        const rect = this.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            $('.deskRow .scrollImage').removeClass('active');
            $('.deskRow .scrollImage').eq(index).addClass('active');
            return false; // Stop after first match in viewport
        }
    });
}

if ($(window).width() > 991) {
    // Trigger on scroll and on load
    $(window).on('scroll load', setActiveImageOnScroll);

    /*  */
    function initScrollLine() {

        const $drawLine = $(".draw-line1");
        const $defaultLine = $(".default-line1");
        const $contentWrap = $(".scrollConatentWrp");

        if (!$drawLine.length || !$contentWrap.length) return;

        // Reset
        $drawLine.height(0);

        // Fixed visual height
        const visualHeight = window.innerHeight * 0.7;
        $defaultLine.height(visualHeight);

        $(window).off("scroll.scrollLine").on("scroll.scrollLine", function () {

            const scrollTop = $(window).scrollTop();
            const windowMid = scrollTop + ($(window).height() / 2);

            const wrapTop = $contentWrap.offset().top;
            const wrapHeight = $contentWrap.outerHeight();
            const wrapBottom = wrapTop + wrapHeight;

            let progress = (windowMid - wrapTop) / (wrapBottom - wrapTop);
            progress = Math.max(0, Math.min(progress, 1));

            const drawHeight = visualHeight * progress;
            $drawLine.height(drawHeight);

        });

        $(window).trigger("scroll.scrollLine");
    }

    /* INIT */
    initScrollLine();

    /* REINIT ON RESIZE */
    $(window).on("resize", function () {
        initScrollLine();
    });
}


if ($(window).width() < 990) {

var items = $(".scrollConatentWrp .scrollConatent"),
    greyLine = $('.mobileRowWrap .scrollConatentWrpOuter .default-line1'),
    lineToDraw = $('.mobileRowWrap .scrollConatentWrpOuter .draw-line1');

// Run this function only if `.draw-line` exists
if (lineToDraw.length) {
    $(window).on('scroll', function () {
        // Get key scroll values
        var redLineHeight = lineToDraw.height(),
            greyLineHeight = greyLine.height(),
            windowDistance = $(window).scrollTop(),
            windowHeight = $(window).height() / 2,
            timelineDistance = $(".mobileRowWrap .scrollConatentWrp").offset().top;

        // Update the height of `.draw-line`
        if (windowDistance >= timelineDistance - windowHeight) {
            var line = windowDistance - timelineDistance + windowHeight;

            if (line <= greyLineHeight) {
                lineToDraw.css({
                    'height': line + 20 + 'px'
                });
            }
        }

        // Determine the visibility of each `<li>` element
        var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true); // Bottom of the `.draw-line`
        items.each(function () {
            var circleTop = $(this).offset().top;
            var circleBottom = circleTop + $(this).outerHeight();

            // Add `in-view` to the current element
            if (bottom > circleTop && bottom <= circleBottom) {
                $(this).removeClass('gone-view').addClass('in-view');
            }
            // Add `gone-view` to elements that have been passed
            else if (bottom > circleBottom) {
                $(this).removeClass('in-view').addClass('gone-view');
            }
            // Remove all classes for future elements
            else {
                $(this).removeClass('in-view gone-view');
            }
        });
    });
}

}