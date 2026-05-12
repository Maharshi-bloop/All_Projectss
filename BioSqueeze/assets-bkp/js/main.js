/* Header js Start */

function stickyHeader() {
    var headerHeight = $('header').innerHeight();
    if ($(window).scrollTop() > headerHeight) {
        $('header').addClass('stickyHeader')
    }
    else {
        $('header').removeClass('stickyHeader')
    }
}
stickyHeader();
jQuery(window).on('scroll', function (event) {
    stickyHeader();
});

$("nav .headerOption > ul > li").each(function () {
    if ($(this).children("ul").length > 0) {
        $(this).addClass("hasUl");
        $(this).children("ul").addClass("subMenu");
    }
});
$("nav ul li").on("click", function () {
    $("li").removeClass("active")
    $(this).addClass("active")
})
$("nav ul li").each(function () {
    if ($(this).find("ul li.active").length > 0) {
        $(this).addClass("active");
    }
});
$(".toggleBtn").on("click", function () {
    $(".toggleBtn").toggleClass("closeBtn");
    $(".headerOption").toggleClass("openMenu");
})

if ($(window).width() < 1025) {
    $(".hasUl").on("click", function () {
        $(this).children(".subMenu").stop().slideToggle();
    });
}

/* Header js End */


/* AOS JS */
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-aos]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach((el) => observer.observe(el));
});


function grid() {
    let rowCounter = 2; // Start at row 2

    $(".categoryBox").each(function (index) {
        if ((index + 1 - 4) % 7 === 0) {
            $(this).css("grid-row", rowCounter + " / span 2");
            rowCounter += 3;
        }
    });


    let n = 3; // Start at 3
    let toggle = true; // Alternate between +4 and +3

    while (n <= $(".categoryBox").length) { // Use actual length instead of fixed 98
        console.log("Applying to:", n); // Debugging
        $(".categoryBox:nth-child(" + n + ")").attr("data-special", "true");

        n += toggle ? 4 : 3; // Alternate between +4 and +3
        toggle = !toggle; // Switch the toggle
    }
}

grid();

$(".filterIcon").on("click", function () {
    $(".filterPopUp").toggleClass("showPopUp")
})


$(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
$(".tabing-main .tab-titles li:first").addClass("active-li")
$(".tabing-main .tab-titles li a").on("click", function (event) {
    event.preventDefault()
    $(".tabing-main .tab-titles li").removeClass("active-li")
    $(this).parent().addClass("active-li");
    $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
    $($(this).attr('href')).addClass("active");
})