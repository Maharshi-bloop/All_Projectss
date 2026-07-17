/* gsap.registerPlugin(ScrollTrigger);

const wrap = document.getElementById('animated-section');
const path = document.getElementById('routePath');
function setupScrollDraw() {
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  ScrollTrigger.create({
    trigger: wrap,
    start: 'top 85%',
    end: 'bottom 50%',
    scrub: 2.5,
    markers: false, 
    onUpdate: self => {
      path.style.strokeDashoffset = length * (1 - self.progress);
    }
  });
}

window.addEventListener('load', setupScrollDraw);


let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
});

function circularText(txt, radius, classIndex) {
    txt = txt.split("");
    classIndex = document.getElementsByClassName("circTxt")[classIndex];

    var deg = 180 / txt.length;
    var origin = 270; 

    txt.forEach((ea) => {
        ea = `<p style='height:${radius}px;position:absolute;transform:rotate(${origin}deg);transform-origin:0 100%;margin:0;padding:0'>${ea}</p>`;
        classIndex.innerHTML += ea;
        origin -= deg; 
    });
}

circularText("From production floors to store shelves across regions. ", 320, 0); */


