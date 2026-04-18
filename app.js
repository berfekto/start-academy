// ============================================
// START ACADEMY — Application Core
// Language, Auth, Navigation Logic
// ============================================

const SA = {
  // ── State ──────────────────────────────────
  lang: localStorage.getItem('sa_lang') || 'en',
  user: JSON.parse(localStorage.getItem('sa_user') || 'null'),

  // ── Translations ───────────────────────────
  i18n: {
    en: {
      // Login
      welcomeBack:       'Welcome Back',
      loginSubtitle:     'Sign in to your Start Academy account',
      emailLabel:        'Email Address',
      emailPlaceholder:  'you@startacademy.com',
      passwordLabel:     'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe:        'Remember me',
      forgotPassword:    'Forgot password?',
      signIn:            'Sign In',
      orContinueWith:    'or continue with',
      noAccount:         "Don't have an account?",
      signUp:            'Sign up',
      // Validation
      emailRequired:     'Email is required',
      emailInvalid:      'Please enter a valid email',
      passwordRequired:  'Password is required',
      passwordShort:     'Password must be at least 6 characters',
      loginSuccess:      'Welcome back!',
      loginError:        'Invalid credentials. Please try again.',
      // Role Selection
      chooseRole:        'Choose Your Role',
      roleSubtitle:      'Select how you interact with Start Academy',
      athlete:           'Athlete',
      athleteDesc:       'Track training, view schedules & monitor performance',
      coach:             'Coach',
      coachDesc:         'Manage teams, assign drills & review player progress',
      club:              'Club',
      clubDesc:          'Oversee operations, manage members & analyze analytics',
      continueAs:        'Continue as',
      selectRole:        'Select a role to continue',
      // Misc
      poweredBy:         'Powered by Start Academy',
      allRights:         '© 2025 Start Academy. All rights reserved.',
      toggleLang:        'عربي',
    },
    ar: {
      welcomeBack:       'مرحباً بعودتك',
      loginSubtitle:     'سجّل دخولك إلى حساب ستارت أكاديمي',
      emailLabel:        'البريد الإلكتروني',
      emailPlaceholder:  'you@startacademy.com',
      passwordLabel:     'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      rememberMe:        'تذكّرني',
      forgotPassword:    'نسيت كلمة المرور؟',
      signIn:            'تسجيل الدخول',
      orContinueWith:    'أو تابع عبر',
      noAccount:         'ليس لديك حساب؟',
      signUp:            'أنشئ حساباً',
      emailRequired:     'البريد الإلكتروني مطلوب',
      emailInvalid:      'يرجى إدخال بريد إلكتروني صحيح',
      passwordRequired:  'كلمة المرور مطلوبة',
      passwordShort:     'يجب أن تتكوّن كلمة المرور من 6 أحرف على الأقل',
      loginSuccess:      'مرحباً بعودتك!',
      loginError:        'بيانات غير صحيحة. يرجى المحاولة مجدداً.',
      chooseRole:        'اختر دورك',
      roleSubtitle:      'حدد طريقة تفاعلك مع ستارت أكاديمي',
      athlete:           'لاعب',
      athleteDesc:       'تتبع التدريبات وعرض الجداول ومراقبة الأداء',
      coach:             'مدرب',
      coachDesc:         'إدارة الفرق وتحديد التمارين ومراجعة تقدم اللاعبين',
      club:              'نادي',
      clubDesc:          'الإشراف على العمليات وإدارة الأعضاء وتحليل البيانات',
      continueAs:        'المتابعة كـ',
      selectRole:        'اختر دوراً للمتابعة',
      poweredBy:         'مدعوم من ستارت أكاديمي',
      allRights:         '© 2025 ستارت أكاديمي. جميع الحقوق محفوظة.',
      toggleLang:        'English',
    }
  },

  // ── Language helpers ───────────────────────
  t(key) {
    return this.i18n[this.lang][key] || key;
  },

  setLang(lang) {
    this.lang = lang;
    localStorage.setItem('sa_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.body.classList.toggle('rtl', lang === 'ar');
    document.body.setAttribute('lang', lang);
    this.renderPage();
  },

  toggleLang() {
    this.setLang(this.lang === 'en' ? 'ar' : 'en');
  },

  // ── Toast Notifications ────────────────────
  toast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = {
      success: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>`,
      error:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>`,
      info:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>`,
    };

    const colors = { success: '#00FF88', error: '#FF4444', info: '#00D4FF' };

    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.style.color = colors[type] || colors.info;
    el.innerHTML = `${icons[type] || icons.info}<span style="color: var(--text-primary)">${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(100%)';
      el.style.transition = 'all 0.3s ease';
      setTimeout(() => el.remove(), 300);
    }, duration);
  },

  // ── Ripple effect ──────────────────────────
  ripple(btn, e) {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = (e?.clientX ?? rect.left + rect.width / 2) - rect.left - size / 2;
    const y = (e?.clientY ?? rect.top + rect.height / 2) - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  },

  // ── Form Validation ────────────────────────
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  },

  setFieldError(inputId, msgId, message) {
    const input = document.getElementById(inputId);
    const msg   = document.getElementById(msgId);
    if (input) input.classList.add('error');
    if (msg)   { msg.textContent = message; msg.classList.add('visible'); }
    return false;
  },

  clearFieldError(inputId, msgId) {
    const input = document.getElementById(inputId);
    const msg   = document.getElementById(msgId);
    if (input) input.classList.remove('error');
    if (msg)   msg.classList.remove('visible');
  },

  // ── Auth ───────────────────────────────────
  DEMO_CREDENTIALS: { email: 'demo@startacademy.com', password: 'demo123' },

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          email.toLowerCase() === this.DEMO_CREDENTIALS.email &&
          password === this.DEMO_CREDENTIALS.password
        ) {
          const user = { email, name: 'Ahmad Al-Rashid', loggedIn: true };
          localStorage.setItem('sa_user', JSON.stringify(user));
          this.user = user;
          resolve(user);
        } else {
          reject(new Error('invalid'));
        }
      }, 1200); // Simulate API delay
    });
  },

  logout() {
    localStorage.removeItem('sa_user');
    this.user = null;
    window.location.href = 'index.html';
  },

  // ── Navigation Guard ───────────────────────
  requireAuth() {
    if (!this.user) {
      window.location.href = 'index.html';
      return false;
    }
    return true;
  },

  // ── Page Rendering ─────────────────────────
  renderPage() {
    const page = document.body.dataset.page;
    if (page === 'login') this.renderLogin();
    if (page === 'role')  this.renderRole();
  },

  renderLogin() {
    const map = {
      'txt-welcome':         this.t('welcomeBack'),
      'txt-subtitle':        this.t('loginSubtitle'),
      'lbl-email':           this.t('emailLabel'),
      'lbl-password':        this.t('passwordLabel'),
      'lbl-remember':        this.t('rememberMe'),
      'lbl-forgot':          this.t('forgotPassword'),
      'btn-signin':          this.t('signIn'),
      'txt-or':              this.t('orContinueWith'),
      'txt-no-account':      this.t('noAccount'),
      'lnk-signup':          this.t('signUp'),
      'txt-footer':          this.t('allRights'),
    };
    Object.entries(map).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    // Placeholders
    const emailInput = document.getElementById('email');
    const passInput  = document.getElementById('password');
    if (emailInput) emailInput.placeholder = this.t('emailPlaceholder');
    if (passInput)  passInput.placeholder  = this.t('passwordPlaceholder');

    // Lang button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = this.lang === 'en' ? 'عربي' : 'English';

    // Active state
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === this.lang);
    });
  },

  renderRole() {
    const map = {
      'txt-choose':     this.t('chooseRole'),
      'txt-role-sub':   this.t('roleSubtitle'),
      'txt-footer':     this.t('allRights'),
    };
    Object.entries(map).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });

    // Role cards
    const roles = ['athlete', 'coach', 'club'];
    roles.forEach(role => {
      const nameEl = document.getElementById(`role-name-${role}`);
      const descEl = document.getElementById(`role-desc-${role}`);
      if (nameEl) nameEl.textContent = this.t(role);
      if (descEl) descEl.textContent = this.t(`${role}Desc`);
    });

    // Continue button
    const continueBtn = document.getElementById('btn-continue');
    const selected    = document.querySelector('.role-card.selected');
    if (continueBtn) {
      if (selected) {
        const roleName = this.t(selected.dataset.role);
        continueBtn.querySelector('.btn-text').textContent = `${this.t('continueAs')} ${roleName}`;
        continueBtn.disabled = false;
        continueBtn.style.opacity = '1';
      } else {
        continueBtn.querySelector('.btn-text').textContent = this.t('selectRole');
        continueBtn.disabled = true;
        continueBtn.style.opacity = '0.5';
      }
    }

    // Lang button
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) langBtn.textContent = this.lang === 'en' ? 'عربي' : 'English';

    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === this.lang);
    });
  }
};

// ── Initialize on DOM ready ────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply initial language
  SA.setLang(SA.lang);
  SA.renderPage();

  // Global input listeners for real-time error clearing
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const group = input.closest('.form-group');
      if (group) {
        const errMsg = group.querySelector('.input-error-msg');
        if (errMsg) errMsg.classList.remove('visible');
      }
    });
  });
});
