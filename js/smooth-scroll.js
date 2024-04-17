! function() {
    function e() {
        if (!D && document.body) {
            D = !0;
            var e = document.body,
                t = document.documentElement,
                o = window.innerHeight,
                r = e.scrollHeight;
            if (M = 0 <= document.compatMode.indexOf("CSS") ? t : e, f = e, x.keyboardSupport && window.addEventListener("keydown", n, !1), top != self) E = !0;
            else if (I && r > o && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                var a, i = document.createElement("div");
                i.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + M.scrollHeight + "px", document.body.appendChild(i), v = function() {
                    a || (a = setTimeout((function() {
                        i.style.height = "0", i.style.height = M.scrollHeight + "px", a = null
                    }), 500))
                }, setTimeout(v, 10), window.addEventListener("resize", v, !1), (p = new P(v)).observe(e, {
                    attributes: !0,
                    childList: !0,
                    characterData: !1
                }), M.offsetHeight <= o && ((o = document.createElement("div")).style.clear = "both", e.appendChild(o))
            }
            x.fixedBackground || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
        }
    }

    function t(e, t, o) {
        if (function(e, t) {
                e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, (k.x !== e || k.y !== t) && (k.x = e, k.y = t, C = [], O = 0)
            }(t, o), 1 != x.accelerationMax) {
            var n = Date.now() - O;
            n < x.accelerationDelta && (1 < (n = (1 + 50 / n) / 2) && (n = Math.min(n, x.accelerationMax), t *= n, o *= n)), O = Date.now()
        }
        if (C.push({
                x: t,
                y: o,
                lastX: 0 > t ? .99 : -.99,
                lastY: 0 > o ? .99 : -.99,
                start: Date.now()
            }), !z) {
            n = $();
            var r = e === n || e === document.body;
            null == e.$scrollBehavior && function(e) {
                var t = X(e);
                return null == N[t] && (e = getComputedStyle(e, "")["scroll-behavior"], N[t] = "smooth" == e), N[t]
            }(e) && (e.$scrollBehavior = e.style.scrollBehavior, e.style.scrollBehavior = "auto");
            var a = function(n) {
                n = Date.now();
                for (var i = 0, l = 0, c = 0; c < C.length; c++) {
                    var s = C[c],
                        d = n - s.start,
                        u = d >= x.animationTime,
                        w = u ? 1 : d / x.animationTime;
                    x.pulseAlgorithm && (1 <= (d = w) ? w = 1 : 0 >= d ? w = 0 : (1 == x.pulseNormalize && (x.pulseNormalize /= m(1)), w = m(d))), i += d = s.x * w - s.lastX >> 0, l += w = s.y * w - s.lastY >> 0, s.lastX += d, s.lastY += w, u && (C.splice(c, 1), c--)
                }
                r ? window.scrollBy(i, l) : (i && (e.scrollLeft += i), l && (e.scrollTop += l)), t || o || (C = []), C.length ? K(a, e, 1e3 / x.frameRate + 1) : (z = !1, null != e.$scrollBehavior && (e.style.scrollBehavior = e.$scrollBehavior, e.$scrollBehavior = null))
            };
            K(a, e, 0), z = !0
        }
    }

    function o(o) {
        D || e();
        var n = o.target;
        if (o.defaultPrevented || o.ctrlKey || d(f, "embed") || d(n, "embed") && /\.pdf/i.test(n.src) || d(f, "object") || n.shadowRoot) return !0;
        var r = -o.wheelDeltaX || o.deltaX || 0,
            i = -o.wheelDeltaY || o.deltaY || 0;
        return T && (o.wheelDeltaX && u(o.wheelDeltaX, 120) && (r = o.wheelDeltaX / Math.abs(o.wheelDeltaX) * -120), o.wheelDeltaY && u(o.wheelDeltaY, 120) && (i = o.wheelDeltaY / Math.abs(o.wheelDeltaY) * -120)), r || i || (i = -o.wheelDelta || 0), 1 === o.deltaMode && (r *= 40, i *= 40), (n = l(n)) ? !! function(e) {
            if (e) {
                L.length || (L = [e, e, e]), e = Math.abs(e), L.push(e), L.shift(), clearTimeout(y), y = setTimeout((function() {
                    try {
                        localStorage.SS_deltaBuffer = L.join(",")
                    } catch (e) {}
                }), 1e3);
                var t = 120 < e && w(e);
                return t = !w(120) && !w(100) && !t, 50 > e || t
            }
        }(i) || (1.2 < Math.abs(r) && (r *= x.stepSize / 120), 1.2 < Math.abs(i) && (i *= x.stepSize / 120), t(n, r, i), o.preventDefault(), void a()) : !E || !q || (Object.defineProperty(o, "target", {
            value: window.frameElement
        }), parent.wheel(o))
    }

    function n(e) {
        var o = e.target,
            n = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== B.spacebar;
        document.body.contains(f) || (f = document.activeElement);
        var r = /^(textarea|select|embed|object)$/i,
            i = /^(button|submit|radio|checkbox|file|color|image)$/i;
        if (!(r = e.defaultPrevented || r.test(o.nodeName) || d(o, "input") && !i.test(o.type) || d(f, "video"))) {
            r = e.target;
            var c = !1;
            if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                do {
                    if (c = r.classList && r.classList.contains("html5-video-controls")) break
                } while (r = r.parentNode);
            r = c
        }
        if (r || o.isContentEditable || n || (d(o, "button") || d(o, "input") && i.test(o.type)) && e.keyCode === B.spacebar || d(o, "input") && "radio" == o.type && H[e.keyCode]) return !0;
        if (r = o = 0, !(n = l(f))) return !E || !q || parent.keydown(e);
        switch (i = n.clientHeight, n == document.body && (i = window.innerHeight), e.keyCode) {
            case B.up:
                r = -x.arrowScroll;
                break;
            case B.down:
                r = x.arrowScroll;
                break;
            case B.spacebar:
                r = -(r = e.shiftKey ? 1 : -1) * i * .9;
                break;
            case B.pageup:
                r = .9 * -i;
                break;
            case B.pagedown:
                r = .9 * i;
                break;
            case B.home:
                n == document.body && document.scrollingElement && (n = document.scrollingElement), r = -n.scrollTop;
                break;
            case B.end:
                r = 0 < (i = n.scrollHeight - n.scrollTop - i) ? i + 10 : 0;
                break;
            case B.left:
                o = -x.arrowScroll;
                break;
            case B.right:
                o = x.arrowScroll;
                break;
            default:
                return !0
        }
        t(n, o, r), e.preventDefault(), a()
    }

    function r(e) {
        f = e.target
    }

    function a() {
        clearTimeout(b), b = setInterval((function() {
            Y = A = N = {}
        }), 1e3)
    }

    function i(e, t, o) {
        o = o ? Y : A;
        for (var n = e.length; n--;) o[X(e[n])] = t;
        return t
    }

    function l(e) {
        var t = [],
            o = document.body,
            n = M.scrollHeight;
        do {
            var r = A[X(e)];
            if (r) return i(t, r);
            if (t.push(e), n === e.scrollHeight) {
                if (r = c(M) && c(o) || s(M), E && M.clientHeight + 10 < M.scrollHeight || !E && r) return i(t, $())
            } else if (e.clientHeight + 10 < e.scrollHeight && s(e)) return i(t, e)
        } while (e = e.parentElement)
    }

    function c(e) {
        return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
    }

    function s(e) {
        return "scroll" === (e = getComputedStyle(e, "").getPropertyValue("overflow-y")) || "auto" === e
    }

    function d(e, t) {
        return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
    }

    function u(e, t) {
        return Math.floor(e / t) == e / t
    }

    function w(e) {
        return u(L[0], e) && u(L[1], e) && u(L[2], e)
    }

    function m(e) {
        if (1 > (e *= x.pulseScale)) var t = e - (1 - Math.exp(-e));
        else t = Math.exp(-1), t += (e = 1 - Math.exp(-(e - 1))) * (1 - t);
        return t * x.pulseNormalize
    }

    function h(e) {
        for (var t in e) S.hasOwnProperty(t) && (x[t] = e[t])
    }
    var f, p, v, y, b, g, S = {
            frameRate: 150,
            animationTime: 400,
            stepSize: 100,
            pulseAlgorithm: !0,
            pulseScale: 4,
            pulseNormalize: 1,
            accelerationDelta: 50,
            accelerationMax: 3,
            keyboardSupport: !0,
            arrowScroll: 50,
            fixedBackground: !0,
            excluded: ""
        },
        x = S,
        E = !1,
        k = {
            x: 0,
            y: 0
        },
        D = !1,
        M = document.documentElement,
        L = [],
        T = /^Mac/.test(navigator.platform),
        B = {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36
        },
        H = {
            37: 1,
            38: 1,
            39: 1,
            40: 1
        },
        C = [],
        z = !1,
        O = Date.now(),
        X = (g = 0, function(e) {
            return e.uniqueID || (e.uniqueID = g++)
        }),
        Y = {},
        A = {},
        N = {};
    if (window.localStorage && localStorage.SS_deltaBuffer) try {
        L = localStorage.SS_deltaBuffer.split(",")
    } catch (g) {}
    var K = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
            window.setTimeout(e, o || 1e3 / 60)
        },
        P = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
        $ = function() {
            var e = document.scrollingElement;
            return function() {
                if (!e) {
                    var t = document.createElement("div");
                    t.style.cssText = "height:10000px;width:1px;", document.body.appendChild(t);
                    var o = document.body.scrollTop;
                    window.scrollBy(0, 3), e = document.body.scrollTop != o ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(t)
                }
                return e
            }
        }(),
        j = window.navigator.userAgent,
        R = /Edge/.test(j),
        q = /chrome/i.test(j) && !R;
    R = /safari/i.test(j) && !R;
    var V = /mobile/i.test(j),
        F = /Windows NT 6.1/i.test(j) && /rv:11/i.test(j),
        I = R && (/Version\/8/i.test(j) || /Version\/9/i.test(j));
    j = (q || R || F) && !V;
    var _ = !1;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, "passive", {
            get: function() {
                _ = !0
            }
        }))
    } catch (g) {}
    R = !!_ && {
        passive: !1
    };
    var W = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";
    W && j && (window.addEventListener(W, o, R || !1), window.addEventListener("mousedown", r, !1), window.addEventListener("load", e, !1)), h.destroy = function() {
        p && p.disconnect(), window.removeEventListener(W, o, !1), window.removeEventListener("mousedown", r, !1), window.removeEventListener("keydown", n, !1), window.removeEventListener("resize", v, !1), window.removeEventListener("load", e, !1)
    }, window.SmoothScrollOptions && h(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define((function() {
        return h
    })) : "object" == typeof exports ? module.exports = h : window.SmoothScroll = h
}();