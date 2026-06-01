/* ============================================================
   TURAN INNOVATIONS — main.js
   ============================================================ */

/* ---- Navbar scroll shadow ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---- Mobile burger ---- */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  burger.setAttribute('aria-expanded', menuOpen);

  // Animate spans into X
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ---- AOS — Scroll reveal ---- */
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-visible');
      aosObserver.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ---- Counter animation for hero stats ---- */
function animateCounter(el, target, suffix = '') {
  const duration = 1200;
  const start    = performance.now();
  const isNum    = typeof target === 'number';

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3);
    if (isNum) {
      el.textContent = Math.floor(ease * target) + suffix;
    }
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// Observe stat numbers
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el   = entry.target;
    const text = el.textContent.trim();
    if (text === '5+')  { animateCounter(el, 5, '+'); }
    if (text === '30+') { animateCounter(el, 30, '+'); }
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

/* ---- Card hover tilt (hero card) ---- */
const heroCard = document.querySelector('.hero-card');
if (heroCard) {
  heroCard.addEventListener('mousemove', e => {
    const rect   = heroCard.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    heroCard.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg) translateY(-6px)`;
  });
  heroCard.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
  });
}

/* ---- Goal cards stagger reveal ---- */
// Already handled by data-aos with delay attributes
