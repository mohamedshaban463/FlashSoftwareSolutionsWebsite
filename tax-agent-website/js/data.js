/**
 * ETA AI Tax Agent - Static Website Data
 * Contains hotspot definitions for all screenshots, architecture specifications,
 * sample demo data, and code snippets.
 */

const APP_DATA = {
  // Screenshot view metadata and interactive hotspots
  views: {
    dashboard: {
      id: "dashboard",
      title: "Analytics & Executive Dashboard",
      subtitle: "Real-time visibility into invoicing volumes, tax liabilities, validity rates, and customer distributions.",
      image: "assets/images/dashboard.png",
      badge: "Real-Time BI & Metrics",
      description: "Embedded business intelligence console providing executive-level insights on invoice submissions, VAT totals, customer concentration, and submission health status over custom date ranges.",
      features: [
        {
          icon: "pie-chart",
          title: "Financial KPI Cards",
          desc: "Instant metrics on Net Revenue (EGP 13.13M+), VAT Collected (EGP 1.84M), Total Count (65 invoices), and Live Validity Ratio (69.2%)."
        },
        {
          icon: "trending-up",
          title: "Dual-Axis Sales & VAT Trend",
          desc: "Temporal time-series visualizing daily net invoice volume in purple vertical bars correlated against tax liability in golden stepped lines."
        },
        {
          icon: "bar-chart-2",
          title: "Top 5 Receiver Distribution",
          desc: "Horizontal comparative revenue breakdown for key Egyptian enterprises (Edita, Ezz Steel, Vodafone Egypt, Orascom, B.TECH)."
        },
        {
          icon: "check-circle",
          title: "Submission Health Donut",
          desc: "Direct visualization of document compliance states: Valid (69.2%), Pending/Submitted (16.9%), and Invalid/Rejected (12.3%)."
        }
      ],
      hotspots: [
        {
          id: "hs-kpi-revenue",
          x: 29.5,
          y: 28.5,
          title: "Net Revenue & VAT Cards",
          description: "High-contrast KPI modules calculating total pre-tax revenue and collected Egyptian VAT in real-time directly from local SQLite database storage."
        },
        {
          id: "hs-kpi-validity",
          x: 88.0,
          y: 28.5,
          title: "ETA Validity Ratio",
          description: "Tracks the compliance score of all submissions. Invoices are validated directly by the Egyptian Tax Authority API and flagged if schema or digital signatures fail."
        },
        {
          id: "hs-chart-trend",
          x: 58.0,
          y: 53.0,
          title: "Dual-Axis Sales & VAT Trend",
          description: "Matplotlib QtAgg rendering embedded seamlessly into the dark UI, plotting daily net invoice amounts against statutory VAT values over custom date filters."
        },
        {
          id: "hs-chart-receivers",
          x: 42.0,
          y: 86.0,
          title: "Top B2B Corporate Receivers",
          description: "Categorizes B2B corporate buyers (Edita, Ezz Steel, Vodafone Egypt, Orascom Construction, B.TECH) to monitor client concentration and transaction sizes."
        },
        {
          id: "hs-chart-status",
          x: 82.0,
          y: 86.0,
          title: "Status Distribution Donut",
          description: "Donut chart detailing the distribution of invoice lifecycle states (Valid, Submitted, Invalid) reflecting ETA validation callback statuses."
        }
      ]
    },

    invoices: {
      id: "invoices",
      title: "Invoice Explorer & Audit Trail",
      subtitle: "Comprehensive searchable registry of all generated, signed, and dispatched e-invoices with full audit logs.",
      image: "assets/images/invoices_explorer.png",
      badge: "Compliance & Auditing",
      description: "Searchable data table enabling financial controllers and auditors to track ETA UUIDs, internal identifiers, amounts, recipient tax IDs, and submission statuses with instant CSV export.",
      features: [
        {
          icon: "search",
          title: "Omni-Search & Date Filtering",
          desc: "Instant multi-parameter querying across Receiver name, Egyptian Tax ID, Internal Invoice ID, or 36-character ETA UUID."
        },
        {
          icon: "shield",
          title: "Color-Coded Status Badges",
          desc: "Visual compliance tags indicating 'Valid' (green), 'Submitted' (blue/purple), and 'Invalid' (red) based on official ETA API responses."
        },
        {
          icon: "file-text",
          title: "Line Item & JSON Inspection",
          desc: "Double-click any invoice row to inspect complete line-item pricing, tax rate breakdown, and raw canonical JSON payload."
        },
        {
          icon: "download",
          title: "One-Click CSV Export",
          desc: "Export customized date-filtered datasets into standardized CSV format for external ERP reconciliation and tax accounting."
        }
      ],
      hotspots: [
        {
          id: "hs-inv-search",
          x: 42.0,
          y: 16.0,
          title: "Omni-Search & Filter Toolbar",
          description: "Live search box with instant matching against receiver names, tax IDs, internal reference codes, and ETA UUIDs."
        },
        {
          id: "hs-inv-export",
          x: 91.5,
          y: 16.0,
          title: "CSV Export Action",
          description: "Instantly exports active filtered table rows into clean CSV files formatted for accounting reviews and ERP ingestion."
        },
        {
          id: "hs-inv-table-uuid",
          x: 46.0,
          y: 33.0,
          title: "Official ETA UUID Hash",
          description: "Unique 36-character document identifier assigned upon successful acceptance by the Egyptian Tax Authority e-Invoicing API."
        },
        {
          id: "hs-inv-table-status",
          x: 94.0,
          y: 33.0,
          title: "Live Status Badges",
          description: "Color-coded status indicators (Valid, Submitted, Invalid) reflecting asynchronous verification from ETA servers."
        }
      ]
    },

    submit: {
      id: "submit",
      title: "Automated Submission & PKCS#11 e-Sign",
      subtitle: "Client-side hardware token integration ensuring zero private-key exposure during cryptographic document signing.",
      image: "assets/images/submit_invoice.png",
      badge: "Cryptographic Security",
      description: "End-to-end processing pipeline orchestrating PDF ingestion, AI schema mapping, hardware USB token SHA-256 RSA signing, and secure TLS dispatch to ETA endpoints.",
      features: [
        {
          icon: "cpu",
          title: "PKCS#11 Hardware Token Signing",
          desc: "Direct integration with authorized Egyptian physical USB crypto tokens (Egypt Trust, MICA E-Pass 2003, IDEMIA, SafeNet) ensuring private keys never leave the hardware."
        },
        {
          icon: "lock",
          title: "Protected PIN Authentication",
          desc: "Secure PIN input triggering hardware-level authentication without caching secrets in plaintext memory or sending them over networks."
        },
        {
          icon: "activity",
          title: "Multi-Threaded Worker (QThread)",
          desc: "Decoupled asynchronous background execution pipeline with live progress tracking (0% → 20% → 50% → 80% → 100%)."
        },
        {
          icon: "terminal",
          title: "Real-Time System Logs",
          desc: "Live terminal log stream outputting timestamps, cryptographic hashing details, OAuth handshakes, and ETA HTTP status responses."
        }
      ],
      hotspots: [
        {
          id: "hs-sub-file",
          x: 48.0,
          y: 28.0,
          title: "Invoice PDF Ingestion",
          description: "File selector allowing users to browse local PDF invoices or load sample test files for automated OCR and AI-assisted data extraction."
        },
        {
          id: "hs-sub-pin",
          x: 48.0,
          y: 52.0,
          title: "Hardware USB Token PIN",
          description: "Masked entry for the PKCS#11 physical token PIN, passed directly to the crypto driver DLL (eps2003csp11.dll / eTokenPKCS11.dll) to unlock the private key."
        },
        {
          id: "hs-sub-demo",
          x: 42.0,
          y: 62.0,
          title: "Demo & Simulation Mode",
          description: "Enables safe offline development and client demonstrations by mocking PKCS#11 tokens and generating valid simulated ETA submission payloads."
        },
        {
          id: "hs-sub-button",
          x: 59.0,
          y: 72.0,
          title: "Pipeline Execution Trigger",
          description: "Initiates the 4-step asynchronous worker thread: OAuth Token $\\rightarrow$ PDF Processing $\\rightarrow$ Token Signing $\\rightarrow$ ETA API Dispatch."
        },
        {
          id: "hs-sub-log",
          x: 50.0,
          y: 91.0,
          title: "Live Audit Log Stream",
          description: "Interactive system console providing millisecond-accurate audit trails of all network requests, digest calculations, and server responses."
        }
      ]
    }
  },

  // 4-Stage Architecture Pipeline
  architectureSteps: [
    {
      step: 1,
      name: "OAuth 2.0 Identity Server",
      percentage: "0% → 20%",
      badge: "Authentication",
      icon: "key",
      summary: "Acquires short-lived Bearer access token using Client Credentials grant.",
      endpoint: "POST https://id.eta.gov.eg/connect/token",
      details: "Performs client_credentials grant against ETA's Identity Server with Client ID & Client Secret credentials under the 'InvoicingAPI' scope.",
      codeSnippet: `payload = {
    "grant_type": "client_credentials",
    "client_id": config["CLIENT_ID"],
    "client_secret": config["CLIENT_SECRET"],
    "scope": "InvoicingAPI",
}
resp = session.post(identity_url, data=payload, timeout=30)
access_token = resp.json()["access_token"]`
    },
    {
      step: 2,
      name: "PDF Ingestion & AI Schema Normalization",
      percentage: "20% → 50%",
      badge: "AI Extraction",
      icon: "cpu",
      summary: "Extracts vendor, customer, line-item taxes, and formats canonical ETA JSON.",
      endpoint: "POST /api/process-pdf (AI Extraction Microservice)",
      details: "The raw PDF is uploaded to the AI parsing engine which performs document OCR, entity extraction, tax classification (T1 Value Added Tax, T4 Withholding Tax), and returns structured JSON conforming to ETA Document Schema v1.0.",
      codeSnippet: `with open(pdf_path, "rb") as f:
    files = {"file": (filename, f, "application/pdf")}
    resp = session.post(process_url, files=files, headers=headers)
processed_json = resp.json()  # Validated ETA JSON document`
    },
    {
      step: 3,
      name: "PKCS#11 Hardware USB Token Signing",
      percentage: "50% → 80%",
      badge: "Client-Side Crypto",
      icon: "lock",
      summary: "Locates private key in hardware token & generates SHA-256 RSA digital signature.",
      endpoint: "Local PKCS#11 Driver (eps2003csp11.dll / eTokenPKCS11.dll)",
      details: "Client-side security strictly prevents private keys from ever leaving the physical token. The app serializes the normalized JSON into deterministic canonical format, hashes it via SHA-256, and signs the digest via CKM_SHA256_RSA_PKCS mechanism.",
      codeSnippet: `# 1. Serialize deterministically
canonical_json = json.dumps(doc, sort_keys=True, separators=(",", ":"))
# 2. Compute SHA-256 digest
digest = SHA256.new(canonical_json.encode("utf-8")).digest()
# 3. Hardware sign in USB Token
signature = session.sign(private_key, digest, PyKCS11.Mechanism(CKM_SHA256_RSA_PKCS))`
    },
    {
      step: 4,
      name: "ETA Document Submission & UUID Receipt",
      percentage: "80% → 100%",
      badge: "API Submission",
      icon: "send",
      summary: "Transmits signed payload to ETA API, returns official 36-char UUID.",
      endpoint: "POST https://api.eta.gov.eg/api/v1/documentsubmissions",
      details: "Sends the final document structure along with the hex-encoded digital signature and company metadata to the Egyptian Tax Authority. Upon acceptance, ETA issues a unique submission UUID and stores it in the local SQLite audit ledger.",
      codeSnippet: `submit_payload = {
    "filename": filename,
    "document": processed_json,
    "signature": signature_bytes.hex(),
    "companyName": config["COMPANY_NAME"]
}
resp = session.post(eta_submit_url, json=submit_payload, headers=headers)
# ETA Response: {"submissionId": "...", "acceptedDocuments": [{"uuid": "858DE961-32C2-4A15-..."}]}`
    }
  ],

  // Sample invoices for table preview and live simulator
  sampleInvoices: [
    {
      internalId: "INV-2026-0165",
      etaUuid: "858DE961-32C2-4A15-9981-E57A02C264A1",
      receiver: "Fawry Banking & Payment Technology",
      receiverTaxId: "200-145-891",
      date: "2026-08-15",
      netAmount: "345,000.00",
      vat: "48,300.00",
      total: "393,300.00",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0164",
      etaUuid: "F6C111B6-CD02-47D2-8A71-47754B98E7AA",
      receiver: "Ezz Steel S.A.E.",
      receiverTaxId: "100-332-904",
      date: "2026-08-06",
      netAmount: "553,510.00",
      vat: "77,491.40",
      total: "631,001.40",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0163",
      etaUuid: "BDAE3217-B7E7-4A04-8022-7CC0188A31D0",
      receiver: "Orascom Construction",
      receiverTaxId: "300-881-229",
      date: "2026-08-03",
      netAmount: "399,000.00",
      vat: "55,860.00",
      total: "454,860.00",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0162",
      etaUuid: "FC63620F-FC84-493F-92D0-FA21516BE001",
      receiver: "Telecom Egypt (WE)",
      receiverTaxId: "400-512-300",
      date: "2026-07-26",
      netAmount: "218,500.00",
      vat: "30,590.00",
      total: "249,090.00",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0161",
      etaUuid: "AEAA02BB-9DB4-4D5B-9A4E-E0DF528A9412",
      receiver: "Juhayna Food Industries",
      receiverTaxId: "100-721-445",
      date: "2026-07-21",
      netAmount: "3,700.00",
      vat: "518.00",
      total: "4,218.00",
      status: "Submitted",
      statusClass: "badge-submitted"
    },
    {
      internalId: "INV-2026-0160",
      etaUuid: "F6892418-5F67-45F1-8B33-28956FEE9A01",
      receiver: "Vodafone Egypt Telecommunications",
      receiverTaxId: "200-992-014",
      date: "2026-07-18",
      netAmount: "149,500.00",
      vat: "20,930.00",
      total: "170,430.00",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0158",
      etaUuid: "E5F2286D-41CD-4C99-8D33-1A24B908129C",
      receiver: "B.TECH for Trade & Distribution",
      receiverTaxId: "300-449-182",
      date: "2026-07-16",
      netAmount: "309,580.00",
      vat: "43,341.20",
      total: "352,921.20",
      status: "Valid",
      statusClass: "badge-valid"
    },
    {
      internalId: "INV-2026-0152",
      etaUuid: "D2B7A400-955C-4DA9-8E11-92CC84143321",
      receiver: "Orascom Development Egypt",
      receiverTaxId: "300-881-229",
      date: "2026-06-27",
      netAmount: "155,000.00",
      vat: "21,700.00",
      total: "176,700.00",
      status: "Invalid",
      statusClass: "badge-invalid"
    }
  ],

  // Hardware token compatibility list
  tokenCompatibility: [
    {
      vendor: "Egypt Trust / MICA",
      model: "E-Pass 2003",
      driver: "eps2003csp11.dll",
      status: "Fully Certified",
      os: "Windows 10/11 & Linux"
    },
    {
      vendor: "SafeNet / Oberthur",
      model: "eToken 5110 / Gemalto",
      driver: "eTokenPKCS11.dll",
      status: "Fully Certified",
      os: "Windows 10/11"
    },
    {
      vendor: "IDEMIA",
      model: "ID-One Cosmo v8",
      driver: "OcsCryptolib.dll",
      status: "Fully Certified",
      os: "Windows & Linux"
    },
    {
      vendor: "OpenSC",
      model: "Generic PKCS#11 Provider",
      driver: "opensc-pkcs11.so",
      status: "Supported",
      os: "Linux / macOS"
    }
  ],

  // Code snippets for developer tab
  codeSnippets: {
    worker: `class InvoiceWorker(QThread):
    """
    Executes the 4-step ETA invoice pipeline in background thread:
      1. OAuth Authentication       (0%  -> 20%)
      2. PDF Upload & Processing    (20% -> 50%)
      3. PKCS#11 USB Token Signing  (50% -> 80%)
      4. ETA Submission             (80% -> 100%)
    """
    progress = pyqtSignal(int)
    log_message = pyqtSignal(str, str)
    finished_signal = pyqtSignal(bool, str)

    def run(self):
        http = get_http_session()
        # Step 1: OAuth Token
        self.progress.emit(0)
        self._emit_log("Step 1/4 - Authenticating with ETA Identity Server...")
        access_token = acquire_eta_token(http, self.config["ETA_IDENTITY_URL"], ...)
        
        # Step 2: Upload PDF
        self.progress.emit(20)
        self._emit_log("Step 2/4 - Processing PDF invoice with AI parser...")
        processed_json = upload_pdf(http, self.config["SERVER_PROCESS_URL"], ...)
        
        # Step 3: Hardware PKCS#11 Sign
        self.progress.emit(50)
        self._emit_log("Step 3/4 - Signing payload with USB Token (PKCS#11)...")
        signer = PKCS11Signer(pin=self.pin, auto_detect=True)
        signature_bytes = signer.sign_payload(canonical_json.encode("utf-8"))
        
        # Step 4: Submit to ETA
        self.progress.emit(80)
        self._emit_log("Step 4/4 - Submitting signed invoice to ETA API...")
        result = submit_signed_invoice(http, self.config["ETA_SUBMIT_URL"], submit_payload, ...)
        
        self.progress.emit(100)
        self._emit_log(f"✓ Invoice submitted successfully! UUID: {result.get('uuid')}")
        self.finished_signal.emit(True, "Invoice submitted successfully.")`,

    signer: `class PKCS11Signer:
    """Handles USB Token authentication and SHA-256 RSA signing using PKCS#11."""
    
    def __init__(self, pin: str, custom_driver: str = "", auto_detect: bool = True):
        self.pin = pin
        self.driver_path = self._resolve_driver(custom_driver, auto_detect)
        self.pkcs11 = PyKCS11.PyKCS11Lib()

    def sign_payload(self, data: bytes) -> bytes:
        self.pkcs11.load(self.driver_path)
        slots = self.pkcs11.getSlotList(tokenPresent=True)
        if not slots:
            raise RuntimeError("No USB Token detected. Insert USB Token.")

        session = self.pkcs11.openSession(slots[0], PyKCS11.CKF_SERIAL_SESSION | PyKCS11.CKF_RW_SESSION)
        try:
            session.login(self.pin)
            key_objects = session.findObjects([(PyKCS11.CKA_CLASS, PyKCS11.CKO_PRIVATE_KEY)])
            if not key_objects:
                raise RuntimeError("No private key found on USB Token.")

            private_key = key_objects[0]
            digest = SHA256.new(data).digest()
            mechanism = PyKCS11.Mechanism(PyKCS11.CKM_SHA256_RSA_PKCS, None)
            
            signature = session.sign(private_key, digest, mechanism)
            return bytes(signature)
        finally:
            session.logout()
            session.closeSession()`,

    http: `def acquire_eta_token(session: requests.Session, identity_url: str, client_id: str, client_secret: str) -> str:
    payload = {
        "grant_type": "client_credentials",
        "client_id": client_id,
        "client_secret": client_secret,
        "scope": "InvoicingAPI",
    }
    resp = session.post(identity_url, data=payload, timeout=30)
    resp.raise_for_status()
    return resp.json()["access_token"]

def submit_signed_invoice(session: requests.Session, url: str, payload: dict, token: str) -> dict:
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    resp = session.post(url, json=payload, headers=headers, timeout=30)
    resp.raise_for_status()
    return resp.json()`
  }
};
