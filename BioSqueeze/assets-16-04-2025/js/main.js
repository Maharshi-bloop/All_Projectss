AOS.init();

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

/* if ($(window).width() < 1025) {
    $(".hasUl").on("click", function () {
        console.log("dasd");
        $(this).children(".subMenu").stop().slideToggle();
    });
} */


function moveButton() {
    if ($(window).width() < 1025) {
        if (!$('.headerCta').parent().is('.headerOption')) {
            $('.headerCta').appendTo('.headerOption');
        }
        $(".hasUl").on("click", function () {
            $(this).children(".subMenu").stop().slideToggle();
        });
    } else {
        if ($('.headerCta').parent().is('.headerOption')) {
            $('.headerCta').appendTo('.headerCta');
        }
    }
}
moveButton();
// Check on window resize
$(window).resize(function () {
    moveButton();
});

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


$(document).ready(function () {
    $(".filterIcon").on("click", function (event) {
        event.stopPropagation(); // Prevent document click from closing immediately
        $(".filterPopUp").toggleClass("showPopUp");
    });

    $("#apply-filters").on("click", function () {
        if ($(".filterItems .filter-checkbox:checked").length > 0) {
            console.log("hello");
            $(".filterPopUp").removeClass("showPopUp");
        }
    });

    // Prevent clicks inside the popup from closing it
    $(".filterPopUp").on("click", function (event) {
        event.stopPropagation();
    });

    // Close the filter popup when clicking outside of it
    $(document).on("click", function (event) {
        if (!$(".filterPopUp").is(event.target) && $(".filterPopUp").has(event.target).length === 0 &&
            !$(".filterIcon").is(event.target)) {
            $(".filterPopUp").removeClass("showPopUp");
        }
    });
});



$(".search").on("click", function (e) {
    $(this).toggleClass("showSearchBox");
});

// Prevent click inside input from closing the search box
$(".search input").on("click", function (e) {
    e.stopPropagation();
});


$(".teamMenmberList").on("click", function (e) {
    e.stopPropagation(); // Prevent event bubbling

    // Remove 'active' class from all popups before adding to the clicked one
    $(".memberPopUpContent").removeClass("active");
    $("body").addClass("scrollOff");

    $(this).siblings(".memberPopUpContent").addClass("active");
});

$(".closePopUpBtn").on("click", function (e) {
    e.preventDefault();
    $("body").removeClass("scrollOff");
    $(this).closest(".memberPopUpContent").removeClass("active");
});

// Click outside to remove 'active' class
$(document).on("click", function (e) {
    if (!$(e.target).closest(".memberPopUpContent, .teamMenmberList").length) {
        $(".memberPopUpContent").removeClass("active");
        $("body").removeClass("scrollOff");
    }
});



/*$(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
$(".tabing-main .tab-titles li:first").addClass("active-li")
$(".tabing-main .tab-titles li a").on("click", function (event) {
    event.preventDefault()
    $(".tabing-main .tab-titles li").removeClass("active-li")
    $(this).parent().addClass("active-li");
    $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
    $($(this).attr('href')).addClass("active");
})*/



var swiper = new Swiper('.challSolSwiper .swiper', {
    slidesPerView: 4,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true,
        dragSize: 100,
    },
    breakpoints: {
        1920: {
            slidesPerView: 5,
        },
        1440: {
            slidesPerView: 4,
        },
        1028: {
            slidesPerView: 3,
        },
        480: {
            slidesPerView: 1,
        },
        0: {
            slidesPerView: 1,
        }
    }
});

var swiper = new Swiper('.successfulDateSWiper .swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true,
        dragSize: 100,
    },
    breakpoints: {
        1920: {
            slidesPerView: 4,
        },
        1440: {
            slidesPerView: 4,
        },
        1028: {
            slidesPerView: 3.1,
        },
        480: {
            slidesPerView: 1.3,
        },
        0: {
            slidesPerView: 1.3,
        }
    }
});


var swiper = new Swiper('.photoSwiper .swiper', {
    slidesPerView: 3.5,
    spaceBetween: 20,
    breakpoints: {
        1920: {
            slidesPerView: 3.5,
        },
        1440: {
            slidesPerView: 3.5,
        },
        1028: {
            slidesPerView: 3.1,
        },
        480: {
            slidesPerView: 1.3,
        },
        0: {
            slidesPerView: 1.3,
        }
    }
});




$(document).on("click", function (e) {
    if (!$(e.target).closest(".slideBox").length) {
        $(".slideBox").removeClass("active"); // Remove active class when clicking outside
    }
});

$(".challTextBox a").on("click", function (e) {
    e.preventDefault(); // Prevent default link behavior

    let $slideBox = $(this).closest(".slideBox"); // Find closest slideBox

    $(".slideBox").not($slideBox).removeClass("active"); // Remove active class from other slideBox elements

    $slideBox.toggleClass("active"); // Toggle active class for clicked slideBox

    e.stopPropagation(); // Prevent event from reaching document click handler
});



if ($(window).width() > 480) {
    var eleRot = (eleItr = 180 / 4);
    var radialRot = 0;

    $(".circleDiv").each(function (index, ele) {
        var listRot = index * eleRot;
        $(this).css("transform", "rotate(-" + listRot + "deg)");
        $(this).find(".circleDivInner").css("transform", "rotate(" + listRot + "deg)");
    });
}



$(document).on("click", function (e) {
    if (!$(e.target).closest(".solutionOneBox ").length) {
        $(".solutionOneBox").removeClass("active"); // Remove active class when clicking outside
    }
});


$(".solutionOneBox:first-child").addClass("active");
$(".clickDot").on("click", function () {
    $(".solutionOneBox").removeClass("active");
    $(this).parents(".solutionOneBox").addClass("active")
})