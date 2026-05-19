$(document).on('click', '.video-play-icon', function () {

    var $this = $(this);
    var video = $this.parents(".introVideoWrap").find("video")[0];

    if (video.paused === false) {

        video.pause();

        $this.parents(".introVideoWrap").removeClass("is-video-playing");

        $this.html('<i class="ri-play-large-fill"></i>');

    } else {

        video.play();

        $this.parents(".introVideoWrap").addClass("is-video-playing");

        $this.html('<i class="ri-pause-large-line"></i>');
    }

    return false;
});

// Timeline Scroll Section
// --------------------------------------------------------------
var items = $(".timeLineWrapper li"),
    greyLine = $('.default-line'),
    lineToDraw = $('.draw-line');

// Run this function only if `.draw-line` exists
if (lineToDraw.length) {
    $(window).on('scroll', function () {
        // Get key scroll values
        var redLineHeight = lineToDraw.height(),
            greyLineHeight = greyLine.height(),
            windowDistance = $(window).scrollTop(),
            windowHeight = $(window).height() / 2,
            timelineDistance = $(".timeLineWrapper").offset().top;

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


gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray(".numbersCardList");

// create fixed random rotation once
const rotations = cards.map(() => gsap.utils.random(-10, 10));

gsap.set(cards, {
    y: 900,
    opacity: 0,
    scale: 1
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".numbers",
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
    }
});

cards.forEach((card, index) => {

    tl.to(card, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotate: rotations[index],
        duration: 1,
        ease: "power3.out"
    }, index * 0.7);

});