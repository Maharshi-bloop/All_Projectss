// Add active class to the first <a> and corresponding image on page load
var firstLink = $(".hovertoChangeDetail ul li a").first();
firstLink.children(".smallDescription").stop().slideDown(400);
if (window.innerWidth < 769) {
firstLink.children(".accImage").stop().slideDown(400);
}
firstLink.addClass("activeA");

var firstTarget = firstLink.attr("href");
$(firstTarget).addClass("activeImage");

// On click, update active classes for the link and image
$(".hovertoChangeDetail ul li a").on("click", function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    // Remove active class from all <a> and images
    $(".hovertoChangeDetail ul li a").removeClass("activeA");
    $(".activeImage").removeClass("activeImage");
    $(".hovertoChangeDetail ul li a").children(".smallDescription").slideUp(400);
    $(this).addClass("activeA");
    $(this).children(".smallDescription").stop().slideToggle(400);
    if (window.innerWidth < 769) {
        $(".hovertoChangeDetail ul li a").children(".accImage").slideUp(400);
        $(this).children(".accImage").stop().slideToggle(400);
    }
    $(target).addClass("activeImage");
});

$(".hoverIcon").mouseenter(function () {
    $(this).closest(".listImageOuter").addClass("active");
    $(this).closest(".listImageOuter").next(".listContent").addClass("active");
});

$(".hoverIcon").mouseleave(function () {
    $(this).closest(".listImageOuter").removeClass("active");
    $(this).closest(".listImageOuter").next(".listContent").removeClass("active");
});

// Fancybox Config
$('[data-fancybox="gallery"]').fancybox({
    buttons: [
        "slideShow",
        "thumbs",
        "zoom",
        "fullScreen",
        "share",
        "close"
    ],
    loop: false,
    protect: true
});


/* cicle animation */
const items = Array.from(document.querySelectorAll(".insightList"));
const dotWrapper = document.querySelector('.dotWrapper');
// You can tweak these independently
const centerX = 0;
const centerY = 0;
var radiusX = 500; // Horizontal stretch (left-right elements are farther)
var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
if (window.innerWidth < 1441) {
    var radiusX = 450; // Horizontal stretch (left-right elements are farther)
    var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
}
if (window.innerWidth < 1281) {
    var radiusX = 430; // Horizontal stretch (left-right elements are farther)
    var radiusY = 300; // Vertical stretch (top-bottom elements are closer)
}
let angleStep = (2 * Math.PI) / items.length;
let rotationIndex = 0;
function positionItems() {
    const dots = document.querySelectorAll('.dotWrapper span');

    items.forEach((item, i) => {
        const angle = angleStep * ((i + rotationIndex) % items.length) - Math.PI / 2;
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle) + 280;
        gsap.to(item, {
            x: x,
            y: y,
            ease: "power1.inOut",
            duration: 1
        });

        // Correct way to toggle "active" based on rotation
        const isActive = (i + rotationIndex) % items.length === 0;
        item.classList.toggle("active", isActive);

        if (dots[i]) {
            dots[i].classList.toggle("active", isActive);
        }
    });

    gsap.to(dotWrapper, {
        rotate: (rotationIndex * (360 / items.length)), // counter-rotate for sync
        duration: 1,
        ease: "power1.inOut",
        transformOrigin: "50% 50%",
    });
}

const dots = Array.from(dotWrapper.querySelectorAll('span'));
const dotRadiusX = 200; // smaller than item radius to fit inside
const dotRadiusY = 200;
let dotAngleStep = (2 * Math.PI) / dots.length;
function positionDots() {
    dots.forEach((dot, i) => {
        const angle = dotAngleStep * i - Math.PI / 2;
        const x = dotRadiusX * Math.cos(angle) + 200; // half of .middelImageWrapper width
        const y = dotRadiusY * Math.sin(angle) + 200; // half of .middelImageWrapper height
        dot.style.left = `${x}px`;
        dot.style.top = `${y}px`;
    });
}

if (window.innerWidth > 1025) {
    positionItems();
    positionDots();
    setInterval(() => {
        rotationIndex = (rotationIndex + 1) % items.length;
        positionItems();
    }, 5000);
}



/* timeLine js */
var itemsLi = $(".timeLineWrapper li"),
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
        if (windowDistance >= timelineDistance - windowHeight - 250) {
            var line = windowDistance - timelineDistance + windowHeight + 250;

            if (line <= greyLineHeight) {
                lineToDraw.css({
                    'height': line + 20 + 'px'
                });
            }
        }

        // Determine the visibility of each `<li>` element
        var bottom = lineToDraw.offset().top + lineToDraw.outerHeight(true); // Bottom of the `.draw-line`
        itemsLi.each(function () {
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