// ============================================================
// TraceIt — interactions
// ============================================================

// ── Sticky nav shadow on scroll ───────────────────────────
const nav = document.getElementById('nav');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Reveal-on-scroll (fade-up) ────────────────────────────
const revealSelectors = [
  '.journey-step',
  '.feature-card',
  '.gallery-item',
  '.tech-item',
  '.showcase-inner',
  '.cta-inner',
];

const allRevealTargets = document.querySelectorAll(revealSelectors.join(', '));

// Attach .reveal class
allRevealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

allRevealTargets.forEach((el) => revealObserver.observe(el));

// ── Stagger delays within each group ─────────────────────
const staggerGroups = [
  document.querySelectorAll('.journey-step'),
  document.querySelectorAll('.feature-card'),
  document.querySelectorAll('.gallery-item'),
  document.querySelectorAll('.tech-item'),
];

staggerGroups.forEach((group) => {
  group.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 65, 350)}ms`;
  });
});

// ── Dynamic trace-line SVG path ───────────────────────────
const tracePath = document.getElementById('tracePath');
const traceSvg  = document.getElementById('traceLine');

function buildTracePath(h) {
  // Winding path down the RIGHT side of the page
  const pts = [
    [1480,  80],
    [1100, h * 0.10],
    [1350, h * 0.20],
    [980,  h * 0.30],
    [1280, h * 0.42],
    [1050, h * 0.52],
    [1400, h * 0.62],
    [980,  h * 0.72],
    [1300, h * 0.82],
    [1100, h * 0.92],
    [1450, h * 1.00],
  ];

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x, y]   = pts[i];
    const [px, py] = pts[i - 1];
    const cpX = (px + x) / 2;
    const cpY = py + (y - py) * 0.6;
    d += ` Q ${cpX} ${cpY} ${x} ${y}`;
  }
  return d;
}

function resizeTrace() {
  const h = document.body.scrollHeight;
  traceSvg.setAttribute('viewBox', `0 0 1440 ${h}`);
  traceSvg.style.height = `${h}px`;
  tracePath.setAttribute('d', buildTracePath(h));
}

window.addEventListener('load', resizeTrace);
window.addEventListener('resize', resizeTrace);

// ── Smooth scroll polyfill (respects prefers-reduced-motion) ──
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.style.scrollBehavior = 'auto';
}
