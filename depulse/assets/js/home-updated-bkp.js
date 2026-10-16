$(document).ready(function () {

    const $wrapper = $('.floatingTextListing');
    const $items = $('.floatingText');
    const $center = $('.centerText');
    const $svg = $('.floatingConnector');
    const $line = $('.connectorLine');

    if (
        !$wrapper.length ||
        !$items.length ||
        !$center.length ||
        !$svg.length ||
        !$line.length
    ) {
        return;
    }

    let currentIndex = 0;
    let timer = null;


    /* =========================
       SET CIRCLE POSITIONS
    ========================= */

    function setCirclePositions() {

        const total = $items.length;

        if (!total) return;

        const radius = parseFloat(
            getComputedStyle($wrapper[0])
                .getPropertyValue('--circle-radius')
        );

        const angleStep = 360 / total;

        $items.each(function (index) {

            const angle =
                (index * angleStep - 90) * Math.PI / 180;

            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            $(this).css({
                '--x': x + 'px',
                '--y': y + 'px'
            });
        });
    }


    /* =========================
       UPDATE CONNECTOR
    ========================= */

    function updateConnector() {

        const center = $center[0];
        const active = $items.eq(currentIndex)[0];
        const svg = $svg[0];
        const line = $line[0];

        if (!center || !active || !svg || !line) {
            return;
        }

        const svgRect = svg.getBoundingClientRect();
        const centerRect = center.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        /*
         * SVG coordinate system
         */
        const svgWidth = svgRect.width;
        const svgHeight = svgRect.height;

        $svg.attr({
            viewBox: `0 0 ${svgWidth} ${svgHeight}`
        });


        /*
         * Center point of centerText
         */
        const centerX =
            centerRect.left +
            centerRect.width / 2 -
            svgRect.left;

        const centerY =
            centerRect.top +
            centerRect.height / 2 -
            svgRect.top;


        /*
         * Center point of floatingText
         */
        const activeX =
            activeRect.left +
            activeRect.width / 2 -
            svgRect.left;

        const activeY =
            activeRect.top +
            activeRect.height / 2 -
            svgRect.top;


        /*
         * Calculate direction
         */
        const dx = activeX - centerX;
        const dy = activeY - centerY;

        const distance = Math.sqrt(
            dx * dx + dy * dy
        );

        if (distance === 0) {
            return;
        }

        const directionX = dx / distance;
        const directionY = dy / distance;


        /*
         * Start from edge of center circle
         */
        const centerRadius =
            centerRect.width / 2;

        const startX =
            centerX +
            directionX * centerRadius;

        const startY =
            centerY +
            directionY * centerRadius;


        /*
         * End at edge of floating circle
         */
        const floatingRadius =
            activeRect.width / 2;

        const endX =
            activeX -
            directionX * floatingRadius;

        const endY =
            activeY -
            directionY * floatingRadius;


        /*
         * Set line
         */
        $line.attr({
            x1: startX,
            y1: startY,
            x2: endX,
            y2: endY
        });

        $line.css({
            opacity: 1,
            visibility: 'visible'
        });
    }


    /* =========================
       SHOW NEXT ITEM
    ========================= */

    function showNextItem() {

        $items.eq(currentIndex).removeClass('active');

        currentIndex++;

        if (currentIndex >= $items.length) {
            currentIndex = 0;
        }

        $items.eq(currentIndex).addClass('active');

        /*
         * Wait for browser to apply the new position
         */
        requestAnimationFrame(function () {

            requestAnimationFrame(function () {
                updateConnector();
            });

        });
    }


    /* =========================
       START
    ========================= */

    function startAnimation() {

        clearInterval(timer);

        $items.removeClass('active');

        /*
         * First item
         */
        $items.eq(currentIndex).addClass('active');

        /*
         * Give browser time to render
         */
        setTimeout(function () {
            updateConnector();
        }, 100);


        /*
         * Change every 3 seconds
         */
        timer = setInterval(function () {
            showNextItem();
        }, 3000);
    }


    /* =========================
       INITIAL SETUP
    ========================= */

    setCirclePositions();

    startAnimation();


    /* =========================
       RESIZE
    ========================= */

    let resizeTimer;

    $(window).on('resize', function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            setCirclePositions();

            requestAnimationFrame(function () {
                updateConnector();
            });

        }, 150);

    });

});