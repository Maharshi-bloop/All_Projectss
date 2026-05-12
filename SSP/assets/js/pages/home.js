gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.create({
    trigger: ".doubleBanner",
    start: "top top",
    end: "bottom bottom",
    pin: ".doubleBannerVideo",
    pinSpacing: true,
    markers: false // set true for debugging
});


gsap.registerPlugin(ScrollTrigger)

const splitTypes = document.querySelectorAll('.aboutUsSecHeading .heading5xl')

splitTypes.forEach((char, i) => {

    const bg = char.dataset.bgColor
    const fg = char.dataset.fgColor

    const text = new SplitType(char, { types: 'chars' })

    gsap.fromTo(text.chars,
        {
            color: bg,
        },
        {
            color: fg,
            duration: 1,
            stagger: 0.5,
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
                markers: false,
                toggleActions: 'play play reverse reverse'
            }
        })
})

gsap.set("#intro", { autoAlpha: 1 }); // reveal container

gsap.from("#intro .line span", {
    yPercent: 120,
    duration: 1.3,
    stagger: 0.25,
    ease: "power4.out"
});



$(document).ready(function () {
    /* industriesServedList js start */
    const $wrapper = $(".industriesServedListing");
    const $accordions = $(".industriesServedList");
    const totalCount = $accordions.length;

    if ($(window).width() >= 480) {

        function setWidths($active) {
            const wrapperWidth = $wrapper.innerWidth();

            const openWidth = wrapperWidth * 0.35; // 40%
            const otherWidth = (wrapperWidth * (1 - 0.35)) / (totalCount - 1); // split 60%

            $accordions.each(function () {
                if ($(this).is($active)) {
                    $(this)
                        .addClass("open")
                        .css("width", openWidth + "px");
                } else {
                    $(this)
                        .removeClass("open")
                        .css("width", otherWidth + "px");
                }
            });
        }

        // DEFAULT ACTIVE
        setWidths($accordions.first());

        // CLICK HANDLER
        $accordions.on("click", function (e) {
            e.preventDefault();
            setWidths($(this));
        });

        // RESPONSIVE FIX
        $(window).on("resize", function () {
            setWidths($(".oneAccordian.open"));
        });
    };

    if ($(window).width() <= 480) {

        function setWidths($active) {
        
            $accordions.each(function () {
                if ($(this).is($active)) {
                    $(this)
                        .addClass("open")

                } else {
                    $(this)
                        .removeClass("open")

                }
            });
        }
        // DEFAULT ACTIVE
        setWidths($accordions.first());

        // CLICK HANDLER
        $accordions.on("click", function (e) {
            e.preventDefault();
            setWidths($(this));
        });

    };

    /* industriesServedList js end */
});


