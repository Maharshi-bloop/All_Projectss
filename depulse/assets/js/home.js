/* floating text animation start*/
    const $floatingTexts = $('.floatingText');
    const $connector = $('.connectorLine');

    let currentIndex = 0;

    function animateConnector() {

        const $center = $('.centerText');
        const $active = $floatingTexts.eq(currentIndex);

        const centerRect = $center[0].getBoundingClientRect();
        const activeRect = $active[0].getBoundingClientRect();
        const parentRect = $('.ideaRight')[0].getBoundingClientRect();

        const x1 = centerRect.left + centerRect.width / 2 - parentRect.left;
        const y1 = centerRect.top + centerRect.height / 2 - parentRect.top;

        const x2 = activeRect.left + activeRect.width / 2 - parentRect.left;
        const y2 = activeRect.top + activeRect.height / 2 - parentRect.top;

        // Reduce connector length by 60px
        const angle = Math.atan2(y2 - y1, x2 - x1);

        var newX2 = x2 - Math.cos(angle) * 60;
        var newY2 = y2 - Math.sin(angle) * 60;

        if ($(window).width() <= 1024) {
            var newX2 = x2 - Math.cos(angle) * 30;
            var newY2 = y2 - Math.sin(angle) * 30;
        }
        /* else if ($(window).width() <= 480) {
            var newX2 = x2 - Math.cos(angle) * 1000;
            var newY2 = y2 - Math.sin(angle) * 1000;
        } */

        // Draw line directly from center to floating text
        $connector.attr({
            x1: x1,
            y1: y1,
            x2: newX2,
            y2: newY2
        });

        // Show floating text
        $active.addClass('active');
    }

    function changeFloatingText() {

        // Hide current
        $floatingTexts.eq(currentIndex).removeClass('active');

        // Next
        currentIndex++;

        if (currentIndex >= $floatingTexts.length) {
            currentIndex = 0;
        }

        // Show next
        $floatingTexts.eq(currentIndex).addClass('active');

        // Animate connector
        animateConnector();
    }

    // First item
    $floatingTexts.eq(0).addClass('active');

    // Initial connector
    setTimeout(function () {
        animateConnector();
    }, 100);

    // Change every 3 seconds
    setInterval(changeFloatingText, 2000);

    /* floating text animation end*/