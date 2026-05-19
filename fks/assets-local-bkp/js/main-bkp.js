$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization


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

    $("nav > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });

    /*  $(".closeBtn").on("click", function () {
         $(".headerOption").removeClass("openMenu");
         $("body").removeClass("scrollOff");
     }); */
    $("nav > ul > li").on("click", function () {
        $("nav > ul > li").removeClass("active");
        $(this).addClass("active");
    });
    $("nav > ul > li").each(function () {
        if ($(this).find("ul li.active").length > 0) {
            $(this).addClass("active");
        }
    });
    $(".toggleBtn").on("click", function () {
        $(this).toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
        $("body").toggleClass("scrollOff");
    });
    if ($(window).width() <= 1366) {
        $("nav > ul > li")
            .off("click")
            .on("click", function (e) {
                e.stopPropagation();
                $(this).siblings().find("ul").slideUp();
                if ($(this).children("ul").length > 0) {
                    $(this).children("ul").stop().slideToggle();
                }
            });
    }


    /* waveSlider js start */
    new Swiper('.waveSlider .swiper', {
        loop: true,
        slidesPerView: 1.2,
        disableOnInteraction: true,
        draggable: false,
        speed: 20000,
        /* autoplay: {
            delay: 0,
            disableOnInteraction: false,
        }, */
        spaceBetween: 0,
        breakpoints: {
            1920: {
                slidesPerView: 1.2,

            },
            1366: {
                slidesPerView: 1.2,
            },
            480: {
                slidesPerView: 1.2,
            },
            320: {
                slidesPerView: 1.2,
            }
        }
    });
    /* gallery Swiper js end */




    let currentIndex = 0;
    let $categories = $(".productCataList");

    const arcSettings = {
        cookie: {
            maxAngle: 70,
            radiusY: 150
        },
        bread: {
            maxAngle: 40,
            radiusY: 100
        },
        bread1: {
            maxAngle: 90,
            radiusY: 180
        },
        bread2: {
            maxAngle: 60,
            radiusY: 130
        },
        bread3: {
            maxAngle: 120,
            radiusY: 200
        },
        bread4: {
            maxAngle: 50,
            radiusY: 110
        }
    };

    function setArc(category, animate = false) {

        let $items = $('.productListing[data-cata="' + category + '"]:visible .productImage');
        let total = $items.length;

        if (total <= 1) return;

        // 👉 Get dynamic values
        let settings = arcSettings[category] || {
            maxAngle: 70,
            radiusY: 150
        };

        let maxAngle = settings.maxAngle;
        let radiusY = settings.radiusY;

        $items.each(function (index) {

            let progress = index / (total - 1);
            let angle = (progress - 0.5) * maxAngle * 2;

            let rad = angle * (Math.PI / 180);

            let x = Math.sin(rad) * radiusY * 2;
            let y = Math.cos(rad) * radiusY * 0.5;

            if (animate) {

                gsap.set(this, {
                    x: 0,
                    y: 200,
                    rotation: 0,
                    opacity: 0
                });

                gsap.to(this, {
                    x: x,
                    y: -y,
                    rotation: angle,
                    opacity: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    delay: index * 0.08
                });

            } else {

                gsap.set(this, {
                    x: x,
                    y: -y,
                    rotation: angle,
                    opacity: 1
                });

            }

            gsap.set(this, {
                zIndex: 50 - Math.abs(index - total / 2)
            });

        });
    }

    function showCategory(index, animate = true) {

        let selectedCata = $categories.eq(index).attr("id");
        currentIndex = index;

        $categories.removeClass("active");
        $categories.eq(index).addClass("active");

        $(".productListing").hide();
        $('.productListing[data-cata="' + selectedCata + '"]').show();

        $(".productCataNameListing").hide();
        $('.productCataNameListing[data-cata="' + selectedCata + '"]').show();

        setTimeout(() => {
            setArc(selectedCata, animate); // 👈 pass category
        }, 50);
    }

    // 👉 INITIAL LOAD (same animation as tab switch)
    showCategory(0, true);

    // 👉 CLICK CATEGORY
    $(".productCataList").on("click", function () {
        let index = $(this).index();
        showCategory(index, true);
    });

    // 👉 NEXT BUTTON
    $(".nextBtn").on("click", function () {
        currentIndex = (currentIndex + 1) % $categories.length;
        showCategory(currentIndex, true);
    });

    // 👉 PREV BUTTON
    $(".prevBtn").on("click", function () {
        currentIndex = (currentIndex - 1 + $categories.length) % $categories.length;
        showCategory(currentIndex, true);
    });



    /*  */
    gsap.registerPlugin(ScrollTrigger);

    // 🔹 Heading animation (center focus feel)
    gsap.fromTo(".multiProductTop h3",
        {
            opacity: 0,
            scale: 0.9,
            y: 50
        },
        {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".multiProduct",
                start: "top 70%",
                end: "top 30%",
                scrub: true
            }
        });


    // 🔹 Heading subtle parallax (while sticky)
    gsap.to(".multiProductTop h3", {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
            trigger: ".multiProductWrapper",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });


    // 🔹 Cards animation
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".multiProductList").forEach((item) => {

        gsap.fromTo(item,
            {
                opacity: 0,
                scale: 0.8,
                ease: "power2.out",
                y: 150 // small lift only (no layout break)
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    end: "top 60%",
                    scrub: 1, // 🔥 THIS makes it smooth
                }
            });

    });


    /* brandListingSwiper js start */
    new Swiper('.brandListingSwiper .swiper', {
        loop: true,
        slidesPerView: 6.5,
        disableOnInteraction: true,
        draggable: false,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        spaceBetween: 0,
        breakpoints: {
            1920: {
                slidesPerView: 6.5,

            },
            1366: {
                slidesPerView: 6.5,
            },
            480: {
                slidesPerView: 2.2,
            },
            320: {
                slidesPerView: 2.2,
            }
        }
    });
    /* brandListingSwiper  js end */

    /* brandListingSwiper1 js start */
    new Swiper('.brandListingSwiper1 .swiper', {
        loop: true,
        slidesPerView: 6.5,
        disableOnInteraction: true,
        draggable: false,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
        },
        spaceBetween: 0,
        breakpoints: {
            1920: {
                slidesPerView: 6.5,

            },
            1366: {
                slidesPerView: 6.5,
            },
            480: {
                slidesPerView: 2.2,
            },
            320: {
                slidesPerView: 2.2,
            }
        }
    });
    /* brandListingSwiper  js end */



    /* pyramidPopUpListing js start */
    gsap.registerPlugin(ScrollTrigger);

    const popups = gsap.utils.toArray(".pyramidPopUpList");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".pyramid",
            start: "20% top",
            end: () => `+=${window.innerHeight * popups.length}`, // control scroll length
            scrub: 1,
            pin: true,
        }
    });

    // Animate each popup step-by-step
    popups.forEach((popup, index) => {
        tl.to(popup, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
        }, index * 1.5); // spacing between each popup
    });
    /* pyramidPopUpListing js start */



    /* map js start */
    const dots = [
        { id: "dot-region45", target: "region45", label: "Niger", top: -7, left: -84, defaultVisible: true },
        { id: "dot-region42", target: "region42", label: "Nigeria", top: -1, left: -79 },
        { id: "dot-region41", target: "region41", label: "Chad", top: 4, left: -63 },
        { id: "dot-region40", target: "region40", label: "Cameroon", top: 15, left: -66 },
        { id: "dot-region39", target: "region39", label: "Benin", top: 26, left: -55 },
        { id: "dot-region31", target: "region31", label: "Ghana", top: 21, left: -37 },
        { id: "dot-region30", target: "region30", label: "Ivory Coast", top: 19, left: -17 },
        { id: "dot-region29", target: "region29", label: "Liberia", top: 14, left: -8 },
        { id: "dot-region28", target: "region28", label: "Sierra Leone", top: 6, left: -1 },
        { id: "dot-region34", target: "region34", label: "Guinea", top: -29, left: 32 },
        { id: "dot-region24", target: "region24", label: "Senegal", top: 59, left: 40 },
        { id: "dot-region23", target: "region23", label: "Mauritania", top: 51, left: 53 },
        /* { id: "dot-region4", target: "region4", label: "DRC", top: 80, left: 60 },
        { id: "dot-region5", target: "region5", label: "Tanzania", top: 80, left: 68 }, */
        { id: "dot-region50", target: "region50", label: "Cape Verde", top: -7, left: -116 },
    ];

    const wrapper = document.getElementById("mapWrapper");

    dots.forEach(d => {
        const dot = document.createElement("div");
        dot.className = "map-dot";
        dot.id = d.id;
        dot.style.top = d.top + "%";
        dot.style.left = d.left + "%";

        const label = document.createElement("div");
        label.className = "map-label";
        label.textContent = d.label;
        dot.appendChild(label);

        if (d.defaultVisible) {
            dot.classList.add("active-dot");
            label.classList.add("visible");
            const region = document.getElementById(d.target);
            if (region) region.classList.add("active");
        }

        dot.addEventListener("mouseenter", () => {
            document.querySelectorAll(".map-region").forEach(r => r.classList.remove("active"));
            document.querySelectorAll(".map-dot").forEach(dot2 => {
                dot2.classList.remove("active-dot");
                dot2.querySelector(".map-label").classList.remove("visible");
            });
            dot.classList.add("active-dot");
            label.classList.add("visible");
            const region = document.getElementById(d.target);
            if (region) region.classList.add("active");
        });

        dot.addEventListener("mouseleave", () => {
            dot.classList.remove("active-dot");
            label.classList.remove("visible");
            const region = document.getElementById(d.target);
            if (region) region.classList.remove("active");

            if (d.defaultVisible) {
                dot.classList.add("active-dot");
                label.classList.add("visible");
                region.classList.add("active");
            }
        });

        wrapper.appendChild(dot);
    });
    /* map js end */

})
