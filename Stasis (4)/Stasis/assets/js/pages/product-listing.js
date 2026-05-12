// store all swiper instances
const swipers = {};

// initialize all swipers
document.querySelectorAll(".productListing .swiper").forEach(function (swiperEl) {

    // get second class like cata1, cata2 etc
    const key = Array.from(swiperEl.classList).find(c => c !== "swiper");

    if (!key) return;

    const slides = swiperEl.querySelectorAll(".swiper-slide").length;

    swipers[key] = new Swiper(swiperEl, {
        slidesPerView: 2,
        spaceBetween: 0,
        speed: 800,
        loop: false
    });

    // find related controller
    const controller = document.querySelector('.swiperContller[data-target="'+key+'"]');

    if(controller){
        if(slides <= 2){
            controller.style.display = "none";
        } else {
            controller.style.display = "flex"; // or block
        }
    }

});


// connect controllers
document.querySelectorAll(".swiperContller").forEach(function (controller) {

    const target = controller.dataset.target;

    if (!swipers[target]) return;

    const prev = controller.querySelector(".pre");
    const next = controller.querySelector(".next");

    prev.addEventListener("click", function () {
        swipers[target].slidePrev();
    });

    next.addEventListener("click", function () {
        swipers[target].slideNext();
    });

});



/* open popup */
$('.productList').on('click', function (e) {

    e.preventDefault();

    // remove active state from all
    $('.productList').removeClass('activeProduct');

    // add active state to clicked
    $(this).addClass('activeProduct');

    // get all classes
    let classes = $(this).attr('class').split(' ');

    // find class containing "product" but not "productList"
    let productClass = classes.find(c => c.includes('product') && c !== 'productList');

    // update popup target
    $('.productDetailOuter')
        .attr('data-target', productClass)
        .addClass('activepopUp');

    $('body').addClass('scrollOff');

});


/* close popup */
$('.popUpCloseBtn').on('click', function () {

    $('.productDetailOuter').removeClass('activepopUp');

    $('.productList').removeClass('activeProduct');

    $('body').removeClass('scrollOff');

});


/* click outside popup */
$(document).on('click', function (e) {

    if (!$(e.target).closest('.productDetailInner, .productList').length) {

        $('.productDetailOuter').removeClass('activepopUp');

        $('.productList').removeClass('activeProduct');

        $('body').removeClass('scrollOff');

    }

});


/* function adjustOtherDetailHeight() {
    $(window).on('resize', function () {
        $('.productList').each(function () {
            const headHeight = $(this).find('.productPopUpHead').outerHeight();
            $(this).find('.otherDetail').css({
                height: `calc(100% - ${headHeight}px)`
            });
        });
    }).trigger('resize');
}
adjustOtherDetailHeight(); */
/* popup js end */