$(document).ready(function () {

    function easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }

    function countDecimals(val) {
        if (Math.floor(val) === val) return 0;
        return val.toString().split(".")[1].length || 0;
    }

    function formatNumber(val, decimals) {
        return val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    }

    // Calculate a smart starting value
    function getStartValue(end) {

        if (!Number.isInteger(end)) {
            return Math.floor(end);
        }

        if (end < 10) {
            return 0;
        }

        const digits = end.toString().length;
        const power = Math.pow(10, digits - 1);

        let firstDigit = Math.floor(end / power);
        let start = firstDigit * power;

        // If the number is already exactly at the start value,
        // move back by one place value.
        if (start === end) {
            start = Math.max(0, start - power);
        }

        return start;
    }

    function animateCount($el) {

        if ($el.hasClass("counted")) return;

        $el.addClass("counted");

        const end = parseFloat(
            $el.data("countup-number").toString().replace(/,/g, "")
        );

        const decimals = countDecimals(end);
        const start = getStartValue(end);

        const duration = 2500;
        let startTime = null;

        function step(timestamp) {

            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = easeOutQuint(progress);

            let current = start + (end - start) * eased;

            if (decimals === 0) {
                current = Math.round(current);
            }

            $el.text(formatNumber(current, decimals));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                $el.text(formatNumber(end, decimals));
            }
        }

        requestAnimationFrame(step);
    }

    function isInViewport(element) {
        const elementTop = element.offset().top;
        const elementBottom = elementTop + element.outerHeight();

        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();

        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    function checkCountUp() {

        $('[data-countup-number]').each(function () {

            const $this = $(this);

            if (isInViewport($this)) {
                animateCount($this);
            }

        });

    }

    $(window).on("scroll", checkCountUp);

    checkCountUp();



    var sections = document.querySelectorAll('.wellService ');

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

});