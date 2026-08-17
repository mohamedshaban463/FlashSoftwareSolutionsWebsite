/**
 * ETA AI Tax Agent — Interactive Submission Pipeline Simulator
 * Simulates the 4-stage background worker thread with realistic delays,
 * terminal streaming, and cryptographic hash / UUID verification.
 */

class PipelineSimulator {
  constructor() {
    this.btnSubmit = document.getElementById('simSubmitBtn');
    this.btnReset = document.getElementById('simResetBtn');
    this.invoiceSelect = document.getElementById('simInvoiceSelect');
    this.pinInput = document.getElementById('simPinInput');
    this.demoToggle = document.getElementById('simDemoToggle');
    this.progressBar = document.getElementById('simProgressBar');
    this.progressLabel = document.getElementById('simProgressLabel');
    this.terminal = document.getElementById('simTerminalLogs');
    this.receiptBox = document.getElementById('simReceiptBox');
    this.receiptUuid = document.getElementById('simReceiptUuid');
    
    this.isRunning = false;
    this.init();
  }

  init() {
    if (!this.btnSubmit) return;

    this.btnSubmit.addEventListener('click', () => this.runSimulation());
    this.btnReset?.addEventListener('click', () => this.resetSimulation());
  }

  getTimestamp() {
    const now = new Date();
    return now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
  }

  log(message, type = 'info') {
    if (!this.terminal) return;
    const line = document.createElement('div');
    line.className = 'log-entry';
    
    const timeSpan = document.createElement('span');
    timeSpan.className = 'log-time';
    timeSpan.textContent = `[${this.getTimestamp()}]`;

    const textSpan = document.createElement('span');
    textSpan.className = `log-${type}`;
    textSpan.textContent = message;

    line.appendChild(timeSpan);
    line.appendChild(textSpan);
    this.terminal.appendChild(line);
    this.terminal.scrollTop = this.terminal.scrollHeight;
  }

  setProgress(percent, label) {
    if (this.progressBar) this.progressBar.style.width = `${percent}%`;
    if (this.progressLabel) this.progressLabel.textContent = `${percent}% — ${label}`;
  }

  generateMockUUID() {
    const chars = '0123456789ABCDEF';
    const segment = (len) => Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment(8)}-${segment(4)}-4${segment(3)}-8${segment(3)}-${segment(12)}`;
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async runSimulation() {
    if (this.isRunning) return;
    
    const pin = this.pinInput.value.trim() || '1234';
    const isDemo = this.demoToggle ? this.demoToggle.checked : true;
    const selectedInvoiceName = this.invoiceSelect ? this.invoiceSelect.options[this.invoiceSelect.selectedIndex].text : 'Inv_418_Ganat.pdf';

    this.isRunning = true;
    this.btnSubmit.disabled = true;
    this.btnSubmit.innerHTML = `<span class="spinner"></span> Processing Pipeline...`;
    if (this.receiptBox) this.receiptBox.style.display = 'none';
    this.terminal.innerHTML = '';

    this.log(`Initializing ETA Invoice Agent v2.0 in ${isDemo ? 'DEMO / SIMULATION' : 'PRODUCTION'} mode...`, 'info');
    await this.sleep(400);

    // ── STAGE 1: OAuth Token (0% → 20%) ──────────────────────────────
    this.setProgress(0, 'Authenticating...');
    this.log(`Step 1/4 — Requesting OAuth2 token from ETA Identity Server (scope: InvoicingAPI)...`, 'info');
    await this.sleep(700);

    const mockToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjFhMmIzYyJ9...' + Math.random().toString(36).substring(2, 8);
    this.setProgress(20, 'OAuth Acquired');
    this.log(`✓ OAuth2 Bearer token acquired successfully. Token: ${mockToken}`, 'success');
    await this.sleep(500);

    // ── STAGE 2: PDF Parsing & Normalization (20% → 50%) ─────────────
    this.setProgress(30, 'Uploading PDF & AI Extraction');
    this.log(`Step 2/4 — Uploading '${selectedInvoiceName}' to AI Document Processing Microservice...`, 'info');
    await this.sleep(900);

    this.log(`→ Performing OCR entity extraction (Tax ID, Line Items, VAT T1, WHT T4)...`, 'info');
    await this.sleep(600);

    this.setProgress(50, 'JSON Schema Normalized');
    this.log(`✓ Document schema normalized into Egyptian Tax Authority v1.0 standard (28 keys parsed).`, 'success');
    await this.sleep(500);

    // ── STAGE 3: PKCS#11 Hardware Token Signing (50% → 80%) ──────────
    this.setProgress(60, 'Connecting Hardware Token');
    this.log(`Step 3/4 — Detecting PKCS#11 Security Device (Auto-detecting dll drivers)...`, 'info');
    await this.sleep(500);

    this.log(`→ Located driver: C:\\Windows\\System32\\eps2003csp11.dll (Egypt Trust / MICA E-Pass 2003)`, 'info');
    this.log(`→ Authenticating token with PIN: ${'*'.repeat(pin.length)}`, 'info');
    await this.sleep(600);

    this.log(`→ Deterministic canonical JSON serialization computed (SHA-256 Digest: e3b0c44298fc1c149afb...)`, 'info');
    await this.sleep(500);

    this.setProgress(80, 'Hardware Signature Generated');
    this.log(`✓ PKCS#11 CKM_SHA256_RSA_PKCS hardware signature generated (256 bytes). Zero key leakage.`, 'success');
    await this.sleep(600);

    // ── STAGE 4: Submit to ETA API (80% → 100%) ──────────────────────
    this.setProgress(90, 'Submitting to ETA Gateway');
    this.log(`Step 4/4 — Dispatching signed payload to ETA Document Submissions API...`, 'info');
    await this.sleep(800);

    const generatedUuid = this.generateMockUUID();
    this.setProgress(100, 'Completed — Accepted by ETA');
    this.log(`✓ ETA Response: 200 OK — Submission accepted!`, 'success');
    this.log(`✓ ETA Document UUID: ${generatedUuid}`, 'success');
    this.log(`✓ Saved record to local SQLite audit database (eta_invoices.db).`, 'info');

    if (this.receiptBox && this.receiptUuid) {
      this.receiptUuid.textContent = generatedUuid;
      this.receiptBox.style.display = 'block';
    }

    this.isRunning = false;
    this.btnSubmit.disabled = false;
    this.btnSubmit.innerHTML = `✓ Process & Submit Another Invoice`;
  }

  resetSimulation() {
    this.isRunning = false;
    this.btnSubmit.disabled = false;
    this.btnSubmit.innerHTML = `⚡ Process & Submit Invoice`;
    this.setProgress(0, 'Ready');
    if (this.terminal) {
      this.terminal.innerHTML = `<div class="log-entry"><span class="log-time">[${this.getTimestamp()}]</span> <span class="log-info">ETA Invoice Agent initialized — ready.</span></div>`;
    }
    if (this.receiptBox) this.receiptBox.style.display = 'none';
  }
}

window.PipelineSimulator = PipelineSimulator;
