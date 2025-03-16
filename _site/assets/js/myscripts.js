document.addEventListener('DOMContentLoaded', () => {
  
  const surpriseBtn = document.getElementById('surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      document.body.style.background = getRandomGradient();
    });
  }

  function getRandomGradient() {
    const colors = [
      `rgb(${random255()}, ${random255()}, ${random255()})`,
      `rgb(${random255()}, ${random255()}, ${random255()})`
    ];
    return `linear-gradient(90deg, ${colors[0]}, ${colors[1]})`;
  }

  function random255() {
    return Math.floor(Math.random() * 256);
  }

  let slideIndex = 0;
  autoShowSlides();

  function autoShowSlides() {
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active-dot";
    setTimeout(autoShowSlides, 5000);
  }

  window.currentSlide = function(n) {
    slideIndex = n - 1;
    autoShowSlides();
  };

  const jobBtns = document.querySelectorAll('.job-btn');
  const jobDescriptions = document.querySelectorAll('.job-description');

  jobBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      jobBtns.forEach(b => b.classList.remove('active'));
      jobDescriptions.forEach(desc => desc.classList.add('hidden'));

      btn.classList.add('active');
      const jobId = btn.getAttribute('data-job');
      document.getElementById(jobId).classList.remove('hidden');
    });
  });
});
