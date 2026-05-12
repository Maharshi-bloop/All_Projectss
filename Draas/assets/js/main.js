jQuery(document).ready(function ($) {
    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization

    function stickyHeader() {
        var headerHeight = $("header").innerHeight();
        if ($(window).scrollTop() > headerHeight) {
            $("header").addClass("stickyHeader");
        } else {
            $("header").removeClass("stickyHeader");
        }
    }
    stickyHeader();
    jQuery(window).on("scroll", function (event) {
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

    /* BTN HOVER EFFECT JS */
    document.addEventListener("mouseover", function (e) {
        if (e.target.classList.contains("primaryBtn")) {
            const btn = e.target;
            btn.addEventListener(
                "mouseenter",
                function (ev) {
                    const ripple = document.createElement("span");
                    ripple.classList.add("ripple");
                    let rect = btn.getBoundingClientRect();
                    let x = ev.clientX - rect.left;
                    let y = ev.clientY - rect.top;
                    ripple.style.left = x + "px";
                    ripple.style.top = y + "px";
                    btn.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 1000);
                },
                { once: true }
            );
        }
    });

    if ($(window).width() > 480) {
        gsap.registerPlugin(ScrollTrigger);

        if (document.getElementById("howDoesWork")) {
            const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");
            horizontalSections.forEach(function (sec, i) {
                const pinWrap = sec.querySelector(".horiz-gallery-strip");
                let pinWrapWidth;
                let horizontalScrollLength;
                function refresh() {
                    pinWrapWidth = pinWrap.scrollWidth + 70; // Add 100px to the pinWrapWidth
                    const containerWidth = sec.offsetWidth;  // Get the container width instead of window width
                    horizontalScrollLength = pinWrapWidth - containerWidth;
                }
                refresh();
                // Pinning and horizontal scrolling
                gsap.to(pinWrap, {
                    scrollTrigger: {
                        scrub: true,
                        trigger: sec,
                        pin: sec,
                        start: "center center",
                        end: () => `+=${pinWrapWidth}`,
                        invalidateOnRefresh: true
                    },
                    x: () => -horizontalScrollLength,
                    ease: "none"
                });
                const stickyTitle = sec.querySelector(".howDoesWorkInner") || document.querySelector(".howDoesWorkInner");
                if (stickyTitle) {
                    ScrollTrigger.create({
                        trigger: sec,
                        start: "center center",
                        end: () => `+=${pinWrapWidth}`,
                        pin: stickyTitle,
                        pinSpacing: false,
                        invalidateOnRefresh: true
                    });
                }
                ScrollTrigger.addEventListener("refreshInit", refresh);
            });
        }
    }



    /* oneAccordian js start */

    $(".accoheading").first().addClass("active");
    let whatPowerAccordianWidth = $(".whatPowerAccordian").outerWidth();
    let AccordianWidth = $(".oneAccordian:nth-child(2)").outerWidth(true);
    let accordianCount = $(".oneAccordian").length;
    let accoContentWidth = whatPowerAccordianWidth - (AccordianWidth * (accordianCount - 1)) + "px";
    console.log(AccordianWidth);
    $(".accoheading").first().next(".accoContent").addClass("open").css("min-width", accoContentWidth);
    $(".accoheading").on("click", function () {
        $(this).next(".accoContent").addClass("open");
        $(this).next(".accoContent").css("min-width", accoContentWidth);
        $(".accoheading").removeClass("active");
        $(this).addClass("active");
        $(this).parent().siblings().find(".accoContent").removeClass("open");
    });

    console.log(accordianCount);

    /* oneAccordian js end */


    /* project section js start */

    // helper: compute and apply translate for a given image index
    function setProjectImageTranslate(index) {
        const $images = $(".listImage");
        const imageHeight = $images.first().outerHeight() || 0;
        const translateValue = `translateY(${(-index * imageHeight)}px)`;
        $(".projectListImageList").css("transform", translateValue);
    }

    // reset / init
    $(".projectListText span").hide(); // ensure all collapsed
    $(".projectListText").removeClass("active");

    // Make first item expanded by default
    const $firstItem = $(".projectListText").first();
    $firstItem.addClass("active");
    $firstItem.find("span").show(); // show without animation on load

    // Apply initial image translate for the first item
    (function applyInitialTranslate() {
        const targetId = $firstItem.attr("href");
        if (targetId) {
            const $target = $(targetId);
            if ($target.length) {
                const targetIndex = $target.index();
                setProjectImageTranslate(targetIndex);
            } else {
                // fallback: first image
                setProjectImageTranslate(0);
            }
        } else {
            setProjectImageTranslate(0);
        }
    })();

    // Hover handlers: update active class, expand/collapse description, move image list
    $(".projectListText").on("mouseenter", function () {
        const $this = $(this);
        // show the description for this and hide others
        $(".projectListText").removeClass("active").find("span").stop(true, true).slideUp(120);
        $this.addClass("active");
        $this.find("span").stop(true, true).slideDown(300);

        // translate images to match this item
        const targetId = $this.attr("href");
        if (targetId) {
            const $target = $(targetId);
            if ($target.length) {
                const targetIndex = $target.index();
                setProjectImageTranslate(targetIndex);
            }
        }
    }).on("mouseleave", function () {
        // optional: revert to first item on mouseleave, uncomment to enable
        // const $first = $(".projectListText").first();
        // $(".projectListText").removeClass("active").find("span").stop(true,true).slideUp(120);
        // $first.addClass("active").find("span").stop(true,true).slideDown(300);
        // const firstTargetId = $first.attr("href");
        // if (firstTargetId) { const firstIndex = $(firstTargetId).index(); setProjectImageTranslate(firstIndex); }

        // current behavior: reset transform to the first item (if you prefer leaving current, remove this)
        const $first = $(".projectListText").first();
        const firstTargetId = $first.attr("href");
        if (firstTargetId && $(firstTargetId).length) {
            const firstIndex = $(firstTargetId).index();
            setProjectImageTranslate(firstIndex);
        } else {
            setProjectImageTranslate(0);
        }
    });

    // Ensure transform recalculates on resize (images might change height)
    $(window).on('resize', function () {
        // find currently active item and recalc
        const $active = $(".projectListText.active").first();
        const targetId = $active.attr("href") || $(".projectListText").first().attr("href");
        if (targetId && $(targetId).length) {
            setProjectImageTranslate($(targetId).index());
        } else {
            setProjectImageTranslate(0);
        }
    });
    /* project section js end */


    /* tabbing js start */

    if ($(window).width() > 991) {
        $(".tabing-main .tabContainer .tab-content-main:first").addClass("active");
        $(".tabing-main .tab-titles li:first").addClass("active-li")
        $(".tabing-main .tab-titles li a").on("click", function (event) {
            event.preventDefault()
            $(".tabing-main .tab-titles li").removeClass("active-li")
            $(this).parent().addClass("active-li");
            $(".tabing-main .tabContainer .tab-content-main").removeClass("active");
            $($(this).attr('href')).addClass("active");
        })
    }

    if ($(window).width() < 992) {
        $(".tab-content-main .mobile-tab-title").on("click", function (event) {
            event.preventDefault();
            $(".tabContent").not($(this).siblings(".tabContent")).stop().slideUp();
            if ($(this).parent(".tab-content-main").hasClass("activeTab")) {
                $(".tab-content-main").removeClass("activeTab")
                $(this).siblings(".tabContent").stop().slideUp();
            }
            else {
                $(".tab-content-main").removeClass("activeTab")
                $(this).parent(".tab-content-main").addClass("activeTab")
                $(this).siblings(".tabContent").stop().slideDown();
            }
        })
    }
    $(".tab-content-main:first-child .mobile-tab-title").trigger("click");

    /* tabbing js end */


    /* swiper js start */
    $(document).ready(function () {
        // Swiper: Slider
        new Swiper('.keyFeatureSwiper .swiper', {
            loop: false,
            slidesPerView: 4.2,
            paginationClickable: true,
            spaceBetween: 0,
            breakpoints: {
                1920: {
                    slidesPerView: 4.2,
                },
                1600: {
                    slidesPerView: 4.2,
                },
                1366: {
                    slidesPerView: 4.2,
                },
                1024: {
                    slidesPerView: 2,
                },
                480: {
                    slidesPerView: 1,
                }
            }
        });
    });

    $(".keyFeature .swiper-slide").css("--transform", "translateX(-100%)");

    $(".keyFeature .swiper-slide").on("mouseenter mouseleave", function (e) {
        const $this = $(this);
        const direction = getHoverDirection(e, this);

        if (e.type === "mouseenter") {
            // On mouse enter, apply the starting transform based on the entry direction
            const startingTransform = getTransformValue(direction, true);

            // Set the starting transform based on entry direction
            $this.css("--transform", startingTransform);
            $this.addClass("active");

            // Trigger animation to bring the gradient into view
            setTimeout(() => {
                $this.css("--transform", "translateX(0)");
            }, 0);
        } else if (e.type === "mouseleave") {
            // On mouse leave, set the exit transform based on the leave direction
            $this.css("--transform", getTransformValue(direction, false));
            $this.removeClass("active");
        }
    });

    // Function to calculate the transform value based on direction
    function getTransformValue(direction, isEntering) {
        if (isEntering) {
            if (direction === "left") return "translateX(-100%)";
            if (direction === "top") return "translateY(-100%)";
            if (direction === "right") return "translateX(100%)";
            if (direction === "bottom") return "translateY(100%)";
        } else {
            if (direction === "left") return "translateX(-100%)";
            if (direction === "top") return "translateY(-100%)";
            if (direction === "right") return "translateX(100%)";
            if (direction === "bottom") return "translateY(100%)";
        }
    }

    // Function to detect hover direction
    function getHoverDirection(e, element) {
        const $el = $(element);
        const offset = $el.offset();
        const width = $el.outerWidth();
        const height = $el.outerHeight();
        const x = e.pageX - offset.left - width / 2;
        const y = e.pageY - offset.top - height / 2;

        const angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle > -45 && angle <= 45) return "right";
        if (angle > 45 && angle <= 135) return "bottom";
        if (angle > 135 || angle <= -135) return "left";
        if (angle > -135 && angle <= -45) return "top";
    }

    /* swiper js end */




    /* ourCommand hover js start */

    const itemss = $(".ourCommandList");
    let lastActive = itemss.eq(1); // default second child

    // Set default hover state
    lastActive.addClass("hoverActive");

    // On hover
    itemss.on("mouseenter", function () {
        itemss.removeClass("hoverActive");
        $(this).addClass("hoverActive");
        lastActive = $(this); // store last hovered item
    });

    // When leaving the whole wrapper → keep last hovered active
    $(".ourCommandListWrapper").on("mouseleave", function () {
        itemss.removeClass("hoverActive");
        lastActive.addClass("hoverActive");
    });

    /* ourCommand hover js end */



    /* timeline js start */
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
    /* timeline js end */


    /* questionListing click js start */
    // Default active
    $(".questionListing .col-lg-4:first-child .questionList").addClass("listActive");

    // On list click
    $(".questionList").on("click", function (e) {
        e.stopPropagation(); // stop body click
        $(".questionList").not(this).removeClass("listActive");
        $(this).toggleClass("listActive");
    });

    // Click outside remove class
    $(document).on("click", function (e) {
        if (!$(e.target).closest(".questionList").length) {
            $(".questionList").removeClass("listActive");
        }
    });


    /* questionListing click js end */


});
