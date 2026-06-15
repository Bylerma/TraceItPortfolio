// Respect prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Generate Trace Line SVG
// ============================================
function generateTraceLine() {
    const svg = document.querySelector('.trace-line');
    svg.innerHTML = '';

    const viewHeight = document.documentElement.scrollHeight;
    const viewWidth = svg.parentElement.offsetWidth;

    // Create a wavy line using a path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    path.setAttribute('x1', '0');
    path.setAttribute('y1', '0');
    path.setAttribute('x2', '0');
    path.setAttribute('y2', viewHeight);

    svg.appendChild(path);
    svg.setAttribute('height', viewHeight);
}

// Generate on load and resize
window.addEventListener('load', generateTraceLine);
window.addEventListener('resize', generateTraceLine);

// ============================================
// Intersection Observer for Reveal Animations
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Calculate stagger delay based on element index
            const delay = prefersReducedMotion ? 0 : index * 100;
            
            setTimeout(() => {
                entry.target.style.animationDelay = prefersReducedMotion ? '0s' : `${delay}ms`;
                entry.target.style.opacity = '1';
            }, delay);

            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal items
document.querySelectorAll('.reveal-item').forEach((item) => {
    item.style.opacity = '0';
    revealObserver.observe(item);
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CTA Button Links
// ============================================
const downloadBtn = document.querySelector('.hero-ctas .btn-primary');
const githubBtn = document.querySelector('.hero-ctas .btn-secondary');
const ctaBtn = document.querySelector('.cta-section .btn-primary');

// These links would normally point to actual resources
downloadBtn?.addEventListener('click', () => {
    // In production: window.location.href = 'https://play.google.com/store/...';
    alert('Download link would redirect to Google Play Store');
});

githubBtn?.addEventListener('click', () => {
    // In production: window.location.href = 'https://github.com/...';
    alert('GitHub link would redirect to the TraceIt repository');
});

ctaBtn?.addEventListener('click', () => {
    // In production: window.location.href = 'https://github.com/...';
    alert('GitHub link would redirect to the TraceIt repository');
});

// ============================================
// Tab Switching in Profile Section (Demo)
// ============================================
const tabs = document.querySelectorAll('.profile-tabs .tab');
tabs.forEach((tab) => {
    tab.addEventListener('click', function () {
        tabs.forEach((t) => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// ============================================
// Phone Mockup Rotation on Scroll
// ============================================
const mockups = document.querySelectorAll('.phone-mockup');

window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    mockups.forEach((mockup, index) => {
        if (prefersReducedMotion) return;

        if (index === 0) {
            // Splash screen - slight rotation
            mockup.style.transform = `rotateZ(${scrollPercent * 10}deg) translateY(${scrollPercent * 20}px)`;
        } else {
            // Feed screen - opposite rotation with translation
            mockup.style.transform = `translateX(${80 + scrollPercent * 30}px) rotateZ(${-8 + scrollPercent * 10}deg) translateY(${scrollPercent * 20}px)`;
        }
    });
});

// ============================================
// Dynamic Gradient Animation (Optional Enhancement)
// ============================================
function animateGradients() {
    if (prefersReducedMotion) return;

    const gradientElements = document.querySelectorAll(
        '.feature-card, .tech-card, .btn-primary, .journey-icon'
    );

    gradientElements.forEach((el) => {
        el.addEventListener('mouseenter', function () {
            this.style.animation = 'none';
            // Force reflow
            void this.offsetWidth;
            this.style.animation = 'gradientShift 3s ease infinite';
        });

        el.addEventListener('mouseleave', function () {
            this.style.animation = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', animateGradients);

// ============================================
// Service Worker Registration (Optional)
// ============================================
if ('serviceWorker' in navigator) {
    // In production, you might register a service worker here
    // navigator.serviceWorker.register('/sw.js');
}

// ============================================
// Performance: Lazy Load Images (Future Enhancement)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Load image logic here if needed in the future
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach((img) => {
        imageObserver.observe(img);
    });
}

// ============================================
// Console Message (Easter Egg)
// ============================================
console.log(
    '%cTraceIt Landing Page',
    'font-size: 24px; font-weight: bold; color: #4361EE;'
);
console.log(
    '%cHelping communities reunite lost items with their owners.\n' +
    'GitHub: https://github.com/Bylerma/TraceIt\n' +
    'Built with: Java, Material 3, Firebase, GPS, Real-time Chat',
    'font-size: 14px; color: #64748b; line-height: 1.6;'
);
