AOS.init(); // Ensure initialized

$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization

    let selectedPDF = '';

    // Open popup
    $(document).on('click', '.open-case-popup', function () {
        selectedPDF = $(this).data('pdf');

        if (!selectedPDF) return;

        $('#caseStudyPopup').fadeIn();
    });

    // Close popup
    $(document).on('click', '.case-popup-close, .case-popup-overlay', function () {
        $('#caseStudyPopup').fadeOut();
    });

    // After form submit
    document.addEventListener('wpcf7mailsent', function () {

        if (selectedPDF) {
            window.open(selectedPDF, '_blank');
            $('#caseStudyPopup').fadeOut();
        }

    }, false);


    // Add smooth scrolling to all links
    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
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
    /* $("nav > ul > li").first().addClass("active"); */
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

})