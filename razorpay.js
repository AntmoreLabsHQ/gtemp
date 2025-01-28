// Polyfills
(function() {
  // Array polyfills
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, "fill", {
      value: function(value) {
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        const O = Object(this);
        const len = O.length >>> 0;
        const start = arguments[1] >> 0;
        const relativeStart = start < 0 ? 
          Math.max(len + start, 0) : 
          Math.min(start, len);
        const end = arguments[2] === undefined ? 
          len : 
          arguments[2] >> 0;
        const relativeEnd = end < 0 ? 
          Math.max(len + end, 0) : 
          Math.min(end, len);
        
        for (let k = relativeStart; k < relativeEnd; k++) {
          O[k] = value;
        }
        return O;
      }
    });
  }

  // Element polyfills
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
  }

  if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
      let el = this;
      do {
        if (Element.prototype.matches.call(el, s)) return el;
        el = el.parentElement || el.parentNode;
      } while (el !== null && el.nodeType === 1);
      return null;
    };
  }
})();

// Constants
const BUTTON_THEMES = {
  RZP_DARK_STANDARD: 'rzp-dark-standard',
  RZP_OUTLINE_STANDARD: 'rzp-outline-standard', 
  RZP_LIGHT_STANDARD: 'rzp-light-standard',
  BRAND_COLOR: 'brand-color'
};

// Core payment button functionality
class RazorpayPaymentButton {
  constructor(options) {
    this.options = options;
    this.init();
  }

  init() {
    this.validateOptions();
    this.setupButton();
    this.initializeSentry();
    this.setupAnalytics();
  }

  validateOptions() {
    if (!this.options.payment_button_id) {
      const error = 'Payment Button cannot be added. Provide a valid payment button id';
      window.alert(error);
      throw new Error(error);
    }
  }

  setupButton() {
    // Button setup logic
    const buttonHtml = `
      <div class="razorpay-payment-button">
        <button class="PaymentButton">
          <span class="PaymentButton-text">${this.options.button_text || 'Pay Now'}</span>
          <span class="PaymentButton-securedBy">Secured by Razorpay</span>
        </button>
      </div>
    `;

    this.buttonEl = document.createElement('div');
    this.buttonEl.innerHTML = buttonHtml;
    this.attachEventListeners();
  }

  attachEventListeners() {
    this.buttonEl.querySelector('button').addEventListener('click', (e) => {
      e.preventDefault();
      this.handlePayment();
    });
  }

  handlePayment() {
    // Payment handling logic
    const paymentData = {
      button_id: this.options.payment_button_id,
      // Add other payment parameters
    };

    // Open payment modal
    this.openPaymentModal(paymentData);
  }

  openPaymentModal(data) {
    const modal = document.createElement('div');
    modal.className = 'razorpay-payment-form-container';
    // Add modal content and handle payment flow
  }

  // Analytics methods
  setupAnalytics() {
    // Initialize analytics
    if (window.rzpQ) {
      window.rzpQ.push({
        event: 'button_loaded',
        data: {
          button_id: this.options.payment_button_id
        }
      });
    }
  }
}

// Initialize payment button
window.RZP = window.RZP || {};

// Auto-initialize if script is in form tag
const script = document.currentScript;
const parentForm = script.parentElement;

if (parentForm.tagName !== 'FORM') {
  window.alert('Payment Button is not added. Add Button script inside form tag.');
} else {
  const options = script.dataset;
  new RazorpayPaymentButton(options);
}
