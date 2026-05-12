/* waveSlider js start */
    new Swiper('.waveSlider .swiper', {
        loop: true,
        slidesPerView: 1.2,
        disableOnInteraction: true,
        draggable: false,
        speed: 20000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
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
        "snacks-biscuits": {
            maxAngle: 70,
            radiusY: 150,
            spreadX: 2,     // control width
            depthY: 1,
        },
        "chocolate-spreads": {
            maxAngle: 55,
            radiusY: 200,
            spreadX: 2,     // control width
            depthY: 1.8,
        },
        "tea-coffee": {
            maxAngle: 45,
            radiusY: 100,
            spreadX: 3,     // control width
            depthY: 1,
        },
        "baking-ingredients": {
            maxAngle: 20,
            radiusY: 150,
            spreadX: 2,     // control width
            /* depthY: 0.5, */
        },
        "peanut-products": {
            maxAngle: 20,
            radiusY: 150,
            spreadX: 2,     // control width
            depthY: 0.5,
        },
        flour: {
            maxAngle: 45,
            radiusY: 200,
            spreadX: 2,     // control width
            depthY: 1.8,
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

            let x = Math.sin(rad) * radiusY * (settings.spreadX || 2);
            let y = Math.cos(rad) * radiusY * (settings.depthY || 0.5);

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



    // 🔹 Cards animation
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".multiProductList").forEach((item) => {

        gsap.fromTo(item,
            {
                opacity: 0,
                scale: 0.7,
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
                    scrub: 2, // 🔥 THIS makes it smooth
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



    


    /* banner scroll animation start */
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector(".hero");
    const image = document.querySelector(".wire");

    function setupAnimation() {

        const imageHeight = image.offsetHeight;

        // Hero height = image height
        hero.style.height = imageHeight + "px";

        // ✅ Start from 0
        gsap.set(".reveal", { height: 0 });
        gsap.set(".scan-line", { bottom: 0 });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top 40%",

                // ✅ Animation finishes earlier (70% scroll)
                end: "+=" + (imageHeight * 0.8),

                scrub: true,
                invalidateOnRefresh: true
            }
        });

        tl.to(".reveal", {
            height: imageHeight,
            ease: "none"
        }, 0)

            .to(".scan-line", {
                bottom: imageHeight,
                ease: "none"
            }, 0);
    }

    setupAnimation();

    window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
    });
    /* banner scroll animation end */