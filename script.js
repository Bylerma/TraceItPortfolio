// ============================================
// TraceIt — interactions
// ============================================

// Sticky nav shadow on scroll
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 8) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal-on-scroll for sections
const revealTargets = document.querySelectorAll(
  '.journey-step, .feature-card, .tech-item, .showcase-inner, .cta-inner'
);

revealTargets.forEach((el) => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealTargets.forEach((el) => observer.observe(el));

// Stagger reveal delays within grids
const staggerGroups = [
  document.querySelectorAll('.journey-step'),
  document.querySelectorAll('.feature-card'),
  document.querySelectorAll('.tech-item'),
];
staggerGroups.forEach((group) => {
  group.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
  });
});

// Reposition the decorative trace line based on document height
const tracePath = document.getElementById('tracePath');
const traceSvg = document.getElementById('traceLine');

function resizeTrace() {
  const h = document.body.scrollHeight;
  traceSvg.setAttribute('viewBox', `0 0 1440 ${h}`);
  traceSvg.style.height = `${h}px`;

  // A gentle winding curve down the right side of the page
  const points = [
    [1500, 80],
    [1100, h * 0.18],
    [1300, h * 0.32],
    [950, h * 0.48],
    [1250, h * 0.62],
    [1050, h * 0.78],
    [1400, h * 0.92],
  ];

  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    const [px, py] = points[i - 1];
    const midX = (px + x) / 2;
    const midY = (py + y) / 2;
    d += ` Q ${px} ${y} ${midX} ${midY}`;
    d += ` T ${x} ${y}`;
  }

  tracePath.setAttribute('d', d);
}

window.addEventListener('load', resizeTrace);
window.addEventListener('resize', resizeTrace);
