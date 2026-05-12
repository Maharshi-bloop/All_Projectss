// Function to animate the count
function animateCount(element) {
    $(element).prop('Counter', 0).animate({
        Counter: $(element).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
            $(element).text(Math.ceil(now));
        }
    });
}

// Use IntersectionObserver to trigger animation when elements are visible
let observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let element = entry.target;

            // Check if the animation has already run
            if (!$(element).hasClass('animated')) {
                animateCount(element);
                $(element).addClass('animated'); // Mark as animated
            }

            // Stop observing the element after animation
            observer.unobserve(element);
        }
    });
}, { threshold: 0.1 }); // Adjust threshold as needed

// Observe all elements with the class 'count'
$('.count').each(function () {
    observer.observe(this);
});
