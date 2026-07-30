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
    greyLine = $(".default-line"),
    lineToDraw = $(".draw-line");

let currentIndex = -1;
let scrollLocked = false;

// Prevent wheel scroll while locked
window.addEventListener(
    "wheel",
    function (e) {
        if (scrollLocked) {
            e.preventDefault();
        }
    },
    { passive: false }
);

// Prevent touch scroll (mobile)
window.addEventListener(
    "touchmove",
    function (e) {
        if (scrollLocked) {
            e.preventDefault();
        }
    },
    { passive: false }
);

function lockScroll() {
    scrollLocked = true;

    setTimeout(function () {
        scrollLocked = false;
    }, 800); // Change delay here
}

if (lineToDraw.length) {

    $(window).on("scroll", function () {

        var greyLineHeight = greyLine.height(),
            windowDistance = $(window).scrollTop(),
            windowHeight = $(window).height() / 2,
            timelineDistance = $(".timeLineWrapper").offset().top;

        if (windowDistance >= timelineDistance - windowHeight) {

            var line = windowDistance - timelineDistance + windowHeight;

            if (line <= greyLineHeight) {
                lineToDraw.css("height", (line + 20) + "px");
            }
        }

        var bottom = lineToDraw.offset().top + lineToDraw.outerHeight();

        items.each(function (index) {

            var circleTop = $(this).offset().top;
            var circleBottom = circleTop + $(this).outerHeight();

            if (bottom >= circleTop && bottom < circleBottom) {

                if (currentIndex !== index) {

                    currentIndex = index;

                    lockScroll();

                    items.removeClass("in-view gone-view");

                    items.each(function (i) {
                        if (i < index) {
                            $(this).addClass("gone-view");
                        }
                    });

                    $(this).addClass("in-view");
                }

            }

        });

    });

    // Trigger once on load
    $(window).trigger("scroll");
}

/*   $('.deskRow .scrollImage').removeClass('active').eq(0).addClass('active');

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

    // Trigger on scroll and on load
    $(window).on('scroll load', setActiveImageOnScroll); */



let currentIndex = 0;
let isAnimating = false;

const $images = $('.deskRow .scrollImage');
const $contents = $('.deskRow .scrollConatent');

// Initial setup
$images.css({
    zIndex: 0,
    clipPath: 'inset(0 0 0 0)'
});

$images.eq(0).css('z-index', 2);

let lastScrollTop = 0;
let scrollDirection = "down";

$(window).on("scroll", function () {
    const st = $(this).scrollTop();

    scrollDirection = st > lastScrollTop ? "down" : "up";

    lastScrollTop = st <= 0 ? 0 : st;
});

function changeImage(nextIndex) {

    if (nextIndex === currentIndex || isAnimating) return;

    isAnimating = true;

    const $current = $images.eq(currentIndex);
    const $next = $images.eq(nextIndex);

    // Put next image behind current image
    $next.css({
        zIndex: 1,
        clipPath: 'inset(0 0 0 0)'
    });

    $current.css({
        zIndex: 2
    });

    const clipValue =
        scrollDirection === "down"
            ? "inset(0 0 100% 0)"   // Clip from bottom
            : "inset(100% 0 0 0)";  // Clip from top

    gsap.to($current, {
        clipPath: clipValue,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
            gsap.set($current, {
                clipPath: "inset(0 0 0 0)",
                zIndex: 0
            });

            $next.css("z-index", 2);

            currentIndex = nextIndex;
            isAnimating = false;
        }
    });

}

function setActiveImageOnScroll() {

    $contents.each(function (index) {

        const rect = this.getBoundingClientRect();

        if (rect.top >= 0 && rect.top <= window.innerHeight / 0.5) {
            changeImage(index);
            return false;
        }

    });

}

$(window).on('load scroll', setActiveImageOnScroll);

