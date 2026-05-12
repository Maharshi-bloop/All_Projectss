$(document).ready(function () {
    $(".headerUl > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });

    $(".toggleBtn").on("click", function () {
        $(".headerOption").addClass("active");
        $("body").addClass("scrollOff")
    })
    $(".closeBtn").on("click", function () {
        $(".headerOption").removeClass("active");
        $("body").removeClass("scrollOff")
    })

    $(".headerUl ul li.menu-item").on("click", function () {
        $(".headerUl ul li.menu-item").removeClass("active")
        $(this).addClass("active")
    })
    $(".headerUl ul li.menu-item").each(function () {

        if ($(this).find("ul li.menu-item.active").length > 0) {
            $(this).addClass("active");
        }
    });

    if ($(window).width() <= 1366) {
        $(".headerUl > ul > li").off("click").on("click", function (e) {
            e.stopPropagation();
            $(this).siblings().find("ul").slideUp();
            if ($(this).children("ul").length > 0) {
                $(this).children("ul").stop().slideToggle();
            }
        });
    }

    /* $('[data-fancybox]').fancybox({
        youtube: {
            controls: 0,
            showinfo: 0
        },
        vimeo: {
            color: 'f00'
        }
    }); */


    // Initialize classes
    $(".oneCompare").removeClass("activeSlide prevSlide nextSlide"); // Reset all classes
    $(".oneCompare:first-child").addClass("activeSlide"); // Set the first slide as active
    $(".oneCompare:first-child").next(".oneCompare").addClass("nextSlide"); // Set the second slide as next
    $(".oneCompare:first-child").prev(".oneCompare").addClass("prevSlide"); // Not necessary initially, but added for consistency

    // Next Slide button click
    $(".nextSlide").on("click", function (e) {
        e.preventDefault();

        let $current = $(".oneCompare.activeSlide"); // Get the currently active slide
        let $next = $current.next(".oneCompare"); // Get the next slide in sequence

        if ($next.length) { // Check if the next slide exists
            // Update current slide
            $current.removeClass("activeSlide").addClass("prevSlide");

            // Update next slide
            $next.removeClass("nextSlide").addClass("activeSlide");

            // Update the new next slide
            $next.next(".oneCompare").addClass("nextSlide").removeClass("prevSlide");
        }
    });

    // Previous Slide button click
    $(".prevSlide").on("click", function (e) {
        e.preventDefault();

        let $current = $(".oneCompare.activeSlide"); // Get the currently active slide
        let $prev = $current.prev(".oneCompare"); // Get the previous slide in sequence

        if ($prev.length) { // Check if the previous slide exists
            // Update current slide
            $current.removeClass("activeSlide").addClass("nextSlide");

            // Update previous slide
            $prev.removeClass("prevSlide").addClass("activeSlide");

            // Update the new previous slide
            $prev.prev(".oneCompare").addClass("prevSlide").removeClass("nextSlide");
        }
    });





    /*  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
 
     let timeln = gsap.timeline({
         scrollTrigger: {
             trigger: ".planet",
             pin: true,
             pinSpacing: true,
             start: "top top",
             end: "+=2000",  // Increased scroll duration (more scroll needed)
             scrub: 0.4      // Slower and less smooth animation (lower scrub value)
         }
     });
 
     const columns = document.querySelectorAll(".planetCardWrapper .row .col-lg-6");
 
     timeln.to(columns[0], {
         x: -500,
         opacity: 0,
         duration: 5,
         delay: 1,
     })
         .to(columns[1], {
             x: 500,
             opacity: 0,
             duration: 5,
             delay: 1,
         }, "0");
 
     timeln.to(columns[2], {
         x: -500,
         opacity: 0,
         duration: 5,
         delay: 1,
     })
         .to(columns[3], {
             x: 500,
             opacity: 0,
             duration: 5,
             delay: 1,
         }, "-=0.05");
 
     timeln.to(columns[4], {
         x: -500,
         opacity: 0,
         duration: 5,
         delay: 1,
     })
         .to(columns[5], {
             x: 500,
             opacity: 0,
             duration: 5,
             delay: 1,
         }, "-=0.05");
     timeln.to(columns[6], {
         x: -500,
         opacity: 0,
         duration: 5,
         delay: 1,
     })
         .to(columns[7], {
             x: 500,
             opacity: 0,
             duration: 5,
             delay: 1,
         }, "-=0.05");
     timeln.to(columns[8], {
         x: 0,
         opacity: 1,
         duration: 5,
         delay: 1,
     })
         .to(columns[9], {
             x: 0,
             opacity: 1,
             duration: 5,
             delay: 1,
         }, "-=0.05"); */

})



