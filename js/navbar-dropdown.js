var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, o, t) {
        e != Array.prototype && e != Object.prototype && (e[o] = t.value)
    }, $jscomp.getGlobal = function(e) {
        return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(e, o, t, n) {
        if (o) {
            for (t = $jscomp.global, e = e.split("."), n = 0; n < e.length - 1; n++) {
                var r = e[n];
                r in t || (t[r] = {}), t = t[r]
            }(o = o(n = t[e = e[e.length - 1]])) != n && null != o && $jscomp.defineProperty(t, e, {
                configurable: !0,
                writable: !0,
                value: o
            })
        }
    }, $jscomp.polyfill("Array.from", (function(e) {
        return e || function(e, o, t) {
            o = null != o ? o : function(e) {
                return e
            };
            var n = [],
                r = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator];
            if ("function" == typeof r) {
                e = r.call(e);
                for (var a = 0; !(r = e.next()).done;) n.push(o.call(t, r.value, a++))
            } else
                for (r = e.length, a = 0; a < r; a++) n.push(o.call(t, e[a], a));
            return n
        }
    }), "es6", "es3"),
    function() {
        var e;
        ["scroll", "resize"].forEach((function(o) {
            document.addEventListener(o, (function(o) {
                clearTimeout(e), e = setTimeout((function() {
                    ! function(e) {
                        "resize" === e.type && (document.body.classList.remove("navbar-dropdown-open"), document.querySelector(".navbar-dropdown").querySelector(".navbar-collapse").classList.remove("show"), document.querySelector(".navbar-dropdown").classList.remove("opened"), Array.from(document.querySelector(".navbar-dropdown").querySelectorAll('.navbar-toggler[aria-expanded="true"]')).forEach((function(e) {
                            var o = e.querySelector(e.getAttribute("data-target"));
                            o && (o.classList.remove("in"), o.setAttribute("aria-expanded", "false"), e.setAttribute("aria-expanded", "false"))
                        })));
                        var o = document.documentElement.scrollTop;
                        Array.from(document.querySelectorAll(".navbar-dropdown")).forEach((function(e) {
                            e.matches(".navbar-fixed-top") && (e.matches(".transparent") && !e.classList.contains("opened") && (0 < o ? e.classList.remove("bg-color") : e.classList.add("bg-color")), 0 < o ? e.classList.add("navbar-short") : e.classList.remove("navbar-short"))
                        }))
                    }(o)
                }), 10)
            }))
        })), ["show.bs.collapse", "hide.bs.collapse"].forEach((function(e) {
            document.addEventListener(e, (function(o) {
                (o = o.target.closest(".navbar-dropdown")) && ("show.bs.collapse" === e ? (document.body.classList.add("navbar-dropdown-open"), o.classList.add("opened")) : (document.body.classList.remove("navbar-dropdown-open"), o.classList.remove("opened"), window.dispatchEvent(new Event("scroll.bs.navbar-dropdown.data-api")), o.dispatchEvent(new Event("collapse.bs.navbar-dropdown"))))
            }))
        })), document.addEventListener("collapse.bs.nav-dropdown", (function(e) {
            (e = e.relatedTarget.closest(".navbar-dropdown")) && (e = e.querySelector('.navbar-toggler[aria-expanded="true"]')) && e.dispatchEvent(new Event("click"))
        })), document.querySelectorAll(".nav-link.dropdown-toggle").forEach((function(e) {
            e.addEventListener("click", (function(e) {
                e.preventDefault(), e.target.parentNode.classList.toggle("open")
            }))
        }))
    }();