/* ============================================================
   Portfolio — Editorial Layout
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Nav shadow on scroll ---------- */
  const nav = document.querySelector('.nav');

  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else                     nav.classList.remove('scrolled');
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Smooth scroll nav links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealSelectors = [
    '.hero-tags',
    '.hero-name',
    '.hero-bio',
    '.hero-actions',
    '.hero-right',
    '.section-tag',
    '.section-title',
    '.section-title-lg',
    '.section-desc',
    '.section-desc-right',
    '.about-cards',
    '.stat-card',
    '.exp-item',
    '.orgs-block',
    '.project-card',
    '.field-item',
    '.skills-tags',
    '.awards-col',
    '.awards-banner',
    '.contact-card',
  ];

  const elements = document.querySelectorAll(revealSelectors.join(','));
  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px',
  });

  elements.forEach(el => observer.observe(el));

  /* ---------- Stagger ---------- */
  document.querySelectorAll('.stat-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  document.querySelectorAll('.exp-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
  });

  document.querySelectorAll('.project-card').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.06) + 's';
  });

  document.querySelectorAll('.field-item').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.08) + 's';
  });

  document.querySelectorAll('.awards-list li').forEach((el, i) => {
    el.style.transitionDelay = (i * 0.03) + 's';
  });

  /* ---------- Counter (IPK) ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const duration = 1500;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = (target * eased).toFixed(2);
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = target.toFixed(2);
      }
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => counterObs.observe(el));

});