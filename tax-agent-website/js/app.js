/**
 * Flash Software Solutions — ETA AI Tax Agent
 * Application Controller for Showcase Image Views, Hotspots, Lightbox & Hero Metrics.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lightbox
  const lightbox = new Lightbox();

  // State
  let currentViewId = 'dashboard';
  let activeHotspotsVisible = true;

  // DOM Elements
  const tabs = document.querySelectorAll('.showcase-tab-btn');
  const viewTag = document.getElementById('showcaseTag');
  const viewTitle = document.getElementById('showcaseTitle');
  const viewSubtitle = document.getElementById('showcaseSubtitle');
  const mainImage = document.getElementById('showcaseMainImg');
  const hotspotOverlay = document.getElementById('hotspotOverlay');
  const featuresGrid = document.getElementById('showcaseFeaturesGrid');
  const btnToggleHotspots = document.getElementById('btnToggleHotspots');
  const btnExpandLightbox = document.getElementById('btnExpandLightbox');

  // ── Render Active Showcase View ─────────────────────────────────
  function renderView(viewId) {
    const viewData = APP_DATA.views[viewId];
    if (!viewData) return;

    currentViewId = viewId;

    // Update active tab button
    tabs.forEach(tab => {
      if (tab.dataset.view === viewId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Text & Image
    if (viewTag) viewTag.textContent = viewData.badge;
    if (viewTitle) viewTitle.textContent = viewData.title;
    if (viewSubtitle) viewSubtitle.textContent = viewData.subtitle;
    if (mainImage) {
      mainImage.src = viewData.image;
      mainImage.alt = viewData.title;
    }

    // Render Hotspots
    renderHotspots(viewData.hotspots);

    // Render Feature Cards
    renderFeatures(viewData.features);
  }

  // ── Render Hotspots on Screenshot ──────────────────────────────
  function renderHotspots(hotspots) {
    if (!hotspotOverlay) return;
    hotspotOverlay.innerHTML = '';
    if (!activeHotspotsVisible || !hotspots) return;

    hotspots.forEach((hs) => {
      const pin = document.createElement('div');
      pin.className = 'hotspot-pin';
      pin.style.left = `${hs.x}%`;
      pin.style.top = `${hs.y}%`;
      pin.id = hs.id;

      pin.innerHTML = `
        <div class="hotspot-ring"></div>
        <div class="hotspot-core"></div>
        <div class="hotspot-popover">
          <div class="popover-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            ${hs.title}
          </div>
          <div class="popover-desc">${hs.description}</div>
        </div>
      `;

      // Allow tap/click to toggle
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.hotspot-pin').forEach(p => {
          if (p !== pin) p.classList.remove('active');
        });
        pin.classList.toggle('active');
      });

      hotspotOverlay.appendChild(pin);
    });
  }

  // ── Render Feature Cards Below Image ───────────────────────────
  function renderFeatures(features) {
    if (!featuresGrid) return;
    featuresGrid.innerHTML = '';
    if (!features) return;

    const iconSvgs = {
      'pie-chart': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>',
      'trending-up': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
      'bar-chart-2': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
      'check-circle': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      'search': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
      'shield': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
      'file-text': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
      'download': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
      'cpu': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>',
      'lock': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
      'activity': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
      'terminal': '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>'
    };

    features.forEach(f => {
      const card = document.createElement('div');
      card.className = 'feature-card';
      card.innerHTML = `
        <div class="feature-icon-wrap">${iconSvgs[f.icon] || ''}</div>
        <h4 class="feature-title">${f.title}</h4>
        <p class="feature-desc">${f.desc}</p>
      `;
      featuresGrid.appendChild(card);
    });
  }

  // ── Tab Clicks ──────────────────────────────────────────────────
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      renderView(tab.dataset.view);
    });
  });

  // Hotspots Toggle
  btnToggleHotspots?.addEventListener('click', () => {
    activeHotspotsVisible = !activeHotspotsVisible;
    btnToggleHotspots.classList.toggle('active', activeHotspotsVisible);
    renderHotspots(APP_DATA.views[currentViewId].hotspots);
  });

  // Lightbox Expand
  btnExpandLightbox?.addEventListener('click', () => {
    const current = APP_DATA.views[currentViewId];
    lightbox.open(current.image, current.title);
  });

  // Click on image opens lightbox
  mainImage?.addEventListener('click', () => {
    const current = APP_DATA.views[currentViewId];
    lightbox.open(current.image, current.title);
  });

  // Dismiss active hotspot on background click
  document.addEventListener('click', () => {
    document.querySelectorAll('.hotspot-pin').forEach(p => p.classList.remove('active'));
  });

  // Initial View Setup
  renderView('dashboard');
});
