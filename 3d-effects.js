/* ═══════════════════════════════════════════════════════════════
   PERALA SRINIVASULU — SCROLL ANIMATION ENGINE
   • Bidirectional  (scroll-down = forward, scroll-up = reverse)
   • Velocity skew  (body tilts with scroll speed)
   • Parallax depth (sections move at different rates)
   • Scrub counters (stats count with scroll position)
   • Section reveals with distinct personalities per section
═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────────────────
     1. LOADING SCREEN
  ───────────────────────────────────────── */
  const loader = document.getElementById('loader');
  const loaderFill = document.querySelector('.loader-fill');
  let progress = 0;

  const loadInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      loaderFill.style.width = '100%';
      setTimeout(() => {
        loader.classList.add('hidden');
        initAnimations();
      }, 500);
    } else {
      loaderFill.style.width = progress + '%';
    }
  }, 100);

  /* ─────────────────────────────────────────
     2. LENIS SMOOTH SCROLL
  ───────────────────────────────────────── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });
  }

  /* ─────────────────────────────────────────
     3. CARD TILT (mousemove 3D)
  ───────────────────────────────────────── */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const rX = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4;
      const rY = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4;
      card.style.transform = `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.01,1.01,1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
  });

  /* ─────────────────────────────────────────
     4. MAGNETIC BUTTONS
  ───────────────────────────────────────── */
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      if (window.gsap) gsap.to(btn, {
        duration: 0.3,
        x: (e.clientX - r.left - r.width / 2) * 0.3,
        y: (e.clientY - r.top - r.height / 2) * 0.3,
        ease: 'power2.out'
      });
    });
    btn.addEventListener('mouseleave', () => {
      if (window.gsap) gsap.to(btn, { duration: 0.7, x: 0, y: 0, ease: 'elastic.out(1,0.3)' });
    });
  });

  /* ─────────────────────────────────────────
     5. MAIN ANIMATION ENGINE
  ───────────────────────────────────────── */
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* — LENIS ↔ GSAP BRIDGE — */
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    /* ══════════════════════════════════════
       VELOCITY SKEW  — body tilts with speed
       The faster you scroll, the more skew.
    ══════════════════════════════════════ */
    const skewSetter = gsap.quickSetter('#smoothContent', 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-4, 4);
    let lastScrollY = 0;
    let rafId;

    function updateSkew() {
      const currentY = lenis ? lenis.scroll : window.scrollY;
      const velocity = (currentY - lastScrollY) * 0.06;
      skewSetter(clamp(velocity));
      lastScrollY = currentY;
      rafId = requestAnimationFrame(updateSkew);
    }
    if (lenis) {
      lenis.on('scroll', () => { }); // keep lenis active
      updateSkew();
    } else {
      // Fallback: use native scroll velocity
      ScrollTrigger.create({
        onUpdate: (self) => {
          skewSetter(clamp(self.getVelocity() / 300));
          gsap.to({ skew: 0 }, {
            duration: 0.5,
            onUpdate() { skewSetter(clamp(this.targets()[0].skew)); }
          });
        }
      });
    }

    /* ══════════════════════════════════════
       NAVBAR — shrink + glow on scroll
    ══════════════════════════════════════ */
    ScrollTrigger.create({
      start: 'top -60',
      onEnter: () => document.getElementById('navbar')?.classList.add('scrolled'),
      onLeaveBack: () => document.getElementById('navbar')?.classList.remove('scrolled'),
    });

    /* ══════════════════════════════════════
       BACKGROUND TYPOGRAPHY
    ══════════════════════════════════════ */
    const stackedBg = document.querySelector('.stacked-text-bg');
    const stackedWords = document.querySelectorAll('.stacked-word');

    if (stackedBg && stackedWords.length > 0) {
      stackedWords.forEach((word, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.to(word, {
          xPercent: dir * 8,
          ease: 'none',
          scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.2 }
        });
      });

      gsap.fromTo(stackedBg, { scale: 1.10 }, { scale: 1, duration: 8, ease: 'power2.out' });

      window.addEventListener('mousemove', (e) => {
        const xP = (e.clientX / window.innerWidth) - 0.5;
        const yP = (e.clientY / window.innerHeight) - 0.5;
        gsap.to(stackedBg, { rotationY: xP * 10 - 5, rotationX: -(yP * 8) + 8, duration: 0.8, ease: 'power2.out' });
      });
    }

    /* ══════════════════════════════════════
       HERO — entrance + parallax exit
    ══════════════════════════════════════ */
    gsap.set('.hero-title .line', { y: 100, opacity: 0 });
    gsap.set('.image-frame', { scale: 1.15, opacity: 0, rotationY: 8 });
    gsap.set('.frame-deco', { scale: 0, opacity: 0 });
    gsap.set(['.hero-greeting', '.typewriter-wrap', '.hero-tagline', '.hero-desc'], { x: -50, opacity: 0 });
    gsap.set(['.hero-actions', '.social-row'], { y: 30, opacity: 0 });
    gsap.set('.floating-badge', { scale: 0, opacity: 0 });

    const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    heroTl
      .to('.image-frame', { scale: 1, opacity: 1, rotationY: 0, duration: 1.5, ease: 'expo.out' }, 0.2)
      .to('.frame-deco', { scale: 1, opacity: 1, duration: 1, stagger: 0.2, ease: 'back.out(1.5)' }, 0.5)
      .to('.hero-title .line', { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'expo.out' }, 0.4)
      .to(['.hero-greeting', '.typewriter-wrap', '.hero-tagline', '.hero-desc'],
        { x: 0, opacity: 1, duration: 1, stagger: 0.1 }, 0.6)
      .to(['.hero-actions', '.social-row'], { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.8)
      .to('.floating-badge', { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'back.out(2)' }, 1.0);

    heroTl.eventCallback('onComplete', () => {
      gsap.to('.floating-badge', { y: -10, duration: 2, yoyo: true, repeat: -1, ease: 'sine.inOut', stagger: 0.5 });
      gsap.to('.image-frame', { y: -6, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    });

    // Hero content parallax OUT as user scrolls down
    gsap.to('.hero-content', {
      y: -120, opacity: 0.3,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.hero-visual', {
      y: -80, scale: 0.92,
      ease: 'none',
      scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    /* ══════════════════════════════════════
       HELPER — bidirectional reveal factory
       "play none none reverse" means:
         scroll DOWN past trigger → play forward
         scroll UP  past trigger  → play backward
    ══════════════════════════════════════ */
    const BD = 'play none none reverse'; // bidirectional shorthand

    /* ══════════════════════════════════════
       SECTION HEADERS — shared reveal
       Every section label + title + subtitle
       gets the same treatment automatically.
    ══════════════════════════════════════ */
    document.querySelectorAll('section:not(#home)').forEach(sec => {
      const label = sec.querySelector('.section-label');
      const title = sec.querySelector('.section-title');
      const subtitle = sec.querySelector('.section-subtitle');

      if (label) gsap.fromTo(label,
        { x: -90, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: label, start: 'top 88%', toggleActions: BD }
        }
      );

      if (title) gsap.fromTo(title,
        { y: 70, opacity: 0, skewY: 4 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: title, start: 'top 88%', toggleActions: BD }
        }
      );

      if (subtitle) gsap.fromTo(subtitle,
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: subtitle, start: 'top 90%', toggleActions: BD }
        }
      );
    });

    /* ══════════════════════════════════════
       ① ABOUT
    ══════════════════════════════════════ */
    const aboutSec = document.querySelector('#about');
    if (aboutSec) {

      // Paragraphs: stagger fade-up, reverse on scroll-up
      gsap.fromTo('#about .about-text',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '#about .about-left', start: 'top 82%', toggleActions: BD }
        }
      );

      // Stats: scrub-driven counter feel — each stat pops with bounce
      gsap.fromTo('#about .stat',
        { scale: 0.55, opacity: 0, y: 40 },
        {
          scale: 1, opacity: 1, y: 0, duration: 0.75, stagger: 0.15, ease: 'back.out(2.5)',
          scrollTrigger: { trigger: '#about .about-stats', start: 'top 85%', toggleActions: BD }
        }
      );

      // Number odometer effect: count up the stat numbers
      document.querySelectorAll('#about .stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          onEnter: () => gsap.fromTo(el,
            { innerText: 0 },
            {
              innerText: target, duration: 1.8, ease: 'power2.out', snap: { innerText: 1 },
              onUpdate() { el.textContent = Math.round(parseFloat(el.textContent)); }
            }
          ),
          onLeaveBack: () => { el.textContent = '0'; }
        });
      });

      // Certs block: clip-path wipe from bottom
      gsap.fromTo('#about .certs-inline',
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: '#about .certs-inline', start: 'top 88%', toggleActions: BD }
        }
      );

      // Cards: alternate L/R + 3D tilt on entry
      gsap.utils.toArray('#about .about-card').forEach((card, i) => {
        gsap.fromTo(card,
          { x: i % 2 === 0 ? -60 : 60, opacity: 0, rotationY: i % 2 === 0 ? -10 : 10, scale: 0.93 },
          {
            x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: BD }
          }
        );
      });

      // Parallax: about-right drifts up slower than content
      gsap.to('#about .about-right', {
        y: -40,
        ease: 'none',
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    }

    /* ══════════════════════════════════════
       ② SKILLS
    ══════════════════════════════════════ */
    const skillsSec = document.querySelector('#skills');
    if (skillsSec) {

      // Columns: drop + scale in with stagger
      const skillCols = gsap.utils.toArray('#skills .skill-category');
      gsap.fromTo(skillCols,
        { y: 100, opacity: 0, scale: 0.9, rotationX: 10 },
        {
          y: 0, opacity: 1, scale: 1, rotationX: 0, duration: 1.1, stagger: 0.2, ease: 'expo.out',
          scrollTrigger: { trigger: '#skills .skills-wrapper', start: 'top 82%', toggleActions: BD }
        }
      );

      // Tags inside each column: burst in one-by-one
      skillCols.forEach(col => {
        const tags = col.querySelectorAll('.skill-tag');
        gsap.fromTo(tags,
          { scale: 0.6, opacity: 0, y: 20, rotation: -3 },
          {
            scale: 1, opacity: 1, y: 0, rotation: 0, duration: 0.55, stagger: 0.08, ease: 'back.out(2)',
            scrollTrigger: { trigger: col, start: 'top 85%', toggleActions: BD }
          }
        );
      });

      // Category headers slide from bottom-left
      gsap.fromTo('#skills .category-header',
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '#skills .skills-wrapper', start: 'top 80%', toggleActions: BD }
        }
      );

      // Whole skills section drifts up slightly as it scrolls through
      gsap.to('#skills .skills-wrapper', {
        y: -30,
        ease: 'none',
        scrollTrigger: { trigger: '#skills', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }

    /* ══════════════════════════════════════
       ③ PROJECTS
    ══════════════════════════════════════ */
    const projectsSec = document.querySelector('#projects');
    if (projectsSec) {

      // Cards: alternate L / R cinematic fly-in with depth
      gsap.utils.toArray('#projects .project-card').forEach((card, i) => {
        const xOff = i % 2 === 0 ? -80 : 80;
        const rot = i % 2 === 0 ? -5 : 5;

        gsap.fromTo(card,
          { x: xOff, y: 60, opacity: 0, rotation: rot, scale: 0.92 },
          {
            x: 0, y: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.1, ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: BD }
          }
        );

        // Icon bounces in with a delay
        const icon = card.querySelector('.project-icon');
        if (icon) gsap.fromTo(icon,
          { scale: 0, opacity: 0, rotation: -20 },
          {
            scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.5)',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: BD }
          }
        );

        // Tech tags pop in with stagger
        gsap.fromTo(card.querySelectorAll('.project-tags span'),
          { y: 12, opacity: 0, scale: 0.85 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.07, ease: 'back.out(1.5)',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: BD }
          }
        );

        // Project title clips up
        const title = card.querySelector('.project-title');
        if (title) gsap.fromTo(title,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: BD }
          }
        );

        // Links slide up last
        gsap.fromTo(card.querySelectorAll('.project-link'),
          { y: 15, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: BD }
          }
        );
      });

      // Subtle scrub parallax on the whole grid
      gsap.to('#projects .projects-grid', {
        y: -25,
        ease: 'none',
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    }

    /* ══════════════════════════════════════
       ④ EDUCATION TIMELINE
    ══════════════════════════════════════ */
    const eduSec = document.querySelector('#education');
    if (eduSec) {

      // Timeline line draws itself with scroll progress
      const timelineEl = document.querySelector('.timeline');
      if (timelineEl) {
        ScrollTrigger.create({
          trigger: timelineEl,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 1.2,
          onUpdate: self => {
            timelineEl.style.setProperty('--timeline-progress', `${self.progress * 100}%`);
          }
        });
      }

      // Each item reveals in sequence — bidirectional
      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const dot = item.querySelector('.timeline-dot');
        const year = item.querySelector('.timeline-year');
        const card = item.querySelector('.timeline-card');

        // Year label: slide from left, reverse on up-scroll
        if (year) gsap.fromTo(year,
          { x: -50, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 87%', toggleActions: BD }
          }
        );

        // Dot: scale + glow pulse
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1, opacity: 1, duration: 0.55, ease: 'back.out(3)',
              scrollTrigger: { trigger: item, start: 'top 87%', toggleActions: BD }
            }
          );
          // Dot glow pulse
          gsap.to(dot, {
            boxShadow: '0 0 25px var(--accent-primary), 0 0 50px var(--accent-primary)',
            duration: 1, yoyo: true, repeat: -1, ease: 'sine.inOut'
          });
        }

        // Card: slide from RIGHT (alternating), reverse on up-scroll
        if (card) {
          gsap.fromTo(card,
            { x: 80, opacity: 0, rotationY: 8, scale: 0.95 },
            {
              x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.1, ease: 'expo.out',
              scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: BD }
            }
          );

          // Icon bounces into card
          const iconEl = card.querySelector('.timeline-icon');
          if (iconEl) gsap.fromTo(iconEl,
            { scale: 0, opacity: 0, rotation: -15 },
            {
              scale: 1, opacity: 1, rotation: 0, duration: 0.5, ease: 'back.out(2.5)',
              scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: BD }
            }
          );

          // Text lines stagger up
          gsap.fromTo(card.querySelectorAll('h3, .timeline-role, .timeline-desc'),
            { y: 25, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out',
              scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: BD }
            }
          );
        }
      });
    }

    /* ══════════════════════════════════════
       ⑤ CONTACT
    ══════════════════════════════════════ */
    const contactSec = document.querySelector('#contact');
    if (contactSec) {

      // Contact items: stagger slide from left with growing delay
      gsap.fromTo('#contact .contact-item',
        { x: -80, opacity: 0, scale: 0.95 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.85, stagger: 0.18, ease: 'expo.out',
          scrollTrigger: { trigger: '#contact .contact-info', start: 'top 84%', toggleActions: BD }
        }
      );

      // Contact icons pop
      gsap.fromTo('#contact .contact-icon',
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.18, ease: 'back.out(2.5)',
          scrollTrigger: { trigger: '#contact .contact-info', start: 'top 84%', toggleActions: BD }
        }
      );

      // Form: slides in from right with 3D Y rotation
      gsap.fromTo('#contact .contact-form',
        { x: 100, opacity: 0, rotationY: 8, scale: 0.96 },
        {
          x: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: '#contact .contact-form', start: 'top 84%', toggleActions: BD }
        }
      );

      // Form groups stagger in
      gsap.fromTo('#contact .form-group',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '#contact .contact-form', start: 'top 80%', toggleActions: BD }
        }
      );

      // Submit button rises last
      gsap.fromTo('#contact .form-submit',
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '#contact .contact-form', start: 'top 72%', toggleActions: BD }
        }
      );

      // Parallax: info drifts up, form drifts down — opposite directions
      gsap.to('#contact .contact-info', {
        y: -35,
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
      gsap.to('#contact .contact-form', {
        y: 25,
        ease: 'none',
        scrollTrigger: { trigger: '#contact', start: 'top bottom', end: 'bottom top', scrub: 2 }
      });
    }

    /* ══════════════════════════════════════
       ⑥ FOOTER
    ══════════════════════════════════════ */
    gsap.fromTo('.footer-logo',
      { y: 30, opacity: 0, letterSpacing: '0.5em' },
      {
        y: 0, opacity: 1, letterSpacing: '-0.02em', duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: '.footer', start: 'top 95%', toggleActions: 'play none none reverse' }
      }
    );
    gsap.fromTo('.footer p',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.footer', start: 'top 92%', toggleActions: 'play none none reverse' }
      }
    );

    /* ══════════════════════════════════════
       SCROLL PROGRESS BAR
       Thin indigo line at top of viewport
    ══════════════════════════════════════ */
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress-bar';
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '3px',
      width: '0%',
      background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
      zIndex: '999999',
      pointerEvents: 'none',
      transition: 'width 0.05s linear',
      boxShadow: '0 0 8px rgba(79,70,229,0.8)',
    });
    document.body.appendChild(progressBar);

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => { progressBar.style.width = `${self.progress * 100}%`; }
    });

    /* ══════════════════════════════════════
       SCROLL-TO-TOP BUTTON
    ══════════════════════════════════════ */
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
    Object.assign(scrollTopBtn.style, {
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      background: 'rgba(79,70,229,0.85)',
      border: '1px solid rgba(129,140,248,0.4)',
      color: '#fff',
      fontSize: '1rem',
      cursor: 'pointer',
      zIndex: '9998',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(10px)',
      opacity: '0',
      transform: 'translateY(20px) scale(0.8)',
      transition: 'background 0.3s, box-shadow 0.3s',
      boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
    });
    scrollTopBtn.addEventListener('mouseenter', () => {
      scrollTopBtn.style.background = 'rgba(99,90,255,0.95)';
      scrollTopBtn.style.boxShadow = '0 6px 30px rgba(79,70,229,0.7)';
    });
    scrollTopBtn.addEventListener('mouseleave', () => {
      scrollTopBtn.style.background = 'rgba(79,70,229,0.85)';
      scrollTopBtn.style.boxShadow = '0 4px 20px rgba(79,70,229,0.4)';
    });
    scrollTopBtn.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(scrollTopBtn);

    ScrollTrigger.create({
      start: 'top -200',
      onEnter: () => gsap.to(scrollTopBtn, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(2)' }),
      onLeaveBack: () => gsap.to(scrollTopBtn, { opacity: 0, y: 20, scale: 0.8, duration: 0.4, ease: 'power2.in' }),
    });

    /* ══════════════════════════════════════
       SECTION TRANSITION OVERLAYS
       A thin colored bar sweeps across as
       each section enters the viewport.
    ══════════════════════════════════════ */
    const sectionColors = {
      '#about': 'rgba(79,70,229,0.12)',
      '#skills': 'rgba(129,140,248,0.10)',
      '#projects': 'rgba(199,210,254,0.08)',
      '#education': 'rgba(79,70,229,0.12)',
      '#contact': 'rgba(129,140,248,0.10)',
    };

    Object.entries(sectionColors).forEach(([sel, color]) => {
      const sec = document.querySelector(sel);
      if (!sec) return;

      // Inject a sweep bar (once) into each section
      const sweep = document.createElement('div');
      Object.assign(sweep.style, {
        position: 'absolute',
        top: '0', left: '-100%',
        width: '100%', height: '3px',
        background: `linear-gradient(90deg, transparent, ${color.replace(/[\d.]+\)$/, '0.8)')}, transparent)`,
        pointerEvents: 'none',
        zIndex: '1',
      });
      sec.style.position = sec.style.position || 'relative';
      sec.appendChild(sweep);

      ScrollTrigger.create({
        trigger: sec,
        start: 'top 80%',
        onEnter: () => gsap.fromTo(sweep, { left: '-100%' }, { left: '100%', duration: 0.9, ease: 'power2.inOut' }),
        onEnterBack: () => gsap.fromTo(sweep, { left: '100%' }, { left: '-100%', duration: 0.9, ease: 'power2.inOut' }),
      });
    });

    /* ── FINAL REFRESH ── */
    setTimeout(() => { ScrollTrigger.refresh(); }, 150);
  }

});