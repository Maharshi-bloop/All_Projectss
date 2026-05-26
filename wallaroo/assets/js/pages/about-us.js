if ($(window).width() > 480) {

    gsap.registerPlugin(ScrollTrigger);

    const section = document.querySelector(".threeTowns");
    const line = document.querySelector(".threeTownsHoriListing");
    const items = gsap.utils.toArray(".threeTownsHoriList");

    if (section && line && items.length) {

        ScrollTrigger.create({
            trigger: section,
            start: "10% top",
            end: "+=200%",
            scrub: true,
            pin: true,
            anticipatePin: 1,

            onUpdate: (self) => {

                // line width progress
                const lineWidth = self.progress * window.innerWidth * 1.2;

                // update CSS variable
                line.style.setProperty("--line-width", `${lineWidth}px`);

                // line start position
                const lineStart = line.getBoundingClientRect().left - 50;

                // current line end position
                const lineEnd = lineStart + lineWidth;

                items.forEach((item) => {

                    // diamond position
                    const diamond = item.querySelector(":scope");

                    const itemLeft = item.getBoundingClientRect().left;

                    // toggle when line touches diamond
                    if (lineEnd >= itemLeft) {
                        item.classList.add("active");
                    } else {
                        item.classList.remove("active");
                    }

                });

            }
        });

    }
}