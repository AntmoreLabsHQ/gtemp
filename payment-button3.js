(function() {
  "use strict";

  // Polyfill implementations
  function setupPolyfills() {
    // Array.prototype.fill polyfill
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

    // Array.prototype.find polyfill
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, "find", {
        value: function(predicate) {
          if (this == null) {
            throw TypeError('this is null or not defined');
          }
          const o = Object(this);
          const len = o.length >>> 0;
          
          if (typeof predicate !== 'function') {
            throw TypeError('predicate must be a function');
          }
          
          const thisArg = arguments[1];
          let k = 0;
          
          while (k < len) {
            const kValue = o[k];
            if (predicate.call(thisArg, kValue, k, o)) {
              return kValue;
            }
            k++;
          }
          return undefined;
        },
        configurable: true,
        writable: true
      });
    }

    // Array.from polyfill
    if (!Array.from) {
      Array.from = (function() {
        const toStr = Object.prototype.toString;
        const isCallable = function(fn) {
          return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        const toInteger = function(value) {
          const number = Number(value);
          if (isNaN(number)) { return 0; }
          if (number === 0 || !isFinite(number)) { return number; }
          return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        const maxSafeInteger = Math.pow(2, 53) - 1;
        const toLength = function(value) {
          const len = toInteger(value);
          return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        return function from(arrayLike/*, mapFn, thisArg */) {
          const C = this;
          const items = Object(arrayLike);

          if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
          }

          let mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          let T;
          if (typeof mapFn !== 'undefined') {
            if (!isCallable(mapFn)) {
              throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
            if (arguments.length > 2) {
              T = arguments[2];
            }
          }

          const len = toLength(items.length);
          const A = isCallable(C) ? Object(new C(len)) : new Array(len);

          let k = 0;
          let kValue;

          while (k < len) {
            kValue = items[k];
            if (mapFn) {
              A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
            } else {
              A[k] = kValue;
            }
            k += 1;
          }
          A.length = len;
          return A;
        };
      }());
    }

    // Element.prototype.matches polyfill
    if (!Element.prototype.matches) {
      Element.prototype.matches = 
        Element.prototype.msMatchesSelector || 
        Element.prototype.webkitMatchesSelector;
    }

    // Element.prototype.closest polyfill  
    if (!Element.prototype.closest) {
      Element.prototype.closest = function(selector) {
        let el = this;
        do {
          if (Element.prototype.matches.call(el, selector)) {
            return el;
          }
          el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
      };
    }

    // Object.assign polyfill
    if (typeof Object.assign !== 'function') {
      Object.defineProperty(Object, "assign", {
        value: function assign(target) {
          if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
          }
          const to = Object(target);
          for (let i = 1; i < arguments.length; i++) {
            const nextSource = arguments[i];
            if (nextSource != null) {
              for (let nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
  }

  // Store implementation
  const store = {
    state: {
      baseUrl: "https://api.razorpay.com/v1",
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
      isPaymentFormOpened: false
    },

    subscribers: [],

    setState(newState) {
      this.state = {
        ...this.state,
        ...newState
      };
      this.notifySubscribers();
    },

    subscribe(callback) {
      this.subscribers.push(callback);
      return () => {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      };
    },

    notifySubscribers() {
      this.subscribers.forEach(callback => callback(this.state));
    }
  };

  // Utils
  function loadScript(src, onLoad, onError) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = onLoad;
    script.onerror = onError;
    document.head.appendChild(script);
  }

  function getRzpEnvironment() {
    return typeof window.RZP === "object" && window.RZP.environment;
  }

  // Analytics
  const analytics = {
    queue: [],
    initialized: false,

    track(eventName, data = {}) {
      if (window.rzpQ && window.rzpQ.paymentButton) {
        window.rzpQ.push(
          window.rzpQ.now().paymentButton().interaction(
            `button.website.${eventName}`,
            {
              ...data,
              mode: "live",
              type: "payment"
            }
          )
        );
      } else if (this.initialized) {
        this.queue.push({eventName, data});
      }
    },

    init(buttonId, pluginSource = "native") {
      loadScript("https://cdn.razorpay.com/static/analytics/bundle.js", () => {
        this.initialized = true;
        if (window.rzpQ) {
          this.flushQueue();
        }
      });
    },

    flushQueue() {
      while (this.queue.length) {
        const {eventName, data} = this.queue.shift();
        this.track(eventName, data);
      }
    }
  };

  // Initialize
  function init() {
    const script = document.currentScript;
    const parentForm = script.parentElement;

    if (parentForm.tagName !== 'FORM') {
      window.alert('Payment Button is not added. Add Button script inside form tag.');
      return;
    }

    setupPolyfills();

    const options = script.dataset;
    if (!options.payment_button_id) {
      const error = "Payment Button cannot be added. Provide a valid payment button id";
      window.alert(error);
      throw new Error(error);
    }

    // Initialize store with options
    store.setState({ paymentButtonOptions: options });

    // Initialize analytics
    analytics.init(options.payment_button_id);

    // Mount the button
    const button = new RazorpayButton(parentForm, store, analytics);
  }

  window.RZP = window.RZP || {};
  init();

})();
