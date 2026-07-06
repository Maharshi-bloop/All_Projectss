function circularText(txt, radius, classIndex) {
  txt = txt.split("");
  classIndex = document.getElementsByClassName("circTxt")[classIndex];

  var deg = 180 / txt.length;
  var origin = 270; // ← Start from LEFT side of bottom arc

  txt.forEach((ea) => {
    ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%;margin:0;padding:0'>${ea}</p>`;
    classIndex.innerHTML += ea;
    origin -= deg; // ← Decrement toward 90° (sweeps through bottom)
  });
}

circularText("From production floors to store shelves across regions. ", 320, 0);


gsap.registerPlugin(ScrollTrigger);

const wrap = document.getElementById('animated-section');
const svg = document.getElementById('svgRoute');
const path = document.getElementById('routePath');
const listItems = Array.from(document.querySelectorAll('.madeList .madeImage'));

let scrollTriggerInstance = null;

/*
  Builds a smooth curved "d" attribute that passes through the center of
  every .madeImage circle, in document order top-to-bottom. Using the real
  element positions (instead of hardcoded coordinates) means the line stays
  correct no matter how the layout reflows — different screen widths,
  different image sizes, content changes, etc.
*/
function buildPath() {
  const wrapRect = wrap.getBoundingClientRect();

  // svg needs to match the wrapper's current size exactly
  svg.setAttribute('width', wrapRect.width);
  svg.setAttribute('height', wrapRect.height);
  svg.setAttribute('viewBox', `0 0 ${wrapRect.width} ${wrapRect.height}`);

  const points = listItems.map(el => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - wrapRect.left,
      y: r.top + r.height / 2 - wrapRect.top
    };
  });

  if (points.length < 2) return;

  // Catmull-Rom -> cubic bezier conversion for a smooth, natural curve
  // through every point (this is what gives the wandering, hand-drawn feel
  // in the reference image rather than straight zig-zag segments).
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  path.setAttribute('d', d);
}

function setupScrollDraw() {
  buildPath();

  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  if (scrollTriggerInstance) scrollTriggerInstance.kill();

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: wrap,
    start: 'top 75%',
    end: 'bottom 65%',
    scrub: 1,
    // markers: true, // uncomment while developing to see the trigger range
    onUpdate: self => {
      path.style.strokeDashoffset = length * (1 - self.progress);
    }
  });
}

// Wait for real images to load (or fail) before measuring, otherwise the
// wrapper height/positions can shift after the path is drawn once.
window.addEventListener('load', () => {
  setupScrollDraw();
});

// Recompute on resize (debounced) since the whole point of measuring the
// DOM instead of hardcoding points is staying correct across breakpoints.
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(setupScrollDraw, 200);
});