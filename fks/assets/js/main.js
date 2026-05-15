$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization

    // AFTER:
    AOS.init({ once: true, duration: 600 });
    // Refresh AOS + ScrollTrigger after all images/fonts load
    $(window).on('load', function () {
        AOS.refresh();
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh(true);
        }
    });

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


    /* map js start */
    const dots = [
        { id: "dot-region45", target: "region45", label: "Gambia", top: -7, left: -84 },
        { id: "dot-region42", target: "region42", label: "Guinea-Bissau", top: -1, left: -79 },
        { id: "dot-region41", target: "region41", label: "Guinea", top: 4, left: -63 },
        { id: "dot-region40", target: "region40", label: "Sierra Leone", top: 15, left: -66 },
        { id: "dot-region39", target: "region39", label: "Liberia", top: 26, left: -55 },
        { id: "dot-region31", target: "region31", label: "Cote D'ivoire", top: 21, left: -37 },
        { id: "dot-region30", target: "region30", label: "Ghana", top: 19, left: -17 },
        { id: "dot-region29", target: "region29", label: "Togo", top: 14, left: -8 },
        { id: "dot-region28", target: "region28", label: "Benin", top: 6, left: -1 },
        { id: "dot-region34", target: "region34", label: "Nigeria", top: -29, left: 32, defaultVisible: true },
        { id: "dot-region24", target: "region24", label: "Gabon", top: 59, left: 40 },
        { id: "dot-region23", target: "region23", label: "Republic of the Congo", top: 51, left: 53 },
        { id: "dot-region43", target: "region43", label: "MALI", top: -20, left: -25 },
        { id: "dot-region46", target: "region46", label: "Mauritania", top: -35, left: -60 },
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
