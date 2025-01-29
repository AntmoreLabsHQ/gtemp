// Polyfills and Browser Compatibility
(() => {
  "use strict";
  
  // Array.prototype.fill polyfill
  if (!Array.prototype.fill) {
    Object.defineProperty(Array.prototype, 'fill', {
      value: function(value) {
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        
        const O = Object(this);
        const len = O.length >>> 0;
        const start = arguments[1] >> 0;
        const relativeStart = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
        const end = arguments[2];
        const relativeEnd = end === undefined ? len : end >> 0;
        const final = relativeEnd < 0 ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
        
        for (let k = relativeStart; k < final; k++) {
          O[k] = value;
        }
        
        return O;
      }
    });
  }

  // Array.prototype.find polyfill
  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function(predicate) {
        if (this == null) {
          throw TypeError('"this" is null or not defined');
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
      },
      configurable: true,
      writable: true
    });
  }

  // Array.from polyfill
  if (!Array.from) {
    Array.from = (function() {
      const toStr = Object.prototype.toString;
      const isCallable = fn => typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      const maxSafeInteger = Math.pow(2, 53) - 1;
      
      const toLength = value => {
        const len = Number(value);
        if (isNaN(len)) return 0;
        if (len === 0 || !isFinite(len)) return len;
        return Math.min(Math.max(Math.floor(Math.abs(len)), 0), maxSafeInteger);
      };
      
      const fromSet = set => {
        const arr = [];
        set.forEach(value => arr.push(value));
        return arr;
      };
      
      return function from(arrayLike) {
        if (arrayLike instanceof Set) {
          return fromSet(arrayLike);
        }
        
        const C = this;
        const items = Object(arrayLike);
        
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
        
        let mapFn = arguments.length > 1 ? arguments[1] : undefined;
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
        
        for (let k = 0; k < len; k++) {
          const kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
        }
        
        A.length = len;
        return A;
      };
    })();
  }

  // Element.prototype.matches polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  // Element.prototype.closest polyfill
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

  // document.currentScript polyfill
  if (!('currentScript' in document)) {
    Object.defineProperty(document, 'currentScript', {
      get: function() {
        try {
          throw new Error();
        } catch (err) {
          const stackLines = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(err.stack);
          const scriptUrl = stackLines && stackLines[1] || false;
          const line = stackLines && stackLines[2] || false;
          const currentLocation = document.location.href.replace(document.location.hash, '');
          const scripts = document.getElementsByTagName('script');
          
          if (scriptUrl === currentLocation) {
            const scriptContent = document.documentElement.outerHTML;
            const lineRegex = new RegExp(`(?:[^\\n]+?\\n){0,${(line - 2)}}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*`, 'i');
            const matchedScript = scriptContent.replace(lineRegex, '$1').trim();
            
            for (let i = 0; i < scripts.length; i++) {
              const script = scripts[i];
              if (script.readyState === 'interactive') return script;
              if (script.src === scriptUrl) return script;
              if (scriptUrl === currentLocation && script.innerHTML && script.innerHTML.trim() === matchedScript) {
                return script;
              }
            }
          }
          return null;
        }
      }
    });
  }

  // Object.assign polyfill
  if (typeof Object.assign !== 'function') {
    Object.defineProperty(Object, 'assign', {
      value: function assign(target) {
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }
        
        const to = Object(target);
        
        for (let i = 1; i < arguments.length; i++) {
          const nextSource = arguments[i];
          
          if (nextSource != null) {
            for (const nextKey in nextSource) {
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

  // Define global context
  const globalContext = typeof globalThis !== 'undefined' ? globalThis :
                       typeof window !== 'undefined' ? window :
                       typeof global !== 'undefined' ? global :
                       typeof self !== 'undefined' ? self : {};

  // Core functionality classes and utilities
  class PaymentButton {
    constructor(options) {
      this.options = options;
      this.init();
    }

    init() {
      // Initialize payment button functionality
      this.setupEventListeners();
      this.renderButton();
    }

    setupEventListeners() {
      // Add click handlers and other event listeners
    }

    renderButton() {
      // Render the payment button UI
    }
  }

  // Currency formatting utilities
  const CurrencyFormatter = {
    format: (amount, currency) => {
      // Format amount according to currency
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currency
      }).format(amount);
    }
  };

  // Analytics tracking
  const Analytics = {
    track: (eventName, data) => {
      // Track events
      if (window.razorpayAnalytics) {
        window.razorpayAnalytics.track(eventName, data);
      }
    }
  };

  // Initialize the payment button
  const initPaymentButton = (targetElement, config) => {
    return new PaymentButton({
      target: targetElement,
      config: config
    });
  };

  // Export functionality
  window.RZP = window.RZP || {};
  window.RZP.initPaymentButton = initPaymentButton;
})();

// Initialize payment button on load
document.addEventListener('DOMContentLoaded', () => {
  const script = document.currentScript;
  const form = script.parentElement;
  
  if (form.tagName !== 'FORM') {
    window.alert('Payment Button is not added. Add Button script inside "form" tag.');
    return;
  }
  
  const config = script.dataset;
  window.RZP.initPaymentButton(form, config);
});
