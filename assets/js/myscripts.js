document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // SHOWCASE SLIDESHOW
  // =====================
  const slides = document.querySelectorAll('.showcase-slide');
  const dots = document.querySelectorAll('.showcase-dot');
  const progress = document.querySelector('.showcase-progress');
  const INTERVAL = 5000;
  let current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
  }

  function resetProgress() {
    if (!progress) return;
    progress.classList.remove('running');
    progress.style.width = '0%';
    // Force reflow
    void progress.offsetWidth;
    progress.classList.add('running');
    progress.style.transitionDuration = INTERVAL + 'ms';
    progress.style.width = '100%';
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
    resetProgress();
  }

  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        startAuto();
      });
    });
    startAuto();
  }

  // =====================
  // WORK EXPERIENCE TABS
  // =====================
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

  // =====================
  // SMOOTH SCROLL NAV
  // =====================
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const offset = target.getBoundingClientRect().top + window.scrollY - 20;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // ACTIVE NAV ON SCROLL
  // =====================
  const sections = document.querySelectorAll('section[id], .hero');

  function updateActiveNav() {
    const scrollY = window.scrollY + 150;
    let found = false;
    // Check sections in reverse so the last matching one wins
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const top = section.offsetTop;
      const id = section.getAttribute('id');
      if (!id) continue;
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (link && scrollY >= top && !found) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        found = true;
      }
    }
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
});
