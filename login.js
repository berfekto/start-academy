// ============================================
// LOGIN PAGE — Event Handlers & Logic
// ============================================

(function () {
  'use strict';

  // ── Password Toggle ────────────────────────
  SA.togglePassword = function () {
    const input   = document.getElementById('password');
    const icon    = document.getElementById('eye-icon');
    if (!input) return;

    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';

    // Swap icon between "eye" and "eye-off"
    icon.innerHTML = isHidden
      ? /* eye-off */
        `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>`
      : /* eye */
        `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>`;
  };

  // ── Custom Checkbox Toggle ─────────────────
  SA.toggleCheckbox = function () {
    const cb      = document.getElementById('remember');
    const custom  = document.getElementById('custom-check');
    if (!cb || !custom) return;
    cb.checked = !cb.checked;
    custom.classList.toggle('checked', cb.checked);
  };

  // ── Forgot Password ────────────────────────
  SA.handleForgot = function () {
    SA.toast(
      SA.lang === 'ar'
        ? 'سيتم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني.'
        : 'A password reset link will be sent to your email.',
      'info'
    );
  };

  // ── Social Login ───────────────────────────
  SA.socialLogin = function (provider) {
    SA.toast(
      SA.lang === 'ar'
        ? `تسجيل الدخول عبر ${provider} غير متاح في وضع العرض التوضيحي.`
        : `${provider} login is not available in demo mode.`,
      'info'
    );
  };

  // ── Sign Up ────────────────────────────────
  SA.handleSignup = function (e) {
    e.preventDefault();
    SA.toast(
      SA.lang === 'ar'
        ? 'سيتوفر التسجيل قريباً!'
        : 'Sign up coming soon!',
      'info'
    );
  };

  // ── Form Submission ────────────────────────
  function handleSubmit(e) {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const passInput  = document.getElementById('password');
    const submitBtn  = document.getElementById('btn-signin');
    if (!emailInput || !passInput || !submitBtn) return;

    const email    = emailInput.value.trim();
    const password = passInput.value;
    let   valid    = true;

    // Clear previous errors
    SA.clearFieldError('email',    'email-error');
    SA.clearFieldError('password', 'password-error');

    // Validate email
    if (!email) {
      SA.setFieldError('email', 'email-error', SA.t('emailRequired'));
      valid = false;
    } else if (!SA.validateEmail(email)) {
      SA.setFieldError('email', 'email-error', SA.t('emailInvalid'));
      valid = false;
    }

    // Validate password
    if (!password) {
      SA.setFieldError('password', 'password-error', SA.t('passwordRequired'));
      valid = false;
    } else if (password.length < 6) {
      SA.setFieldError('password', 'password-error', SA.t('passwordShort'));
      valid = false;
    }

    if (!valid) return;

    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    SA.login(email, password)
      .then(function (user) {
        SA.toast(SA.t('loginSuccess'), 'success');
        emailInput.classList.add('success');
        passInput.classList.add('success');

        // Redirect after a short delay so the user sees the toast
        setTimeout(function () {
          window.location.href = 'role.html';
        }, 800);
      })
      .catch(function () {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        SA.toast(SA.t('loginError'), 'error');

        // Shake the card
        const card = document.querySelector('.login-card');
        if (card) {
          card.style.animation = 'shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
          card.addEventListener('animationend', function () {
            card.style.animation = '';
          }, { once: true });
        }
      });
  }

  // ── Boot ──────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    // If user is already logged in, skip to role selection
    if (SA.user && SA.user.loggedIn) {
      window.location.href = 'role.html';
      return;
    }

    const form = document.getElementById('login-form');
    if (form) form.addEventListener('submit', handleSubmit);

    // Attach ripple to social buttons
    document.querySelectorAll('.social-btn').forEach(function (btn) {
      btn.addEventListener('click', function (e) { SA.ripple(btn, e); });
    });
  });

})();
