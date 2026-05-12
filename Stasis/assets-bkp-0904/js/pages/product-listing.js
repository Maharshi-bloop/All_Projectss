// store all swiper instances
const swipers = {};

// initialize all swipers
document.querySelectorAll(".productListingRow .swiper").forEach(function (swiperEl) {

    const key = Array.from(swiperEl.classList).find(c => c !== "swiper");
    if (!key) return;

    const slides = swiperEl.querySelectorAll(".swiper-slide").length;

    swipers[key] = new Swiper(swiperEl, {
        slidesPerView: 2,
        spaceBetween: 0,
        speed: 800,
        loop: false,
        breakpoints: {
            720:{
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 10
            },
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10
            }
        }
    });

    const controller = document.querySelector('.swiperContller[data-target="' + key + '"]');

    if (controller) {
        controller.style.display = (slides <= 2) ? "none" : "flex";
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


/* =========================
   CLICK OUTSIDE CLOSE
========================= */
$(document).on('click', function (e) {

    if (!$(e.target).closest('.productDetailInner, .productList').length) {

        $('.productDetailOuter').removeClass('activepopUp');
        $('.productList').removeClass('activeProduct');
        $('body').removeClass('scrollOff');

    }

});


/* =========================
   FILTER + SEARCH
========================= */
document.addEventListener("DOMContentLoaded", function () {

    const filterDropdown = document.getElementById("productFilter");
    const searchInput = document.getElementById("productSearch");

    const categoryItems = document.querySelectorAll(".productCata");
    const productRows = document.querySelectorAll(".productListingRow");

    function applyFilters() {

        let selectedCat = filterDropdown.value;
        let search = searchInput.value.toLowerCase().trim();

        productRows.forEach(row => {

            let rowCat = row.dataset.cat;
            let visibleCount = 0;

            let slides = row.querySelectorAll(".swiper-slide");

            // CATEGORY FILTER
            if (selectedCat !== "all" && rowCat !== selectedCat) {
                row.style.display = "none";

                let catEl = document.querySelector(`.productCata[data-cat="${rowCat}"]`);
                if (catEl) catEl.style.display = "none";

                return;
            }

            // SEARCH FILTER
            slides.forEach(slide => {

                let product = slide.querySelector(".productList");
                let name = product.dataset.name.toLowerCase();

                if (name.includes(search)) {
                    slide.style.display = "block";
                    visibleCount++;
                } else {
                    slide.style.display = "none";
                }

            });

            // ROW VISIBILITY
            row.style.display = (visibleCount > 0) ? "block" : "none";

            // SWIPER CONTROL
            let swiperEl = row.querySelector(".swiper");

            if (swiperEl && swiperEl.swiper) {

                let swiperInstance = swiperEl.swiper;

                let nextBtn = row.querySelector(".swiper-button-next");
                let prevBtn = row.querySelector(".swiper-button-prev");

                if (visibleCount <= 2) {

                    swiperInstance.disable();
                    swiperInstance.wrapperEl.style.transform = "none";

                    if (nextBtn) nextBtn.style.display = "none";
                    if (prevBtn) prevBtn.style.display = "none";

                } else {

                    swiperInstance.enable();

                    if (nextBtn) nextBtn.style.display = "flex";
                    if (prevBtn) prevBtn.style.display = "flex";

                    swiperInstance.update();
                }
            }

            // CATEGORY COUNT UPDATE
            let catEl = document.querySelector(`.productCata[data-cat="${rowCat}"]`);

            if (catEl) {

                let countEl = catEl.querySelector("i");
                let countNAV = catEl.querySelector(".swiperContller");

                if (countEl) {
                    countEl.textContent = `${visibleCount} Products`;
                }

                catEl.style.display = (visibleCount > 0) ? "block" : "none";

                if (visibleCount <= 2 && countNAV) {
                    countNAV.style.display = "none";
                }
            }

        });

    }

    /* FILTER DROPDOWN */
    filterDropdown.addEventListener("change", function () {

        categoryItems.forEach(c => c.classList.remove("active"));

        if (this.value !== "all") {
            let activeCat = document.querySelector(`.productCata[data-cat="${this.value}"]`);
            if (activeCat) activeCat.classList.add("active");
        }

        applyFilters();
    });

    /* SEARCH */
    searchInput.addEventListener("keyup", function () {

        if (this.value.trim() === "") {
            filterDropdown.value = "all";
            categoryItems.forEach(c => c.classList.remove("active"));
        }

        applyFilters();
    });

    /* INIT */
    applyFilters();

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