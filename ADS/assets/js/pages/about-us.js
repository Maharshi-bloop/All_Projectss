gsap.registerPlugin(ScrollTrigger);

const items = gsap.utils.toArray(".timeLineWrapper li");

function updateTimeline(progress) {

    const wrapper = document.querySelector(".timeLineWrapper");
    const wrapperTop = wrapper.offsetTop;

    const lineBottom =
        wrapperTop + (progress * wrapper.offsetHeight);

    items.forEach((item, index) => {

        item.classList.remove("in-view", "gone-view");

        const itemCenter =
            item.offsetTop + (item.offsetHeight / 2);

        if (lineBottom >= wrapperTop + itemCenter) {

            item.classList.add("gone-view");

            const nextItem = items[index + 1];

            if (
                !nextItem ||
                lineBottom <
                wrapperTop +
                nextItem.offsetTop +
                (nextItem.offsetHeight / 2)
            ) {
                item.classList.remove("gone-view");
                item.classList.add("in-view");
            }
        }
    });
}

const fillTween = gsap.to(".timeline-fill", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: ".timeLineWrapper",
        start: "top center",
        end: "bottom 80%",
        scrub: true,

        onUpdate: self => {
            updateTimeline(self.progress);
        },

        onRefresh: self => {
            updateTimeline(self.progress);
        }
    }
});

window.addEventListener("load", () => {
    ScrollTrigger.refresh();
});