/* ═══════════════════════════════════════════════════════
   NISHANT RAJORA | PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── FAINT BLUEPRINT GRID ── */
(function initGridCanvas() {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const step = 64;
    ctx.strokeStyle = 'rgba(16,24,42,0.045)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(W, y + 0.5);
      ctx.stroke();
    }
  }

  resize();
  window.addEventListener('resize', resize);
})();


/* ── NAVBAR SCROLL STATE ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();


/* ── HAMBURGER MENU ── */
function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
}

(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();


/* ── SCROLL REVEAL (single, disciplined) ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ── COUNT-UP STATS ── */
(function initCountUp() {
  const nums = document.querySelectorAll('.stat-num span[data-target]');

  nums.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const dur = 1100;
        const step = 16;
        const inc = target / (dur / step);

        const timer = setInterval(() => {
          start += inc;
          if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(start);
          }
        }, step);

        observer.unobserve(el);
      });
    }, { threshold: 0.5 });

    observer.observe(el);
  });
})();


/* ── ACTIVE NAV LINK ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });

    links.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + current
        ? 'var(--signal)'
        : '';
    });
  });
})();