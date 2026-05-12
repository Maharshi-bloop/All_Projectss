
/* document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('frontImage');
    const ctx = canvas.getContext('2d');
    const brushSize = 100;  // Size of the "brush" for erasing

    // Load the top image
    const topImage = new Image();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    topImage.src = 'E:/GIT/All_Project/Setleo/assets/images/front-image.jpg';
    topImage.onload = function () {
      ctx.drawImage(topImage, 0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'destination-out'; // Set the composite mode


      // Now load the background image
      document.getElementById('backImage').src = 'E:/GIT/All_Project/Setleo/assets/images/back-image.jpg';
    };

    // Mouse move event to erase the top image and reveal the background
    canvas.addEventListener('mousemove', function (e) {
      let rect = canvas.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      // Smooth radial gradient effect for erasing, with soft edges
      let gradient = ctx.createRadialGradient(mouseX, mouseY, brushSize * 0.1, mouseX, mouseY, brushSize);
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, brushSize, 0, 2 * Math.PI);
      ctx.fill();
    });
}) */



const $canvas = $('#frontImage');
const canvas = $canvas[0];
const ctx = canvas.getContext('2d');
const brushSize = 200;

const frontImg = new Image();
const backImg = new Image();

let mouseX = null, mouseY = null;

// Set canvas size to match its display size
function resizeCanvas() {
    canvas.width = $canvas.width();
    canvas.height = $canvas.height();
}
resizeCanvas();

// Load both images
frontImg.src = './assets/images/front-image.webp';
backImg.src = './assets/images/back-image.webp';

let imagesLoaded = 0;
frontImg.onload = backImg.onload = function () {
    imagesLoaded++;
    if (imagesLoaded === 2) {
        render();
    }
};

function render() {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw front image full screen
    ctx.drawImage(frontImg, 0, 0, canvas.width, canvas.height);

    if (mouseX !== null && mouseY !== null) {
        // Create a temporary off-screen canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw back image to temp canvas
        tempCtx.drawImage(backImg, 0, 0, canvas.width, canvas.height);

        // Create gradient mask
        const gradient = tempCtx.createRadialGradient(mouseX, mouseY, brushSize * 0.1, mouseX, mouseY, brushSize);
        gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        tempCtx.globalCompositeOperation = 'destination-in';
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw masked result onto main canvas
        ctx.drawImage(tempCanvas, 0, 0);
    }
}

// Track mouse position
$canvas.on('mousemove', function (e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    mouseX = (e.clientX - rect.left) * scaleX;
    mouseY = (e.clientY - rect.top) * scaleY;
});

// Remove spotlight when mouse leaves
$canvas.on('mouseleave', function () {
    mouseX = null;
    mouseY = null;
});

// Handle resize
$(window).on('resize', function () {
    resizeCanvas();
});


var sections = document.querySelectorAll('.workingVideoOuter');

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


// Swiper: Slider
new Swiper('.srvcWorkingSwiper .swiper ', {
    loop: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 20,
    breakpoints: {
        
        768: {
            slidesPerView: 1,
            spaceBetween: 30
        },
        480: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    }
});
