
$('img').each(function () {
    // If image is broken (already attempted to load), trigger error handler manually
    if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
        $(this).hide();
    }
});

// Also handle future errors (images loaded after DOM ready)
$('img').on('error', function () {
    $(this).hide();
});