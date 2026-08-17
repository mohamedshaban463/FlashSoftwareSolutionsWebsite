/**
 * ETA AI Tax Agent — Lightbox Image Viewer
 * Provides click-to-enlarge, multi-level zoom (1x, 1.5x, 2x), and keyboard controls.
 */

class Lightbox {
  constructor() {
    this.modal = document.getElementById('lightboxModal');
    this.image = document.getElementById('lightboxImage');
    this.title = document.getElementById('lightboxTitle');
    this.closeBtn = document.getElementById('lightboxClose');
    this.zoomInBtn = document.getElementById('lightboxZoomIn');
    this.zoomOutBtn = document.getElementById('lightboxZoomOut');
    this.zoomResetBtn = document.getElementById('lightboxZoomReset');
    
    this.currentZoom = 1;
    this.minZoom = 0.8;
    this.maxZoom = 2.5;
    this.zoomStep = 0.25;

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
      if (e.target === this.modal || e.target.classList.contains('lightbox-body')) {
        this.close();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === '+' || e.key === '=') this.zoom(this.zoomStep);
      if (e.key === '-') this.zoom(-this.zoomStep);
      if (e.key === '0') this.resetZoom();
    });
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
  }

  zoom(delta) {
    this.currentZoom = Math.min(Math.max(this.currentZoom + delta, this.minZoom), this.maxZoom);
    this.applyTransform();
  }

  resetZoom() {
    this.currentZoom = 1;
    this.applyTransform();
  }

  applyTransform() {
    if (this.image) {
      this.image.style.transform = `scale(${this.currentZoom})`;
    }
  }
}

window.Lightbox = Lightbox;
