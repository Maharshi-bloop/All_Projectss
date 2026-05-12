
/* ============================ */
// Header Progress bar Js Start
$(document).ready(function () {

    var onePageSwiper = new Swiper(".onePageSwiper.swiper", {
        direction: "vertical",
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        grabCursor: true,
        /* mousewheel: true, */
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
        speed: 800,
        paginationClickable: true,
        /* parallax: true, */
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        /* noMousewheelClass: 'swiper-no-mousewheel', */
        /* mousewheelControl: 1, */
        watchOverflow: true,
        breakpoints: {
            320: {
                grabCursor: false,
            },
            586: {
                grabCursor: false,
            },
        },
    });



    var bannerSwiper = new Swiper(".gcpClientSwiper.swiper", {
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        slidesPerView: 3,
        grabCursor: true,
        mousewheel: {
            enabled: false,
        },
        speed: 900,
        watchOverflow: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            586: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 3,
            },
            1366: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            }
        },
    });

    var bannerSwiper = new Swiper(".clientSwiper.swiper", {
        loop: true,
        grabCursor: true,
        mousewheel: {
            enabled: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        speed: 800,
        slidesPerView: 4,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            1280: {
                slidesPerView: 3,
            },
            1366: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            }
        },
        mousewheelControl: 1,
        watchOverflow: true,
    });

    var bannerSwiper = new Swiper(".openingSwiper.swiper", {
        loop: true,
        grabCursor: true,
        mousewheel: {
            enabled: false,
        },
        /*  pagination: {
             el: '.swiper-pagination',
             clickable: true,
         }, */
        speed: 800,
        slidesPerView: 4,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 3,
            },
            1366: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            }
        },
        mousewheelControl: 1,
        watchOverflow: true,
    });

    var bannerSwiper = new Swiper(".bannerSwiper.swiper", {
        direction: "vertical",
        loop: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        grabCursor: true,
        mousewheel: true,
        speed: 800,
        paginationClickable: true,
        parallax: true,
        autoplay: false,
        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        mousewheelControl: 1,
        watchOverflow: true,
        on: {
            slideChange: function () {
                setTimeout(function () {
                    bannerSwiper.params.touchReleaseOnEdges = false;
                    bannerSwiper.params.mousewheel.releaseOnEdges = false;
                });
            },
            reachEnd: function () {
                setTimeout(function () {
                    bannerSwiper.params.touchReleaseOnEdges = true;
                    bannerSwiper.params.mousewheel.releaseOnEdges = true;
                }, 500);
            },
            reachBeginning: function () {
                setTimeout(function () {
                    bannerSwiper.params.touchReleaseOnEdges = true;
                    bannerSwiper.params.mousewheel.releaseOnEdges = true;
                }, 500);
            }
        }
    });

    /* header js */
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
    $(window).on('scroll', function (event) {
        // checkCounter();
        console.log()
        stickyHeader();
    });

    $(".headerOption > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children(".subMenuInner").children("ul").addClass("subMenu");
        }
    });


    var t2 = gsap.timeline();
    var t3 = gsap.timeline();
    var toggleBtn = document.querySelector(".toggleBtn");
    var headerCloseBtn = document.querySelector(".headerCloseBtn");
    var headerBackBtn = document.querySelector(".headerBackBtn");
    var headerLis = document.querySelectorAll(".headerOption > ul > li");
    t2.from(".headerOption", {
        opacity: "0",
        transform: "scale(0)",
        duration: 0.3,
        transformOrigin: "top right",
    });

    /*  t2.from(".headerOption > ul > li > a", {
         opacity: 0,
         x: 150,
         opacity: 0,
         duration: 0.3,
         stagger: 0.1,
         ease: "power.out",
     }); */

    t2.pause();

    toggleBtn.addEventListener("click", function () {
        t2.play();
    });

    headerCloseBtn.addEventListener("click", function () {
        t2.reverse();
    });

    /* document.addEventListener("click", function () {
    if (menuOpen) {
            console.log("fsdfsdf");
            t2.reverse();
            menuOpen = false;
        }
    }); */




    /* t3.from(".subMenuInner", {
        opacity: 0,
        transform: "translateX(100%)",
        duration: 0.3,
    }); */

    /*     t3.from(".subMenuInner > ul > li > a", {
            opacity: 0,
            x: 150,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power.out",
        }); */

    t3.pause();

    /* headerLis.forEach(function (li) {
        li.addEventListener("click", function (e) {
            e.stopPropagation();  // Prevent the click event from bubbling up to the document
            var subMenu = li.querySelector(".subMenuInner");  // Find the subMenuInner within the clicked li
            if (subMenu) {
                t3.play();  // Play the animation for this specific subMenuInner
            }
        });
    }); */



    $(".headerOption > ul > li").on("click", function () {
        /*  t3.play(); */
        $(this).children(".subMenuInner").addClass("active");
    });

    $(".headerBackBtn").on("click", function (e) {
        e.stopPropagation(); // Prevents event bubbling
        e.preventDefault();
        t3.reverse();
        $(this).closest(".subMenuInner").removeClass("active"); // Targets the closest submenu
    });


    // Header Progress bar Js End


    // back to top js start
    if ($(".goTopBtn").length) {
        $('.goTopBtn').fadeOut('250');
        $(window).scroll(function () {
            if ($(window).scrollTop() > 120) {
                $('.goTopBtn').fadeIn('250').css('display', 'flex');
            } else {
                $('.goTopBtn').fadeOut('250');
            }
        });
        $('.goTopBtn').click(function () {
            var scrlTop = 0;
            // if (jQuery('.sustainBoxesWrap').length) {
            //     if (jQuery('.sustainBoxesWrap').parents('.transmissionContent').hasClass('active')) {
            //         scrlTop = jQuery('.sustainBoxesWrap').offset().top - jQuery('.mainHeader').innerHeight() - 10;
            //     }
            // }
            $('html, body').animate({
                scrollTop: scrlTop
            }, '200');
            return false;
        });
    };
    // back to top js end







    // Progress Bar Update
    function updateProgressBar() {
        const totalHeight = $(document).height() - $(window).height();
        const progress = ($(window).scrollTop() / totalHeight) * 100;
        $('.progress-bar').css('width', progress + '%');
    }

    updateProgressBar();
    $(window).on('scroll resize', updateProgressBar);

    // Progress Circle Update
    function updateProgressCircle() {
        const progressElement = $('.progress-circle-bar');
        const scrollToTopElement = $('.scroll-to-top');
        const totalHeight = $(document).height() - $(window).height();
        let progress = ($(window).scrollTop() / totalHeight) * 283;
        progress = Math.min(progress, 283);
        progressElement.css('stroke-dashoffset', 283 - progress);

        // Toggle scroll-to-top button visibility
        if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
            scrollToTopElement.css('opacity', '1');
        } else {
            scrollToTopElement.css('opacity', '0');
        }
    }

    // Smooth Scroll to Top
    function scrollToTop() {
        $('html, body').animate({ scrollTop: 0 }, 'smooth');
    }

    $('.scroll-to-top').on('click', scrollToTop);

    updateProgressCircle();
    $(window).on('scroll resize', updateProgressCircle);




    function videoconAnimation() {
        var videocon = document.querySelector(".onePage");
        var playbtn = document.querySelector("#play");
        videocon.addEventListener("mouseenter", function () {
            gsap.to(playbtn, {
                scale: 1,
                opacity: 1,
            });
        });
        videocon.addEventListener("mouseleave", function () {
            gsap.to(playbtn, {
                scale: 0,
                opacity: 0,
            });
        });
        document.addEventListener("mousemove", function (dets) {
            gsap.to(playbtn, {
                left: dets.x - 20,
                top: dets.y - 20,
                duration: 1.2,
                ease: "elastic.out(1,0.4)",
            });
        });
    }
    videoconAnimation();

});

gsap.registerPlugin(ScrollTrigger);

const sectionsToTrack = [".titleDescription", ".lineWrapper", ".partner", ".newsWrapper", ".connect", ".experience", ".circleIconWrapper", ".textImageWrapper", ".imageTextWrapper", ".contactFromWrapper", ".getInTouch", ".blogContainer"];  // Sections you want to track

sectionsToTrack.forEach(section1 => {
    ScrollTrigger.create({
        trigger: section1,
        start: "top top",
        end: "bottom top",
        /* markers:true, */
        onEnter: () => {
            document.querySelector('header').classList.add('blackHeader');
        },
        onLeave: () => {
            document.querySelector('header').classList.remove('blackHeader');
        },
        onEnterBack: () => {
            document.querySelector('header').classList.add('blackHeader');
        },
        onLeaveBack: () => {
            document.querySelector('header').classList.remove('blackHeader');
        }
    });
});


/* gsap tringle extra content animation */
document.querySelectorAll(".experienceList").forEach(function (experienceList) {
    var tl = gsap.timeline({ paused: true });
    var extraContent = experienceList.querySelector(".experienceListExtraContent");
    var isTimelinePlayed = false;
    var popUpCloseBtn = document.querySelector(".popUpClose")

    // Define the timeline for this specific extra content
    tl.to(extraContent, {
        right: 0,
        duration: 0.8,
        ease: "power1.out",
    })
        .from(extraContent.querySelectorAll("span"), {
            x: 150,
            duration: 0.7,
            delay: 0,
            stagger: 0.1,
            opacity: 0,
            ease: "back.out(1.7)",
        });

    // Event listener for clicking the experienceList
    experienceList.addEventListener("click", function (event) {
        // Close other open extraContent sections
        document.querySelectorAll(".experienceListExtraContent").forEach(function (content) {
            if (content !== extraContent) {
                tl.reverse();
            }
        });

        if (!isTimelinePlayed) {
            tl.play();
            isTimelinePlayed = true;
        }
    });

    popUpCloseBtn.addEventListener("click", function (event) {
        // Close other open extraContent sections
        event.preventDefault();
        document.querySelectorAll(".experienceListExtraContent").forEach(function (content) {
            if (content !== extraContent) {
                tl.reverse();
            }
        });

        if (!isTimelinePlayed) {
            tl.play();
            isTimelinePlayed = true;
        }
    });

    // Event listener for clicking outside the current experienceList
    document.addEventListener("click", function (event) {
        if (isTimelinePlayed && !experienceList.contains(event.target)) {
            tl.reverse();
            isTimelinePlayed = false;
        }

    });
});


// Load GSAP and its plugins
gsap.registerPlugin(ScrollTrigger);

// Target all bannerHeading elements
const headings = document.querySelectorAll(".bannerHeading");

headings.forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "bottom 50%",
            scrub: false,
        },
        filter: "blur(5px)",
        y: "20px",
        duration: 1,
        ease: "power2.out",
    });
});


const whiteBannerHeading = document.querySelectorAll(".whiteBannerHeading");

whiteBannerHeading.forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "bottom 50%",
            scrub: false,
        },
        filter: "blur(5px)",
        y: "20px",
        duration: 1,
        ease: "power2.out",
    });
});

const titleText = document.querySelectorAll(".titleText");

titleText.forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "bottom 50%",
            scrub: false,
        },

        filter: "blur(5px)",
        y: "20px",
        duration: 1,
        ease: "power2.out",
    });
});

const description = document.querySelectorAll(".description");

description.forEach((heading) => {
    gsap.from(heading, {
        scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            end: "bottom 50%",
            scrub: false,
        },

        filter: "blur(5px)",
        y: "20px",
        duration: 1,
        ease: "power2.out",
    });
});


const categoryImage = document.querySelectorAll(".categoryImage");

categoryImage.forEach((image) => {
    gsap.from(image, {
        scrollTrigger: {
            trigger: image,
            start: "top 90%",
            end: "bottom 50%",
            scrub: false,
        },
        opacity: 0.8,
        filter: "blur(5px)",
        y: "0",
        transform: "scale(0.8)",
        duration: 1,
        ease: "power2.out",
    });
});


const newsList = document.querySelectorAll(".newsList");

gsap.from(newsList, {
    scrollTrigger: {
        trigger: ".newsListing",
        start: "top 90%",
        end: "bottom 50%",
        scrub: false,
    },
    opacity: 0.7,
    filter: "blur(5px)",
    y: "80px",
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
});




/* banner tilt effect js start */

var cards = document.querySelectorAll('#solutionBannerImage, .bannerImage');

var SCALE_X = 4;
var SCALE_Y = 8;

cards.forEach(function (card) {
    var mouseHover = false;
    var mousePosition = { x: 0, y: 0 };
    var cardSize = { width: 0, height: 0 };

    card.onblur = function () {
        mouseHover = false;
    };

    card.onfocus = function () {
        mouseHover = true;
    };

    card.onmousemove = function (e) {
        if (!mouseHover) return;
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        mousePosition = { x, y };
        cardSize = {
            width: card.offsetWidth || 0,
            height: card.offsetHeight || 0,
        };
        card.style.transform = `perspective(1000px) rotateX(${(mousePosition.y / cardSize.height) * -(SCALE_Y * 2) + SCALE_Y
            }deg) rotateY(${(mousePosition.x / cardSize.width) * (SCALE_X * 2) - SCALE_X
            }deg) translateZ(10px)`;
    };

    card.onmouseout = function () {
        mouseHover = false;
        card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    card.onmouseover = function () {
        mouseHover = true;
    };
});

/* banner tilt effect js end */



/* ============================ */

