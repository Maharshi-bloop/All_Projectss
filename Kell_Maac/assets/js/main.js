const header = document.querySelector("header");
const toggleClass = "is-sticky";

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 150) {
        header.classList.add(toggleClass);
    } else {
        header.classList.remove(toggleClass);
    }
});




$(document).ready(function () {
    // Register Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Truck animation: Moves in and out of the viewport with a pause
    const truckTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".truckWrapper",
            start: 'top center',
            end: 'bottom center',
            scrub: 3, // Increased scrub value to slow down the animation
            /* markers: true, */
        }
    });

    truckTimeline
        .fromTo('.truckSVG', { x: -1000 }, { x: 250, ease: 'power1.inOut' }) // Truck enters slower
        .to('.truckSVG', { duration: 2 }) // Pause for 2 seconds
        .to('.truckSVG', { x: 2000, ease: 'power1.inOut' }); // Truck exits

    // Rope animation with container visibility switching and truck/rope reset logic
    const ropeTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".truckSVG",
            start: '-200px center',
            end: '-30px center',
            scrub: 3, // Same scrub value for smooth sync
            /* markers: true, */
        }
    });

    ropeTimeline
        // Rope comes down with scroll
        .fromTo('.ropeSVG', { yPercent: -70, xPercent: 58 }, { yPercent: -40, ease: 'power1.inOut' })
        // Swap container visibility when rope reaches its final position
        .set('.greenContainer2', { visibility: 'visible' }) // Show `.greenContainer2`
        .set('.containerGreen', { visibility: 'hidden' })   // Hide `.containerGreen`
        // Rope resets back up while the truck and the container move right
        .to('.ropeSVG', { yPercent: -70, ease: 'power1.inOut' })
        .to('.truckSVG', { x: 2000, ease: 'power1.inOut' }, "<"); // Truck and container move together




    var swiper = new Swiper('.whyChooseSwiper .swiper', {
        scrollbar: '.swiper-scrollbar',
        effect: 'coverflow',
        direction: 'vertical',
        loop: true,
        speed: 700,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        slideToClickedSlide: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: -1,
            stretch: 200,
            depth: 200,
            modifier: 1,
            slideShadows: false
        },
        freeMode: false,
        freeModeSticky: true
    });


    var sections = document.querySelectorAll('.valuePartner ');

    if (sections.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {

                    setTimeout(function () {
                        $(entry.target).addClass('in-viewport');
                    }, 150);
                } else {
                    $(entry.target).removeClass('in-viewport');
                }
            });
        }, {
            threshold: 0.3
        });
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    $(".tabing-main .tabContainer .tab-content-main .tabContent").fadeOut(300);
    $(".tabing-main .tabContainer .tab-content-main:first .tabContent").fadeIn(300);
    $(".tabing-main .tab-titles li:first").addClass("active-li");
    $(".tabing-main .tab-titles li a").on("click", function (event) {
        event.preventDefault();
        $(".tabing-main .tab-titles li").removeClass("active-li");
        $(this).parent().addClass("active-li");
        $(".tabing-main .tabContainer .tab-content-main .tabContent").fadeOut(300);
        $($(this).attr("href")).children(".tabContent").fadeIn(300);
    });
})


