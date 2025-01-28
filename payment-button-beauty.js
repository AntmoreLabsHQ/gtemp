/**
 * Razorpay Payment Button
 * A module for handling payment button integration and functionality
 */

// // Core Constants
// const BUTTON_THEMES = {
//   RZP_DARK_STANDARD: 'rzp-dark-standard',
//   RZP_OUTLINE_STANDARD: 'rzp-outline-standard',
//   RZP_LIGHT_STANDARD: 'rzp-light-standard',
//   BRAND_COLOR: 'brand-color'
// };

// // Core Config
// const CONFIG = {
//   API_BASE_URL: 'https://api.razorpay.com/v1',
//   SENTRY_DSN: 'https://a9fa294c5e224e028cc57801fee46dd0@o515678.ingest.sentry.io/6726576',
//   COLOR_JS_URL: 'https://cdn.razorpay.com/static/assets/color.js',
//   ANALYTICS_URL: 'https://cdn.razorpay.com/static/analytics/bundle.js'
// };

// Store Management
class Store {
  constructor(initialState) {
    this.state = {
      baseUrl: CONFIG.API_BASE_URL,
      paymentButtonOptions: null,
      isTestMode: null,
      isQATestMode: null,
      isColorJSLoading: false,
      buttonPreferences: {
        isFetching: false,
        data: null,
        error: null
      },
      modalFrameEl: null,
      isIframeContentsLoaded: false,
      isPaymentFormOpened: false,
      ...initialState
    };
    this.subscribers = [];
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    };
    this.notifySubscribers();
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback(this.state));
  }
}

// Payment Button Component
class PaymentButton {
  constructor(targetElement, options) {
    this.target = targetElement;
    this.options = options;
    this.store = new Store();
    this.analytics = new Analytics();
    
    this.init();
  }

  init() {
    this.validateOptions();
    this.initializeStore();
    this.initializeSentry();
    this.loadDependencies();
    this.render();
  }

  validateOptions() {
    if (!this.options.payment_button_id) {
      const error = 'Payment Button cannot be added. Provide a valid payment button id';
      window.alert(error);
      throw new Error(error); 
    }
  }

  initializeStore() {
    // Set initial state
    this.store.setState({
      paymentButtonOptions: this.options,
      isQATestMode: window.RZP?.environment === 'test'
    });
  }

  initializeSentry() {
    const sentryConfig = {
      dsn: CONFIG.SENTRY_DSN,
      defaultIntegrations: false
    };

    loadScript('https://browser.sentry-cdn.com/6.16.1/bundle.min.js', () => {
      window.Sentry.init(sentryConfig);
    });
  }

  loadDependencies() {
    // Load required JS files
    loadScript(CONFIG.COLOR_JS_URL, () => {
      this.store.setState({ isColorJSLoading: false });
    });
    
    loadScript(CONFIG.ANALYTICS_URL, () => {
      this.analytics.init();
    });
  }

  render() {
    // Create button markup
    const button = document.createElement('button');
    button.className = 'razorpay-payment-button';
    button.innerHTML = `
      <span class="button-text">${this.options.button_text || 'Pay Now'}</span>
      <span class="secured-by">Secured by Razorpay</span>
    `;

    // Add event listeners
    button.addEventListener('click', this.handleClick.bind(this));

    // Mount to DOM
    this.target.appendChild(button);
  }

  handleClick(e) {
    e.preventDefault();
    this.openPaymentForm();
  }

  openPaymentForm() {
    this.store.setState({ isPaymentFormOpened: true });
    this.analytics.trackEvent('payment_form_opened');
  }
}

// Initialize
function init() {
  const script = document.currentScript;
  const parentForm = script.parentElement;

  if (parentForm.tagName !== 'FORM') {
    window.alert('Payment Button is not added. Add Button script inside form tag.');
    return;
  }

  const options = script.dataset;
  const button = new PaymentButton(parentForm, options);
}

// Utility Functions
function loadScript(src, onLoad, onError) {
  const script = document.createElement('script');
  script.src = src;
  script.onload = onLoad;
  script.onerror = onError;
  document.head.appendChild(script);
}

// Initialize on load
init();
