/* ═══════════════════════════════════════════════════════
   NISHANT RAJORA | PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════ */



/* ── GRID CANVAS ── */
(function initGridCanvas() {
  const canvas = document.getElementById('grid-canvas');
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const step = 60;
    ctx.strokeStyle = 'rgba(34,211,238,0.07)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= W; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y <= H; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Dot intersections
    ctx.fillStyle = 'rgba(34,211,238,0.15)';
    for (let x = 0; x <= W; x += step) {
      for (let y = 0; y <= H; y += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  draw();
  window.addEventListener('resize', draw);
})();


/* ── CUSTOM CURSOR ── */
(function initCursor() {
  const dot = document.getElementById('cursorDot');
  if (!dot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cx += (mx - cx) * 0.18;
    cy += (my - cy) * 0.18;
    dot.style.left = cx + 'px';
    dot.style.top = cy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll('a, button, .project-card, .skill-tag, .contact-item, .highlight-chip');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('hovered'));
    el.addEventListener('mouseleave', () => dot.classList.remove('hovered'));
  });
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
}

(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  btn.addEventListener('click', () => menu.classList.toggle('open'));
})();


/* ── TERMINAL TYPEWRITER ── */
(function initTerminal() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { text: '> Initializing AI Portfolio...', class: '' },
    { text: '> Loading ML Projects...', class: '' },
    { text: '> Loading Security Analytics...', class: 'line-cyan' },
    { text: '> Loading BI Dashboards...', class: '' },
    { text: '> All systems operational.', class: 'line-success' },
    { text: '> Ready.', class: 'line-success' },
  ];

  let lineIdx = 0, charIdx = 0;

  function type() {
    if (lineIdx >= lines.length) {
      // Pause then restart
      setTimeout(() => {
        body.innerHTML = '';
        lineIdx = 0;
        charIdx = 0;
        type();
      }, 3500);
      return;
    }

    const line = lines[lineIdx];

    if (charIdx === 0) {
      const p = document.createElement('p');
      p.className = line.class;
      p.innerHTML = '';
      body.appendChild(p);
    }

    const currentP = body.querySelectorAll('p')[lineIdx];
    currentP.textContent = line.text.slice(0, charIdx + 1);

    charIdx++;

    if (charIdx < line.text.length) {
      setTimeout(type, 40);
    } else {
      // Add cursor temporarily
      const cursor = document.createElement('span');
      cursor.className = 'tc-cursor';
      currentP.appendChild(cursor);

      setTimeout(() => {
        currentP.removeChild(cursor);
        lineIdx++;
        charIdx = 0;
        type();
      }, 600);
    }
  }

  setTimeout(type, 800);
})();


/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();


/* ── PROJECT CARD REVEALS ── */
(function initProjectCards() {
  const cards = document.querySelectorAll('.project-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.classList.add('reveal');
    observer.observe(card);
  });
})();


/* ── PROJECT ARROW LINKS ── */
(function initProjectArrowLinks() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    const arrow = card.querySelector('.card-arrow');
    const link = card.querySelector('h3 a');
    if (!arrow || !link) return;

    arrow.setAttribute('role', 'link');
    arrow.setAttribute('tabindex', '0');
    arrow.setAttribute('aria-label', `Open project: ${link.textContent.trim()}`);

    arrow.addEventListener('click', () => {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    });

    arrow.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
    });
  });
})();


/* ── COUNT-UP ANIMATION ── */
(function initCountUp() {
  const nums = document.querySelectorAll('.stat-num');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      let start = 0;
      const dur = 1200;
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

  nums.forEach(el => observer.observe(el));
})();


/* ── SMOOTH ACTIVE NAV LINK ── */
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
        ? 'var(--accent)'
        : '';
    });
  });
})();
