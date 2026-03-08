/* ═══════════════════════════════════════
   PERALA SRINIVASULU — PORTFOLIO SCRIPTS
═══════════════════════════════════════ */

// ── Custom Cursor ──
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .skill-tag, .about-card, .social-icon').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(200, 144, 42, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(200, 144, 42, 0.5)';
  });
});

// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile Menu ──
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
  document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

function closeMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Typewriter Effect ──
const words = ['Developer', 'Designer', 'Coder', 'Creator'];
let wordIdx = 0, charIdx = 0, isDeleting = false;
const dynamicText = document.querySelector('.dynamic-text');

function typeWriter() {
  if (!dynamicText) return;
  const currentWord = words[wordIdx];

  if (isDeleting) {
    dynamicText.textContent = currentWord.substring(0, charIdx - 1);
    charIdx--;
  } else {
    dynamicText.textContent = currentWord.substring(0, charIdx + 1);
    charIdx++;
  }

  let speed = isDeleting ? 60 : 120;

  if (!isDeleting && charIdx === currentWord.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    wordIdx = (wordIdx + 1) % words.length;
    speed = 300;
  }

  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1400);

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-category, .contact-item, .footer').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Timeline Reveal ──
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 200);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach(el => {
  timelineObserver.observe(el);
});

// ── Skill Bar Animation ──
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const width = bar.dataset.width;
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBars = document.querySelector('.skill-bars');
if (skillBars) barObserver.observe(skillBars);

// ── Counter Animation ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1500;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.about-stats');
if (statsEl) statObserver.observe(statsEl);

// ── Active Nav Link on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Active nav style
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--text-primary) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(style);

// ── Contact Form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const original = btn.innerHTML;

  btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
  btn.style.background = '#2a7a4c';
  btn.style.borderColor = '#2a7a4c';
  btn.style.color = 'white';

  setTimeout(() => {
    btn.innerHTML = original;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.color = '';
    e.target.reset();
  }, 3000);
}

// ── Smooth section entrance on load ──
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});