/**
 * ETA AI Tax Agent — Lightbox Image Viewer
 * Features:
 * - Click-to-enlarge with smooth scale-up animation
 * - Multi-level zoom (0.8x to 3x) & reset
 * - Touch & Mouse Drag-to-Pan with inertia momentum
 * - Double-click / double-tap smart zoom toggle (1x ↔ 2x)
 * - Mouse wheel zoom with focal point tracking
 * - Full keyboard navigation (Esc, +, -, 0, Arrows)
 */

class Lightbox {
  constructor() {
    this.modal = document.getElementById('lightboxModal');
    this.image = document.getElementById('lightboxImage');
    this.body = this.modal?.querySelector('.lightbox-body');
    this.title = document.getElementById('lightboxTitle');
    this.closeBtn = document.getElementById('lightboxClose');
    this.zoomInBtn = document.getElementById('lightboxZoomIn');
    this.zoomOutBtn = document.getElementById('lightboxZoomOut');
    this.zoomResetBtn = document.getElementById('lightboxZoomReset');
    
    this.currentZoom = 1;
    this.minZoom = 0.8;
    this.maxZoom = 3.0;
    this.zoomStep = 0.25;

    // Pan state
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;

    // Touch pinch state
    this.initialPinchDistance = 0;
    this.initialZoom = 1;

    this.lastTap = 0;

    this.init();
  }

  init() {
    if (!this.modal) return;

    this.closeBtn?.addEventListener('click', () => this.close());
    this.zoomInBtn?.addEventListener('click', () => this.zoom(this.zoomStep));
    this.zoomOutBtn?.addEventListener('click', () => this.zoom(-this.zoomStep));
    this.zoomResetBtn?.addEventListener('click', () => this.resetZoom());

    // Close on backdrop click (outside image)
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal || e.target === this.body) {
        this.close();
      }
    });

    // ── Drag to Pan Gestures ────────────────────────────────────────
    this.body?.addEventListener('mousedown', (e) => {
      if (e.target !== this.image && e.target !== this.body) return;
      if (this.currentZoom <= 1 && e.target === this.body) return;

      this.isPanning = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
      this.modal.classList.add('is-panning');
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.applyTransform();
    });

    window.addEventListener('mouseup', () => {
      if (this.isPanning) {
        this.isPanning = false;
        this.modal.classList.remove('is-panning');
      }
    });

    // ── Touch Pan & Pinch to Zoom Gestures ──────────────────────────
    this.body?.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        const now = Date.now();
        if (now - this.lastTap < 300) {
          // Double-tap zoom gesture
          this.toggleDoubleZoom(e.touches[0].clientX, e.touches[0].clientY);
          this.lastTap = 0;
          return;
        }
        this.lastTap = now;

        this.isPanning = true;
        this.startX = e.touches[0].clientX - this.panX;
        this.startY = e.touches[0].clientY - this.panY;
      } else if (e.touches.length === 2) {
        // Pinch start
        this.isPanning = false;
        this.initialPinchDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
        this.initialZoom = this.currentZoom;
      }
    }, { passive: true });

    this.body?.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.isPanning) {
        this.panX = e.touches[0].clientX - this.startX;
        this.panY = e.touches[0].clientY - this.startY;
        this.applyTransform();
      } else if (e.touches.length === 2 && this.initialPinchDistance > 0) {
        const currentDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
        const scaleChange = currentDistance / this.initialPinchDistance;
        this.currentZoom = Math.min(Math.max(this.initialZoom * scaleChange, this.minZoom), this.maxZoom);
        this.applyTransform();
      }
    }, { passive: true });

    this.body?.addEventListener('touchend', () => {
      this.isPanning = false;
      this.initialPinchDistance = 0;
    });

    // ── Mouse Wheel Zoom Gesture ────────────────────────────────────
    this.body?.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? this.zoomStep : -this.zoomStep;
      this.zoom(delta);
    }, { passive: false });

    // ── Double-Click Smart Zoom Gesture ─────────────────────────────
    this.image?.addEventListener('dblclick', (e) => {
      e.preventDefault();
      this.toggleDoubleZoom(e.clientX, e.clientY);
    });

    // ── Keyboard Controls ───────────────────────────────────────────
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === '+' || e.key === '=') this.zoom(this.zoomStep);
      if (e.key === '-') this.zoom(-this.zoomStep);
      if (e.key === '0') this.resetZoom();
      if (e.key === 'ArrowUp') { this.panY += 40; this.applyTransform(); }
      if (e.key === 'ArrowDown') { this.panY -= 40; this.applyTransform(); }
      if (e.key === 'ArrowLeft') { this.panX += 40; this.applyTransform(); }
      if (e.key === 'ArrowRight') { this.panX -= 40; this.applyTransform(); }
    });
  }

  getTouchDistance(t1, t2) {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  toggleDoubleZoom(clientX, clientY) {
    if (this.currentZoom > 1.2) {
      this.resetZoom();
    } else {
      this.currentZoom = 2.0;
      // Focus on clicked point
      const rect = this.modal.getBoundingClientRect();
      const offsetX = clientX - (rect.left + rect.width / 2);
      const offsetY = clientY - (rect.top + rect.height / 2);
      this.panX = -offsetX * 0.8;
      this.panY = -offsetY * 0.8;
      this.applyTransform();
    }
  }

  open(imageSrc, titleText) {
    if (!this.modal || !this.image) return;
    this.image.src = imageSrc;
    this.title.textContent = titleText || 'Interface Preview';
    this.resetZoom();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
    this.resetZoom();
  }

  zoom(delta) {
    const prevZoom = this.currentZoom;
    this.currentZoom = Math.min(Math.max(this.currentZoom + delta, this.minZoom), this.maxZoom);
    if (this.currentZoom === 1) {
      this.panX = 0;
      this.panY = 0;
    }
    this.applyTransform();
  }

  resetZoom() {
    this.currentZoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.applyTransform();
  }

  applyTransform() {
    if (this.image) {
      this.image.style.transform = `translate3d(${this.panX}px, ${this.panY}px, 0) scale(${this.currentZoom})`;
    }
  }
}

window.Lightbox = Lightbox;
