! function() {
    "use strict";
    var t, c, n, u, f, l;
    Array.prototype.fill || Object.defineProperty(Array.prototype, "fill", {
        value: function(e) {
            if (null == this) throw new TypeError("this is null or not defined");
            for (var t = Object(this), n = t.length >>> 0, r = arguments[1] >> 0, o = r < 0 ? Math.max(n + r, 0) : Math.min(r, n), r = arguments[2], r = void 0 === r ? n : r >> 0, i = r < 0 ? Math.max(n + r, 0) : Math.min(r, n); o < i;) t[o] = e, o++;
            return t
        }
    }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
        value: function(e) {
            if (null == this) throw TypeError('"this" is null or not defined');
            var t = Object(this),
                n = t.length >>> 0;
            if ("function" != typeof e) throw TypeError("predicate must be a function");
            for (var r = arguments[1], o = 0; o < n;) {
                var i = t[o];
                if (e.call(r, i, o, t)) return i;
                o++
            }
        },
        configurable: !0,
        writable: !0
    }), Array.from || (Array.from = (t = Object.prototype.toString, c = function(e) {
        return "function" == typeof e || "[object Function]" === t.call(e)
    }, n = Math.pow(2, 53) - 1, u = function(e) {
        e = Number(e), e = isNaN(e) ? 0 : 0 !== e && isFinite(e) ? (0 < e ? 1 : -1) * Math.floor(Math.abs(e)) : e;
        return Math.min(Math.max(e, 0), n)
    }, f = function(e) {
        var t = [];
        return e.forEach(function(e) {
            return t.push(e)
        }), t
    }, function(e) {
        if (e instanceof Set) return f(e);
        var t = Object(e);
        if (null == e) throw new TypeError("Array.from requires an array-like object - not null or undefined");
        var n, r = 1 < arguments.length ? arguments[1] : void 0;
        if (void 0 !== r) {
            if (!c(r)) throw new TypeError("Array.from: when provided, the second argument must be a function");
            2 < arguments.length && (n = arguments[2])
        }
        for (var o, i = u(t.length), a = c(this) ? Object(new this(i)) : new Array(i), s = 0; s < i;) o = t[s], a[s] = r ? void 0 === n ? r(o, s) : r.call(n, o, s) : o, s += 1;
        return a.length = i, a
    })), Element.prototype.matches || (Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector), Element.prototype.closest || (Element.prototype.closest = function(e) {
        var t = this;
        do {
            if (Element.prototype.matches.call(t, e)) return t
        } while (null !== (t = t.parentElement || t.parentNode) && 1 === t.nodeType);
        return null
    }), "currentScript" in (l = document) || Object.defineProperty(l, "currentScript", {
        get: function() {
            try {
                throw new Error
            } catch (e) {
                var t, n = 0,
                    r = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e.stack),
                    o = r && r[1] || !1,
                    i = r && r[2] || !1,
                    a = l.location.href.replace(l.location.hash, ""),
                    s = l.getElementsByTagName("script");
                for (o === a && (r = l.documentElement.outerHTML, i = new RegExp("(?:[^\\n]+?\\n){0," + (i - 2) + "}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*", "i"), t = r.replace(i, "$1").trim()); n < s.length; n++) {
                    if ("interactive" === s[n].readyState) return s[n];
                    if (s[n].src === o) return s[n];
                    if (o === a && s[n].innerHTML && s[n].innerHTML.trim() === t) return s[n]
                }
                return null
            }
        }
    }), "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(e, t) {
            if (null == e) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(e), r = 1; r < arguments.length; r++) {
                var o = arguments[r];
                if (null != o)
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
            }
            return n
        },
        writable: !0,
        configurable: !0
    });
    var m, C = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function r(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function e(e, t, n) {
        return t && r(e.prototype, t), n && r(e, n), e
    }

    function o(e, t) {
        e.prototype = Object.create(t.prototype), (e.prototype.constructor = e).__proto__ = t
    }

    function i(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function g(e, t) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(e) || function(e, t) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) {
                var n = [],
                    r = !0,
                    o = !1,
                    i = void 0;
                try {
                    for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
                } catch (e) {
                    o = !0, i = e
                } finally {
                    try {
                        r || null == s.return || s.return()
                    } finally {
                        if (o) throw i
                    }
                }
                return n
            }
        }(e, t) || s(e, t) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function s(e, t) {
        if (e) {
            if ("string" == typeof e) return d(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === n && e.constructor && (n = e.constructor.name), "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? d(e, t) : void 0
        }
    }

    function d(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r
    }

    function b() {}

    function p(e) {
        return e()
    }

    function h() {
        return Object.create(null)
    }

    function v(e) {
        e.forEach(p)
    }

    function y(e) {
        return "function" == typeof e
    }

    function w(e, t) {
        return e != e ? t == t : e !== t || e && "object" == typeof e || "function" == typeof e
    }

    function a(e) {
        if (null == e) return b;
        for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        var o = e.subscribe.apply(e, n);
        return o.unsubscribe ? function() {
            return o.unsubscribe()
        } : o
    }

    function S(e, t, n) {
        e.$$.on_destroy.push(a(t, n))
    }

    function x(e) {
        return null == e ? "" : e
    }

    function P(e, t) {
        e.appendChild(t)
    }

    function R(e, t, n) {
        e.insertBefore(t, n || null)
    }

    function _(e) {
        e.parentNode.removeChild(e)
    }

    function A(e) {
        return document.createElement(e)
    }

    function B(e) {
        return document.createElementNS("http://www.w3.org/2000/svg", e)
    }

    function D(e) {
        return document.createTextNode(e)
    }

    function E() {
        return D(" ")
    }

    function T(e, t, n) {
        null == n ? e.removeAttribute(t) : e.getAttribute(t) !== n && e.setAttribute(t, n)
    }

    function O(e, t) {
        t = "" + t, e.wholeText !== t && (e.data = t)
    }

    function k(e, t, n, r) {
        e.style.setProperty(t, n, r ? "important" : "")
    }

    function $(e) {
        m = e
    }

    function L(e) {
        (function() {
            if (!m) throw new Error("Function called outside component initialization");
            return m
        })().$$.on_mount.push(e)
    }(Ee = {
        exports: {}
    }).exports = function() {
        function c(e) {
            return "function" == typeof e
        }
        var n = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            },
            r = 0,
            t = void 0,
            o = void 0,
            s = function(e, t) {
                l[r] = e, l[r + 1] = t, 2 === (r += 2) && (o ? o(m) : v())
            },
            e = "undefined" != typeof window ? window : void 0,
            i = e || {},
            a = i.MutationObserver || i.WebKitMutationObserver,
            u = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            i = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel;

        function f() {
            var e = setTimeout;
            return function() {
                return e(m, 1)
            }
        }
        var l = new Array(1e3);

        function m() {
            for (var e = 0; e < r; e += 2)(0, l[e])(l[e + 1]), l[e] = void 0, l[e + 1] = void 0;
            r = 0
        }
        var d, p, h, v = void 0;

        function y(e, t) {
            var n = this,
                r = new this.constructor(w);
            void 0 === r[b] && T(r);
            var o, i = n._state;
            return i ? (o = arguments[i - 1], s(function() {
                return D(i, r, o, n._result)
            })) : A(n, r, e, t), r
        }

        function g(e) {
            if (e && "object" == typeof e && e.constructor === this) return e;
            var t = new this(w);
            return x(t, e), t
        }
        v = u ? function() {
            return process.nextTick(m)
        } : a ? (p = 0, a = new a(m), h = document.createTextNode(""), a.observe(h, {
            characterData: !0
        }), function() {
            h.data = p = ++p % 2
        }) : i ? ((d = new MessageChannel).port1.onmessage = m, function() {
            return d.port2.postMessage(0)
        }) : (void 0 === e ? function() {
            try {
                var e = Function("return this")().require("vertx");
                return void 0 !== (t = e.runOnLoop || e.runOnContext) ? function() {
                    t(m)
                } : f()
            } catch (e) {
                return f()
            }
        } : f)();
        var b = Math.random().toString(36).substring(2);

        function w() {}

        function S(e, t, n) {
            var o, i, r, a;
            t.constructor === e.constructor && n === y && t.constructor.resolve === g ? (r = e, 1 === (a = t)._state ? R(r, a._result) : 2 === a._state ? _(r, a._result) : A(a, void 0, function(e) {
                return x(r, e)
            }, function(e) {
                return _(r, e)
            })) : void 0 !== n && c(n) ? (o = t, i = n, s(function(n) {
                var r = !1,
                    e = function(e, t) {
                        try {
                            e.call(t, function(e) {
                                r || (r = !0, o !== e ? x(n, e) : R(n, e))
                            }, function(e) {
                                r || (r = !0, _(n, e))
                            })
                        } catch (e) {
                            return e
                        }
                    }(i, o);
                !r && e && (r = !0, _(n, e))
            }, e)) : R(e, t)
        }

        function x(e, t) {
            if (e === t) _(e, new TypeError("You cannot resolve a promise with itself"));
            else if (r = typeof t, null === t || "object" != r && "function" != r) R(e, t);
            else {
                var n = void 0;
                try {
                    n = t.then
                } catch (t) {
                    return void _(e, t)
                }
                S(e, t, n)
            }
            var r
        }

        function P(e) {
            e._onerror && e._onerror(e._result), B(e)
        }

        function R(e, t) {
            void 0 === e._state && (e._result = t, e._state = 1, 0 !== e._subscribers.length && s(B, e))
        }

        function _(e, t) {
            void 0 === e._state && (e._state = 2, e._result = t, s(P, e))
        }

        function A(e, t, n, r) {
            var o = e._subscribers,
                i = o.length;
            e._onerror = null, o[i] = t, o[i + 1] = n, o[i + 2] = r, 0 === i && e._state && s(B, e)
        }

        function B(e) {
            var t = e._subscribers,
                n = e._state;
            if (0 !== t.length) {
                for (var r, o = void 0, i = e._result, a = 0; a < t.length; a += 3) r = t[a], o = t[a + n], r ? D(n, r, o, i) : o(i);
                e._subscribers.length = 0
            }
        }

        function D(e, t, n, r) {
            var o = c(n),
                i = void 0,
                a = void 0,
                s = !0;
            if (o) {
                try {
                    i = n(r)
                } catch (e) {
                    s = !1, a = e
                }
                if (t === i) return void _(t, new TypeError("A promises callback cannot return that same promise."))
            } else i = r;
            void 0 !== t._state || (o && s ? x(t, i) : !1 === s ? _(t, a) : 1 === e ? R(t, i) : 2 === e && _(t, i))
        }
        var E = 0;

        function T(e) {
            e[b] = E++, e._state = void 0, e._result = void 0, e._subscribers = []
        }
        var O = (k.prototype._enumerate = function(e) {
            for (var t = 0; void 0 === this._state && t < e.length; t++) this._eachEntry(e[t], t)
        }, k.prototype._eachEntry = function(t, e) {
            var n = this._instanceConstructor,
                r = n.resolve;
            if (r === g) {
                var o, i = void 0,
                    a = void 0,
                    s = !1;
                try {
                    i = t.then
                } catch (t) {
                    s = !0, a = t
                }
                i === y && void 0 !== t._state ? this._settledAt(t._state, e, t._result) : "function" != typeof i ? (this._remaining--, this._result[e] = t) : n === $ ? (o = new n(w), s ? _(o, a) : S(o, t, i), this._willSettleAt(o, e)) : this._willSettleAt(new n(function(e) {
                    return e(t)
                }), e)
            } else this._willSettleAt(r(t), e)
        }, k.prototype._settledAt = function(e, t, n) {
            var r = this.promise;
            void 0 === r._state && (this._remaining--, 2 === e ? _(r, n) : this._result[t] = n), 0 === this._remaining && R(r, this._result)
        }, k.prototype._willSettleAt = function(e, t) {
            var n = this;
            A(e, void 0, function(e) {
                return n._settledAt(1, t, e)
            }, function(e) {
                return n._settledAt(2, t, e)
            })
        }, k);

        function k(e, t) {
            this._instanceConstructor = e, this.promise = new e(w), this.promise[b] || T(this.promise), n(t) ? (this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? R(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(t), 0 === this._remaining && R(this.promise, this._result))) : _(this.promise, new Error("Array Methods must be provided an Array"))
        }
        var $ = (L.prototype.catch = function(e) {
            return this.then(null, e)
        }, L.prototype.finally = function(t) {
            var n = this.constructor;
            return c(t) ? this.then(function(e) {
                return n.resolve(t()).then(function() {
                    return e
                })
            }, function(e) {
                return n.resolve(t()).then(function() {
                    throw e
                })
            }) : this.then(t, t)
        }, L);

        function L(e) {
            this[b] = E++, this._result = this._state = void 0, this._subscribers = [], w !== e && ("function" != typeof e && function() {
                throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
            }(), this instanceof L ? function(t, e) {
                try {
                    e(function(e) {
                        x(t, e)
                    }, function(e) {
                        _(t, e)
                    })
                } catch (e) {
                    _(t, e)
                }
            }(this, e) : function() {
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
            }())
        }
        return $.prototype.then = y, $.all = function(e) {
            return new O(this, e).promise
        }, $.race = function(o) {
            var i = this;
            return n(o) ? new i(function(e, t) {
                for (var n = o.length, r = 0; r < n; r++) i.resolve(o[r]).then(e, t)
            }) : new i(function(e, t) {
                return t(new TypeError("You must pass an array to race."))
            })
        }, $.resolve = g, $.reject = function(e) {
            var t = new this(w);
            return _(t, e), t
        }, $._setScheduler = function(e) {
            o = e
        }, $._setAsap = function(e) {
            s = e
        }, $._asap = s, $.polyfill = function() {
            var e = void 0,
                t = (e = C).Promise;
            if (t) {
                var n = null;
                try {
                    n = Object.prototype.toString.call(t.resolve())
                } catch (e) {}
                if ("[object Promise]" === n && !t.cast) return
            }
            e.Promise = $
        }, $.Promise = $
    }(), Ee.exports.polyfill(), String.prototype.includes || (String.prototype.includes = function(e, t) {
        if (e instanceof RegExp) throw TypeError("first argument must not be a RegExp");
        return void 0 === t && (t = 0), -1 !== this.indexOf(e, t)
    });
    var j = [],
        N = [],
        M = [],
        K = [],
        z = Promise.resolve(),
        F = !1;

    function U(e) {
        M.push(e)
    }
    var G = !1,
        I = new Set;

    function Z() {
        if (!G) {
            G = !0;
            do {
                for (var e = 0; e < j.length; e += 1) {
                    var t = j[e];
                    $(t), o = t.$$, t = void 0, void(null !== o.fragment && (o.update(), v(o.before_update), t = o.dirty, o.dirty = [-1], o.fragment && o.fragment.p(o.ctx, t), o.after_update.forEach(U)))
                }
                for (j.length = 0; N.length;) N.pop()();
                for (var n = 0; n < M.length; n += 1) {
                    var r = M[n];
                    I.has(r) || (I.add(r), r())
                }
            } while (M.length = 0, j.length);
            for (; K.length;) K.pop()();
            G = F = !1, I.clear()
        }
        var o
    }
    var H, q = new Set;

    function Y(e, t) {
        e && e.i && (q.delete(e), e.i(t))
    }

    function Q(e, t, n, r) {
        e && e.o && (q.has(e) || (q.add(e), H.c.push(function() {
            q.delete(e), r && (n && e.d(1), r())
        }), e.o(t)))
    }
    var W = "undefined" != typeof window ? window : "undefined" != typeof globalThis ? globalThis : global;

    function J(e) {
        e && e.c()
    }

    function V(n, e, t) {
        var r = n.$$,
            o = r.fragment,
            i = r.on_mount,
            a = r.on_destroy,
            r = r.after_update;
        o && o.m(e, t), U(function() {
            var e, t = i.map(p).filter(y);
            a ? a.push.apply(a, function(e) {
                if (Array.isArray(e)) return d(e)
            }(e = t) || function(e) {
                if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
            }(e) || s(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()) : v(t), n.$$.on_mount = []
        }), r.forEach(U)
    }

    function X(e, t) {
        e = e.$$;
        null !== e.fragment && (v(e.on_destroy), e.fragment && e.fragment.d(t), e.on_destroy = e.fragment = null, e.ctx = [])
    }

    function ee(r, e, t, n, o, i, a) {
        void 0 === a && (a = [-1]);
        var s = m;
        $(r);
        var c = e.props || {},
            u = r.$$ = {
                fragment: null,
                ctx: null,
                props: i,
                update: b,
                not_equal: o,
                bound: h(),
                on_mount: [],
                on_destroy: [],
                before_update: [],
                after_update: [],
                context: new Map(s ? s.$$.context : []),
                callbacks: h(),
                dirty: a,
                skip_bound: !1
            },
            f = !1;
        u.ctx = t ? t(r, c, function(e, t) {
            var n = !(arguments.length <= 2) && arguments.length - 2 ? arguments.length <= 2 ? void 0 : arguments[2] : t;
            return u.ctx && o(u.ctx[e], u.ctx[e] = n) && (!u.skip_bound && u.bound[e] && u.bound[e](n), f && (n = e, -1 === (e = r).$$.dirty[0] && (j.push(e), F || (F = !0, z.then(Z)), e.$$.dirty.fill(0)), e.$$.dirty[n / 31 | 0] |= 1 << n % 31)), t
        }) : [], u.update(), f = !0, v(u.before_update), u.fragment = !!n && n(u.ctx), e.target && (e.hydrate ? (n = e.target, n = Array.from(n.childNodes), u.fragment && u.fragment.l(n), n.forEach(_)) : u.fragment && u.fragment.c(), e.intro && Y(r.$$.fragment), V(r, e.target, e.anchor), Z()), $(s)
    }
    var te = ((le = re.prototype).$destroy = function() {
            X(this, 1), this.$destroy = b
        }, le.$on = function(e, t) {
            var n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
            return n.push(t),
                function() {
                    var e = n.indexOf(t); - 1 !== e && n.splice(e, 1)
                }
        }, le.$set = function(e) {
            this.$$set && 0 !== Object.keys(e).length && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1)
        }, re),
        ne = [];

    function re() {}
    var oe = function(o, r) {
        var i;
        void 0 === r && (r = b);
        var a = [];

        function s(e) {
            if (w(o, e) && (o = e, i)) {
                for (var e = !ne.length, t = 0; t < a.length; t += 1) {
                    var n = a[t];
                    n[1](), ne.push(n, o)
                }
                if (e) {
                    for (var r = 0; r < ne.length; r += 2) ne[r][0](ne[r + 1]);
                    ne.length = 0
                }
            }
        }
        return {
            set: s,
            update: function(e) {
                s(e(o))
            },
            subscribe: function(e, t) {
                void 0 === t && (t = b);
                var n = [e, t];
                return a.push(n), 1 === a.length && (i = r(s) || b), e(o),
                    function() {
                        var e = a.indexOf(n); - 1 !== e && a.splice(e, 1), 0 === a.length && (i(), i = null)
                    }
            }
        }
    }({
        baseUrl: "https://api.razorpay.com/v1",
        paymentButtonOptions: null,
        isTestMode: null,
        isQATestMode: null,
        isColorJSLoading: !1,
        buttonPreferences: {
            isFetching: !1,
            data: null,
            error: null
        },
        modalFrameEl: null,
        isIframeContentsLoaded: !1,
        isPaymentFormOpened: !1
    });

    function ie() {
        return a(oe, function(e) {
            return t = e
        })(), t;
        var t
    }

    function ae(t) {
        oe.update(function(e) {
            return Object.assign({}, e, t)
        })
    }

    function se(r, o) {
        return void 0 === o && (o = "."),
            function(e) {
                for (var t = o, n = 0; n < r; n++) t += "0";
                return e.replace(t, "")
            }
    }

    function ce(e, t) {
        return void 0 === t && (t = ","), e.replace(/\./, t)
    }
    var ue = {
            default: {
                decimals: 2,
                format: (Ee = {
                    three: function(e, t) {
                        e = String(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + t + "})$)", "g"), "$1,");
                        return se(t)(e)
                    },
                    threecommadecimal: function(e, t) {
                        e = ce(String(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + t + "})$)", "g"), "$1.");
                        return se(t, ",")(e)
                    },
                    threespaceseparator: function(e, t) {
                        e = String(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + t + "})$)", "g"), "$1 ");
                        return se(t)(e)
                    },
                    threespacecommadecimal: function(e, t) {
                        e = ce(String(e)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + t + "})$)", "g"), "$1 ");
                        return se(t, ",")(e)
                    },
                    szl: function(e, t) {
                        e = String(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + t + "})$)", "g"), "$1, ");
                        return se(t)(e)
                    },
                    chf: function(e, t) {
                        e = String(e).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + t + "})$)", "g"), "$1'");
                        return se(t)(e)
                    },
                    inr: function(e, t) {
                        e = String(e).replace(new RegExp("(.{1,2})(?=.(..)+(\\..{" + t + "})$)", "g"), "$1,");
                        return se(t)(e)
                    },
                    none: function(e) {
                        return String(e)
                    }
                }).three,
                separator: ".",
                minimum: 100
            },
            AED: {
                minor: "fil"
            },
            AFN: {
                minor: "pul"
            },
            ALL: {
                minor: "qindarka"
            },
            AMD: {
                minor: "luma"
            },
            ANG: {
                minor: "cent"
            },
            AOA: {
                minor: "lwei"
            },
            ARS: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "centavo"
            },
            AUD: {
                format: Ee.threespaceseparator,
                minimum: 50,
                minor: "cent"
            },
            AWG: {
                minor: "cent"
            },
            AZN: {
                minor: "qÃ¤pik"
            },
            BAM: {
                minor: "fenning"
            },
            BBD: {
                minor: "cent"
            },
            BDT: {
                minor: "paisa"
            },
            BGN: {
                minor: "stotinki"
            },
            BHD: {
                decimals: 3,
                minor: "fils"
            },
            BIF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            BMD: {
                minor: "cent"
            },
            BND: {
                minor: "sen"
            },
            BOB: {
                minor: "centavo"
            },
            BRL: {
                format: Ee.threecommadecimal,
                separator: ",",
                minimum: 50,
                minor: "centavo"
            },
            BSD: {
                minor: "cent"
            },
            BTN: {
                minor: "chetrum"
            },
            BWP: {
                minor: "thebe"
            },
            BYR: {
                decimals: 0,
                major: "ruble"
            },
            BZD: {
                minor: "cent"
            },
            CAD: {
                minimum: 50,
                minor: "cent"
            },
            CDF: {
                minor: "centime"
            },
            CHF: {
                format: Ee.chf,
                minimum: 50,
                minor: "rappen"
            },
            CLP: {
                decimals: 0,
                format: Ee.none,
                major: "peso",
                minor: "centavo"
            },
            CNY: {
                minor: "jiao"
            },
            COP: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "centavo"
            },
            CRC: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "centimo"
            },
            CUC: {
                minor: "centavo"
            },
            CUP: {
                minor: "centavo"
            },
            CVE: {
                minor: "centavo"
            },
            CZK: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "haler"
            },
            DJF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            DKK: {
                minimum: 250,
                minor: "Ã¸re"
            },
            DOP: {
                minor: "centavo"
            },
            DZD: {
                minor: "centime"
            },
            EGP: {
                minor: "piaster"
            },
            ERN: {
                minor: "cent"
            },
            ETB: {
                minor: "cent"
            },
            EUR: {
                minimum: 50,
                minor: "cent"
            },
            FJD: {
                minor: "cent"
            },
            FKP: {
                minor: "pence"
            },
            GBP: {
                minimum: 30,
                minor: "pence"
            },
            GEL: {
                minor: "tetri"
            },
            GIP: {
                minor: "pence"
            },
            GMD: {
                minor: "butut"
            },
            GNF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            GTQ: {
                minor: "centavo"
            },
            GYD: {
                minor: "cent"
            },
            HKD: {
                minimum: 400,
                minor: "cent"
            },
            HNL: {
                minor: "centavo"
            },
            HRK: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "lipa"
            },
            HTG: {
                minor: "centime"
            },
            HUF: {
                decimals: 0,
                format: Ee.none,
                major: "forint"
            },
            IDR: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "sen"
            },
            ILS: {
                minor: "agorot"
            },
            INR: {
                format: Ee.inr,
                minor: "paise"
            },
            IQD: {
                decimals: 3,
                minor: "fil"
            },
            IRR: {
                minor: "rials"
            },
            ISK: {
                decimals: 0,
                format: Ee.none,
                major: "krÃ³na",
                minor: "aurar"
            },
            JMD: {
                minor: "cent"
            },
            JOD: {
                decimals: 3,
                minor: "fil"
            },
            JPY: {
                decimals: 0,
                minimum: 50,
                minor: "sen",
                format: Ee.none,
                separator: ""
            },
            KES: {
                minor: "cent"
            },
            KGS: {
                minor: "tyyn"
            },
            KHR: {
                minor: "sen"
            },
            KMF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            KPW: {
                minor: "chon"
            },
            KRW: {
                decimals: 0,
                major: "won",
                minor: "chon",
                format: Ee.none,
                separator: ""
            },
            KWD: {
                decimals: 3,
                minor: "fil"
            },
            KYD: {
                minor: "cent"
            },
            KZT: {
                minor: "tiyn"
            },
            LAK: {
                minor: "at"
            },
            LBP: {
                format: Ee.threespaceseparator,
                minor: "piastre"
            },
            LKR: {
                minor: "cent"
            },
            LRD: {
                minor: "cent"
            },
            LSL: {
                minor: "lisente"
            },
            LTL: {
                format: Ee.threespacecommadecimal,
                separator: ",",
                minor: "centu"
            },
            LVL: {
                minor: "santim"
            },
            LYD: {
                decimals: 3,
                minor: "dirham"
            },
            MAD: {
                minor: "centime"
            },
            MDL: {
                minor: "ban"
            },
            MGA: {
                decimals: 0,
                major: "ariary"
            },
            MKD: {
                minor: "deni"
            },
            MMK: {
                minor: "pya"
            },
            MNT: {
                minor: "mongo"
            },
            MOP: {
                minor: "avo"
            },
            MRO: {
                minor: "khoum"
            },
            MUR: {
                minor: "cent"
            },
            MVR: {
                minor: "lari"
            },
            MWK: {
                minor: "tambala"
            },
            MXN: {
                minimum: 1e3,
                minor: "centavo"
            },
            MYR: {
                minor: "sen"
            },
            MZN: {
                decimals: 0,
                major: "metical"
            },
            NAD: {
                minor: "cent"
            },
            NGN: {
                minor: "kobo"
            },
            NIO: {
                minor: "centavo"
            },
            NOK: {
                format: Ee.threecommadecimal,
                separator: ",",
                minimum: 300,
                minor: "Ã¸re"
            },
            NPR: {
                minor: "paise"
            },
            NZD: {
                minimum: 50,
                minor: "cent"
            },
            OMR: {
                minor: "baiza",
                decimals: 3
            },
            PAB: {
                minor: "centesimo"
            },
            PEN: {
                minor: "centimo"
            },
            PGK: {
                minor: "toea"
            },
            PHP: {
                minor: "centavo"
            },
            PKR: {
                minor: "paisa"
            },
            PLN: {
                format: Ee.threespacecommadecimal,
                separator: ",",
                minor: "grosz"
            },
            PYG: {
                decimals: 0,
                major: "guarani",
                minor: "centimo",
                format: Ee.none,
                separator: ""
            },
            QAR: {
                minor: "dirham"
            },
            RON: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "bani"
            },
            RUB: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "kopeck"
            },
            RWF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            SAR: {
                minor: "halalat"
            },
            SBD: {
                minor: "cent"
            },
            SCR: {
                minor: "cent"
            },
            SEK: {
                format: Ee.threespacecommadecimal,
                separator: ",",
                minimum: 300,
                minor: "Ã¶re"
            },
            SGD: {
                minimum: 50,
                minor: "cent"
            },
            SHP: {
                minor: "new pence"
            },
            SLL: {
                minor: "cent"
            },
            SOS: {
                minor: "centesimi"
            },
            SRD: {
                minor: "cent"
            },
            STD: {
                minor: "centimo"
            },
            SVC: {
                minor: "centavo"
            },
            SYP: {
                minor: "piaster"
            },
            SZL: {
                format: Ee.szl,
                minor: "cent"
            },
            THB: {
                minor: "satang"
            },
            TJS: {
                minor: "diram"
            },
            TMT: {
                minor: "tenga"
            },
            TND: {
                decimals: 3,
                minor: "millime"
            },
            TOP: {
                minor: "seniti"
            },
            TRY: {
                minor: "kurus"
            },
            TTD: {
                minor: "cent"
            },
            TWD: {
                minor: "cent"
            },
            TZS: {
                minor: "cent"
            },
            UAH: {
                format: Ee.threespacecommadecimal,
                separator: ",",
                minor: "kopiyka"
            },
            UGX: {
                decimals: 0,
                minor: "cent",
                format: Ee.none,
                separator: ""
            },
            USD: {
                minimum: 50,
                minor: "cent"
            },
            UYU: {
                format: Ee.threecommadecimal,
                separator: ",",
                minor: "centÃ©"
            },
            UZS: {
                minor: "tiyin"
            },
            VND: {
                format: Ee.none,
                minor: "hao,xu"
            },
            VUV: {
                decimals: 0,
                major: "vatu",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            WST: {
                minor: "sene"
            },
            XAF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            XCD: {
                minor: "cent"
            },
            XOF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            XPF: {
                decimals: 0,
                major: "franc",
                minor: "centime",
                format: Ee.none,
                separator: ""
            },
            YER: {
                minor: "fil"
            },
            ZAR: {
                format: Ee.threespaceseparator,
                minor: "cent"
            },
            ZMK: {
                minor: "ngwee"
            }
        },
        fe = function(e) {
            return ue[e] || ue.default
        },
        le = ["AED", "ALL", "AMD", "ARS", "AUD", "AWG", "BBD", "BDT", "BMD", "BND", "BOB", "BSD", "BWP", "BZD", "CAD", "CHF", "CNY", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD", "EGP", "ETB", "EUR", "FJD", "GBP", "GIP", "GMD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "JMD", "KES", "KGS", "KHR", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL", "MKD", "MMK", "MNT", "MOP", "MUR", "MVR", "MWK", "MXN", "MYR", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "PEN", "PGK", "PHP", "PKR", "QAR", "RUB", "SAR", "SCR", "SEK", "SGD", "SLL", "SOS", "SSP", "SVC", "SZL", "THB", "TTD", "TZS", "USD", "UYU", "UZS", "YER", "ZAR"],
        me = {
            AED: "Ø¯.Ø¥",
            AFN: "&#x60b;",
            ALL: "&#x6b;",
            AMD: "&#1423;",
            ANG: "Æ’",
            AOA: "Kz",
            ARS: "$",
            AUD: "A$",
            AWG: "Æ’",
            AZN: "Ð¼Ð°Ð½",
            BAM: "KM",
            BBD: "Bds$",
            BDT: "&#x9f3;",
            BGN: "Ð»Ð²",
            BHD: "Ø¯.Ø¨",
            BIF: "FBu",
            BMD: "BD$",
            BND: "B$",
            BOB: "Bs.",
            BRL: "R$",
            BSD: "B$",
            BTN: "Nu.",
            BWP: "P",
            BYR: "Br",
            BZD: "BZ$",
            CAD: "C$",
            CDF: "FC",
            CHF: "Fr",
            CLP: "$",
            CNY: "&#165;",
            COP: "$",
            CRC: "&#x20a1;",
            CUC: "&#x20b1;",
            CUP: "$",
            CVE: "Esc",
            CZK: "KÄ",
            DJF: "Fdj",
            DKK: "Kr.",
            DOP: "RD$",
            DZD: "Ø¯.Ø¬",
            EGP: "E&#163;",
            ERN: "Nfa",
            ETB: "Br",
            EUR: "&#8364;",
            FJD: "FJ$",
            FKP: "FK&#163;",
            GBP: "&#163;",
            GEL: "áƒš",
            GHS: "&#x20b5;",
            GIP: "&#163;",
            GMD: "D",
            GNF: "FG",
            GTQ: "Q",
            GYD: "GY$",
            HKD: "HK$",
            HNL: "L",
            HRK: "Kn",
            HTG: "G",
            HUF: "Ft",
            IDR: "Rp",
            ILS: "&#x20aa;",
            INR: "â‚¹",
            IQD: "Ø¹.Ø¯",
            IRR: "&#xfdfc;",
            ISK: "Kr",
            JMD: "J$",
            JOD: "Ø¯.Ø§",
            JPY: "&#165;",
            KES: "KSh",
            KGS: "Ð»Ð²",
            KHR: "áŸ›",
            KMF: "CF",
            KPW: "â‚©",
            KRW: "â‚©",
            KWD: "Ø¯.Ùƒ",
            KYD: "KY$",
            KZT: "&#x20b8;",
            LAK: "&#x20ad;",
            LBP: "L&#163;",
            LD: "Ù„.Ø¯",
            LKR: "Rs",
            LRD: "L$",
            LSL: "L",
            LTL: "Lt",
            LVL: "Ls",
            LYD: "Ù„.Ø¯",
            MAD: "Ø¯.Ù….",
            MDL: "L",
            MGA: "Ar",
            MKD: "Ð´ÐµÐ½",
            MMK: "K",
            MNT: "&#x20ae;",
            MOP: "P",
            MRO: "UM",
            MUR: "ÉŒs",
            MVR: "Rf",
            MWK: "MK",
            MXN: "$",
            MYR: "RM",
            MZN: "MT",
            NAD: "N$",
            NGN: "&#x20a6;",
            NIO: "C$",
            NOK: "Kr",
            NPR: "NÉŒs",
            NZD: "NZ$",
            OMR: "Ø±.Ø¹.",
            PAB: "B/.",
            PEN: "S/.",
            PGK: "K",
            PHP: "&#x20b1;",
            PKR: "ÉŒs",
            PLN: "ZÅ‚",
            PYG: "&#x20b2;",
            QAR: "QAR",
            RON: "L",
            RSD: "Ð”Ð¸Ð½.",
            RUB: "&#8381;",
            RWF: "RF",
            SAR: "Ø±.Ø³",
            SBD: "SI$",
            SCR: "ÉŒs",
            SDG: "&#163;Sd",
            SEK: "Kr",
            SFR: "Fr",
            SGD: "S$",
            SHP: "&#163;",
            SLL: "Le",
            SOS: "So. Sh.",
            SRD: "$",
            SSP: "&#163;",
            STD: "Db",
            SVC: "&#x20a1;",
            SYP: "S&#163;",
            SZL: "L",
            THB: "&#x0e3f;",
            TJS: "SM",
            TMT: "M",
            TND: "Ø¯.Øª",
            TOP: "T$",
            TRY: "TL",
            TTD: "TT$",
            TWD: "NT$",
            TZS: "TSh",
            UAH: "&#x20b4;",
            UGX: "USh",
            USD: "$",
            UYU: "$U",
            UZS: "Ð»Ð²",
            VEF: "Bs",
            VND: "&#x20ab;",
            VUV: "VT",
            WST: "T",
            XAF: "CFA",
            XCD: "EC$",
            XOF: "CFA",
            XPF: "F",
            YER: "&#xfdfc;",
            ZAR: "R",
            ZMK: "ZK",
            ZWL: "Z$"
        };
    "function" != typeof Object.assign && Object.defineProperty(Object, "assign", {
        value: function(e, t) {
            if (null === e) throw new TypeError("Cannot convert undefined or null to object");
            for (var n = Object(e), r = 1; r < arguments.length; r++) {
                var o = arguments[r];
                if (null !== o)
                    for (var i in o) Object.prototype.hasOwnProperty.call(o, i) && (n[i] = o[i])
            }
            return n
        },
        writable: !0,
        configurable: !0
    });
    for (var de = Object.keys(me), pe = 0; pe < de.length; pe++) {
        var he = de[pe];
        ue[he] = Object.assign({}, ue.default, ue[he] || {}), ue[he].code = he, me[he] && (ue[he].symbol = me[he])
    }

    function ve(e, t) {
        t = fe(t), e /= Math.pow(10, t.decimals);
        return t.format(e.toFixed(t.decimals), t.decimals)
    }

    function ye(e, t) {
        return me[t] + ve(e, t)
    }

    function ge(e, t, n) {
        var r;
        e && ((r = document.createElement("script")).src = e, r.onload = t, n && (r.onerror = n), document.head.appendChild(r))
    }

    function be() {
        "object" == typeof window.RZP && window.RZP.environment
    }

    function we() {
        return (window.performance || Date).now()
    }
    Ee = le.reduce(function(e, t) {
            return e[t] = me[t], e
        }, {}), Ee = {
            getCurrencyConfig: fe,
            supportedCurrencies: le,
            displayCurrencies: me,
            currencies: Ee,
            formatAmount: ve,
            formatAmountWithSymbol: ye,
            formatAmountWithDecimals: function(e, t) {
                e = ve(e, t), t = fe(t);
                return e.split(t.separator)[1] ? e : (e + t.separator).padEnd(e.length + t.decimals + 1, "0")
            },
            displayAmount: function(e, t) {
                var n = e.get,
                    r = n("display_currency");
                return r ? me[r] + ve(n("display_amount"), r) : ye(e.display_amount || t || n("amount"), n("currency"))
            },
            getDecimalAmount: function(e) {
                return (e / 100).toFixed(2).replace(".00", "")
            }
        }, window.currencyLib = Ee, Ee = navigator.userAgent, /iPhone/.test(Ee),
        function() {
            var e;
            if ("undefined" != typeof global) e = global;
            else if ("undefined" != typeof self) e = self;
            else try {
                e = Function("return this")()
            } catch (e) {
                throw new Error("polyfill failed because global object is unavailable in this environment")
            }
            var t = e.Promise;
            if (t) {
                var n = null;
                try {
                    n = Object.prototype.toString.call(t.resolve())
                } catch (e) {}
                if ("[object Promise]" === n && !t.cast) return
            }
            document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js"><\/script>')
        }();
    var Se, xe, Pe, Re = ((Ee = {}).lj = "96df432a283745908a06f711acd9e5eb", Ee),
        _e = ["ga", "hotjar", "perf"],
        Ae = (xe = [], Pe = !0, {
            buttonLoaded: function() {
                return De("loaded")
            },
            buttonClicked: function() {
                return De("clicked")
            },
            modalOpenSuccess: function() {
                return De("modal_success")
            },
            performance: {
                renderStart: function(e) {
                    return De("performance.render:start", {
                        timeSinceOpen: e
                    })
                },
                renderEnd: function(e) {
                    return De("performance.render:stop", {
                        timeSinceOpen: e
                    })
                }
            },
            init: function(e, t) {
                Se = t, window.rzpQ || (t = e, (e = window.analytics || window.razorpayAnalytics) ? e.createQ && (window.rzpQ = e.createQ({
                    pollFreq: 500
                })) : (e = function() {}, window.rzpQ = Object.assign({
                    interaction: e,
                    initiated: e,
                    dropped: e,
                    success: e,
                    failed: e,
                    push: e,
                    now: function() {
                        return window.rzpQ
                    },
                    defineEventModifiers: e
                }, t)))
            },
            flushQueue: function() {
                if (window.rzpQ && window.rzpQ.paymentButton)
                    for (var e = 0; e < xe.length; e++) {
                        var t = xe[e];
                        De(t.key, t.value)
                    }
                Pe = !1
            }
        }),
        Be = {
            lj: Ae,
            init: function(o, i) {
                ge("https://cdn.razorpay.com/static/analytics/bundle.js", function() {
                    var t, n;
                    void 0 === (r = ["lj"]) && (r = _e), window.razorpayAnalytics || window.analytics ? (t = [], n = {}, r.forEach(function(e) {
                        t.push(e), Re[e] && (n[e] = Re[e])
                    }), (window.razorpayAnalytics || window.analytics).init(t, n, !1, void 0, !1, void 0)) : window.analytics = {
                        track: function() {}
                    };
                    var e = {
                            paymentButton: function() {
                                return window.rzpQ
                            }
                        },
                        r = {
                            pluginSource: i || "native",
                            button_id: o,
                            local_order_id: Date.now() + "_" + window.location.href + "_" + Math.floor(1e7 * Math.random())
                        };
                    Ae.init(e, r), window.rzpQ && window.rzpQ.defineEventModifiers({
                        paymentButton: [{
                            propertyName: "event_type",
                            value: "paymentbuttons"
                        }, {
                            propertyName: "event_group",
                            value: "paymentbuttons-button"
                        }, {
                            propertyName: "location",
                            value: window.location.href
                        }]
                    }), Ae.flushQueue(), Ae.buttonLoaded()
                }, function() {
                    Ae.flushQueue()
                })
            }
        };

    function De(e, t) {
        window.rzpQ && window.rzpQ.paymentButton ? window.rzpQ.push(window.rzpQ.now().paymentButton().interaction("button.website." + e, Object.assign({}, t, {
            mode: "live",
            type: "payment"
        }, Se))) : Pe && xe.push({
            key: e,
            value: t
        })
    }
    var Ee = navigator.userAgent,
        Te = /iPhone/.test(Ee);

    function Oe(e) {
        var n, r;
        return {
            c: function() {
                T(n = A("div"), "class", "razorpay-loader svelte-q4m8xw"), T(n, "style", r = e[0] ? "opacity: 1" : "")
            },
            m: function(e, t) {
                R(e, n, t)
            },
            p: function(e, t) {
                1 & g(t, 1)[0] && r !== (r = e[0] ? "opacity: 1" : "") && T(n, "style", r)
            },
            i: b,
            o: b,
            d: function(e) {
                e && _(n)
            }
        }
    }

    function ke(e, t, n) {
        var t = t.show,
            r = void 0 !== t && t;
        return e.$$set = function(e) {
            "show" in e && n(0, r = e.show)
        }, [r]
    }
    Ee = window.addEventListener ? "addEventListener" : "attachEvent", (0, window[Ee])("attachEvent" == Ee ? "onmessage" : "message", function(e) {
        event.origin;
        var t, n, r, o = e[e.message ? "message" : "data"];
        switch (be(o.event_type, o.data), o.event_type) {
            case "close_modal":
                be(), ae({
                    isPaymentFormOpened: !1
                });
                break;
            case "redirect_to_on_payment_success":
                (t = o.data.redirectTo) && (r = !1, (n = t) && (r = new RegExp(/^(?:(?:http|https|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[0-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))|localhost)(?::\d{2,5})?(?:(\/|\?|#)[^\s]*)?$/i).test(n)), r) && (location.href = t);
                break;
            case "iframe_contents_loaded":
                ae({
                    isIframeContentsLoaded: !0
                })
        }
    }, !1);
    var $e, Le = (o(Ce, $e = te), e(Ce, [{
        key: "show",
        get: function() {
            return this.$$.ctx[0]
        },
        set: function(e) {
            this.$set({
                show: e
            }), Z()
        }
    }]), Ce);

    function Ce(e) {
        var t, n = $e.call(this) || this;
        return document.getElementById("svelte-q4m8xw-style") || ((t = A("style")).id = "svelte-q4m8xw-style", t.textContent = ".razorpay-loader.svelte-q4m8xw{position:relative;height:50px;width:50px;border-radius:50%;top:30%;margin:0 auto;border:1px solid rgba(255,255,255,0.2);border-top-color:rgba(255,255,255,0.7);animation:svelte-q4m8xw-rzp-rot 1s infinite linear;transition:.2s;opacity:0}@-moz-keyframes svelte-q4m8xw-rzp-rot{100%{transform:rotate(360deg)}}@-webkit-keyframes svelte-q4m8xw-rzp-rot{100%{transform:rotate(360deg)}}@-o-keyframes svelte-q4m8xw-rzp-rot{100%{transform:rotate(360deg)}}@keyframes svelte-q4m8xw-rzp-rot{100%{transform:rotate(360deg)}}", P(document.head, t)), ee(i(n), e, ke, Oe, w, {
            show: 0
        }), n
    }

    function je(n) {
        var r, o, i, a, s, c, u, f, l, m = new Le({
            props: {
                show: n[1]
            }
        });
        return {
            c: function() {
                r = A("div"), o = A("div"), i = A("span"), a = D("Test Mode"), s = E(), J(m.$$.fragment), c = E(), u = A("iframe"), T(i, "class", "test-mode-badge svelte-7tbrl8"), T(i, "style", n[5]), T(o, "class", "razorpay-backdrop svelte-7tbrl8"), T(o, "style", n[4]), T(u, "title", "payment-form"), T(u, "class", "razorpay-payment-form-frame svelte-7tbrl8"), T(u, "frameborder", "0"), T(u, "height", "100%"), T(u, "width", "100%"), T(u, "allowtransparency", "true"), u.allowPaymentRequest = "true", u.src !== (f = n[0]) && T(u, "src", f), T(r, "class", "razorpay-payment-form-container svelte-7tbrl8"), T(r, "style", n[2])
            },
            m: function(e, t) {
                R(e, r, t), P(r, o), P(o, i), P(i, a), P(r, s), V(m, r, null), P(r, c), P(r, u), n[6](u), l = !0
            },
            p: function(e, t) {
                var n = g(t, 1)[0];
                (!l || 32 & n) && T(i, "style", e[5]), (!l || 16 & n) && T(o, "style", e[4]);
                t = {};
                2 & n && (t.show = e[1]), m.$set(t), (!l || 1 & n && u.src !== (f = e[0])) && T(u, "src", f), (!l || 4 & n) && T(r, "style", e[2])
            },
            i: function(e) {
                l || (Y(m.$$.fragment, e), l = !0)
            },
            o: function(e) {
                Q(m.$$.fragment, e), l = !1
            },
            d: function(e) {
                e && _(r), X(m), n[6](null)
            }
        }
    }

    function Ne(e, t, n) {
        var r;
        S(e, oe, function(e) {
            return n(3, r = e)
        });
        var o, i, a, s, c, u = r.paymentFormUrl;
        return r.isQATestMode && (c = r.paymentButtonOptions.payment_button_id, u = r.baseUrl + "/payment_buttons/" + c + "/view"), e.$$.update = function() {
            8 & e.$$.dirty && n(2, i = r.isPaymentFormOpened ? "" : "display: none;"), 8 & e.$$.dirty && n(4, a = r.isPaymentFormOpened ? "opacity:1;" : ""), 8 & e.$$.dirty && n(5, s = r.isTestMode ? "opacity:1;" : ""), 8 & e.$$.dirty && (r.isPaymentFormOpened ? (n(1, o = !0), r.isIframeContentsLoaded && setTimeout(function() {
                n(1, o = !1)
            }, 1e3)) : n(1, o = !1))
        }, [u, o, i, r, a, s, function(e) {
            N[e ? "unshift" : "push"](function() {
                r.modalFrameEl = e, oe.set(r)
            })
        }]
    }
    var Me, Ke = (o(Fe, Me = te), Fe),
        ze = {
            RZP_DARK_STANDARD: "rzp-dark-standard",
            RZP_OUTLINE_STANDARD: "rzp-outline-standard",
            RZP_LIGHT_STANDARD: "rzp-light-standard",
            BRAND_COLOR: "brand-color"
        };

    function Fe(e) {
        var t, n = Me.call(this) || this;
        return document.getElementById("svelte-7tbrl8-style") || ((t = A("style")).id = "svelte-7tbrl8-style", t.textContent = ".razorpay-payment-form-container.svelte-7tbrl8{z-index:1000000000;position:fixed;top:0;display:block;left:0;height:100%;width:100%;backface-visibility:hidden;overflow-y:visible}.razorpay-payment-form-frame.svelte-7tbrl8{opacity:1;min-height:100% !important;position:fixed;top:0;background:none;display:block;border:0 none transparent;margin:0;padding:0;z-index:2;width:100% !important}.razorpay-backdrop.svelte-7tbrl8{min-height:100%;transition:all .3s ease-out 0s;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);opacity:0}.test-mode-badge.svelte-7tbrl8{text-decoration:none;background:#d64444;border:1px dashed #fff;padding:3px;opacity:0;transform:rotate(45deg);transition:opacity .3s ease-in 0s;font-family:lato,ubuntu,helvetica,sans-serif;color:#fff;position:absolute;width:200px;text-align:center;right:-50px;top:50px}", P(document.head, t)), ee(i(n), e, Ne, je, w, {}), n
    }

    function Ue(e) {
        var n, r;
        return {
            c: function() {
                n = D("Secured by "), r = D(e[5])
            },
            m: function(e, t) {
                R(e, n, t), R(e, r, t)
            },
            p: b,
            d: function(e) {
                e && _(n), e && _(r)
            }
        }
    }

    function Ge(e) {
        var n, r, t;
        return {
            c: function() {
                n = D("Secured by "), T(r = A("img"), "class", "secured-by-logo svelte-ekc7fv"), r.src !== (t = e[4]) && T(r, "src", t), T(r, "alt", "brand"), T(r, "height", "14px")
            },
            m: function(e, t) {
                R(e, n, t), R(e, r, t)
            },
            p: b,
            d: function(e) {
                e && _(n), e && _(r)
            }
        }
    }

    function Ie(o) {
        var i, a, s, c, u, f, l, n, m, d, r, p, h, v = o[3] && {
                c: function() {
                    r = B("svg"), p = B("path"), h = B("path"), T(p, "d", "M7.077 6.476l-.988 3.569 5.65-3.589-3.695 13.54 3.752.004 5.457-20L7.077 6.476z"), T(p, "fill", "#fff"), T(p, "class", "svelte-ekc7fv"), T(h, "d", "M1.455 14.308L0 20h7.202L10.149 8.42l-8.694 5.887z"), T(h, "fill", "#fff"), T(h, "class", "svelte-ekc7fv"), T(r, "width", "18"), T(r, "height", "20"), T(r, "viewBox", "0 0 18 20"), T(r, "fill", "none"), T(r, "xmlns", "http://www.w3.org/2000/svg"), T(r, "class", "svelte-ekc7fv")
                },
                m: function(e, t) {
                    R(e, r, t), P(r, p), P(r, h)
                },
                d: function(e) {
                    e && _(r)
                }
            },
            y = (o[4] ? Ge : Ue)(o);
        return {
            c: function() {
                i = A("a"), v && v.c(), a = E(), s = A("div"), c = A("span"), u = D(o[0]), f = E(), l = A("div"), y.c(), T(c, "class", "PaymentButton-text svelte-ekc7fv"), T(l, "class", "PaymentButton-securedBy svelte-ekc7fv"), T(s, "class", "PaymentButton-contents svelte-ekc7fv"), T(i, "href", o[6]), T(i, "type", "submit"), T(i, "class", n = x(o[1]) + " svelte-ekc7fv"), k(i, "background", o[2] || "")
            },
            m: function(e, t) {
                var n, r;
                R(e, i, t), v && v.m(i, null), P(i, a), P(i, s), P(s, c), P(c, u), P(s, f), P(s, l), y.m(l, null), m || (n = i, r = o[10], n.addEventListener("click", r, void 0), d = function() {
                    return n.removeEventListener("click", r, void 0)
                }, m = !0)
            },
            p: function(e, t) {
                t = g(t, 1)[0];
                1 & t && O(u, e[0]), y.p(e, t), 2 & t && n !== (n = x(e[1]) + " svelte-ekc7fv") && T(i, "class", n), 4 & t && k(i, "background", e[2] || "")
            },
            i: b,
            o: b,
            d: function(e) {
                e && _(i), v && v.d(), y.d(), m = !1, d()
            }
        }
    }

    function Ze(n, e, t) {
        var r;
        S(n, oe, function(e) {
            return t(11, r = e)
        });
        var o, i = e.brandColor,
            a = e.buttonTheme,
            s = e.buttonText,
            c = e.brandingOptions,
            s = s.substring(0, 20),
            u = void 0 === c.show_rzp_logo || c.show_rzp_logo,
            f = c.branding_logo,
            l = c.business_name,
            m = r.paymentFormUrl + "/?utm_source=payment_button&utm_medium=button&utm_campaign=payment_button",
            d = -1 < [ze.RZP_DARK_STANDARD, ze.RZP_LIGHT_STANDARD, ze.RZP_OUTLINE_STANDARD].indexOf(a),
            p = !0;
        return d ? ze.RZP_DARK_STANDARD === a && (p = !1) : (o = ze.BRAND_COLOR === a ? i : a, p = !(colorLib && colorLib.isDark(o))), e = "PaymentButton", e += " PaymentButton--" + (p ? "light" : "dark"), d && (e += " PaymentButton--rzpTheme", e += " PaymentButton--" + a), u || (e += " PaymentButton--noRzpLogo"), f && (e += " PaymentButton--customSecuredByLogo"), n.$$set = function(e) {
            "brandColor" in e && t(7, i = e.brandColor), "buttonTheme" in e && t(8, a = e.buttonTheme), "buttonText" in e && t(0, s = e.buttonText), "brandingOptions" in e && t(9, c = e.brandingOptions)
        }, [s, e, o, u, f, l, m, i, a, c, function(e) {
            var t;
            t = e, (e = n.$$.callbacks[t.type]) && e.slice().forEach(function(e) {
                return e(t)
            })
        }]
    }
    var He, qe = (o(Ye, He = te), e(Ye, [{
        key: "brandColor",
        get: function() {
            return this.$$.ctx[7]
        },
        set: function(e) {
            this.$set({
                brandColor: e
            }), Z()
        }
    }, {
        key: "buttonTheme",
        get: function() {
            return this.$$.ctx[8]
        },
        set: function(e) {
            this.$set({
                buttonTheme: e
            }), Z()
        }
    }, {
        key: "buttonText",
        get: function() {
            return this.$$.ctx[0]
        },
        set: function(e) {
            this.$set({
                buttonText: e
            }), Z()
        }
    }, {
        key: "brandingOptions",
        get: function() {
            return this.$$.ctx[9]
        },
        set: function(e) {
            this.$set({
                brandingOptions: e
            }), Z()
        }
    }]), Ye);

    function Ye(e) {
        var t, n = He.call(this) || this;
        return document.getElementById("svelte-ekc7fv-style") || ((t = A("style")).id = "svelte-ekc7fv-style", t.textContent = "@import url(\"https://fonts.googleapis.com/css2?family=Muli:wght@700;800&display=swap\");.PaymentButton.svelte-ekc7fv.svelte-ekc7fv{position:relative;display:inline-block;min-width:160px;height:40px;padding:0;border-radius:3px;text-align:center;font-style:italic;font-family:Muli,helvetica,sans-serif;font-display:swap;overflow:hidden;border:1px solid transparent;outline:none;cursor:pointer;-webkit-tap-highlight-color:transparent;text-decoration:none}.PaymentButton--customSecuredByLogo.svelte-ekc7fv.svelte-ekc7fv{height:48px}.PaymentButton--light.svelte-ekc7fv.svelte-ekc7fv{color:#072654}.PaymentButton--dark.svelte-ekc7fv.svelte-ekc7fv{color:#fff}.PaymentButton--rzpTheme.svelte-ekc7fv.svelte-ekc7fv::before{content:'';position:absolute;left:-6px;top:0;width:46px;height:100%;background:#1e40a0;border-radius:2px 0 0 2px;transform:skew(-15deg,0)}.PaymentButton--rzp-dark-standard.svelte-ekc7fv.svelte-ekc7fv{background:#072654;border-color:#072654}.PaymentButton--rzp-outline-standard.svelte-ekc7fv.svelte-ekc7fv{background:#eaf2fe;border-color:#1e40a0}.PaymentButton--rzp-outline-standard.svelte-ekc7fv.svelte-ekc7fv::before{box-shadow:2px 0 4px rgba(0,0,0,0.15)}.PaymentButton--rzp-light-standard.svelte-ekc7fv.svelte-ekc7fv{background:#fff;border-color:#fff}.PaymentButton--rzp-light-standard.svelte-ekc7fv.svelte-ekc7fv::before{box-shadow:2px 0 4px rgba(0,0,0,0.15)}svg.svelte-ekc7fv.svelte-ekc7fv{position:absolute;top:0;left:0;margin:9px 11px}svg.svelte-ekc7fv svg path.svelte-ekc7fv{fill:#fff}.PaymentButton--rzpTheme.svelte-ekc7fv svg path.svelte-ekc7fv{fill:#fff}.PaymentButton--light.svelte-ekc7fv:not(.PaymentButton--rzpTheme) svg path.svelte-ekc7fv{fill:#072654}.PaymentButton.svelte-ekc7fv.svelte-ekc7fv:not(.PaymentButton--rzpTheme):not(.PaymentButton--noRzpLogo)::before{content:'';position:absolute;bottom:0;left:0;top:0;right:0;background:linear-gradient(121deg,rgba(255,255,255,0) 40%,rgba(255,255,255,0.2) 100%)}.PaymentButton-contents.svelte-ekc7fv.svelte-ekc7fv{padding:4px 28px 4px 44px;margin:1px 0}.PaymentButton--noRzpLogo.svelte-ekc7fv .PaymentButton-contents.svelte-ekc7fv{padding-left:28px !important}.PaymentButton--rzpTheme.svelte-ekc7fv .PaymentButton-contents.svelte-ekc7fv{padding-left:60px}.PaymentButton-text.svelte-ekc7fv.svelte-ekc7fv{display:block;min-height:18px;line-height:18px;font-size:14px;font-weight:800;opacity:1;text-transform:initial}.PaymentButton-securedBy.svelte-ekc7fv.svelte-ekc7fv{font-size:8px;line-height:10px;text-transform:initial;margin-top:0;opacity:.6}.PaymentButton--customSecuredByLogo.svelte-ekc7fv .PaymentButton-securedBy.svelte-ekc7fv{opacity:1;margin-top:1px}.secured-by-logo.svelte-ekc7fv.svelte-ekc7fv{vertical-align:middle}", P(document.head, t)), ee(i(n), e, Ze, Ie, w, {
            brandColor: 7,
            buttonTheme: 8,
            buttonText: 0,
            brandingOptions: 9
        }), n
    }

    function Qe(e) {
        var r, n;
        return (r = new qe({
            props: {
                buttonText: e[1],
                buttonTheme: e[0],
                brandColor: e[2],
                brandingOptions: e[3]
            }
        })).$on("click", e[4]), {
            c: function() {
                J(r.$$.fragment)
            },
            m: function(e, t) {
                V(r, e, t), n = !0
            },
            p: function(e, t) {
                var n = g(t, 1)[0],
                    t = {};
                2 & n && (t.buttonText = e[1]), 1 & n && (t.buttonTheme = e[0]), 4 & n && (t.brandColor = e[2]), 8 & n && (t.brandingOptions = e[3]), r.$set(t)
            },
            i: function(e) {
                n || (Y(r.$$.fragment, e), n = !0)
            },
            o: function(e) {
                Q(r.$$.fragment, e), n = !1
            },
            d: function(e) {
                X(r, e)
            }
        }
    }

    function We(e, t, n) {
        var i, r, o, a, s;
        S(e, oe, function(e) {
            return n(6, i = e)
        }), L(function() {
            Be.lj.performance.renderEnd(we())
        });
        var c = i.paymentButtonOptions;

        function u(e) {
            var n, r, t = i.paymentButtonOptions,
                o = (n = i.paymentButtonOptions, r = {}, Object.keys(n).forEach(function(e) {
                    var t = function(e, t) {
                        t = new RegExp("prefill.amount" + e).exec(t);
                        return t && t[1]
                    }(".((.*?)*)", e);
                    t && (e = n[e], r[t] = e)
                }), r);
            return {
                notes: Object.assign({}, t.notes, e),
                amount: o,
                callback_url: t.callback_url
            }
        }
        return a = i.buttonPreferences.data.merchant_brand_color, o = c.button_text, r = c.button_theme, c = i.buttonPreferences.data.branding || {}, Object.keys(ze).find(function(e) {
            return ze[e] === r
        }) || (r = ""), r = r || i.buttonPreferences.data.payment_button_theme, o = o || i.buttonPreferences.data.payment_button_text, c.business_name || (c.business_name = "Razorpay"), e.$$.update = function() {
            96 & e.$$.dirty && i.isPaymentFormOpened && i.isIframeContentsLoaded && function(e) {
                be();
                var t = ie(),
                    n = t.modalFrameEl;
                t.isQATestMode && (t = t.baseUrl, e.base_url = t.replace("/v1", "")), e.is_mobile = window.innerWidth && window.innerWidth < 450 || Te || window.matchMedia("(max-device-height: 450px),(max-device-width: 450px)").matches, e = {
                    event_type: "init_payment_form",
                    data: e
                }, Be.lj.modalOpenSuccess(), n.contentWindow.postMessage(e, "*")
            }(s)
        }, [r, o, a, c, function(e) {
            e.preventDefault(), be(), n(5, s = u({})), ae({
                isPaymentFormOpened: !0
            }), Be.lj.buttonClicked()
        }]
    }
    var Je, Ve, Xe = (o(et, Ve = te), et);

    function et(e) {
        var t;
        return ee(i(t = Ve.call(this) || this), e, We, Qe, w, {}), t
    }

    function tt(t, n) {
        function e() {
            var e;
            Je = !1 !== (e = t).defaultIntegrations ? (window.Sentry.init(e), window.Sentry) : (e.integrations = [new window.Sentry.Integrations.InboundFilters, new window.Sentry.Integrations.FunctionToString, new window.Sentry.Integrations.Breadcrumbs, new window.Sentry.Integrations.LinkedErrors, new window.Sentry.Integrations.UserAgent], e = new window.Sentry.BrowserClient(e), new window.Sentry.Hub(e)), n && n()
        }
        window.Sentry && window.Sentry.BrowserClient && window.Sentry.captureException ? e() : ge("https://browser.sentry-cdn.com/6.16.1/bundle.min.js", e)
    }

    function nt(t) {
        if (Je && t) return Je.run ? Je.run(function(e) {
            e.captureException(t)
        }) : void Je.captureException(t)
    }
    var rt = [];

    function ot() {
        rt.length && Je && rt.forEach(nt), rt = []
    }
    window.addEventListener("error", function(e) {
        0 <= e.filename.indexOf("payment-button.js") && (Je ? nt(e) : rt.push(e))
    });
    var it = W.document;

    function at(e) {
        var n, r, o = e[0].buttonPreferences.error + "";
        return {
            c: function() {
                n = A("span"), r = D(o)
            },
            m: function(e, t) {
                R(e, n, t), P(n, r)
            },
            p: function(e, t) {
                1 & t && o !== (o = e[0].buttonPreferences.error + "") && O(r, o)
            },
            i: b,
            o: b,
            d: function(e) {
                e && _(n)
            }
        }
    }

    function st(e) {
        var n, r = new Xe({});
        return {
            c: function() {
                J(r.$$.fragment)
            },
            m: function(e, t) {
                V(r, e, t), n = !0
            },
            p: b,
            i: function(e) {
                n || (Y(r.$$.fragment, e), n = !0)
            },
            o: function(e) {
                Q(r.$$.fragment, e), n = !1
            },
            d: function(e) {
                X(r, e)
            }
        }
    }

    function ct(e) {
        var r, o, i, n, a = [st, at],
            s = [];

        function c(e) {
            return e[0].buttonPreferences.data && !e[0].isColorJSLoading ? 0 : e[0].buttonPreferences.error ? 1 : -1
        }
        return ~(o = c(e)) && (i = s[o] = a[o](e)), {
            c: function() {
                r = A("span"), i && i.c(), T(r, "class", "razorpay-payment-button svelte-ohbfj8")
            },
            m: function(e, t) {
                R(e, r, t), ~o && s[o].m(r, null), n = !0
            },
            p: function(e, t) {
                var t = g(t, 1)[0],
                    n = o;
                (o = c(e)) === n ? ~o && s[o].p(e, t) : (i && (H = {
                    r: 0,
                    c: [],
                    p: H
                }, Q(s[n], 1, 1, function() {
                    s[n] = null
                }), H.r || v(H.c), H = H.p), ~o ? ((i = s[o]) || (i = s[o] = a[o](e)).c(), Y(i, 1), i.m(r, null)) : i = null)
            },
            i: function(e) {
                n || (Y(i), n = !0)
            },
            o: function(e) {
                Q(i), n = !1
            },
            d: function(e) {
                e && _(r), ~o && s[o].d()
            }
        }
    }

    function ut(e, t, n) {
        var r;
        return S(e, oe, function(e) {
            return n(0, r = e)
        }), L(function() {
            new Ke({
                target: document.body
            }), tt({
                dsn: "https://a9fa294c5e224e028cc57801fee46dd0@o515678.ingest.sentry.io/6726576",
                defaultIntegrations: !1
            }, ot), Be.init(r.paymentButtonOptions.payment_button_id, r.paymentButtonOptions.plugin)
        }), [r]
    }

    function ft(n, r) {
        return function() {
            for (var e = new Array(arguments.length), t = 0; t < e.length; t++) e[t] = arguments[t];
            return n.apply(r, e)
        }
    }
    var lt, mt = (o(pt, lt = te), pt),
        dt = Object.prototype.toString;

    function pt(e) {
        var t, n = lt.call(this) || this;
        return it.getElementById("svelte-ohbfj8-style") || ((t = A("style")).id = "svelte-ohbfj8-style", t.textContent = ".razorpay-payment-button.svelte-ohbfj8,.razorpay-payment-button.svelte-ohbfj8 *,.razorpay-payment-button.svelte-ohbfj8 *::before,.razorpay-payment-button.svelte-ohbfj8 *::after{box-sizing:border-box}.razorpay-payment-button.svelte-ohbfj8{position:relative;display:inline-block;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}", P(it.head, t)), ee(i(n), e, ut, ct, w, {}), n
    }

    function ht(e) {
        return "[object Array]" === dt.call(e)
    }

    function vt(e) {
        return void 0 === e
    }

    function yt(e) {
        return null !== e && "object" == typeof e
    }

    function gt(e) {
        if ("[object Object]" !== dt.call(e)) return !1;
        e = Object.getPrototypeOf(e);
        return null === e || e === Object.prototype
    }

    function bt(e) {
        return "[object Function]" === dt.call(e)
    }

    function wt(e, t) {
        if (null != e)
            if ("object" != typeof e && (e = [e]), ht(e))
                for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
            else
                for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && t.call(null, e[o], o, e)
    }
    var St = {
        isArray: ht,
        isArrayBuffer: function(e) {
            return "[object ArrayBuffer]" === dt.call(e)
        },
        isBuffer: function(e) {
            return null !== e && !vt(e) && null !== e.constructor && !vt(e.constructor) && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        },
        isFormData: function(e) {
            return "undefined" != typeof FormData && e instanceof FormData
        },
        isArrayBufferView: function(e) {
            return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer
        },
        isString: function(e) {
            return "string" == typeof e
        },
        isNumber: function(e) {
            return "number" == typeof e
        },
        isObject: yt,
        isPlainObject: gt,
        isUndefined: vt,
        isDate: function(e) {
            return "[object Date]" === dt.call(e)
        },
        isFile: function(e) {
            return "[object File]" === dt.call(e)
        },
        isBlob: function(e) {
            return "[object Blob]" === dt.call(e)
        },
        isFunction: bt,
        isStream: function(e) {
            return yt(e) && bt(e.pipe)
        },
        isURLSearchParams: function(e) {
            return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams
        },
        isStandardBrowserEnv: function() {
            return ("undefined" == typeof navigator || "ReactNative" !== navigator.product && "NativeScript" !== navigator.product && "NS" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document
        },
        forEach: wt,
        merge: function n() {
            var r = {};

            function e(e, t) {
                gt(r[t]) && gt(e) ? r[t] = n(r[t], e) : gt(e) ? r[t] = n({}, e) : ht(e) ? r[t] = e.slice() : r[t] = e
            }
            for (var t = 0, o = arguments.length; t < o; t++) wt(arguments[t], e);
            return r
        },
        extend: function(n, e, r) {
            return wt(e, function(e, t) {
                n[t] = r && "function" == typeof e ? ft(e, r) : e
            }), n
        },
        trim: function(e) {
            return e.replace(/^\s*/, "").replace(/\s*$/, "")
        },
        stripBOM: function(e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e
        }
    };

    function xt(e) {
        return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]")
    }

    function Pt(e, t, n) {
        return t && (n = n ? n(t) : St.isURLSearchParams(t) ? t.toString() : (r = [], St.forEach(t, function(e, t) {
            null != e && (St.isArray(e) ? t += "[]" : e = [e], St.forEach(e, function(e) {
                St.isDate(e) ? e = e.toISOString() : St.isObject(e) && (e = JSON.stringify(e)), r.push(xt(t) + "=" + xt(e))
            }))
        }), r.join("&"))) && (-1 !== (t = e.indexOf("#")) && (e = e.slice(0, t)), e += (-1 === e.indexOf("?") ? "?" : "&") + n), e;
        var r
    }

    function Rt() {
        this.handlers = []
    }

    function _t(t, n, e) {
        return St.forEach(e, function(e) {
            t = e(t, n)
        }), t
    }

    function At(e) {
        return !(!e || !e.__CANCEL__)
    }

    function Bt(n, r) {
        St.forEach(n, function(e, t) {
            t !== r && t.toUpperCase() === r.toUpperCase() && (n[r] = e, delete n[t])
        })
    }

    function Dt(e, t, n, r, o) {
        return e = new Error(e), n = n, r = r, o = o, e.config = t, n && (e.code = n), e.request = r, e.response = o, e.isAxiosError = !0, e.toJSON = function() {
            return {
                message: this.message,
                name: this.name,
                description: this.description,
                number: this.number,
                fileName: this.fileName,
                lineNumber: this.lineNumber,
                columnNumber: this.columnNumber,
                stack: this.stack,
                config: this.config,
                code: this.code
            }
        }, e
    }
    Rt.prototype.use = function(e, t) {
        return this.handlers.push({
            fulfilled: e,
            rejected: t
        }), this.handlers.length - 1
    }, Rt.prototype.eject = function(e) {
        this.handlers[e] && (this.handlers[e] = null)
    }, Rt.prototype.forEach = function(t) {
        St.forEach(this.handlers, function(e) {
            null !== e && t(e)
        })
    };
    var Et, Tt, Ot, kt = Rt,
        $t = St.isStandardBrowserEnv() ? {
            write: function(e, t, n, r, o, i) {
                var a = [];
                a.push(e + "=" + encodeURIComponent(t)), St.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()), St.isString(r) && a.push("path=" + r), St.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ")
            },
            read: function(e) {
                e = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                return e ? decodeURIComponent(e[3]) : null
            },
            remove: function(e) {
                this.write(e, "", Date.now() - 864e5)
            }
        } : {
            write: function() {},
            read: function() {
                return null
            },
            remove: function() {}
        },
        Lt = ["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"],
        Ct = St.isStandardBrowserEnv() ? (Tt = /(msie|trident)/i.test(navigator.userAgent), Ot = document.createElement("a"), Et = Nt(window.location.href), function(e) {
            e = St.isString(e) ? Nt(e) : e;
            return e.protocol === Et.protocol && e.host === Et.host
        }) : function() {
            return !0
        },
        jt = {
            "Content-Type": "application/x-www-form-urlencoded"
        };

    function Nt(e) {
        return Tt && (Ot.setAttribute("href", e), e = Ot.href), Ot.setAttribute("href", e), {
            href: Ot.href,
            protocol: Ot.protocol ? Ot.protocol.replace(/:$/, "") : "",
            host: Ot.host,
            search: Ot.search ? Ot.search.replace(/^\?/, "") : "",
            hash: Ot.hash ? Ot.hash.replace(/^#/, "") : "",
            hostname: Ot.hostname,
            port: Ot.port,
            pathname: "/" === Ot.pathname.charAt(0) ? Ot.pathname : "/" + Ot.pathname
        }
    }

    function Mt(e, t) {
        !St.isUndefined(e) && St.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t)
    }
    var Kt = {
        adapter: (("undefined" != typeof XMLHttpRequest || "undefined" != typeof process && "[object process]" === Object.prototype.toString.call(process)) && (Jt = function(f) {
            return new Promise(function(s, c) {
                var n = f.data,
                    r = f.headers;
                St.isFormData(n) && delete r["Content-Type"];
                var u = new XMLHttpRequest;
                f.auth && (i = f.auth.username || "", e = f.auth.password ? unescape(encodeURIComponent(f.auth.password)) : "", r.Authorization = "Basic " + btoa(i + ":" + e));
                var e, t, o, i = (t = f.baseURL, i = f.url, t && !/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(i) ? (e = t, (t = i) ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e) : i);
                if (u.open(f.method.toUpperCase(), Pt(i, f.params, f.paramsSerializer), !0), u.timeout = f.timeout, u.onreadystatechange = function() {
                        var e, t, n, r, o, i, a;
                        u && 4 === u.readyState && (0 !== u.status || u.responseURL && 0 === u.responseURL.indexOf("file:")) && (t = "getAllResponseHeaders" in u ? (r = u.getAllResponseHeaders(), a = {}, r && St.forEach(r.split("\n"), function(e) {
                            i = e.indexOf(":"), o = St.trim(e.substr(0, i)).toLowerCase(), i = St.trim(e.substr(i + 1)), o && (a[o] && 0 <= Lt.indexOf(o) || (a[o] = "set-cookie" === o ? (a[o] || []).concat([i]) : a[o] ? a[o] + ", " + i : i))
                        }), a) : null, n = {
                            data: f.responseType && "text" !== f.responseType ? u.response : u.responseText,
                            status: u.status,
                            statusText: u.statusText,
                            headers: t,
                            config: f,
                            request: u
                        }, e = s, r = c, n = (t = n).config.validateStatus, t.status && n && !n(t.status) ? r(Dt("Request failed with status code " + t.status, t.config, null, t.request, t)) : e(t), u = null)
                    }, u.onabort = function() {
                        u && (c(Dt("Request aborted", f, "ECONNABORTED", u)), u = null)
                    }, u.onerror = function() {
                        c(Dt("Network Error", f, null, u)), u = null
                    }, u.ontimeout = function() {
                        var e = "timeout of " + f.timeout + "ms exceeded";
                        f.timeoutErrorMessage && (e = f.timeoutErrorMessage), c(Dt(e, f, "ECONNABORTED", u)), u = null
                    }, St.isStandardBrowserEnv() && (o = (f.withCredentials || Ct(i)) && f.xsrfCookieName ? $t.read(f.xsrfCookieName) : void 0) && (r[f.xsrfHeaderName] = o), "setRequestHeader" in u && St.forEach(r, function(e, t) {
                        void 0 === n && "content-type" === t.toLowerCase() ? delete r[t] : u.setRequestHeader(t, e)
                    }), St.isUndefined(f.withCredentials) || (u.withCredentials = !!f.withCredentials), f.responseType) try {
                    u.responseType = f.responseType
                } catch (s) {
                    if ("json" !== f.responseType) throw s
                }
                "function" == typeof f.onDownloadProgress && u.addEventListener("progress", f.onDownloadProgress), "function" == typeof f.onUploadProgress && u.upload && u.upload.addEventListener("progress", f.onUploadProgress), f.cancelToken && f.cancelToken.promise.then(function(e) {
                    u && (u.abort(), c(e), u = null)
                }), n = n || null, u.send(n)
            })
        }), Jt),
        transformRequest: [function(e, t) {
            return Bt(t, "Accept"), Bt(t, "Content-Type"), St.isFormData(e) || St.isArrayBuffer(e) || St.isBuffer(e) || St.isStream(e) || St.isFile(e) || St.isBlob(e) ? e : St.isArrayBufferView(e) ? e.buffer : St.isURLSearchParams(e) ? (Mt(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString()) : St.isObject(e) ? (Mt(t, "application/json;charset=utf-8"), JSON.stringify(e)) : e
        }],
        transformResponse: [function(e) {
            if ("string" == typeof e) try {
                e = JSON.parse(e)
            } catch (e) {}
            return e
        }],
        timeout: 0,
        xsrfCookieName: "XSRF-TOKEN",
        xsrfHeaderName: "X-XSRF-TOKEN",
        maxContentLength: -1,
        maxBodyLength: -1,
        validateStatus: function(e) {
            return 200 <= e && e < 300
        },
        headers: {
            common: {
                Accept: "application/json, text/plain, */*"
            }
        }
    };
    St.forEach(["delete", "get", "head"], function(e) {
        Kt.headers[e] = {}
    }), St.forEach(["post", "put", "patch"], function(e) {
        Kt.headers[e] = St.merge(jt)
    });
    var zt = Kt;

    function Ft(e) {
        e.cancelToken && e.cancelToken.throwIfRequested()
    }

    function Ut(t) {
        return Ft(t), t.headers = t.headers || {}, t.data = _t(t.data, t.headers, t.transformRequest), t.headers = St.merge(t.headers.common || {}, t.headers[t.method] || {}, t.headers), St.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function(e) {
            delete t.headers[e]
        }), (t.adapter || zt.adapter)(t).then(function(e) {
            return Ft(t), e.data = _t(e.data, e.headers, t.transformResponse), e
        }, function(e) {
            return At(e) || (Ft(t), e && e.response && (e.response.data = _t(e.response.data, e.response.headers, t.transformResponse))), Promise.reject(e)
        })
    }

    function Gt(t, n) {
        n = n || {};
        var r = {},
            e = ["url", "method", "data"],
            o = ["headers", "auth", "proxy", "params"],
            i = ["baseURL", "transformRequest", "transformResponse", "paramsSerializer", "timeout", "timeoutMessage", "withCredentials", "adapter", "responseType", "xsrfCookieName", "xsrfHeaderName", "onUploadProgress", "onDownloadProgress", "decompress", "maxContentLength", "maxBodyLength", "maxRedirects", "transport", "httpAgent", "httpsAgent", "cancelToken", "socketPath", "responseEncoding"],
            a = ["validateStatus"];

        function s(e, t) {
            return St.isPlainObject(e) && St.isPlainObject(t) ? St.merge(e, t) : St.isPlainObject(t) ? St.merge({}, t) : St.isArray(t) ? t.slice() : t
        }

        function c(e) {
            St.isUndefined(n[e]) ? St.isUndefined(t[e]) || (r[e] = s(void 0, t[e])) : r[e] = s(t[e], n[e])
        }
        St.forEach(e, function(e) {
            St.isUndefined(n[e]) || (r[e] = s(void 0, n[e]))
        }), St.forEach(o, c), St.forEach(i, function(e) {
            St.isUndefined(n[e]) ? St.isUndefined(t[e]) || (r[e] = s(void 0, t[e])) : r[e] = s(void 0, n[e])
        }), St.forEach(a, function(e) {
            e in n ? r[e] = s(t[e], n[e]) : e in t && (r[e] = s(void 0, t[e]))
        });
        var u = e.concat(o).concat(i).concat(a),
            a = Object.keys(t).concat(Object.keys(n)).filter(function(e) {
                return -1 === u.indexOf(e)
            });
        return St.forEach(a, c), r
    }

    function It(e) {
        this.defaults = e, this.interceptors = {
            request: new kt,
            response: new kt
        }
    }
    It.prototype.request = function(e) {
        "string" == typeof e ? (e = arguments[1] || {}).url = arguments[0] : e = e || {}, (e = Gt(this.defaults, e)).method ? e.method = e.method.toLowerCase() : this.defaults.method ? e.method = this.defaults.method.toLowerCase() : e.method = "get";
        var t = [Ut, void 0],
            n = Promise.resolve(e);
        for (this.interceptors.request.forEach(function(e) {
                t.unshift(e.fulfilled, e.rejected)
            }), this.interceptors.response.forEach(function(e) {
                t.push(e.fulfilled, e.rejected)
            }); t.length;) n = n.then(t.shift(), t.shift());
        return n
    }, It.prototype.getUri = function(e) {
        return e = Gt(this.defaults, e), Pt(e.url, e.params, e.paramsSerializer).replace(/^\?/, "")
    }, St.forEach(["delete", "get", "head", "options"], function(n) {
        It.prototype[n] = function(e, t) {
            return this.request(Gt(t || {}, {
                method: n,
                url: e,
                data: (t || {}).data
            }))
        }
    }), St.forEach(["post", "put", "patch"], function(r) {
        It.prototype[r] = function(e, t, n) {
            return this.request(Gt(n || {}, {
                method: r,
                url: e,
                data: t
            }))
        }
    });
    var Zt = It;

    function Ht(e) {
        this.message = e
    }
    Ht.prototype.toString = function() {
        return "Cancel" + (this.message ? ": " + this.message : "")
    }, Ht.prototype.__CANCEL__ = !0;
    var qt = Ht;

    function Yt(e) {
        if ("function" != typeof e) throw new TypeError("executor must be a function.");
        var t;
        this.promise = new Promise(function(e) {
            t = e
        });
        var n = this;
        e(function(e) {
            n.reason || (n.reason = new qt(e), t(n.reason))
        })
    }
    Yt.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason
    }, Yt.source = function() {
        var t;
        return {
            token: new Yt(function(e) {
                t = e
            }),
            cancel: t
        }
    };
    var te = Yt;

    function Qt(e) {
        var t = new Zt(e),
            e = ft(Zt.prototype.request, t);
        return St.extend(e, Zt.prototype, t), St.extend(e, t), e
    }
    var Wt = Qt(zt);
    Wt.Axios = Zt, Wt.create = function(e) {
        return Qt(Gt(Wt.defaults, e))
    }, Wt.Cancel = qt, Wt.CancelToken = te, Wt.isCancel = At, Wt.all = function(e) {
        return Promise.all(e)
    }, Wt.spread = function(t) {
        return function(e) {
            return t.apply(null, e)
        }
    }, Wt.isAxiosError = function(e) {
        return "object" == typeof e && !0 === e.isAxiosError
    };
    var Jt = Wt;
    Jt.default = Wt;
    var Vt = Jt;

    function Xt(e, t) {
        if (!t.payment_button_id) {
            var n = "Payment Button cannot be added. Provide a valid payment button id";
            throw window.alert(n), n
        }
        e || window.console.log("Payment Button is added inside 'body' tag, because Target element is missing");
        e = e || document.body;
        if (e instanceof Element || (e = document.getElementById(e)), !e) {
            var r = "Payment Button is not added. Provide target element/id which is present in DOM";
            throw window.alert(r), r
        }
        r = "https://api.razorpay.com/v1";
        return "test" === window.RZP.environment && window.RZP.base_url && (r = window.RZP.base_url), Vt.defaults.baseURL = r || "https://api.razorpay.com/v1",
            function(e, t) {
                var n = ie(),
                    n = JSON.parse(JSON.stringify(n));
                n.baseUrl = t, n.paymentButtonOptions = e, n.isQATestMode = window.RZP && "test" === window.RZP.environment;
                e = e.payment_button_id;
                n.paymentFormUrl = "https://razorpay.com/payment-button/" + e + "/view", oe.set(n)
            }(t, r),
            function() {
                be();
                var e = "payment_buttons/" + ie().paymentButtonOptions.payment_button_id + "/button_preferences";
                Ae.performance.renderStart(we()), ae({
                    buttonPreferences: {
                        isFetching: !0
                    }
                }), Vt(e).then(function(e) {
                    e = e.data;
                    ae({
                        isTestMode: e.is_test_mode,
                        buttonPreferences: {
                            isFetching: !1,
                            data: e.preferences
                        }
                    })
                }).catch(function(n) {
                    var e;
                    be(), ae({
                        buttonPreferences: {
                            isFetching: !1,
                            error: "Some error occurred"
                        }
                    }), Ae.performance.renderEnd(we()), !n.response && -1 < (null == (e = n.message) || null == e.toLowerCase ? void 0 : e.toLowerCase().indexOf("network error")) && Je && Je.run(function(t) {
                        t.withScope(function(e) {
                            e.setLevel(Sentry.Severity.Fatal), n.message = "P0_4XX_PBS: " + n.message, t.captureException(n)
                        })
                    })
                })
            }(), (r = ie().paymentButtonOptions.button_theme) && ze.BRAND_COLOR !== r || (ae({
                isColorJSLoading: !0
            }), ge("https://cdn.razorpay.com/static/assets/color.js", function() {
                ae({
                    isColorJSLoading: !1
                })
            })), new mt({
                target: e,
                store: oe
            })
    }
    window.RZP = window.RZP || {}, te = document.currentScript, "FORM" !== (Jt = te.parentElement).tagName && window.alert("Payment Button is not added. Add Button script inside 'form' tag."), te = te.dataset, be(), Xt(Jt, te)
}();
