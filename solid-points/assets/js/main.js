/* const header = document.querySelector('header');

let actualScroll = 0

window.addEventListener('scroll', () => {
    const top = Math.min(-(window.scrollY - actualScroll + header.clientHeight), 0)

    if (window.scrollY > actualScroll) {
        actualScroll = window.scrollY
    }

    if (top === 0) {
        actualScroll = window.scrollY + header.clientHeight
    }

    header.setAttribute("style", `--_top:${top}px`);
    header.classList.toggle('active', window.scrollY < actualScroll)
    header.classList.toggle('clr', window.scrollY > header.clientHeight * 1.5)
}) */
$(document).ready(function () {

    AOS.init(); // Ensure initialized
    setTimeout(function () {
        AOS.refresh();
    }, 300); // Delay to allow layout stabilization


    var scrolling;
    var position = 0;
    var delta = 5;
    var hh = $('header').outerHeight();
    var dh = $(document).height();
    var wh = $(window).height();


    $(window).scroll(function (event) {
        scrolling = true;
    });

    setInterval(function () {
        if (scrolling) {
            scrollFunction();
            scrolling = false;
        }
    }, 0);

    function scrollFunction() {
        var st = $(window).scrollTop();

        if (st === 0) {
            $('header').removeClass('scroll-down');
        }

        if (Math.abs(position - st) <= delta)
            return;

        if (st > position && st > hh) {
            $('header').removeClass('scroll-down').addClass('scroll-up');
        } else {
            if (st + wh < dh) {
                $('header').removeClass('scroll-up').addClass('scroll-down');
            }
        }

        position = st;
    }


    $(".navbar > ul > li").each(function () {
        if ($(this).children("ul").length > 0) {
            $(this).addClass("hasUl");
            $(this).children("ul").addClass("subMenu");
        }
    });
    $(".navbar ul li").on("click", function () {
        $("li").removeClass("active")
        $(this).addClass("active")
    })
    $("nav ul li").each(function () {
        if ($(this).find("ul li.menu-item.active").length > 0) {
            $(this).addClass("active");
        }
    });
    $(".toggleBtn").on("click", function () {
        $(".toggleBtn").toggleClass("closeBtn");
        $(".navbar ul").toggleClass("openMenu");
        $("body").toggleClass("overflowHidden");
    })

    function moveButton() {
        const $ctaBtn = $('.secondaryBrdrBtn');
        const $navbar = $('.navbar ul');
        const $headerCta = $('.headerCta');

        if ($(window).width() < 1025) {
            // Move into navbar if not already inside
            if (!$ctaBtn.closest('.navbar').length) {
                $ctaBtn.appendTo($navbar);
            }

            // Optional: handle submenu toggle
            $(".hasUl").off("click").on("click", function () {
                $(this).children(".subMenu").stop().slideToggle();
            });
        } else {
            // Move back into headerCta if not already there
            if (!$ctaBtn.closest('.headerCta').length) {
                $ctaBtn.appendTo($headerCta);
            }
        }
    }


    moveButton();
    $(window).on('resize', moveButton);





     var swiper = new Swiper('.tAndtSwiper .swiper', {
         loop: false,
         navigation: {
             nextEl: '.tAndtSwiperConroller .nextBtn',
             prevEl: '.tAndtSwiperConroller .preBtn',
         },
         slidesPerView: 1,
         paginationClickable: true,
         spaceBetween: 20,
     });
 
     swiper.on("slideChange slidesLengthChange", function () {shortcodeContent
         let currentSlide = this.activeIndex + 1;
         document.querySelector('.counter').innerHTML = `
         <span class="counter__current">STEP
         ${currentSlide}
         </span> 
         / 
         <span class="counter__total"> 
             ${this.slides.length}
         </span>`;
     }); 

    var sections = document.querySelectorAll(
        ".workListing"
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
            { threshold: 0.3 }
        );
        sections.forEach(function (section) {
            observer.observe(section);
        });
    }

    $(".ipbInner").on("click", function (e) {
        e.preventDefault();
        $(".CareerFormInner").addClass("active");
        $(".innerPageBanner").addClass("inActive");
        $(".solidpoint-progress").addClass("activeBar")
    });
});