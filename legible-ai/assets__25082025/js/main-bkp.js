/* $(function () {
    const $videos = $(".videoWrap video");
    let currentIndex = 0;

    // Disable autoplay for all except first
    $videos.each(function (i) {
        this.pause();
        if (i === 0) this.play();
    });

    // Progress bar animation loop
    setInterval(() => {
        const currentVideo = $videos.get(currentIndex);
        const duration = currentVideo.duration || 1;
        const currentTime = currentVideo.currentTime || 0;
        const percentage = (currentTime / duration) * 100;

        $(".lineWrap > span > span").css("width", "0"); // reset all
        $(".videoWrap").eq(currentIndex).find(".lineWrap > span > span").css("width", percentage + "%");
    }, 30);

    // Listen for each video's end and play the next
    $videos.each(function (i) {
        this.addEventListener("ended", function () {
            if (i + 1 < $videos.length) {
                currentIndex = i + 1;
                $videos.get(currentIndex).play();
            }
        });
    });
});
 */


/* $(function () {
    const $video = $(".videoWrap video").get(0);
    const $lineWraps = $(".lineWrap");
    const $lines = $(".lineWrap > span > span");

    $video.play();

    $lines.css("width", "0%");
    $lineWraps.show(); // ensure all are visible on start

    setInterval(() => {
        const t = $video.currentTime;

        const ranges = [
            { start: 0, end: 2 },
            { start: 2, end: 7 },
            { start: 7, end: 10 },
            { start: 10, end: $video.duration || 12 }
        ];

        $lines.css("width", "0%");
        $lineWraps.show(); // reset show in case of replay

        ranges.forEach((range, index) => {
            const $wrap = $lineWraps.eq(index);
            const $line = $lines.eq(index);

            if (t >= range.start && t <= range.end) {
                const progress = ((t - range.start) / (range.end - range.start)) * 100;
                $line.css("width", progress + "%");
            } else if (t > range.end) {
                $line.css("width", "100%");
                $wrap.hide(); // hide completed
            }
        });

    }, 30);
}); */



/* $(function () {
    const $video = $(".videoWrap video").get(0);
    const $lineWraps = $(".lineWrap");
    const $lines = $(".lineWrap > span > span");

    $video.play();

    $lines.css("width", "0%");
    $lineWraps.removeClass("hidden"); // make sure all are visible initially

    setInterval(() => {
        const t = $video.currentTime;

        const ranges = [
            { start: 0, end: 2 },
            { start: 2, end: 7 },
            { start: 7, end: 10 },
            { start: 10, end: $video.duration || 12 }
        ];

        $lines.css("width", "0%");
        $lineWraps.removeClass("hidden"); // reset visibility for replay

        ranges.forEach((range, index) => {
            const $wrap = $lineWraps.eq(index);
            const $line = $lines.eq(index);

            if (t >= range.start && t <= range.end) {
                const progress = ((t - range.start) / (range.end - range.start)) * 100;
                $line.css("width", progress + "%");
            } else if (t > range.end) {
                $line.css("width", "100%");
                $wrap.addClass("hidden"); // hide with CSS
            }
        });

    }, 30);
}); */



$(function () {
    const $videos = $(".videoDiv video");
    const $videoDivs = $(".videoDiv");
    const $lineWraps = $(".col-lg-3 .lineWrap");
    let currentIndex = 0;

    // Step 1: Setup — pause and hide all videos
    $videos.each(function (i, video) {
        video.pause();
        $(video).closest(".videoDiv").hide();

        // Add ended listener to play next video
        video.addEventListener("ended", () => {
            moveToNextVideo();
        });
    });

    // Step 2: Show and play the first video
    $videoDivs.eq(currentIndex).show();
    const firstVideo = $videos.get(currentIndex);
    firstVideo.currentTime = 0;
    firstVideo.play();

    // Step 3: Animate the lineWrap progress bar
    setInterval(() => {
        const video = $videos.get(currentIndex);
        const duration = video.duration || 1;
        const currentTime = video.currentTime || 0;
        const progress = (currentTime / duration) * 100;

        // Reset all progress bars
        $lineWraps.find("span > span").css("width", "0%");
        $lineWraps.removeClass("hidden");

        // Animate only current progress bar
        $lineWraps.eq(currentIndex).find("span > span").css("width", progress + "%");

        // Hide completed
        if (progress >= 100) {
            $lineWraps.eq(currentIndex).addClass("hidden");
        }
    }, 30);

    // Step 4: Manual click on .videoDetailInner
    $(".videoDetailContent div").on("click", function () {
        const clickedIndex = $(this).closest(".col-lg-3").index();

        if (clickedIndex === currentIndex) return; // Already playing

        // Pause and reset current
        $videos.get(currentIndex).pause();
        $videoDivs.eq(currentIndex).fadeOut(300);
        $lineWraps.eq(currentIndex).find("span > span").css("width", "0%");
        $lineWraps.eq(currentIndex).removeClass("hidden");

        // Update index and play selected video
        currentIndex = clickedIndex;

        const selectedVideo = $videos.get(currentIndex);
        $videoDivs.eq(currentIndex).fadeIn(300);
        selectedVideo.currentTime = 0;
        selectedVideo.play();
    });

    // Step 5: Auto play next video in loop
    function moveToNextVideo() {
        // Pause and reset current
        $videos.get(currentIndex).pause();
        $videoDivs.eq(currentIndex).fadeOut(300);
        $lineWraps.eq(currentIndex).find("span > span").css("width", "0%");
        $lineWraps.eq(currentIndex).removeClass("hidden");

        // Move to next
        currentIndex = (currentIndex + 1) % $videos.length;

        const nextVideo = $videos.get(currentIndex);
        $videoDivs.eq(currentIndex).fadeIn(300);
        nextVideo.currentTime = 0;
        nextVideo.play();
    }
});

