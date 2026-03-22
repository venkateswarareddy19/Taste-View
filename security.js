/* ============================================================
   TASTE & VIEW — security.js
   Client-side security utilities
   NOTE: Authentication & API calls MUST be backed by a server.
         This file handles: input sanitization, rate limiting,
         XSS prevention, CSRF tokens, and storage helpers.
   ============================================================ */

/* ══════════════════════════════
   DOMPurify-style HTML Sanitizer
   (lightweight, no dependency)
══════════════════════════════ */
const Sanitizer = {
  /* Escape HTML entities — use for ANY user-supplied text injected into the DOM */
  escapeHTML(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  /* Strip all HTML tags — use for descriptions shown in cards */
  stripTags(str) {
    if (str == null) return '';
    return String(str).replace(/<[^>]*>/g, '');
  },

  /* Sanitize for safe innerHTML: strips tags, escapes entities */
  sanitize(str) {
    return this.escapeHTML(this.stripTags(str));
  },

  /* Validate email format */
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
  },

  /* Validate phone (Indian format) */
  isValidPhone(phone) {
    return /^(\+91[\s-]?)?[6-9]\d{9}$/.test(String(phone).replace(/\s/g, ''));
  },

  /* Validate URL is safe (no javascript: or data: URIs) */
  isSafeURL(url) {
    try {
      const u = new URL(url, location.origin);
      return ['http:', 'https:', 'tel:'].includes(u.protocol);
    } catch {
      return false;
    }
  },

  /* Sanitize Google Maps direction URL */
  safeMapsURL(lat, lng) {
    const numLat = parseFloat(lat);
    const numLng = parseFloat(lng);
    if (isNaN(numLat) || isNaN(numLng)) return null;
    if (numLat < -90 || numLat > 90 || numLng < -180 || numLng > 180) return null;
    return `https://www.google.com/maps/dir/?api=1&destination=${numLat},${numLng}`;
  }
};


/* ══════════════════════════════
   Client-side Rate Limiter
   Prevents rapid API / form spam
══════════════════════════════ */
const RateLimiter = {
  _store: {},

  /* Returns true if action is allowed, false if rate-limited */
  allow(key, maxCalls, windowMs) {
    const now = Date.now();
    if (!this._store[key]) this._store[key] = [];
    // Purge old entries
    this._store[key] = this._store[key].filter(t => now - t < windowMs);
    if (this._store[key].length >= maxCalls) return false;
    this._store[key].push(now);
    return true;
  },

  /* Remaining cooldown in seconds for a key */
  cooldownSec(key, windowMs) {
    if (!this._store[key] || !this._store[key].length) return 0;
    const oldest = this._store[key][0];
    const remaining = windowMs - (Date.now() - oldest);
    return Math.max(0, Math.ceil(remaining / 1000));
  }
};


/* ══════════════════════════════
   CSRF Token Helper
   Attach to any state-mutating requests
══════════════════════════════ */
const CSRF = {
  _token: null,

  get() {
    if (!this._token) {
      // Generate a random token and store in sessionStorage (not localStorage)
      this._token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0')).join('');
      sessionStorage.setItem('tv_csrf', this._token);
    }
    return this._token;
  },

  /* Call on page load to restore existing session token */
  restore() {
    this._token = sessionStorage.getItem('tv_csrf') || null;
    return this.get();
  }
};


/* ══════════════════════════════
   Secure Storage Helper
   Wraps localStorage with error handling.
   IMPORTANT: Never store passwords or tokens here.
              Use only for UI preferences & favorites.
══════════════════════════════ */
const Storage = {
  /* Keys allowed in localStorage — whitelist only */
  _allowed: new Set(['tv_favorites', 'tv_city', 'tv_consent']),

  get(key, fallback = null) {
    if (!this._allowed.has(key)) {
      console.warn(`[Security] localStorage key "${key}" not in allowlist.`);
      return fallback;
    }
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },

  set(key, val) {
    if (!this._allowed.has(key)) {
      console.warn(`[Security] Blocked write to localStorage key "${key}".`);
      return false;
    }
    try {
      localStorage.setItem(key, JSON.stringify(val));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    if (!this._allowed.has(key)) return false;
    localStorage.removeItem(key);
    return true;
  }
};


/* ══════════════════════════════
   Session Helper
   Reads auth state from the server-issued
   HttpOnly cookie (not accessible via JS).
   Your backend sets: Set-Cookie: tv_session=...; HttpOnly; Secure; SameSite=Strict
   This helper only reads non-sensitive display data
   returned from /api/auth/me.
══════════════════════════════ */
const Session = {
  _user: null,
  _fetched: false,

  /* Call once on page load. Returns user object or null. */
  async fetchCurrentUser() {
    if (this._fetched) return this._user;
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'same-origin',
        headers: { 'X-CSRF-Token': CSRF.restore() }
      });
      if (res.ok) {
        this._user = await res.json();
      } else {
        this._user = null;
      }
    } catch {
      this._user = null;
    }
    this._fetched = true;
    return this._user;
  },

  getUser() { return this._user; },
  isLoggedIn() { return !!this._user; },

  clear() {
    this._user = null;
    this._fetched = false;
  }
};


/* ══════════════════════════════
   Prompt Injection Guard
   Sanitizes user text before sending to AI API proxy.
   The proxy itself must also sanitize server-side.
══════════════════════════════ */
const PromptGuard = {
  /* Patterns that look like prompt injection attempts */
  _patterns: [
    /ignore previous instructions/i,
    /you are now/i,
    /disregard (your|all|the)/i,
    /act as (a|an|the)/i,
    /system:/i,
    /\[INST\]/i,
    /<<SYS>>/i,
    /<\|im_start\|>/i,
  ],

  isSuspicious(text) {
    return this._patterns.some(p => p.test(text));
  },

  /* Sanitize: trim, limit length, strip control characters */
  sanitize(text, maxLen = 500) {
    return String(text)
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '') // control chars
      .trim()
      .slice(0, maxLen);
  }
};


/* ══════════════════════════════
   Secure AI API Proxy Client
   All AI calls go through /api/ai — never directly
   to api.anthropic.com from the browser.
══════════════════════════════ */
const AIProxy = {
  async send(prompt, { maxTokens = 300, context = '' } = {}) {
    // Client-side rate limit: 10 AI calls per minute
    if (!RateLimiter.allow('ai_call', 10, 60_000)) {
      const wait = RateLimiter.cooldownSec('ai_call', 60_000);
      throw new Error(`Too many requests. Please wait ${wait}s.`);
    }

    const sanitized = PromptGuard.sanitize(prompt);
    if (PromptGuard.isSuspicious(sanitized)) {
      throw new Error('Invalid query. Please rephrase your request.');
    }

    const res = await fetch('/api/ai', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': CSRF.restore()
      },
      body: JSON.stringify({ prompt: sanitized, context, maxTokens })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `API error ${res.status}`);
    }

    return res.json();
  }
};


/* ══════════════════════════════
   Content Security Policy Meta Tag
   Injected into <head> at runtime.
   Ideally set as an HTTP response header instead.
══════════════════════════════ */
function injectCSP() {
  const meta = document.createElement('meta');
  meta.httpEquiv = 'Content-Security-Policy';
  meta.content = [
    "default-src 'self'",
    "script-src 'self' https://cdnjs.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: https://images.unsplash.com",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'"
  ].join('; ');
  document.head.prepend(meta);
}

document.addEventListener('DOMContentLoaded', injectCSP);


/* ══════════════════════════════
   Cookie Consent
   Must be obtained before any tracking/storage
══════════════════════════════ */
const Consent = {
  hasConsent() {
    return Storage.get('tv_consent') === true;
  },

  grant() {
    Storage.set('tv_consent', true);
    document.getElementById('cookieBanner')?.remove();
  },

  showBannerIfNeeded() {
    if (this.hasConsent()) return;
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.cssText = `
      position:fixed;bottom:0;left:0;right:0;z-index:9999;
      background:rgba(8,8,16,0.97);border-top:1px solid rgba(255,179,0,0.25);
      padding:16px 28px;display:flex;align-items:center;
      justify-content:space-between;flex-wrap:wrap;gap:12px;
      font-family:'Outfit',sans-serif;font-size:.82rem;color:#A08060;
      backdrop-filter:blur(12px);
    `;
    banner.innerHTML = `
      <span>
        <i class="fa-solid fa-cookie-bite" style="color:#FF6B00;margin-right:6px"></i>
        We use local storage to save your favorites and city preference.
        <a href="privacy.html" style="color:#FFB300;text-decoration:none;margin-left:4px">Privacy Policy</a>
      </span>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button onclick="Consent.grant()" style="
          background:linear-gradient(135deg,#FF6B00,#E65100);border:none;color:#fff;
          padding:8px 18px;border-radius:20px;font-family:'Outfit',sans-serif;
          font-size:.82rem;font-weight:700;cursor:pointer;">
          Accept
        </button>
        <button onclick="document.getElementById('cookieBanner').remove()" style="
          background:transparent;border:1px solid rgba(255,179,0,0.3);color:#A08060;
          padding:8px 14px;border-radius:20px;font-family:'Outfit',sans-serif;
          font-size:.82rem;cursor:pointer;">
          Decline
        </button>
      </div>
    `;
    document.body.appendChild(banner);
  }
};

document.addEventListener('DOMContentLoaded', () => Consent.showBannerIfNeeded());

/* Export for use in other scripts */
window.TV = window.TV || {};
Object.assign(window.TV, { Sanitizer, RateLimiter, CSRF, Storage, Session, PromptGuard, AIProxy, Consent });