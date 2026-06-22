/* ═══════════════════════════════════════
   PERALA SRINIVASULU — PORTFOLIO SCRIPTS
═══════════════════════════════════════ */

// ── Custom Cursor ──


const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

const prefersFinePointer = window.matchMedia('(pointer: fine)');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function useCustomCursor() {
  return prefersFinePointer.matches && !prefersReducedMotion.matches && cursor && follower;
}

if (useCustomCursor()) {
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
}

document.querySelectorAll('a, button, .skill-tag, .about-card, .social-icon, .project-card, #contactForm input, #contactForm textarea').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (!useCustomCursor()) return;
    cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    follower.style.width = '50px';
    follower.style.height = '50px';
    follower.style.borderColor = 'rgba(200, 144, 42, 0.8)';
  });
  el.addEventListener('mouseleave', () => {
    if (!useCustomCursor()) return;
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    follower.style.width = '32px';
    follower.style.height = '32px';
    follower.style.borderColor = 'rgba(200, 144, 42, 0.5)';
  });
});

// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
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

if (prefersReducedMotion.matches && dynamicText) {
  dynamicText.textContent = words[0];
} else {
  setTimeout(typeWriter, 1400);
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-category, .project-card, .contact-item, .footer').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ── Timeline Reveal ──
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 200);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));

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

const navStyle = document.createElement('style');
navStyle.textContent = `.nav-link.active { color: var(--text-primary) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(navStyle);

// ══════════════════════════════════════════════════════
// CONTACT FORM — Web3Forms
// Access key is set here AND in the hidden input in HTML.
// ══════════════════════════════════════════════════════
const WEB3FORMS_ACCESS_KEY = '87d59e8d-2d28-42c4-a491-6510f3f256f9';
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';

function setContactFormError(form, message) {
  const el = document.getElementById('contactFormError');
  if (!el) return;
  if (message) {
    el.textContent = message;
    el.hidden = false;
  } else {
    el.textContent = '';
    el.hidden = true;
  }
}

function normalizeEmail(value) {
  return String(value || '').trim().toLowerCase();
}

function clearContactFieldErrors(form) {
  form.querySelectorAll('.form-group.has-error').forEach(g => g.classList.remove('has-error'));
  setContactFormError(form, '');
}

function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  if (form.id !== 'contactForm') return;

  clearContactFieldErrors(form);

  const name = form.querySelector('#contactName')?.value?.trim() || '';
  const email = normalizeEmail(form.querySelector('#contactEmail')?.value);
  const emailConfirm = normalizeEmail(form.querySelector('#contactEmailConfirm')?.value);
  const subject = form.querySelector('#contactSubject')?.value?.trim() || '';
  const message = form.querySelector('#contactMessage')?.value?.trim() || '';
  const botcheck = form.querySelector('#contactBotcheck')?.value?.trim();

  // Honeypot — silently reject bots
  if (botcheck) return;

  if (!name || !email || !emailConfirm || !message) {
    setContactFormError(form, 'Please fill in your name, both email fields, and your message.');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email) || !emailPattern.test(emailConfirm)) {
    document.getElementById('emailGroup')?.classList.add('has-error');
    document.getElementById('confirmEmailGroup')?.classList.add('has-error');
    setContactFormError(form, 'Please enter valid email addresses.');
    return;
  }

  if (email !== emailConfirm) {
    document.getElementById('emailGroup')?.classList.add('has-error');
    document.getElementById('confirmEmailGroup')?.classList.add('has-error');
    setContactFormError(form, 'Emails do not match. Re-enter the same address in both fields.');
    return;
  }

  const btn = document.getElementById('contactSubmitBtn');
  const originalHtml = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';

  const safeTopic = subject ? subject.replace(/\s+/g, ' ').trim().slice(0, 120) : '';
  const emailSubject = safeTopic
    ? `Contact form: ${name} — ${safeTopic}`.slice(0, 200)
    : `Contact form: ${name}`.slice(0, 200);
  const fullMessage = safeTopic ? `Topic: ${safeTopic}\n\n${message}` : message;

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    name,
    email,
    from_name: 'Perala Srinivasulu — Portfolio',
    subject: emailSubject,
    message: fullMessage,
  };

  fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (data.success) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message sent!';
        btn.style.background = '#22c55e';
        btn.style.borderColor = '#22c55e';
        btn.style.color = '#fff';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
          btn.disabled = false;
        }, 4000);
      } else {
        setContactFormError(form, data.message || 'Could not send. Try again or email directly.');
        btn.innerHTML = originalHtml;
        btn.disabled = false;
      }
    })
    .catch(() => {
      setContactFormError(form, 'Network error. Check your connection and try again.');
      btn.innerHTML = originalHtml;
      btn.disabled = false;
    });
}

['#contactEmail', '#contactEmailConfirm'].forEach(sel => {
  const el = document.querySelector(sel);
  if (!el) return;
  el.addEventListener('input', () => {
    const form = document.getElementById('contactForm');
    if (form) clearContactFieldErrors(form);
  });
});

// ── Smooth entrance on load ──
window.addEventListener('load', () => {
  if (prefersReducedMotion.matches) {
    document.body.style.opacity = '1';
    return;
  }
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});