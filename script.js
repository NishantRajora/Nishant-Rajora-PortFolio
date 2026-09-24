/* ═══════════════════════════════════════════════════════
   NISHANT RAJORA | PORTFOLIO — script.js
   Constellation on Black Velvet Visual System
   ═══════════════════════════════════════════════════════ */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── ENSURE SECTION ORDERING (PROJECTS BEFORE ABOUT) ── */
(function orderPortfolioSections() {
  const about = document.getElementById('about');
  const projects = document.getElementById('projects');
  if (about && projects && (about.compareDocumentPosition(projects) & Node.DOCUMENT_POSITION_FOLLOWING)) {
    about.parentNode.insertBefore(projects, about);
  }
})();

/* ── SIGNATURE VISUAL: BRAIN CONSTELLATION & AMBIENT PARTICLE FIELD ── */
(function initConstellationCanvas() {
  const canvas = document.getElementById('grid-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dpr;
  let animationFrameId = null;

  // Palette from Dala style tokens & vivid spectrum
  const chromaticColors = [
    '#8052ff', // Electric Iris (violet)
    '#ffb829', // Saffron Spark (amber)
    '#15846e', // Deep Verdant (teal)
    '#d946ef', // Vivid Magenta
    '#38bdf8', // Electric Cyan
    '#a78bfa'  // Soft Iris
  ];

  // Mouse state for subtle interactive repulsion
  const mouse = { x: -9999, y: -9999, targetX: -9999, targetY: -9999, radius: 110 };

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = -9999;
    mouse.targetY = -9999;
  }, { passive: true });

  // Outlined equilateral triangle drawing utility
  function drawTriangle(context, x, y, size, angle, color, lineWidth, opacity = 1) {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.beginPath();
    const r = size;
    for (let i = 0; i < 3; i++) {
      const a = (i * 2 * Math.PI) / 3 - Math.PI / 2;
      const px = r * Math.cos(a);
      const py = r * Math.sin(a);
      if (i === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.closePath();
    context.globalAlpha = opacity;
    context.strokeStyle = color;
    context.lineWidth = lineWidth || 1.1;
    context.stroke();
    context.restore();
  }

  // Particle instances
  let brainParticles = [];
  let ambientParticles = [];

  // Generate organic brain silhouette coordinates
  function isInsideBrainSilhouette(nx, ny) {
    // nx: -1 to 1 (left to right), ny: -1 to 1 (top to bottom)
    const absX = Math.abs(nx);

    // Cerebrum upper contour: rounded dome with central longitudinal fissure depression
    if (ny < -0.85 || ny > 0.95 || absX > 0.96) return false;

    // Central fissure indent between hemispheres at top
    if (absX < 0.08 && ny < -0.4) return false;

    // Left and right main lobes oval
    const lobeDist = Math.pow((absX - 0.46) / 0.52, 2) + Math.pow((ny + 0.1) / 0.75, 2);
    if (lobeDist < 0.95) {
      // Temporal lobe carve-out and indent
      if (absX < 0.32 && ny > 0.35 && ny < 0.7) return true;
      return true;
    }

    // Cerebellum bulge at lower back
    const cerebellum = Math.pow((absX - 0.42) / 0.42, 2) + Math.pow((ny - 0.58) / 0.32, 2);
    if (cerebellum < 0.75) return true;

    // Frontal curve
    const frontal = Math.pow((absX - 0.5) / 0.45, 2) + Math.pow((ny + 0.35) / 0.5, 2);
    if (frontal < 0.85) return true;

    return false;
  }

  function initParticles() {
    brainParticles = [];
    ambientParticles = [];

    // Constellation placement: Right side on desktop, centered on mobile
    const isDesktop = W >= 1024;
    const centerX = isDesktop ? W * 0.72 : W * 0.5;
    const centerY = isDesktop ? Math.min(H * 0.46, 420) : Math.min(H * 0.42, 360);
    const scaleX = isDesktop ? Math.min(W * 0.22, 260) : Math.min(W * 0.38, 170);
    const scaleY = scaleX * 0.85;

    // 1. Brain constellation particles
    const brainCount = isDesktop ? 460 : 240;
    let attempts = 0;
    while (brainParticles.length < brainCount && attempts < 8000) {
      attempts++;
      const nx = (Math.random() * 2 - 1) * 0.96;
      const ny = (Math.random() * 2 - 1) * 0.92;

      if (isInsideBrainSilhouette(nx, ny)) {
        const bx = centerX + nx * scaleX;
        const by = centerY + ny * scaleY;
        const color = chromaticColors[Math.floor(Math.random() * chromaticColors.length)];
        const size = Math.random() * 2.6 + 1.8; // 1.8px to 4.4px
        const angle = Math.random() * Math.PI * 2;
        const rotSpeed = (Math.random() - 0.5) * 0.015;
        const pulsePhase = Math.random() * Math.PI * 2;
        const pulseSpeed = 0.0015 + Math.random() * 0.002;
        const opacity = 0.4 + Math.random() * 0.55;

        brainParticles.push({
          origX: bx,
          origY: by,
          x: bx,
          y: by,
          vx: 0,
          vy: 0,
          size,
          angle,
          rotSpeed,
          color,
          pulsePhase,
          pulseSpeed,
          opacity
        });
      }
    }

    // 2. Ambient drifting particles across the full void
    const ambientCount = Math.floor((W * H) / 16000);
    for (let i = 0; i < ambientCount; i++) {
      ambientParticles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.1 - Math.random() * 0.2, // gentle upward drift
        size: Math.random() * 2.2 + 1.5,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        color: chromaticColors[Math.floor(Math.random() * chromaticColors.length)],
        opacity: 0.15 + Math.random() * 0.35
      });
    }
  }

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.resetTransform?.();
    ctx.scale(dpr, dpr);
    initParticles();
    if (prefersReducedMotion) {
      render(0);
    }
  }

  let lastTime = 0;

  function render(time) {
    ctx.clearRect(0, 0, W, H);

    // Smooth mouse target lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // ── DRAW BRAIN SYNAPTIC CONNECTIONS ──
    const maxLinkDist = 38;
    ctx.lineWidth = 0.6;
    for (let i = 0; i < brainParticles.length; i++) {
      const p1 = brainParticles[i];
      for (let j = i + 1; j < brainParticles.length; j++) {
        const p2 = brainParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxLinkDist) {
          const alpha = (1 - dist / maxLinkDist) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = p1.color === '#ffb829' ? 'rgba(255, 184, 41, ' + alpha + ')' : 'rgba(128, 82, 255, ' + alpha + ')';
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // ── DRAW & UPDATE BRAIN PARTICLES ──
    for (let i = 0; i < brainParticles.length; i++) {
      const p = brainParticles[i];

      if (!prefersReducedMotion) {
        p.angle += p.rotSpeed;
        p.pulsePhase += p.pulseSpeed;

        // Subtle organic breathing oscillation
        const breathX = Math.sin(p.pulsePhase) * 1.5;
        const breathY = Math.cos(p.pulsePhase * 0.8) * 1.5;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 18;
          p.vx += (dx / dist) * force * 0.15;
          p.vy += (dy / dist) * force * 0.15;
        }

        // Spring return to original anatomical position
        const targetX = p.origX + breathX;
        const targetY = p.origY + breathY;
        p.vx += (targetX - p.x) * 0.05;
        p.vy += (targetY - p.y) * 0.05;
        p.vx *= 0.84;
        p.vy *= 0.84;

        p.x += p.vx;
        p.y += p.vy;
      }

      drawTriangle(ctx, p.x, p.y, p.size, p.angle, p.color, 1.1, p.opacity);
    }

    // ── DRAW & UPDATE AMBIENT FIELD PARTICLES ──
    for (let i = 0; i < ambientParticles.length; i++) {
      const p = ambientParticles[i];

      if (!prefersReducedMotion) {
        p.angle += p.rotSpeed;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      }

      drawTriangle(ctx, p.x, p.y, p.size, p.angle, p.color, 0.9, p.opacity);
    }

    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  if (!prefersReducedMotion) {
    animationFrameId = requestAnimationFrame(render);
  }

  // Pause when tab not visible to conserve battery & performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    } else if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }
  });
})();

/* ── NAVBAR SCROLL STATE & READING PROGRESS LINE ── */
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function updateNavbar() {
    nav.classList.toggle('scrolled', window.scrollY > 30);
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
    nav.style.setProperty('--scroll-progress', `${progress}%`);
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
})();

/* ── MOBILE HAMBURGER MENU ── */
function closeMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const btn = document.getElementById('hamburger');
  if (menu) menu.classList.remove('open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
}
window.closeMobileMenu = closeMobileMenu;

(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

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
  requestAnimationFrame(() => {
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
        observer.unobserve(el);
      }
    });
  });
})();

/* ── STATS COUNT-UP ANIMATION ── */
(function initCountUp() {
  const nums = document.querySelectorAll('.stat-num span[data-target]');
  if (!nums.length) return;

  nums.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (prefersReducedMotion || isNaN(target)) {
      el.textContent = target;
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const dur = 1000;
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

/* ── ACTIVE NAV LINK TRACKING ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }, { passive: true });
})();