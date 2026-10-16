
document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(".horizontal-section");
    const track = document.querySelector(".horizontal-track");
    const bg = document.querySelector(".shared-background");
    const panels = gsap.utils.toArray(".horizontal-track .panel");
    const stats = gsap.utils.toArray(".stats-grid .stat");
    const progressBar = document.querySelector(".progress-bar");

    if (!section || !track || !panels.length) return;

    // Initial states
    gsap.set(track, { x: 0 });

    if (bg) {
        gsap.set(bg, { x: 0 });
    }

    gsap.set(stats, {
        autoAlpha: 0,
        y: 30
    });

    // Horizontal scrolling
    const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + (track.scrollWidth - window.innerWidth),
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: self => {
                if (progressBar) {
                    gsap.set(progressBar, {
                        scaleX: self.progress,
                        transformOrigin: "left center"
                    });
                }
            }
        }
    });

    // Background movement synced with horizontal track
if (bg) {
    horizontalTween.eventCallback("onUpdate", function () {
        const progress = horizontalTween.progress();

        gsap.set(bg, {
            x: -200 * progress
        });
    });
}

    // Reveal each stat independently as it enters the viewport
    stats.forEach(function (stat) {
        gsap.to(stat, {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: stat,
                containerAnimation: horizontalTween,
                start: "left 85%",
                toggleActions: "play none none none"
            }
        });

        // Animate counters when their stat card appears
        const counter = stat.querySelector("[data-count]");

        if (counter) {
            const target = parseFloat(counter.dataset.count);
            const prefix = counter.dataset.prefix || "";
            const suffix = counter.dataset.suffix || "";

            const counterValue = { value: 0 };

            gsap.to(counterValue, {
                value: target,
                duration: 1.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: stat,
                    containerAnimation: horizontalTween,
                    start: "left 85%",
                    toggleActions: "play none none none"
                },
                onUpdate: function () {
                    counter.textContent =
                        prefix +
                        Math.round(counterValue.value).toLocaleString("en-IN") +
                        suffix;
                }
            });
        }
    });

    // Refresh measurements after images, fonts and layout settle
    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });

    window.addEventListener("resize", function () {
        ScrollTrigger.refresh();
    });

    ScrollTrigger.refresh();
});
