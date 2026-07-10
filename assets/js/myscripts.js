document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =====================
  // SCROLL REVEAL (replaces the AOS library)
  // =====================
  (function initReveal() {
    const targets = document.querySelectorAll('[data-aos]');
    if (targets.length === 0) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('aos-animate'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    targets.forEach(el => io.observe(el));
  })();

  // =====================
  // LAZY AUTOPLAY VIDEOS
  // Videos ship with preload="none"; they only download and play once they
  // scroll into view, and pause again when they leave. Skipped entirely for
  // reduced-motion users (the poster frame stays).
  // =====================
  (function initVideos() {
    const videos = document.querySelectorAll('video[data-autoplay]');
    if (videos.length === 0 || reduceMotion) return;
    if (!('IntersectionObserver' in window)) {
      videos.forEach(v => { v.play().catch(() => {}); });
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const v = entry.target;
        if (entry.isIntersecting) {
          v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { rootMargin: '120px 0px' });
    videos.forEach(v => io.observe(v));
  })();

  // =====================
  // DEMO CARD REVEAL
  // Demo cards rest on their logo, then fade to the demo on hover/focus (CSS).
  // On touch and for "keep looking at it", reveal after the card dwells in
  // view, and re-arm when it leaves. Skipped for reduced motion (hover still
  // works) and when the card never plays a video anyway.
  // =====================
  (function initDemoReveal() {
    const demos = document.querySelectorAll('.card-demo');
    if (demos.length === 0) return;
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const timers = new WeakMap();
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const d = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (!timers.has(d)) {
            timers.set(d, setTimeout(() => d.classList.add('is-revealed'), 1100));
          }
        } else {
          clearTimeout(timers.get(d));
          timers.delete(d);
          d.classList.remove('is-revealed');
        }
      });
    }, { threshold: [0, 0.6] });
    demos.forEach(d => io.observe(d));
  })();

  // =====================
  // WORK EXPERIENCE TABS
  // =====================
  const jobBtns = Array.from(document.querySelectorAll('.job-btn'));
  const jobDescriptions = document.querySelectorAll('.job-description');

  function selectJobTab(btn) {
    jobBtns.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    jobDescriptions.forEach(desc => desc.classList.add('hidden'));
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.removeAttribute('tabindex');
    const target = document.getElementById(btn.dataset.job);
    if (target) target.classList.remove('hidden');
  }

  jobBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => selectJobTab(btn));
    btn.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = jobBtns[(i + 1) % jobBtns.length];
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = jobBtns[(i - 1 + jobBtns.length) % jobBtns.length];
      if (e.key === 'Home') next = jobBtns[0];
      if (e.key === 'End') next = jobBtns[jobBtns.length - 1];
      if (next) {
        e.preventDefault();
        selectJobTab(next);
        next.focus();
      }
    });
  });

  // =====================
  // PROJECT FILTER CHIPS
  // =====================
  (function initProjectFilter() {
    const chips = document.querySelectorAll('.filter-chip');
    const cards = document.querySelectorAll('.project-card');
    const status = document.querySelector('[data-filter-status]');
    if (chips.length === 0 || cards.length === 0) return;

    function tagsOf(card) {
      return (card.dataset.tags || '').split(/\s+/).filter(Boolean);
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

      cards.forEach(card => {
        const match = filter === 'all' || tagsOf(card).includes(filter);
        card.classList.toggle('is-hidden', !match);
        if (match) visibleCount++;
      });

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
