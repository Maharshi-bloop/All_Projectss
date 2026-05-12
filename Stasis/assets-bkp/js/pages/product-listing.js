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
    const controller = document.querySelector('.swiperContller[data-target="' + key + '"]');

    if (controller) {
        if (slides <= 2) {
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

            // 🔥 CATEGORY FILTER (HARD HIDE OTHER CATEGORIES)
            if (selectedCat !== "all" && rowCat !== selectedCat) {
                row.style.display = "none";

                // also hide category nav
                let catEl = document.querySelector(`.productCata[data-cat="${rowCat}"]`);
                if (catEl) catEl.style.display = "none";

                return;
            }

            // 🔍 SEARCH FILTER
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

            // 👇 ROW VISIBILITY
            row.style.display = (visibleCount > 0) ? "block" : "none";

            // 🔥 SWIPER CONTROL (REAL FIX)
            let swiperEl = row.querySelector(".swiper");

            if (swiperEl && swiperEl.swiper) {

                let swiperInstance = swiperEl.swiper;

                let nextBtn = row.querySelector(".swiper-button-next");
                let prevBtn = row.querySelector(".swiper-button-prev");

                if (visibleCount <= 2) {

                    // 🔴 Disable swiper
                    swiperInstance.disable();

                    // 🔴 Force wrapper to behave like normal flex (so items still show)
                    swiperInstance.wrapperEl.style.transform = "none";

                    // 🔴 Hide navigation
                    if (nextBtn) nextBtn.style.display = "none";
                    if (prevBtn) prevBtn.style.display = "none";

                } else {

                    // 🟢 Enable swiper
                    swiperInstance.enable();

                    // 🟢 Show navigation
                    if (nextBtn) nextBtn.style.display = "flex";
                    if (prevBtn) prevBtn.style.display = "flex";

                    // 🟢 IMPORTANT: update swiper after filtering
                    swiperInstance.update();
                }
            }

            // 🔢 UPDATE CATEGORY COUNT + VISIBILITY
            let catEl = document.querySelector(`.productCata[data-cat="${rowCat}"]`);
            //console.log(catEl, visibleCount);
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

    /* =========================
       FILTER DROPDOWN
    ========================== */
    filterDropdown.addEventListener("change", function () {

        categoryItems.forEach(c => c.classList.remove("active"));

        if (this.value !== "all") {
            let activeCat = document.querySelector(`.productCata[data-cat="${this.value}"]`);
            if (activeCat) activeCat.classList.add("active");
        }

        applyFilters();
    });

    /* =========================
       SEARCH
    ========================== */
    searchInput.addEventListener("keyup", function () {

        // 🔥 RESET TO ALL WHEN SEARCH CLEARED
        if (this.value.trim() === "") {
            filterDropdown.value = "all";
            categoryItems.forEach(c => c.classList.remove("active"));
        }

        applyFilters();
    });

    /* =========================
       INIT
    ========================== */
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