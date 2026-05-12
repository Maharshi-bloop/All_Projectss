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

    $(".toggleBtn").on("click", function () {
        $(this).toggleClass("closeBtn");
        $(".headerOption").toggleClass("openMenu");
        $("body").toggleClass("scrollOff");
    });
    if ($(window).width() <= 1366) {
        $("nav > ul li ul").slideUp();
        $("nav > ul > li")
            .off("click")
            .on("click", function (e) {
                /* e.stopPropagation(); */
                $(this).siblings().find("ul").slideUp();
                if ($(this).children("ul").length > 0) {
                    $(this).children("ul").stop().slideToggle();
                }
            });
    }
    $("nav > ul > li").on("click", function () {
        $("nav > ul > li").removeClass("active");
        $(this).addClass("active");
    });
    $("nav > ul > li").each(function () {
        if ($(this).find("ul li.active").length > 0) {
            $(this).addClass("active");
        }
    });


    /* video play pause js start */


    $('.videoControl').on('click', function () {
        const wrapper = $(this).closest('.videoOnlyInner');
        const video = wrapper.find('video').get(0);
        const control = $(this).find('img');

        const playIcon = 'assets/images/play-icon.svg';
        const pauseIcon = 'assets/images/pause-icon.svg';

        if (video.paused) {
            video.play();
            control.attr('src', pauseIcon);
        } else {
            video.pause();
            control.attr('src', playIcon);
        }
    });

    /* video play pause js end */


    /* SECTION APPEAR ANIMATION JS START */
    var sections = document.querySelectorAll(
        ".videoOnly"
    );

    if (sections.length > 0) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        setTimeout(function () {
                            $(entry.target).addClass("in-viewport");
                        }, 150);
                    } else {
                        $(entry.target).removeClass("in-viewport");
                    }
                });
            },
            {
                threshold: 0.3,
            }
        );
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }
    /* SECTION APPEAR ANIMATION JS END */


    /* hover to show image js start  */
    gsap.set('.container-xl img.swipeimage', {
        yPercent: -50,
        xPercent: -50,
        transformOrigin: "center center"
    });

    let activeImage;
    gsap.utils.toArray(".hoverList").forEach((el) => {
        let image = el.querySelector('img.swipeimage'),
            setX, setY,
            lastX = 0, lastY = 0,
            align = e => {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;

                // Skew intensity based on mouse speed
                const skewX = gsap.utils.clamp(-15, 15, dx * 0.2);
                const skewY = gsap.utils.clamp(-15, 15, dy * 0.2);

                gsap.to(image, {
                    skewX,
                    skewY,
                    duration: 0.3,
                    ease: "power2.out"
                });

                setX(e.clientX);
                setY(e.clientY);

                lastX = e.clientX;
                lastY = e.clientY;
            },
            startFollow = () => document.addEventListener("mousemove", align),
            stopFollow = () => document.removeEventListener("mousemove", align),
            fade = gsap.to(image, { autoAlpha: 1, ease: "none", paused: true, onReverseComplete: stopFollow });

        el.addEventListener('mouseenter', (e) => {
            fade.play();
            startFollow();
            if (activeImage) {
                gsap.set(image, {
                    x: gsap.getProperty(activeImage, "x"),
                    y: gsap.getProperty(activeImage, "y")
                });
            }
            activeImage = image;
            setX = gsap.quickTo(image, "x", { duration: 0.6, ease: "power3" });
            setY = gsap.quickTo(image, "y", { duration: 0.6, ease: "power3" });
            align(e);
        });

        el.addEventListener('mouseleave', () => {
            fade.reverse();
            gsap.to(image, {
                skewX: 0,
                skewY: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });

    /* hover to show image js end  */


    /* hori scroll js start */
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // ========== DESKTOP: width animation (same as your code) ==========
    mm.add("(min-width: 769px)", () => {

        const hero = document.querySelector('.solutions');
        const strips = gsap.utils.toArray('.strip');
        const contents = strips.map(s => s.querySelector('.stripContent'));

        // initial
        gsap.set(strips, { flexBasis: '18%' });
        gsap.set(contents, { autoAlpha: 0, y: 30 });

        const expandDuration = 0.9;
        const expandStagger = 0.1;
        const totalAnimationDuration = expandDuration + expandStagger * (strips.length - 1);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: 'top top',
                end: () => "+=" + (totalAnimationDuration * window.innerHeight),
                scrub: 1,
                pin: true,
                anticipatePin: 0.2,
                invalidateOnRefresh: true,
            }
        });

        // 1) expand strips
        tl.to(strips, {
            flexBasis: '40%',
            duration: expandDuration,
            ease: 'power3.inOut',
            stagger: { each: expandStagger }
        }, 0);

        // 2) reveal content
        tl.to(contents, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: { each: expandStagger },
        }, 0.1);

        ScrollTrigger.addEventListener("refreshInit", () => {
            gsap.set(strips, { flexBasis: '18%' });
            gsap.set(contents, { autoAlpha: 0, y: 30 });
        });

        // return is used by matchMedia for cleanup if breakpoint changes
        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    });


    // ========== MOBILE: horizontal scroll, 100% width cards ==========
    mm.add("(max-width: 768px)", () => {
        new Swiper('.solutionBottom .swiper', {
            loop: false,
            
            slidesPerView: 1.2,
            paginationClickable: true,
            speed: 2000,
            
            spaceBetween: 20,
            breakpoints: {
                1920: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                1366: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                480: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 20
                }
            }
        });

    });


    /* hori scroll js end */


    /* gallery Swiper js start */
    new Swiper('.gallerySwiper .swiper', {
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        speed: 7000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
        },
        spaceBetween: 20,
        breakpoints: {
            1920: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1366: {
                slidesPerView: 2.5,
                spaceBetween: 30
            },
            480: {
                slidesPerView: 1.5,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.5,
                spaceBetween: 10
            }
        }
    });
    /* gallery Swiper js end */

    /* add class in career page js start */
    $(".ipbInner .primaryArrowBtn").on("click", function (e) {

        e.preventDefault();
        if ($("body").hasClass("career")) {
            $("body").addClass("bgChange");
        }
        else {
            $("body").removeClass("bgChange");
        }
    });
    /* add class in career page js end */


    /* highQualityswiper js start */
    var highQualityswiper = new Swiper('.highQuality .swiper', {
        loop: false,
        navigation: {
            nextEl: '.swiperCta .swiperNext',
            prevEl: '.swiperCta .swiperPrev',
        },
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 20,
    });

    // Function to update the counter (jQuery version)
    function updateCounter(swiper) {
        var currentSlide = String(swiper.activeIndex + 1).padStart(2, '0');
        var totalSlides = String(swiper.slides.length).padStart(2, '0');

        $('.counter').html(
            '<span class="counter__current">' + currentSlide + '</span>' +
            '/' +
            '<span class="counter__total">' + totalSlides + '</span>'
        );
    }


    // ✅ Run once when Swiper initializes
    updateCounter(highQualityswiper);

    // ✅ Update on slide change or slides length change
    highQualityswiper.on("slideChange slidesLengthChange", function () {
        updateCounter(this);
    });
    /* highQualityswiper js end */





})