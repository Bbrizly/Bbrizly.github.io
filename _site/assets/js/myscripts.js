let slideIndex = 0;
let slideTimer;

let coolModeActivated = false;

function activateCoolCursor() {
  document.body.style.cursor = "none";
  
  document.addEventListener('mousemove', createTrail);
}

function createTrail(e) {
  const trail = document.createElement('div');
  trail.classList.add('trail');
  
  trail.style.left = e.pageX + 'px';
  trail.style.top = e.pageY + 'px';
  document.body.appendChild(trail);
  
  setTimeout(() => {
    trail.remove();
  }, 1000);
}


document.addEventListener('DOMContentLoaded', () => {
  // --- Slideshow initialization ---
  startSlideshow();
  window.currentSlide = n => showSlide(n - 1);
  document.querySelectorAll('.dot').forEach((dot,i) => dot.addEventListener('click', () => showSlide(i)));
  document.querySelector('.prev').addEventListener('click', () => changeSlide(-1));
  document.querySelector('.next').addEventListener('click', () => changeSlide(1));

  // --- Surprise button ---
  const surpriseBtn = document.getElementById('surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      
      if (!coolModeActivated) {
        activateCoolCursor();
        coolModeActivated = true;
      }

      // document.body.style.background = getRandomGradient();
    });
  }

  // --- Work Experience toggle---
  const jobBtns = document.querySelectorAll('.job-btn');
  const jobDescriptions = document.querySelectorAll('.job-description');
  jobBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      jobBtns.forEach(b => b.classList.remove('active'));
      jobDescriptions.forEach(desc => desc.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.job).classList.remove('hidden');
    });
  });
});

// — Slideshow functions —

function startSlideshow() {
  slideTimer = setInterval(() => changeSlide(1), 5000);
  showSlide(slideIndex);
}

function changeSlide(offset) {
  showSlide(slideIndex + offset);
}

function showSlide(n) {
  clearInterval(slideTimer);

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');

  slideIndex = (n + slides.length) % slides.length;

  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active-dot'));

  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active-dot');

  slideTimer = setInterval(() => changeSlide(1), 5000);
}

// — Random gradient helper (unchanged) —

function getRandomGradient() {
  const random255 = () => Math.floor(Math.random()*256);
  return `linear-gradient(90deg, rgb(${random255()},${random255()},${random255()}), rgb(${random255()},${random255()},${random255()}))`;
}
