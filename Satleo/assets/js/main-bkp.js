/* if ($(window).width() > 480) {
    var eleRot = (eleItr = 360 / 6);
    var radialRot = 0;

    $(".contentWrapper .insightList").each(function (index, ele) {
        var listRot = index * eleRot;
        $(this).css("transform", "rotate(" + listRot + "deg)");
        $(this).find(".insightListInner").css("transform", "rotate(-" + listRot + "deg)");
    });
} */
function stickyHeader() {
    var headerHeight = $('header').innerHeight();
    if ($(window).scrollTop() > headerHeight) {
        $('header').addClass('stickyHeader')
    }
    else {
        $('header').removeClass('stickyHeader')
    }
}
stickyHeader();
$(window).on('scroll', function (event) {
    stickyHeader();
});

// $(".headeroption ul li").first().children("a").addClass("active")
$(".headeroption ul li").on("click", function () {
    $(".headeroption ul li").children("a").removeClass("active")
    $(this).children("a").addClass("active")
})

var sections = document.querySelectorAll('.introSetleoLab , .halfContent');

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


$(".toggleBtn").on("click", function () {
    $("body").toggleClass("scrollOff");
    $(".headerRight").toggleClass("activeSubMenu");
})





/* const items = Array.from(document.querySelectorAll(".insightList"));
const centerX = 0;
const centerY = 0;
const radius = 370;
let angleStep = (2 * Math.PI) / items.length;
let rotationIndex = 0;

function positionItems() {
    items.forEach((item, i) => {
        const angle = angleStep * ((i + rotationIndex) % items.length) - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) - 0;
        const y = centerY + radius * Math.sin(angle) + 280;

        gsap.to(item, {
            x: x,
            y: y,
            duration: 1
        });

        item.classList.toggle("active", i === 0);
    });
}

positionItems();
setInterval(() => {
    rotationIndex = (rotationIndex + 1) % items.length;
    positionItems();
}, 100000); */








