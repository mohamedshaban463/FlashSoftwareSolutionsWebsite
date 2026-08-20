/**
 * Flash Software Solutions — ETA AI Tax Agent
 * Gestures & Motion Physics Engine
 * 
 * Includes:
 * 1. ParticleMesh: Interactive background particle web reacting to cursor motion.
 * 2. Tilt3D: 3D perspective card tilt with dynamic specular spotlight reflection.
 * 3. MagneticElements: Spring-damped magnetic pull on buttons and badges.
 * 4. SwipeDragController: Touch swipe & mouse drag navigation for showcase tabs.
 * 5. RippleEffect: Radiant expanding click wave from cursor coordinates.
 * 6. KeyboardNavigation: Global keyboard shortcuts (Arrows, Numbers, Hotkeys).
 * 7. ScrollReveals: Physics-eased scroll entrance animations.
 */

class GestureEngine {
  constructor(appController) {
    this.app = appController;
    this.initParticles();
    this.init3DTilt();
    this.initMagneticHover();
    this.initSwipeAndDrag();
    this.initRippleEffect();
    this.initKeyboardShortcuts();
    this.initScrollReveals();
  }

  // ── 1. Interactive Ambient Particle Canvas ───────────────────────
  initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 22), 55);
    const connectionDistance = 140;
    const mouseRadius = 160;

    const mouse = { x: null, y: null };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1;
        this.baseColor = Math.random() > 0.5 ? '108, 99, 255' : '34, 211, 238';
        this.alpha = Math.random() * 0.4 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseAngle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        this.pulseAngle += this.pulseSpeed;
        this.currentAlpha = this.alpha + Math.sin(this.pulseAngle) * 0.15;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const force = (1 - dist / mouseRadius) * 2.2;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force;
            this.y -= Math.sin(angle) * force;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.baseColor}, ${Math.max(0.1, this.currentAlpha)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${this.baseColor}, 0.5)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }

  // ── 2. 3D Perspective Tilt & Specular Light Reflection ──────────
  init3DTilt() {
    const tiltElements = document.querySelectorAll('.tilt-card, .feature-card, .company-logo-wrapper, .showcase-display');

    tiltElements.forEach((card) => {
      let isHovered = false;

      let shine = card.querySelector('.specular-shine');
      if (!shine && !card.classList.contains('no-shine')) {
        shine = document.createElement('div');
        shine.className = 'specular-shine';
        card.appendChild(shine);
      }

      const handleMove = (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxRotate = card.dataset.maxTilt ? parseFloat(card.dataset.maxTilt) : 7;
        const rotateX = ((y - centerY) / centerY) * -maxRotate;
        const rotateY = ((x - centerX) / centerX) * maxRotate;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`;

        if (shine) {
          shine.style.opacity = '1';
          shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.16) 0%, rgba(108, 99, 255, 0.08) 35%, transparent 70%)`;
        }
      };

      const handleEnter = () => {
        isHovered = true;
        card.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
      };

      const handleLeave = () => {
        isHovered = false;
        card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        if (shine) {
          shine.style.opacity = '0';
        }
      };

      card.addEventListener('mouseenter', handleEnter);
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });
  }

  // ── 3. Magnetic Hover Physics on Buttons ─────────────────────────
  initMagneticHover() {
    const magneticBtns = document.querySelectorAll('.btn, .social-btn, .showcase-tab-btn, .hotspot-pin');

    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        const pullX = x * 0.26;
        const pullY = y * 0.26;

        btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        btn.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => {
          btn.style.transition = '';
        }, 400);
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'transform 0.1s ease-out';
      });
    });
  }

  // ── 4. Touch Swipe & Mouse Drag Showcase Navigation ─────────────
  initSwipeAndDrag() {
    const container = document.querySelector('.showcase-image-container');
    if (!container) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    const threshold = 55;

    const views = ['dashboard', 'invoices', 'submit'];

    const getActiveViewIndex = () => {
      const activeTab = document.querySelector('.showcase-tab-btn.active');
      const current = activeTab ? activeTab.dataset.view : 'dashboard';
      return views.indexOf(current);
    };

    const triggerNext = () => {
      const idx = getActiveViewIndex();
      const nextIdx = (idx + 1) % views.length;
      this.app?.switchViewWithMotion(views[nextIdx], 'right');
      this.showGestureCue('next');
    };

    const triggerPrev = () => {
      const idx = getActiveViewIndex();
      const prevIdx = (idx - 1 + views.length) % views.length;
      this.app?.switchViewWithMotion(views[prevIdx], 'left');
      this.showGestureCue('prev');
    };

    // Touch Events
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isDragging = true;
      }
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      currentX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      const diffX = currentX - startX;
      if (Math.abs(diffX) > threshold) {
        if (diffX < 0) {
          triggerNext();
        } else {
          triggerPrev();
        }
      }
      startX = 0;
      currentX = 0;
    });

    // Mouse Drag on Showcase
    let mouseStartX = 0;
    let isMouseDown = false;

    container.addEventListener('mousedown', (e) => {
      if (e.target.closest('.hotspot-pin') || e.target.closest('button')) return;
      mouseStartX = e.clientX;
      isMouseDown = true;
      container.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - mouseStartX;
      container.style.transform = `translateX(${deltaX * 0.08}px) scale(0.995)`;
    });

    window.addEventListener('mouseup', (e) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      container.classList.remove('is-dragging');
      const deltaX = e.clientX - mouseStartX;
      container.style.transform = '';

      if (Math.abs(deltaX) > threshold) {
        if (deltaX < 0) {
          triggerNext();
        } else {
          triggerPrev();
        }
      }
      mouseStartX = 0;
    });
  }

  // Visual gesture indicator cue badge on screen
  showGestureCue(direction) {
    let indicator = document.getElementById('gestureCueIndicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'gestureCueIndicator';
      indicator.className = 'gesture-cue-indicator';
      document.body.appendChild(indicator);
    }

    indicator.innerHTML = direction === 'next' 
      ? `<span>Slide View</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg> <span>Slide View</span>`;
    
    indicator.classList.remove('active');
    void indicator.offsetWidth;
    indicator.classList.add('active');

    setTimeout(() => {
      indicator.classList.remove('active');
    }, 900);
  }

  // ── 5. Fluid Click Ripple Waves ──────────────────────────────────
  initRippleEffect() {
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.btn, .social-btn, .showcase-tab-btn, .hotspot-pin, .showcase-image-container');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'click-ripple';

      const diameter = Math.max(rect.width, rect.height) * 2;
      const radius = diameter / 2;

      ripple.style.width = ripple.style.height = `${diameter}px`;
      ripple.style.left = `${e.clientX - rect.left - radius}px`;
      ripple.style.top = `${e.clientY - rect.top - radius}px`;

      const existingRipple = target.querySelector('.click-ripple');
      if (existingRipple) existingRipple.remove();

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  }

  // ── 6. Global Keyboard Shortcuts & Gestures ──────────────────────
  initKeyboardShortcuts() {
    const views = ['dashboard', 'invoices', 'submit'];

    document.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      const lightboxModal = document.getElementById('lightboxModal');
      const isLightboxOpen = lightboxModal?.classList.contains('open');

      const activeTab = document.querySelector('.showcase-tab-btn.active');
      const currentView = activeTab ? activeTab.dataset.view : 'dashboard';
      const currentIndex = views.indexOf(currentView);

      if (e.key === 'ArrowRight') {
        const nextIdx = (currentIndex + 1) % views.length;
        this.app?.switchViewWithMotion(views[nextIdx], 'right');
        this.showGestureCue('next');
      } else if (e.key === 'ArrowLeft') {
        const prevIdx = (currentIndex - 1 + views.length) % views.length;
        this.app?.switchViewWithMotion(views[prevIdx], 'left');
        this.showGestureCue('prev');
      } else if (e.key === '1') {
        this.app?.switchViewWithMotion(views[0], 'left');
      } else if (e.key === '2') {
        this.app?.switchViewWithMotion(views[1], currentIndex > 1 ? 'left' : 'right');
      } else if (e.key === '3') {
        this.app?.switchViewWithMotion(views[2], 'right');
      } else if (e.key.toLowerCase() === 'a' && !isLightboxOpen) {
        const btnToggleHotspots = document.getElementById('btnToggleHotspots');
        btnToggleHotspots?.click();
      } else if (e.key.toLowerCase() === 'f' && !isLightboxOpen) {
        const btnExpandLightbox = document.getElementById('btnExpandLightbox');
        btnExpandLightbox?.click();
      }
    });
  }

  // ── 7. Scroll-Triggered Stagger Reveals ───────────────────────────
  initScrollReveals() {
    const revealElements = document.querySelectorAll('.hero-content-center, .section-header, .showcase-display');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach(el => el.classList.add('is-revealed'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => {
      el.classList.add('reveal-item');
      observer.observe(el);
    });
  }
}

window.GestureEngine = GestureEngine;
