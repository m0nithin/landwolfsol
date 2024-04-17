var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, n) {
        e != Array.prototype && e != Object.prototype && (e[t] = n.value)
    }, $jscomp.getGlobal = function(e) {
        return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
    }, $jscomp.global = $jscomp.getGlobal(this), $jscomp.polyfill = function(e, t, n, r) {
        if (t) {
            for (n = $jscomp.global, e = e.split("."), r = 0; r < e.length - 1; r++) {
                var o = e[r];
                o in n || (n[o] = {}), n = n[o]
            }(t = t(r = n[e = e[e.length - 1]])) != r && null != t && $jscomp.defineProperty(n, e, {
                configurable: !0,
                writable: !0,
                value: t
            })
        }
    }, $jscomp.polyfill("Array.from", (function(e) {
        return e || function(e, t, n) {
            t = null != t ? t : function(e) {
                return e
            };
            var r = [],
                o = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator];
            if ("function" == typeof o) {
                e = o.call(e);
                for (var i = 0; !(o = e.next()).done;) r.push(t.call(n, o.value, i++))
            } else
                for (o = e.length, i = 0; i < o; i++) r.push(t.call(n, e[i], i));
            return r
        }
    }), "es6", "es3"), $jscomp.owns = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, $jscomp.polyfill("Object.values", (function(e) {
        return e || function(e) {
            var t, n = [];
            for (t in e) $jscomp.owns(e, t) && n.push(e[t]);
            return n
        }
    }), "es8", "es3"), $jscomp.findInternal = function(e, t, n) {
        e instanceof String && (e = String(e));
        for (var r = e.length, o = 0; o < r; o++) {
            var i = e[o];
            if (t.call(n, i, o, e)) return {
                i: o,
                v: i
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }, $jscomp.polyfill("Array.prototype.find", (function(e) {
        return e || function(e, t) {
            return $jscomp.findInternal(this, e, t).v
        }
    }), "es6", "es3"), $jscomp.checkStringArgs = function(e, t, n) {
        if (null == e) throw new TypeError("The 'this' value for String.prototype." + n + " must not be null or undefined");
        if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + n + " must not be a regular expression");
        return e + ""
    }, $jscomp.polyfill("String.prototype.startsWith", (function(e) {
        return e || function(e, t) {
            var n = $jscomp.checkStringArgs(this, e, "startsWith");
            e += "";
            var r = n.length,
                o = e.length;
            t = Math.max(0, Math.min(0 | t, n.length));
            for (var i = 0; i < o && t < r;)
                if (n[t++] != e[i++]) return !1;
            return i >= o
        }
    }), "es6", "es3"), $jscomp.polyfill("Object.is", (function(e) {
        return e || function(e, t) {
            return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
        }
    }), "es6", "es3"), $jscomp.polyfill("Array.prototype.includes", (function(e) {
        return e || function(e, t) {
            var n = this;
            n instanceof String && (n = String(n));
            var r = n.length;
            for (0 > (t = t || 0) && (t = Math.max(t + r, 0)); t < r; t++) {
                var o = n[t];
                if (o === e || Object.is(o, e)) return !0
            }
            return !1
        }
    }), "es7", "es3"), $jscomp.polyfill("String.prototype.includes", (function(e) {
        return e || function(e, t) {
            return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, t || 0)
        }
    }), "es6", "es3"),
    function() {
        function e(e, t) {
            var n = Array.from(e.querySelectorAll(t));
            return e.matches && e.matches(t) && n.splice(0, 0, e), n
        }

        function t(e) {
            return {
                top: (e = e.getBoundingClientRect()).top + document.body.scrollTop,
                left: e.left + document.body.scrollLeft
            }
        }

        function n(e) {
            return parseFloat(getComputedStyle(e, null).height.replace("px", ""))
        }

        function r(e) {
            return parseFloat(getComputedStyle(e, null).width.replace("px", ""))
        }

        function o(e) {
            "loading" != document.readyState ? e() : document.addEventListener("DOMContentLoaded", e)
        }

        function i(e) {
            var t = [],
                n = {
                    blackberry: "BlackBerry",
                    android: "Android",
                    windows: "IEMobile",
                    opera: "Opera Mini",
                    ios: "iPhone|iPad|iPod"
                };
            return "*" === (e = void 0 === e ? "*" : e.toLowerCase()) ? t = Object.values(n) : e in n && t.push(n[e]), (e = !(!t.find((function(e) {
                return "iPhone|iPad|iPod" === e
            })) || !(navigator.userAgent.match(/(iPad)/) || "MacIntel" === navigator.platform && void 0 !== navigator.standalone))) ? e : !(!t.length || !navigator.userAgent.match(new RegExp(t.join("|"), "i")))
        }

        function a(e) {
            var t = e.querySelector(".carousel-item");
            e = e.querySelector(".carousel-indicators > li"), t.classList.add("active"), e && e.classList.add("active")
        }

        function l(e) {
            var t = e.getAttribute("id") + "-carousel",
                n = e.getAttribute("data-bs-version") && e.getAttribute("data-bs-version").startsWith("5");
            null === e.getAttribute("id") && (t = e.classList.value.match(/cid-.*?(?=\s|$)/) + "-carousel"), e.querySelectorAll(".carousel").forEach((function(e) {
                e.setAttribute("id", t)
            })), e.querySelector(".carousel-controls") && e.querySelectorAll(".carousel-controls").forEach((function(e) {
                e.querySelectorAll("a").forEach((function(e) {
                    e.setAttribute("href", "#" + t), n ? e.setAttribute("data-bs-target", "#" + t) : e.setAttribute("data-target", "#" + t)
                }))
            })), e.querySelectorAll(".carousel-indicators > li").forEach((function(e) {
                n ? e.setAttribute("data-bs-target", "#" + t) : e.setAttribute("data-target", "#" + t)
            })), a(e)
        }

        function c(e, t, n) {
            var r = e.closest(".card"),
                o = r.parentElement.classList;
            r.getAttribute("style") || r.setAttribute("style", "-webkit-flex-basis: auto; flex-basis: auto;"), o.contains("row") && (o.remove("row"), o.add("media-container-row")), e.querySelectorAll(".svg-gradient > *").forEach((function(e) {
                e.setAttribute("id", t)
            })), r = e.cloneNode(!0), Array.from(e.children).forEach((function(e) {
                if ("SVG" !== e.tagName) return e.remove()
            })), e.setAttribute("data-pie", "{ " + function(e) {
                var t = "",
                    n = e.querySelector("svg linearGradient");
                if (n) {
                    t = [], n = Array.from(n.children);
                    for (var r = 0; r < n.length; r++) t.push('"' + n[r].getAttribute("stop-color") + '"');
                    t = '"lineargradient": [' + t + "],", Array.from(e.querySelectorAll("svg")).some((function(e) {
                        return e.classList.contains("svg-gradient")
                    })) || e.querySelectorAll("svg").forEach((function(e) {
                        e.classList.add("svg-gradient")
                    }))
                }
                return t
            }(e.closest("section")) + ' "percent": ' + n + ', "size": 150, "colorCircle": "#f1f1f1", "stroke": 5, "colorSlice": "url(#' + t + ')", "fontSize": "1.3rem", "number": false }'), Array.from(r.children).forEach((function(t) {
                switch (!0) {
                    case t.matches("p"):
                        t.innerText = n + "%", e.appendChild(t);
                        break;
                    case t.matches("svg"):
                        break;
                    default:
                        e.appendChild(t)
                }
            }))
        }

        function s(e) {
            var t = e.closest("section").getAttribute("id") + "-svg-gradient",
                n = +e.getAttribute("data-goal");
            c(e, t, n)
        }
        var d, u, m, f = "function" == typeof jQuery;
        f && (d = jQuery), u = d ? d("html").hasClass("is-builder") : document.querySelector("html").classList.contains("is-builder"), Element.prototype.parents = function(e) {
            for (var t = [], n = this, r = void 0 !== e; null !== (n = n.parentElement);) n.nodeType === Node.ELEMENT_NODE && (r && !n.matches(e) || t.push(n));
            return t
        }, Element.prototype.footerReveal = function() {
            function e() {
                !r && t.offsetHeight <= window.outerHeight ? (t.style.zIndex = "-999", t.style.position = "fixed", t.style.bottom = "0", t.style.width = n.offsetWidth + "px", n.style.marginBottom = t.offsetHeight + "px") : (t.style.zIndex = "", t.style.position = "", t.style.bottom = "", t.style.width = "", n.style.marginBottom = "")
            }
            var t = this,
                n = t.previousElementSibling,
                r = !!document.documentMode;
            return e(), window.addEventListener("resize", (function() {
                e()
            })), window.addEventListener("load", (function() {
                e()
            })), t
        }, m = "smartresize", window[m] = function(e) {
            var t = new CustomEvent(m);
            return e ? this.addEventListener("resize", function(e, t, n) {
                var r;
                return function() {
                    var o = this,
                        i = arguments;
                    r ? clearTimeout(r) : n && e.apply(o, i), r = setTimeout((function() {
                        n || e.apply(o, i), r = null
                    }), t || 100)
                }
            }(e)) : this.dispatchEvent(t)
        };
        var p = function() {
            var e = document.createElement("div"),
                t = document.querySelector("body");
            e.setAttribute("style", "height: 50vh; position: absolute; top: -1000px; left: -1000px;"), t.appendChild(e);
            var n = parseInt(window.innerHeight / 2, 10),
                r = parseInt((window.getComputedStyle ? getComputedStyle(e, null) : e.currentStyle).height, 10);
            return t.removeChild(e), r == n
        }();
        if (o((function() {
                function o(e) {
                    e.style.height = 9 * r(e.parentNode) / 16 + "px"
                }

                function a(t) {
                    setTimeout((function() {
                        e(t, ".mbr-parallax-background").forEach((function(e) {
                            jarallax && (jarallax(e, {
                                speed: .6
                            }), e.style.position = "relative")
                        }))
                    }), 0)
                }

                function l(t) {
                    e(t, "[data-bg-video]").forEach((function(e) {
                        var t = e.getAttribute("data-bg-video");
                        if (t) {
                            var n = t.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/),
                                r = e.querySelector(".mbr-background-video-preview") || document.createElement("div");
                            if (r.classList.add("mbr-background-video-preview"), r.style.display = "none", r.style.backgroundSize = "cover", r.style.backgroundPosition = "center", e.querySelector(".mbr-background-video-preview") || e.childNodes[0].before(r), n && (/youtu\.?be/g.test(n[3]) || /vimeo/g.test(n[3]))) {
                                if (n && /youtu\.?be/g.test(n[3])) {
                                    t = "http" + ("https:" === location.protocol ? "s" : "") + ":", t += "//img.youtube.com/vi/" + n[6] + "/maxresdefault.jpg";
                                    var o = new Image;
                                    o.onload = function() {
                                        if (120 === (o.naturalWidth || o.width)) {
                                            var t = o.src.split("/").pop();
                                            switch (t) {
                                                case "maxresdefault.jpg":
                                                    o.src = o.src.replace(t, "sddefault.jpg");
                                                    break;
                                                case "sddefault.jpg":
                                                    o.src = o.src.replace(t, "hqdefault.jpg");
                                                    break;
                                                default:
                                                    u && (r.style.backgroundImage = 'url("images/no-video.jpg")', r.style.display = "block")
                                            }
                                        } else r.style.backgroundImage = 'url("' + o.src + '")', r.style.display = "block";
                                        e.querySelector(".mbr-background-video") && e.querySelector(".mbr-background-video").remove(), e.querySelector(".mbr-background-video-wrapper") && e.querySelector(".mbr-background-video-wrapper").remove(), t = document.createElement("div");
                                        var i = document.createElement("div");
                                        i.classList.add("mbr-background-video-wrapper"), i.appendChild(t), t.classList.add("mbr-background-video"), e.childNodes[1].before(i);
                                        var a = o.naturalHeight,
                                            l = o.naturalWidth,
                                            c = o.naturalHeight / o.naturalWidth,
                                            s = t.parentNode.clientHeight,
                                            m = t.parentNode.clientWidth;
                                        (a = a < s ? a : s) / (l = l > m ? l : m) != c && (a = l * c);
                                        var p = new YouTubePlayer(t, {
                                            modestBranding: !0,
                                            autoplay: !0,
                                            controls: !1,
                                            origin: "*",
                                            iv_load_policy: !1,
                                            mute: !0,
                                            keyboard: !1,
                                            captions: !1,
                                            annotations: !1,
                                            related: !1
                                        });
                                        i.style.overflow = "hidden", i.style.position = "absolute", i.style.minWidth = "100%", i.style.minHeight = "100%", i.style.top = "0", i.style.left = "0", i.style.transitionProperty = "opacity", i.style.transitionDuration = "1000ms", t.style.marginTop = "0", t.style.maxWidth = "initial", t.style.transitionProperty = "opacity", t.style.transitionDuration = "1000ms", t.style.pointerEvents = "none", t.style.position = "absolute", t.style.top = "0", t.style.left = "0", t.style.display = "none", t.style.transform = "scale(1.2)", p.load(n[6], !0), p.mute(), p.on("playing", (function() {
                                            p.replayFrom(1), 0 < p.getProgress() && (p._player.i.style.display = "block")
                                        })), u && f && (d(document).on("delete.cards", (function(e) {
                                            p.stopResize(), p.stopReplay(e.target.querySelector(".mbr-background-video-wrapper"))
                                        })), d(document).on("changeParameter.cards", (function(e, t, n, r) {
                                            if (e = e.target.querySelector(".mbr-background-video-wrapper"), "bg" === t) switch (r) {
                                                case "type":
                                                    "video" !== n.type && p.stopReplay(e);
                                                    break;
                                                case "value":
                                                    "video" === n.type && p.stopReplay(e)
                                            }
                                        })))
                                    }, o.setAttribute("src", t)
                                } else if (n && /vimeo/g.test(n[3])) {
                                    var i = new XMLHttpRequest;
                                    i.open("GET", "https://vimeo.com/api/v2/video/" + n[6] + ".json", !0), i.onreadystatechange = function() {
                                        if (4 === this.readyState)
                                            if (200 <= this.status && 400 > this.status) {
                                                var e = JSON.parse(this.responseText);
                                                r.style.backgroundImage = 'url("' + e[0].thumbnail_large + '")', r.style.display = "block"
                                            } else u && (r.style.backgroundImage = 'url("images/no-video.jpg")', r.style.display = "block")
                                    }, i.send(), i = null, e.querySelector(".mbr-background-video") && e.querySelector(".mbr-background-video").remove(), (i = document.createElement("div")).classList.add("mbr-background-video"), e.childNodes[1].before(i), (i = (t = new Vimeo.Player(i, {
                                        id: t,
                                        loop: !0,
                                        background: !0,
                                        responsive: !0,
                                        autoplay: !0,
                                        byline: !1,
                                        title: !1,
                                        muted: !0,
                                        controls: !1
                                    })).element.parentNode).style.overflow = "hidden", t.element.style.pointerEvents = "none", t.element.style.marginLeft = "-" + (t.element.scrollWidth - i.scrollWidth) / 2 + "px", t.element.style.minHeight = "100vh", t.element.style.minWidth = "177.77vh"
                                }
                            } else u && (r.style.backgroundImage = 'url("images/video-placeholder.jpg")', r.style.display = "block")
                        }
                    }))
                }
                if (document.querySelector("html").classList.add(i() ? "mobile" : "desktop"), window.addEventListener("scroll", (function() {
                        document.querySelectorAll(".mbr-navbar--sticky").forEach((function(e) {
                            var t = 10 < window.scrollTop ? "add" : "remove";
                            e.classList[t]("mbr-navbar--stuck"), e.classList.contains(".mbr-navbar--open") || e.classList[t]("mbr-navbar--short")
                        }))
                    })), i() && navigator.userAgent.match(/Chrome/i) ? function(e, t) {
                        var n = [e, e];
                        n[t > e ? 0 : 1] = t, window.smartresize((function() {
                            var e = window.innerHeight;
                            0 > n.indexOf(e) && (e = n[window.innerWidth > e ? 1 : 0]), document.querySelector(".mbr-section--full-height").style.height = e + "px"
                        }))
                    }(window.innerWidth, window.innerHeight) : p || (window.smartresize((function() {
                        document.querySelector(".mbr-section--full-height").style.height = window.innerHeight + "px"
                    })), d(document).on("add.cards", (function(t) {
                        document.querySelector("html").classList.contains("mbr-site-loaded") && e(t.target, ".mbr-section--full-height").length && window.dispatchEvent(new CustomEvent("resize"))
                    }))), window.addEventListener("smartresize", (function() {
                        document.querySelectorAll(".mbr-section--16by9").forEach(o)
                    })), f && d(document).on("add.cards changeParameter.cards", (function(t) {
                        var n = e(t.target, ".mbr-section--16by9");
                        n.length ? n.forEach((function(e) {
                            e.setAttribute("data-16by9", "true"), o(e)
                        })) : e(t.target, "[data-16by9]").forEach((function(e) {
                            e.styles.height = "", e.removeAttribute("data-16by9")
                        }))
                    })), "undefined" != typeof jarallax && !i()) {
                    if (window.addEventListener("update.parallax", (function(e) {
                            setTimeout((function() {
                                if (e) {
                                    var e = document.querySelector(".mbr-parallax-background");
                                    e.jarallax("coverImage"), e.jarallax("clipContainer"), e.jarallax("onScroll")
                                }
                            }), 0)
                        })), u) {
                        if (!f) return;
                        d(document).on("add.cards", (function(e) {
                            a(e.target), d(window).trigger("update.parallax")
                        })), d(document).on("changeParameter.cards", (function(e, t, n, r) {
                            if ("bg" === t) switch (t = e.target, jarallax && jarallax(t, "destroy"), t.style.position = "", d(e.target).find(".mbr-background-video-preview").remove(), d(e.target).find(".mbr-background-video").remove(), d(e.target).find(".mbr-background-video-wrapper").remove(), d(e.target).find(".mbr-fallback-image").remove(), r) {
                                case "type":
                                    !0 === n.parallax && a(e.target);
                                    break;
                                case "value":
                                    "image" === n.type && !0 === n.parallax && a(e.target);
                                    break;
                                case "parallax":
                                    !0 === n.parallax && a(e.target)
                            }
                            d(window).trigger("update.parallax")
                        }))
                    } else a(document.body);
                    window.addEventListener("shown.bs.tab", (function() {
                        window.dispatchEvent(new CustomEvent("update.parallax"))
                    }))
                }
                var c, s, m = 0,
                    y = null,
                    g = !i();
                if (window.addEventListener("scroll", (function() {
                        s && clearTimeout(s);
                        var e = document.documentElement.scrollTop,
                            t = e <= m || g;
                        if (m = e, y) {
                            var n = e > y.breakPoint;
                            t ? n != y.fixed && (g ? (y.fixed = n, y.elm.classList.toggle("is-fixed")) : s = setTimeout((function() {
                                y.fixed = n, y.elm.classList.toggle("is-fixed")
                            }), 40)) : (y.fixed = !1, y.elm.classList.remove("is-fixed"))
                        }
                    })), f && d(document).on("add.cards delete.cards", (function(e) {
                        c && clearTimeout(c), c = setTimeout((function() {
                            y && (y.fixed = !1, y.elm.classList.remove("is-fixed"));
                            var e = document.querySelector(".mbr-fixed-top");
                            e && (y = {
                                breakPoint: t(e).top + 3 * n(e),
                                fixed: !1,
                                elm: e
                            }, e.dispatchEvent(new CustomEvent("scroll")))
                        }), 650)
                    })), window.smartresize((function() {
                        document.querySelectorAll(".mbr-embedded-video").forEach((function(e) {
                            e.style.height = (r(e) * parseInt(e.getAttribute("height") || 315) / parseInt(e.getAttribute("width") || 560)).toFixed() + "px"
                        }))
                    })), f && d(document).on("add.cards", (function(t) {
                        document.querySelector("html").classList.contains("mbr-site-loaded") && e(t.target, "iframe").length && window.dispatchEvent(new CustomEvent("resize"))
                    })), u) {
                    if (!f) return;
                    d(document).on("add.cards drag.cards", (function(e) {
                        l(e.target)
                    }))
                } else l(document.body);
                u && d(document).on("changeParameter.cards", (function(e, t, n, r) {
                    if ("bg" === t) switch (r) {
                        case "type":
                            "video" === n.type && l(e.target);
                            break;
                        case "value":
                            "video" === n.type && l(e.target)
                    }
                })), document.querySelector("html").classList.add("mbr-site-loaded"), window.dispatchEvent(new CustomEvent("resize")), window.dispatchEvent(new CustomEvent("scroll")), u || document.addEventListener("click", (function(e) {
                    try {
                        var t = e.target;
                        if (!t.parents().some((function(e) {
                                return e.classList.contains("carousel")
                            })))
                            do {
                                if (t.hash) {
                                    var r = /#bottom|#top/g.test(t.hash);
                                    document.querySelectorAll(r ? "body" : t.hash).forEach((function(r) {
                                        e.preventDefault(), t.parents().some((function(e) {
                                            return e.classList.contains("navbar-fixed-top")
                                        }));
                                        var o = "#bottom" == t.hash && n(r) - window.innerHeight;
                                        r.classList.contains("panel-collapse") || r.classList.contains("tab-pane") || (o ? window.scrollTo({
                                            top: o,
                                            left: 0,
                                            behavior: "smooth"
                                        }) : r.scrollIntoView())
                                    }));
                                    break
                                }
                            } while (t = t.parentNode)
                    } catch (e) {}
                })), document.querySelectorAll(".cols-same-height .mbr-figure").forEach((function(e) {
                    function t() {
                        if (o.style.width = "", o.style.maxWidth = "", o.style.marginLeft = "", l && a) {
                            var t = l / a;
                            e.style.position = "absolute", e.style.top = "0", e.style.left = "0", e.style.right = "0", e.style.bottom = "0";
                            var c = n(i) / r(i);
                            c > t && (t = 100 * (c - t) / t, o.style.width = t + 100 + "%", o.style.maxWidth = t + 100 + "%", o.style.marginLeft = -t / 2 + "%")
                        }
                    }
                    var o = e.querySelector("img"),
                        i = e.parentNode,
                        a = o.width,
                        l = o.height;
                    o.addEventListener("load", (function() {
                        a = o.width, l = o.height, t()
                    }), {
                        once: !0
                    }), window.addEventListener("resize", t), t()
                }))
            })), u || (f && d.fn.socialLikes && d(document).on("add.cards", (function(t) {
                e(t.target, ".mbr-social-likes").forEach((function(e) {
                    e.addEventListener("counter.social-likes", (function(e, t, n) {
                        999 < n && e.target.querySelectorAll(".social-likes__counter").forEach((function(e) {
                            e.innerHTML = Math.floor(n / 1e3) + "k"
                        }))
                    })), e.socialLikes({
                        initHtml: !1
                    })
                }))
            })), Array.from(document.body.children).filter((function(e) {
                return !e.matches("style, script")
            })).forEach((function(e) {
                e.classList.contains("mbr-reveal") && e.addEventListener("add.cards", (function() {
                    e.footerReveal()
                }))
            })), o((function() {
                if (i()) {
                    var e = this.querySelectorAll("section[data-bg-video]");
                    [].forEach.call(e, (function(e) {
                        (e = e.querySelector(".mbr-fallback-image")) && e.classList.remove("disabled")
                    }))
                } else if (document.querySelectorAll("input[name=animation]").length) {
                    e = function() {
                        var e = document.documentElement.scrollTop || document.body.scrollTop,
                            o = e + window.innerHeight - 100;
                        r.forEach((function(r) {
                            var i = r.offsetHeight,
                                a = n(r);
                            (a + i >= e && a - 50 <= o || t(r)) && r.classList.contains("hidden") && (r.classList.remove("hidden"), r.classList.add("animate__fadeInUp"), r.classList.add("animate__delay-1s"), r.addEventListener("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", (function() {
                                r.classList.remove("animate__animated animate__delay-1s animate__fadeInUp")
                            }), {
                                once: !0
                            }))
                        }))
                    };
                    var t = function(e) {
                            if (e.parents(".carousel-item").some((function(e) {
                                    return "none" !== getComputedStyle(e, null).display
                                }))) return !1;
                            var t = e.parents(".carousel-item").parentNode;
                            if (!t || t.querySelectorAll(".carousel-item.active .hidden.animate__animated").length) return !1;
                            if (1 < t.getAttribute("data-visible")) {
                                var n = t.getAttribute("data-visible");
                                return !(!e.parents().some((function(e) {
                                    return e.matches(".cloneditem-" + (n - 1))
                                })) || !e.parents(".cloneditem-" + (n - 1)).some((function(e) {
                                    return e.getAttribute("data-cloned-index") >= n
                                }))) || (e.classList.remove("animate__animated animate__delay-1s hidden"), !1)
                            }
                            return !0
                        },
                        n = function(e) {
                            var t = 0;
                            do {
                                t += e.offsetTop || 0, e = e.offsetParent
                            } while (e);
                            return t
                        };
                    document.querySelectorAll("input[name=animation]").forEach((function(e) {
                        e.remove()
                    }));
                    var r = Array.from(document.querySelectorAll("p, h1, h2, h3, h4, h5, a, button, small, img, li, blockquote, .mbr-author-name, em, label, input, select, textarea, .input-group, .form-control, .iconbox, .btn-social, .mbr-figure, .mbr-map, .mbr-testimonial .card-block, .mbr-price-value, .mbr-price-figure, .dataTable, .dataTables_info"));
                    (r = (r = r.filter((function(e) {
                        if (!e.parents().filter((function(e) {
                                if (e.matches("a, p, .navbar, .mbr-arrow, footer, .iconbox, .mbr-slider, .mbr-gallery, .mbr-testimonial .card-block, #cookiesdirective, .mbr-wowslider, .accordion, .tab-content, .engine, #scrollToTop")) return !0
                            })).length) return !0
                    }))).filter((function(e) {
                        if (!e.parents().filter((function(t) {
                                return t.matches("form") && !e.matches("li")
                            })).length) return !0
                    }))).forEach((function(e) {
                        e.classList.add("hidden"), e.classList.add("animate__animated"), e.classList.add("animate__delay-1s")
                    })), window.addEventListener("scroll", e), window.addEventListener("resize", e), window.dispatchEvent(new CustomEvent("scroll"))
                }
            }))), o((function() {
                if (document.querySelectorAll(".mbr-arrow-up").length) {
                    var e = document.querySelector("#scrollToTop");
                    e.style.display = "none", window.addEventListener("scroll", (function() {
                        window.scrollY > window.innerHeight ? function(e) {
                            e.style.display = "block",
                                function t() {
                                    var n = parseFloat(e.style.opacity);
                                    1 < (n += .1) || (e.style.opacity = n, requestAnimationFrame(t))
                                }()
                        }(e) : function(e) {
                            ! function t() {
                                0 > (e.style.opacity -= .1) ? e.style.display = "none" : requestAnimationFrame(t)
                            }()
                        }(e)
                    })), e.addEventListener("click", (function() {
                        return window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth"
                        }), !1
                    }))
                }
            })), !u) {
            var y = document.querySelector(".mbr-arrow");
            y && y.addEventListener("click", (function(e) {
                (e = e.target.closest("section").nextElementSibling).classList.contains("engine") && (e = e.closest("section").nextElementSibling), window.scrollTo(0, t(e).top)
            }))
        }
        if (document.querySelectorAll("nav.navbar").length && (y = n(document.querySelector("nav.navbar")), document.querySelector(".mbr-after-navbar.mbr-fullscreen") && (document.querySelector(".mbr-after-navbar.mbr-fullscreen").style.paddingTop = y + "px")), !u && (0 < window.navigator.userAgent.indexOf("MSIE ") || navigator.userAgent.match(/Trident.*rv:11\./)) && d(document).on("add.cards", (function(e) {
                var t = e.target;
                t.classList.contains("mbr-fullscreen") && (e = function() {
                    t.style.height = "auto", t.offsetHeight <= window.innerHeight && (t.style.height = "1px")
                }, window.addEventListener("load", e), window.addEventListener("resize", e)), (t.classList.contains("mbr-slider") || t.classList.contains("mbr-gallery")) && (t.querySelectorAll(".carousel-indicators").forEach((function(e) {
                    e.classList.add("ie-fix"), e.querySelectorAll("li").forEach((function(e) {
                        e.style.display = "inline-block", e.style.width = "30px"
                    }))
                })), t.classList.contains("mbr-slider") && t.querySelectorAll(".full-screen .slider-fullscreen-image").forEach((function(e) {
                    e.style.height = "1px"
                })))
            })), o((function() {
                if (!u) {
                    var e = function(e) {
                            t(e.target)
                        },
                        t = function(t) {
                            var n = t.parents("section")[0].querySelector("iframe"),
                                r = n.getAttribute("src");
                            if (t.parents("section").forEach((function(e) {
                                    e.style.zIndex = "5000"
                                })), -1 !== r.indexOf("youtu") && n.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*"), -1 !== r.indexOf("vimeo")) {
                                var o = new Vimeo.Player(n);
                                o.play()
                            }
                            var i = t.parents("section")[0],
                                a = i.querySelector(i.querySelector("[data-modal]").getAttribute("data-modal"));
                            a.style.display = "table", a.addEventListener("click", (function() {
                                -1 !== r.indexOf("youtu") && n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*"), -1 !== r.indexOf("vimeo") && o.pause(), a.style.display = "none", a.removeEventListener("click", e), i.style.zIndex = "0"
                            }))
                        };
                    document.querySelectorAll(".modalWindow-video > iframe").forEach((function(e) {
                        var t = e.getAttribute("data-src");
                        e.removeAttribute("data-src");
                        var n = t.match(/(http:\/\/|https:\/\/|)?(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/); - 1 !== t.indexOf("youtu") ? e.setAttribute("src", "https://youtube.com/embed/" + n[6] + "?rel=0&enablejsapi=1") : -1 !== t.indexOf("vimeo") && e.setAttribute("src", "https://player.vimeo.com/video/" + n[6] + "?autoplay=0&loop=0")
                    })), document.querySelector("[data-modal]") && document.querySelector("[data-modal]").addEventListener("click", e)
                }
            })), !u) {
            y = document.querySelectorAll(".dropdown-toggle.show");
            var g = document.querySelectorAll(".dropdown-menu.show, .dropdown.open"),
                h = document.querySelectorAll(".dropdown.open");
            y.forEach((function(e) {
                e.classList.remove("show"), e.ariaExpanded = "false"
            })), g.forEach((function(e) {
                return e.classList.remove("show")
            })), h.forEach((function(e) {
                return e.classList.remove("open")
            })), !i() && (y = document.querySelector("section.menu")) && (g = window.innerWidth, !y.querySelector(".navbar").classList.contains("collapsed") && 991 < g && (y.querySelectorAll("ul.navbar-nav li.dropdown").forEach((function(e) {
                e.addEventListener("mouseenter", (function() {
                    e.classList.contains("open") || e.querySelector("a").dispatchEvent(new Event("click", {
                        cancelable: !0
                    }))
                })), e.addEventListener("mouseleave", (function() {
                    e.classList.contains("open") && e.querySelector("a").dispatchEvent(new Event("click", {
                        cancelable: !0
                    }))
                }))
            })), y.querySelectorAll("ul.navbar-nav li.dropdown .dropdown-menu .dropdown").forEach((function(e) {
                e.addEventListener("mouseover", (function() {
                    e.classList.contains("open") || (e.querySelector("a").dispatchEvent(new Event("click", {
                        cancelable: !0
                    })), e.classList.add("open"))
                })), e.addEventListener("mouseout", (function() {
                    e.classList.contains("open") && (e.querySelector("a").dispatchEvent(new Event("click", {
                        cancelable: !0
                    })), e.classList.remove("open"))
                }))
            }))))
        }
        if (u || (void 0 === window.initClientPlugin && 0 != document.body.querySelectorAll(".clients").length && (window.initClientPlugin = !0, document.body.querySelectorAll(".clients").forEach((function(e) {
                e.getAttribute("data-isinit") || (l(e), function(e) {
                    var t = e.querySelectorAll(".carousel-item").length,
                        n = e.querySelector(".carousel-inner").getAttribute("data-visible");
                    t < n && (n = t), e.querySelectorAll(".carousel-inner").forEach((function(e) {
                        e.setAttribute("class", "carousel-inner slides" + n)
                    })), e.querySelectorAll(".clonedCol").forEach((function(e) {
                        e.remove()
                    })), e.querySelectorAll(".carousel-item .col-md-12").forEach((function(e) {
                        2 > n ? e.setAttribute("class", "col-md-12") : "5" == n ? e.setAttribute("class", "col-md-12 col-lg-15") : e.setAttribute("class", "col-md-12 col-lg-" + 12 / n)
                    })), e.querySelectorAll(".carousel-item .row").forEach((function(e) {
                        e.setAttribute("style", "-webkit-flex-grow: 1; flex-grow: 1; margin: 0;")
                    })), e.querySelectorAll(".carousel-item").forEach((function(e) {
                        for (var t = e, r = 1; r < n; r++) {
                            var o;
                            if ((t = t.nextElementSibling) || (t = e.parentNode.children[0] === e ? e.nextElementSibling : e.parentNode.children[0]), o = t) {
                                var i = 0;
                                do {
                                    i++
                                } while (o = o.previousElementSibling);
                                o = i
                            } else o = -1;
                            (i = t.querySelector(".col-md-12").cloneNode(!0)).classList.add("cloneditem-" + r), i.classList.add("clonedCol"), i.setAttribute("data-cloned-index", o), e.children[0].appendChild(i)
                        }
                    }))
                }(e))
            }))), void 0 === window.initPopupBtnPlugin && 0 != document.body.querySelectorAll("section.popup-btn-cards").length && (window.initPopupBtnPlugin = !0, document.querySelectorAll("section.popup-btn-cards .card-wrapper").forEach((function(e) {
                e.classList.add("popup-btn")
            }))), void 0 === window.initTestimonialsPlugin && 0 != document.body.querySelectorAll(".testimonials-slider").length && (window.initTestimonialsPlugin = !0, document.querySelectorAll(".testimonials-slider").forEach((function(e) {
                l(e)
            }))), void 0 === window.initSwitchArrowPlugin && (window.initSwitchArrowPlugin = !0, o((function() {
                0 != document.querySelectorAll(".accordionStyles").length && document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach((function(e) {
                    e.classList.contains("collapsed") || e.classList.add("collapsed")
                }))
            })), document.querySelectorAll('.accordionStyles > .card > .card-header > a[role="button"]').forEach((function(e) {
                e.addEventListener("click", (function() {
                    var t = e.closest(".accordionStyles").getAttribute("id"),
                        n = e.closest(".card").querySelector(".panel-collapse"),
                        r = e.querySelector("span.sign") ? e.querySelector("span.sign") : e.querySelector("span.mbr-iconfont");
                    !n.classList.contains("collapsing") || -1 == t.indexOf("toggle") && -1 == t.indexOf("accordion") || (e.classList.contains("collapsed") ? (r.classList.remove("mbri-arrow-up"), r.classList.add("mbri-arrow-down")) : (r.classList.remove("mbri-arrow-down"), r.classList.add("mbri-arrow-up")), -1 != t.indexOf("accordion") && (t = e.closest(".accordionStyles"), Array.from(t.children).filter((function(e) {
                        return e.querySelector("span.sign") !== r
                    })).forEach((function(e) {
                        (e = e.querySelector("span.sign") ? e.querySelector("span.sign") : e.querySelector("span.mbr-iconfont")).classList.remove("mbri-arrow-up"), e.classList.add("mbri-arrow-down")
                    }))))
                }))
            }))), 0 != document.querySelectorAll(".mbr-slider.carousel").length && document.querySelectorAll(".mbr-slider.carousel").forEach((function(e) {
                var t = e.querySelectorAll(".carousel-control"),
                    n = e.querySelectorAll(".carousel-indicators li"),
                    r = function(e) {
                        e.stopPropagation(), e.preventDefault()
                    };
                e.addEventListener("slide.bs.carousel", (function() {
                    t.forEach((function(e) {
                        e.addEventListener("click", r)
                    })), n.forEach((function(e) {
                        e.addEventListener("click", r)
                    })), f && d(e).carousel({
                        keyboard: !1
                    })
                })), e.addEventListener("slid.bs.carousel", (function() {
                    t.forEach((function(e) {
                        e.removeEventListener("click", r)
                    })), n.forEach((function(e) {
                        e.removeEventListener("click", r)
                    })), f && d(e).carousel({
                        keyboard: !0
                    }), 1 < e.querySelectorAll(".carousel-item.active").length && (e.querySelectorAll(".carousel-item.active")[1].classList.remove("active"), e.querySelectorAll(".carousel-control li.active")[1].classList.remove("active"))
                }))
            }))), u) {
            if (!f) return;
            d(document).on("add.cards", (function(e) {
                d(e.target).find(".form-with-styler").length && (e = d(e.target).find(".form-with-styler"), d(e).find('select:not("[multiple]")').each((function() {
                    d(this).styler && d(this).styler()
                })), d(e).find("input[type=number]").each((function() {
                    d(this).styler && (d(this).styler(), d(this).parent().parent().removeClass("form-control"))
                })), d(e).find("input[type=date]").each((function() {
                    d(this).datetimepicker && d(this).datetimepicker({
                        format: "Y-m-d",
                        timepicker: !1
                    })
                })), d(e).find("input[type=time]").each((function() {
                    d(this).datetimepicker && d(this).datetimepicker({
                        format: "H:i",
                        datepicker: !1
                    })
                })))
            }))
        }
        document.querySelectorAll('input[type="range"]').forEach((function(e) {
            e.addEventListener("change", (function(e) {
                e.target.parents(".form-group").forEach((function(t) {
                    t.querySelector(".value").innerHTML = e.target.value
                }))
            }))
        })), u ? d(document).on("add.cards changeParameter.cards", (function(e, t) {
            "undefined" != typeof CircularProgressBar && new CircularProgressBar("pie_progress"), t ? function(e, t) {
                if (e.classList.contains("circle-progress-section") && t.includes("progress") && "progressCount" != t)
                    if (t.includes("Color")) e.querySelectorAll(".pie_progress").forEach((function(t) {
                        var n = e.getAttribute("id") + "-svg-gradient",
                            r = +t.getAttribute("data-goal");
                        c(t, n, r)
                    }));
                    else {
                        var n = e.getAttribute("id") + "-svg-gradient",
                            r = +(t = e.querySelector("." + t)).getAttribute("data-goal");
                        c(t, n, r)
                    }
            }(e.target, t) : e.target.querySelectorAll(".pie_progress").length && e.target.querySelectorAll(".pie_progress").forEach((function(e) {
                s(e)
            }))
        })) : document.querySelectorAll(".pie_progress").length && ("undefined" != typeof CircularProgressBar && new CircularProgressBar("pie_progress"), document.querySelectorAll(".pie_progress").forEach((function(e) {
            s(e)
        }))), u && f ? d(document).on("add.cards", (function(e) {
            d(e.target).hasClass("testimonials-slider") && l(e.target)
        })).on("changeParameter.cards", (function(e, t, n) {
            "testimonialsSlides" === t && 0 == d(e.target).find(".carousel-item.active").length && a(e.target)
        })) : void 0 === window.initTestimonialsPlugin && (window.initTestimonialsPlugin = !0, document.querySelectorAll(".testimonials-slider").forEach((function(e) {
            l(e)
        }))), o((function() {
            u || Array.from(document.body.children).filter((function(e) {
                return !e.matches("style, script")
            })).forEach((function(e) {
                if (window.Event && "function" == typeof window.Event) var t = new Event("add.cards");
                else(t = document.createEvent("CustomEvent")).initEvent("add.cards", !0, !0);
                e.dispatchEvent(t)
            }))
        }))
    }();