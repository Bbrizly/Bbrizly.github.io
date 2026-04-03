document.addEventListener('DOMContentLoaded', () => {
  // --- Work Experience toggle ---
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

  // --- Active nav link on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // --- Smooth scroll for nav links ---
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPos = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });
});
