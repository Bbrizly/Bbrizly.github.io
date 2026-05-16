document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =====================
  // SHOWCASE SLIDESHOW
  // =====================
  const showcase = document.querySelector('.showcase');
  const slides = document.querySelectorAll('.showcase-slide');
  const dots = document.querySelectorAll('.showcase-dot');
  const progress = document.querySelector('.showcase-progress');
  const INTERVAL = 5500;
  let current = 0;
  let timer = null;
  let paused = false;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetProgress();
  }

  function resetProgress() {
    if (!progress || prefersReducedMotion) return;
    progress.classList.remove('running');
    progress.style.width = '0%';
    void progress.offsetWidth;
    progress.classList.add('running');
    progress.style.transitionDuration = INTERVAL + 'ms';
    progress.style.width = '100%';
  }

  function startAuto() {
    if (prefersReducedMotion) return;
    clearInterval(timer);
    timer = setInterval(() => {
      if (!paused && !document.hidden) goTo(current + 1);
    }, INTERVAL);
    resetProgress();
  }

  function pauseAuto() {
    paused = true;
    if (progress) {
      progress.classList.remove('running');
    }
  }

  function resumeAuto() {
    paused = false;
    resetProgress();
  }

  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goTo(i);
        startAuto();
      });
    });

    if (showcase) {
      showcase.addEventListener('mouseenter', pauseAuto);
      showcase.addEventListener('mouseleave', resumeAuto);
      showcase.addEventListener('focusin', pauseAuto);
      showcase.addEventListener('focusout', resumeAuto);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        pauseAuto();
      } else {
        resumeAuto();
      }
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
      jobBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      jobDescriptions.forEach(desc => desc.classList.add('hidden'));
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const target = document.getElementById(btn.dataset.job);
      if (target) target.classList.remove('hidden');
    });
  });

  // =====================
  // SMOOTH SCROLL NAV
  // =====================
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({
        top: offset,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    });
  });

  // =====================
  // ACTIVE NAV ON SCROLL (IntersectionObserver)
  // =====================
  const sectionEls = Array.from(document.querySelectorAll('section[id], .hero[id]'));

  if ('IntersectionObserver' in window && sectionEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      // Pick the entry closest to the top of the viewport that is currently intersecting.
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length === 0) return;
      const id = visible[0].target.getAttribute('id');
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    });
    sectionEls.forEach(s => observer.observe(s));
  }

  // =====================
  // PROJECT FILTER CHIPS
  // =====================
  (function initProjectFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.project-card');
    const status = document.querySelector('[data-filter-status]');
    if (chips.length === 0 || cards.length === 0) return;

    // Image-bearing fallback priority for the featured-card slot when Volpe
    // is filtered out. Order from the design spec.
    const FEATURED_FALLBACKS = ['cityscape', 'particle', 'text-renderer'];

    function tagsOf(card) {
      return (card.dataset.tags || '').split(/\s+/).filter(Boolean);
    }

    function cardHasImage(card) {
      return !card.classList.contains('no-image');
    }

    function computeCounts() {
      const counts = { all: cards.length };
      cards.forEach(card => {
        tagsOf(card).forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      });
      document.querySelectorAll('.filter-count').forEach(el => {
        const key = el.dataset.count;
        el.textContent = counts[key] || 0;
      });
    }

    function applyFilter(filter) {
      let visibleCount = 0;
      const volpeCard = document.querySelector('.project-card-featured') ||
                        Array.from(cards).find(c => c.querySelector('h3')?.textContent.includes('Volpe'));

      cards.forEach(card => {
        const match = filter === 'all' || tagsOf(card).includes(filter);
        card.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });

      // If the featured card (Volpe) is hidden under this filter, transfer
      // its featured class to the next visible image-bearing card per the
      // priority list. Reset on 'all'.
      if (volpeCard) {
        const volpeMatches = filter === 'all' || tagsOf(volpeCard).includes(filter);
        // Clear any stale featured class first
        document.querySelectorAll('.project-card-featured').forEach(c =>
          c.classList.remove('project-card-featured'));

        if (volpeMatches) {
          volpeCard.classList.add('project-card-featured');
        } else {
          // Pick the next visible image-bearing fallback by matching name keyword.
          for (const keyword of FEATURED_FALLBACKS) {
            const candidate = Array.from(cards).find(card =>
              !card.classList.contains('is-hidden') &&
              cardHasImage(card) &&
              (card.querySelector('h3')?.textContent.toLowerCase().includes(keyword) ||
               card.querySelector('.card-stack-name')?.textContent.toLowerCase().includes(keyword))
            );
            if (candidate) { candidate.classList.add('project-card-featured'); break; }
          }
        }
      }

      // Announce
      if (status) {
        const label = filter === 'all'
          ? 'All projects'
          : (document.querySelector('.filter-chip[data-filter="' + filter + '"]')
              ?.textContent.trim().replace(/\s+\d+$/, '') || filter);
        status.textContent = `Showing ${visibleCount} of ${cards.length} projects in ${label}.`;
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
        chip.setAttribute('aria-pressed', 'true');
        applyFilter(chip.dataset.filter);
      });
    });

    computeCounts();
    applyFilter('all');
  })();
});
