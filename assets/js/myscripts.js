document.addEventListener('DOMContentLoaded', () => {

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
