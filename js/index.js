var $jscomp = $jscomp || {};
$jscomp.scope = {}, $jscomp.arrayIteratorImpl = function(e) {
    var t = 0;
    return function() {
        return t < e.length ? {
            done: !1,
            value: e[t++]
        } : {
            done: !0
        }
    }
}, $jscomp.arrayIterator = function(e) {
    return {
        next: $jscomp.arrayIteratorImpl(e)
    }
}, $jscomp.makeIterator = function(e) {
    var t = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator];
    return t ? t.call(e) : $jscomp.arrayIterator(e)
}, $jscomp.ASSUME_ES5 = !1, $jscomp.ASSUME_NO_NATIVE_MAP = !1, $jscomp.ASSUME_NO_NATIVE_SET = !1, $jscomp.SIMPLE_FROUND_POLYFILL = !1, $jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(e) {
    var t = function() {};
    return t.prototype = e, new t
}, $jscomp.underscoreProtoCanBeSet = function() {
    var e = {};
    try {
        return e.__proto__ = {
            a: !0
        }, e.a
    } catch (e) {}
    return !1
}, $jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(e, t) {
    if (e.__proto__ = t, e.__proto__ !== t) throw new TypeError(e + " is not extensible");
    return e
} : null, $jscomp.inherits = function(e, t) {
    if (e.prototype = $jscomp.objectCreate(t.prototype), e.prototype.constructor = e, $jscomp.setPrototypeOf) {
        var s = $jscomp.setPrototypeOf;
        s(e, t)
    } else
        for (s in t)
            if ("prototype" != s)
                if (Object.defineProperties) {
                    var a = Object.getOwnPropertyDescriptor(t, s);
                    a && Object.defineProperty(e, s, a)
                } else e[s] = t[s];
    e.superClass_ = t.prototype
}, $jscomp.getGlobal = function(e) {
    return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e
}, $jscomp.global = $jscomp.getGlobal(this), $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(e, t, s) {
    e != Array.prototype && e != Object.prototype && (e[t] = s.value)
}, $jscomp.polyfill = function(e, t, s, a) {
    if (t) {
        for (s = $jscomp.global, e = e.split("."), a = 0; a < e.length - 1; a++) {
            var r = e[a];
            r in s || (s[r] = {}), s = s[r]
        }(t = t(a = s[e = e[e.length - 1]])) != a && null != t && $jscomp.defineProperty(s, e, {
            configurable: !0,
            writable: !0,
            value: t
        })
    }
}, $jscomp.FORCE_POLYFILL_PROMISE = !1, $jscomp.polyfill("Promise", (function(e) {
    function t() {
        this.batch_ = null
    }

    function s(e) {
        return e instanceof r ? e : new r((function(t, s) {
            t(e)
        }))
    }
    if (e && !$jscomp.FORCE_POLYFILL_PROMISE) return e;
    t.prototype.asyncExecute = function(e) {
        if (null == this.batch_) {
            this.batch_ = [];
            var t = this;
            this.asyncExecuteFunction((function() {
                t.executeBatch_()
            }))
        }
        this.batch_.push(e)
    };
    var a = $jscomp.global.setTimeout;
    t.prototype.asyncExecuteFunction = function(e) {
        a(e, 0)
    }, t.prototype.executeBatch_ = function() {
        for (; this.batch_ && this.batch_.length;) {
            var e = this.batch_;
            this.batch_ = [];
            for (var t = 0; t < e.length; ++t) {
                var s = e[t];
                e[t] = null;
                try {
                    s()
                } catch (e) {
                    this.asyncThrow_(e)
                }
            }
        }
        this.batch_ = null
    }, t.prototype.asyncThrow_ = function(e) {
        this.asyncExecuteFunction((function() {
            throw e
        }))
    };
    var r = function(e) {
        this.state_ = 0, this.result_ = void 0, this.onSettledCallbacks_ = [];
        var t = this.createResolveAndReject_();
        try {
            e(t.resolve, t.reject)
        } catch (e) {
            t.reject(e)
        }
    };
    r.prototype.createResolveAndReject_ = function() {
        function e(e) {
            return function(a) {
                s || (s = !0, e.call(t, a))
            }
        }
        var t = this,
            s = !1;
        return {
            resolve: e(this.resolveTo_),
            reject: e(this.reject_)
        }
    }, r.prototype.resolveTo_ = function(e) {
        if (e === this) this.reject_(new TypeError("A Promise cannot resolve to itself"));
        else if (e instanceof r) this.settleSameAsPromise_(e);
        else {
            e: switch (typeof e) {
                case "object":
                    var t = null != e;
                    break e;
                case "function":
                    t = !0;
                    break e;
                default:
                    t = !1
            }
            t ? this.resolveToNonPromiseObj_(e) : this.fulfill_(e)
        }
    }, r.prototype.resolveToNonPromiseObj_ = function(e) {
        var t = void 0;
        try {
            t = e.then
        } catch (e) {
            return void this.reject_(e)
        }
        "function" == typeof t ? this.settleSameAsThenable_(t, e) : this.fulfill_(e)
    }, r.prototype.reject_ = function(e) {
        this.settle_(2, e)
    }, r.prototype.fulfill_ = function(e) {
        this.settle_(1, e)
    }, r.prototype.settle_ = function(e, t) {
        if (0 != this.state_) throw Error("Cannot settle(" + e + ", " + t + "): Promise already settled in state" + this.state_);
        this.state_ = e, this.result_ = t, this.executeOnSettledCallbacks_()
    }, r.prototype.executeOnSettledCallbacks_ = function() {
        if (null != this.onSettledCallbacks_) {
            for (var e = 0; e < this.onSettledCallbacks_.length; ++e) o.asyncExecute(this.onSettledCallbacks_[e]);
            this.onSettledCallbacks_ = null
        }
    };
    var o = new t;
    return r.prototype.settleSameAsPromise_ = function(e) {
        var t = this.createResolveAndReject_();
        e.callWhenSettled_(t.resolve, t.reject)
    }, r.prototype.settleSameAsThenable_ = function(e, t) {
        var s = this.createResolveAndReject_();
        try {
            e.call(t, s.resolve, s.reject)
        } catch (e) {
            s.reject(e)
        }
    }, r.prototype.then = function(e, t) {
        function s(e, t) {
            return "function" == typeof e ? function(t) {
                try {
                    a(e(t))
                } catch (e) {
                    o(e)
                }
            } : t
        }
        var a, o, i = new r((function(e, t) {
            a = e, o = t
        }));
        return this.callWhenSettled_(s(e, a), s(t, o)), i
    }, r.prototype.catch = function(e) {
        return this.then(void 0, e)
    }, r.prototype.callWhenSettled_ = function(e, t) {
        function s() {
            switch (a.state_) {
                case 1:
                    e(a.result_);
                    break;
                case 2:
                    t(a.result_);
                    break;
                default:
                    throw Error("Unexpected state: " + a.state_)
            }
        }
        var a = this;
        null == this.onSettledCallbacks_ ? o.asyncExecute(s) : this.onSettledCallbacks_.push(s)
    }, r.resolve = s, r.reject = function(e) {
        return new r((function(t, s) {
            s(e)
        }))
    }, r.race = function(e) {
        return new r((function(t, a) {
            for (var r = $jscomp.makeIterator(e), o = r.next(); !o.done; o = r.next()) s(o.value).callWhenSettled_(t, a)
        }))
    }, r.all = function(e) {
        var t = $jscomp.makeIterator(e),
            a = t.next();
        return a.done ? s([]) : new r((function(e, r) {
            function o(t) {
                return function(s) {
                    i[t] = s, 0 == --n && e(i)
                }
            }
            var i = [],
                n = 0;
            do {
                i.push(void 0), n++, s(a.value).callWhenSettled_(o(i.length - 1), r), a = t.next()
            } while (!a.done)
        }))
    }, r
}), "es6", "es3"), $jscomp.owns = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
}, $jscomp.polyfill("Object.entries", (function(e) {
    return e || function(e) {
        var t, s = [];
        for (t in e) $jscomp.owns(e, t) && s.push([t, e[t]]);
        return s
    }
}), "es8", "es3"), $jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(e, t) {
    for (var s = 1; s < arguments.length; s++) {
        var a = arguments[s];
        if (a)
            for (var r in a) $jscomp.owns(a, r) && (e[r] = a[r])
    }
    return e
}, $jscomp.polyfill("Object.assign", (function(e) {
    return e || $jscomp.assign
}), "es6", "es3"), $jscomp.findInternal = function(e, t, s) {
    e instanceof String && (e = String(e));
    for (var a = e.length, r = 0; r < a; r++) {
        var o = e[r];
        if (t.call(s, o, r, e)) return {
            i: r,
            v: o
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
}), "es6", "es3"), $jscomp.SYMBOL_PREFIX = "jscomp_symbol_", $jscomp.initSymbol = function() {
    $jscomp.initSymbol = function() {}, $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
}, $jscomp.SymbolClass = function(e, t) {
    this.$jscomp$symbol$id_ = e, $jscomp.defineProperty(this, "description", {
        configurable: !0,
        writable: !0,
        value: t
    })
}, $jscomp.SymbolClass.prototype.toString = function() {
    return this.$jscomp$symbol$id_
}, $jscomp.Symbol = function() {
    var e = 0;
    return function t(s) {
        if (this instanceof t) throw new TypeError("Symbol is not a constructor");
        return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (s || "") + "_" + e++, s)
    }
}(), $jscomp.initSymbolIterator = function() {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.iterator;
    e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator")), "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
        configurable: !0,
        writable: !0,
        value: function() {
            return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this))
        }
    }), $jscomp.initSymbolIterator = function() {}
}, $jscomp.initSymbolAsyncIterator = function() {
    $jscomp.initSymbol();
    var e = $jscomp.global.Symbol.asyncIterator;
    e || (e = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator")), $jscomp.initSymbolAsyncIterator = function() {}
}, $jscomp.iteratorPrototype = function(e) {
    return $jscomp.initSymbolIterator(), (e = {
        next: e
    })[$jscomp.global.Symbol.iterator] = function() {
        return this
    }, e
}, $jscomp.iteratorFromArray = function(e, t) {
    $jscomp.initSymbolIterator(), e instanceof String && (e += "");
    var s = 0,
        a = {
            next: function() {
                if (s < e.length) {
                    var r = s++;
                    return {
                        value: t(r, e[r]),
                        done: !1
                    }
                }
                return a.next = function() {
                    return {
                        done: !0,
                        value: void 0
                    }
                }, a.next()
            }
        };
    return a[Symbol.iterator] = function() {
        return a
    }, a
}, $jscomp.polyfill("Array.prototype.entries", (function(e) {
    return e || function() {
        return $jscomp.iteratorFromArray(this, (function(e, t) {
            return [e, t]
        }))
    }
}), "es6", "es3"), $jscomp.polyfill("Array.from", (function(e) {
    return e || function(e, t, s) {
        t = null != t ? t : function(e) {
            return e
        };
        var a = [],
            r = "undefined" != typeof Symbol && Symbol.iterator && e[Symbol.iterator];
        if ("function" == typeof r) {
            e = r.call(e);
            for (var o = 0; !(r = e.next()).done;) a.push(t.call(s, r.value, o++))
        } else
            for (r = e.length, o = 0; o < r; o++) a.push(t.call(s, e[o], o));
        return a
    }
}), "es6", "es3"), $jscomp.polyfill("Object.is", (function(e) {
    return e || function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    }
}), "es6", "es3"), $jscomp.polyfill("Array.prototype.includes", (function(e) {
    return e || function(e, t) {
        var s = this;
        s instanceof String && (s = String(s));
        var a = s.length;
        for (0 > (t = t || 0) && (t = Math.max(t + a, 0)); t < a; t++) {
            var r = s[t];
            if (r === e || Object.is(r, e)) return !0
        }
        return !1
    }
}), "es7", "es3"), $jscomp.checkStringArgs = function(e, t, s) {
    if (null == e) throw new TypeError("The 'this' value for String.prototype." + s + " must not be null or undefined");
    if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + s + " must not be a regular expression");
    return e + ""
}, $jscomp.polyfill("String.prototype.includes", (function(e) {
    return e || function(e, t) {
        return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, t || 0)
    }
}), "es6", "es3");
var EventEmitter = function() {
    this.events = {}
};
EventEmitter.prototype.on = function(e, t) {
    "object" != typeof this.events[e] && (this.events[e] = []), this.events[e].push(t)
}, EventEmitter.prototype.removeListener = function(e, t) {
    "object" == typeof this.events[e] && (-1 < (t = this.indexOf(this.events[e], t)) && this.events[e].splice(t, 1))
}, EventEmitter.prototype.emit = function(e) {
    var t, s = [].slice.call(arguments, 1);
    if ("object" == typeof this.events[e]) {
        var a = this.events[e].slice(),
            r = a.length;
        for (t = 0; t < r; t++) a[t].apply(this, s)
    }
}, EventEmitter.prototype.once = function(e, t) {
    this.on(e, (function s() {
        this.removeListener(e, s), t.apply(this, arguments)
    }))
};
var loadScript = function(e, t, s) {
        return new Promise((function(a, r) {
            var o = document.createElement("script");
            o.async = !0, o.src = e;
            for (var i = $jscomp.makeIterator(Object.entries(t || {})), n = i.next(); !n.done; n = i.next()) {
                var $ = $jscomp.makeIterator(n.value);
                n = $.next().value, $ = $.next().value, o.setAttribute(n, $)
            }
            o.onload = function() {
                o.onerror = o.onload = null, a(o)
            }, o.onerror = function() {
                o.onerror = o.onload = null, r(Error("Failed to load " + e))
            }, (s || document.head || document.getElementsByTagName("head")[0]).appendChild(o)
        }))
    },
    YOUTUBE_IFRAME_API_SRC = "https://www.youtube.com/iframe_api",
    YOUTUBE_STATES = {
        "-1": "unstarted",
        0: "ended",
        1: "playing",
        2: "paused",
        3: "buffering",
        5: "cued"
    },
    YOUTUBE_ERROR = {
        INVALID_PARAM: 2,
        HTML5_ERROR: 5,
        NOT_FOUND: 100,
        UNPLAYABLE_1: 101,
        UNPLAYABLE_2: 150
    },
    loadIframeAPICallbacks = [],
    $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0 = function(e, t) {
        EventEmitter.call(this);
        var s = this;
        e = "string" == typeof e ? document.querySelector(e) : e, this._id = e.id ? e.id : e.id = "ytplayer-" + Math.random().toString(16).slice(2, 8), this._opts = Object.assign({
            width: 640,
            height: 360,
            autoplay: !1,
            captions: void 0,
            controls: !0,
            keyboard: !0,
            fullscreen: !0,
            annotations: !0,
            modestBranding: !1,
            related: !0,
            timeupdateFrequency: 1e3,
            playsInline: !0,
            start: 0
        }, t), this.videoId = null, this.destroyed = !1, this._api = null, this._autoplay = !1, this._player = null, this._ready = !1, this._queue = [], this.replayInterval = [], this._interval = null, this._startInterval = this._startInterval.bind(this), this._stopInterval = this._stopInterval.bind(this), this.on("playing", this._startInterval), this.on("unstarted", this._stopInterval), this.on("ended", this._stopInterval), this.on("paused", this._stopInterval), this.on("buffering", this._stopInterval), this._loadIframeAPI((function(e, t) {
            if (e) return s._destroy(Error("YouTube Iframe API failed to load"));
            s._api = t, s.videoId && s.load(s.videoId, s._autoplay, s._start)
        }))
    };
$jscomp.inherits($Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0, EventEmitter), $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.indexOf = function(e, t) {
    for (var s = 0, a = e.length, r = -1, o = !1; s < a && !o;) e[s] === t && (r = s, o = !0), s++;
    return r
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.load = function(e, t, s) {
    t = void 0 !== t && t, s = void 0 === s ? 0 : s, this.destroyed || (this._startOptimizeDisplayEvent(), this._optimizeDisplayHandler("center, center"), this.videoId = e, this._autoplay = t, this._start = s, this._api && (this._player ? this._ready && (t ? this._player.loadVideoById(e, s) : this._player.cueVideoById(e, s)) : this._createPlayer(e)))
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.play = function() {
    this._ready ? this._player.playVideo() : this._queueCommand("play")
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.replayFrom = function(e) {
    var t = this;
    !this.replayInterval.find((function(e) {
        return e.iframeParent === t._player.i.parentNode
    })) && e && this.replayInterval.push({
        iframeParent: this._player.i.parentNode,
        interval: setInterval((function() {
            if (t._player.getCurrentTime() >= t._player.getDuration() - Number(e)) {
                t.seek(0);
                for (var s = $jscomp.makeIterator(t.replayInterval.entries()), a = s.next(); !a.done; a = s.next()) {
                    var r = (a = $jscomp.makeIterator(a.value)).next().value;
                    a.next(), Object.hasOwnProperty.call(t.replayInterval, r) && (clearInterval(t.replayInterval[r].interval), t.replayInterval.splice(r, 1))
                }
            }
        }), 1e3 * Number(e))
    })
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.pause = function() {
    this._ready ? this._player.pauseVideo() : this._queueCommand("pause")
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.stop = function() {
    this._ready ? this._player.stopVideo() : this._queueCommand("stop")
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.seek = function(e) {
    this._ready ? this._player.seekTo(e, !0) : this._queueCommand("seek", e)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._optimizeDisplayHandler = function(e) {
    if (this._player) {
        var t, s = this._player.i;
        if (e = e.split(","), s)
            if (t = s.parentElement) {
                var a = window.getComputedStyle(t),
                    r = t.clientHeight + parseFloat(a.marginTop, 10) + parseFloat(a.marginBottom, 10) + parseFloat(a.borderTopWidth, 10) + parseFloat(a.borderBottomWidth, 10);
                for (var o in t = t.clientWidth + parseFloat(a.marginLeft, 10) + parseFloat(a.marginRight, 10) + parseFloat(a.borderLeftWidth, 10) + parseFloat(a.borderRightWidth, 10), r += 80, s.style.width = t + "px", s.style.height = Math.ceil(parseFloat(s.style.width, 10) / 1.7) + "px", s.style.marginTop = Math.ceil(-(parseFloat(s.style.height, 10) - r) / 2) + "px", s.style.marginLeft = 0, (a = parseFloat(s.style.height, 10) < r) && (s.style.height = r + "px", s.style.width = Math.ceil(1.7 * parseFloat(s.style.height, 10)) + "px", s.style.marginTop = 0, s.style.marginLeft = Math.ceil(-(parseFloat(s.style.width, 10) - t) / 2) + "px"), e)
                    if (e.hasOwnProperty(o)) switch (e[o].replace(/ /g, "")) {
                        case "top":
                            s.style.marginTop = a ? -(parseFloat(s.style.height, 10) - r) / 2 + "px" : 0;
                            break;
                        case "bottom":
                            s.style.marginTop = a ? 0 : -(parseFloat(s.style.height, 10) - r) + "px";
                            break;
                        case "left":
                            s.style.marginLeft = 0;
                            break;
                        case "right":
                            s.style.marginLeft = a ? -(parseFloat(s.style.width, 10) - t) : "0px";
                            break;
                        default:
                            parseFloat(s.style.width, 10) > t && (s.style.marginLeft = -(parseFloat(s.style.width, 10) - t) / 2 + "px")
                    }
            }
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.stopResize = function() {
    window.removeEventListener("resize", this._resizeListener), this._resizeListener = null
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.stopReplay = function(e) {
    for (var t = $jscomp.makeIterator(this.replayInterval.entries()), s = t.next(); !s.done; s = t.next()) {
        var a = (s = $jscomp.makeIterator(s.value)).next().value;
        s.next(), Object.hasOwnProperty.call(this.replayInterval, a) && e === this.replayInterval[a].iframeParent && (clearInterval(this.replayInterval[a].interval), this.replayInterval.splice(a, 1))
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.setVolume = function(e) {
    this._ready ? this._player.setVolume(e) : this._queueCommand("setVolume", e)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.loadPlaylist = function() {
    this._ready ? this._player.loadPlaylist(this.videoId) : this._queueCommand("loadPlaylist", this.videoId)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.setLoop = function(e) {
    this._ready ? this._player.setLoop(e) : this._queueCommand("setLoop", e)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getVolume = function() {
    return this._ready && this._player.getVolume() || 0
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.mute = function() {
    this._ready ? this._player.mute() : this._queueCommand("mute")
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.unMute = function() {
    this._ready ? this._player.unMute() : this._queueCommand("unMute")
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.isMuted = function() {
    return this._ready && this._player.isMuted() || !1
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.setSize = function(e, t) {
    this._ready ? this._player.setSize(e, t) : this._queueCommand("setSize", e, t)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.setPlaybackRate = function(e) {
    this._ready ? this._player.setPlaybackRate(e) : this._queueCommand("setPlaybackRate", e)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.setPlaybackQuality = function(e) {
    this._ready ? this._player.setPlaybackQuality(e) : this._queueCommand("setPlaybackQuality", e)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getPlaybackRate = function() {
    return this._ready && this._player.getPlaybackRate() || 1
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getAvailablePlaybackRates = function() {
    return this._ready && this._player.getAvailablePlaybackRates() || [1]
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getDuration = function() {
    return this._ready && this._player.getDuration() || 0
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getProgress = function() {
    return this._ready && this._player.getVideoLoadedFraction() || 0
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getState = function() {
    return this._ready && YOUTUBE_STATES[this._player.getPlayerState()] || "unstarted"
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.getCurrentTime = function() {
    return this._ready && this._player.getCurrentTime() || 0
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype.destroy = function() {
    this._destroy()
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._destroy = function(e) {
    this.destroyed || (this.destroyed = !0, this._player && (this._player.stopVideo && this._player.stopVideo(), this._player.destroy()), this._player = this._api = this._opts = this._id = this.videoId = null, this._ready = !1, this._queue = null, this._stopInterval(), this.removeListener("playing", this._startInterval), this.removeListener("paused", this._stopInterval), this.removeListener("buffering", this._stopInterval), this.removeListener("unstarted", this._stopInterval), this.removeListener("ended", this._stopInterval), e && this.emit("error", e))
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._queueCommand = function(e, t) {
    for (var s = [], a = 1; a < arguments.length; ++a) s[a - 1] = arguments[a];
    this.destroyed || this._queue.push([e, s])
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._flushQueue = function() {
    for (; this._queue.length;) {
        var e = this._queue.shift();
        this[e[0]].apply(this, e[1])
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._loadIframeAPI = function(e) {
    if (window.YT && "function" == typeof window.YT.Player) return e(null, window.YT);
    loadIframeAPICallbacks.push(e), Array.from(document.getElementsByTagName("script")).some((function(e) {
        return e.src === YOUTUBE_IFRAME_API_SRC
    })) || loadScript(YOUTUBE_IFRAME_API_SRC).catch((function(e) {
        for (; loadIframeAPICallbacks.length;) loadIframeAPICallbacks.shift()(e)
    }));
    var t = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function() {
        for ("function" == typeof t && t(); loadIframeAPICallbacks.length;) loadIframeAPICallbacks.shift()(null, window.YT)
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._createPlayer = function(e) {
    var t = this;
    if (!this.destroyed) {
        var s = this._opts;
        this._player = new this._api.Player(this._id, {
            width: s.width,
            height: s.height,
            videoId: e,
            host: s.host,
            playerVars: {
                autoplay: s.autoplay ? 1 : 0,
                mute: s.mute ? 1 : 0,
                hl: null != s.captions && !1 !== s.captions ? s.captions : void 0,
                cc_lang_pref: null != s.captions && !1 !== s.captions ? s.captions : void 0,
                controls: s.controls ? 2 : 0,
                enablejsapi: 1,
                allowfullscreen: !0,
                iv_load_policy: s.annotations ? 1 : 3,
                modestbranding: s.modestBranding ? 1 : 0,
                origin: "*",
                rel: s.related ? 1 : 0,
                mode: "transparent",
                showinfo: 0,
                html5: 1,
                version: 3,
                playerapiid: "iframe_YTP_1624972482514"
            },
            events: {
                onReady: function() {
                    return t._onReady(e)
                },
                onStateChange: function(e) {
                    return t._onStateChange(e)
                },
                onPlaybackQualityChange: function(e) {
                    return t._onPlaybackQualityChange(e)
                },
                onPlaybackRateChange: function(e) {
                    return t._onPlaybackRateChange(e)
                },
                onError: function(e) {
                    return t._onError(e)
                }
            }
        })
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onReady = function(e) {
    this.destroyed || (this._ready = !0, this.load(this.videoId, this._autoplay, this._start), this._flushQueue())
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onStateChange = function(e) {
    if (!this.destroyed) {
        var t = YOUTUBE_STATES[e.data];
        if (!t) throw Error("Unrecognized state change: " + e);
        ["paused", "buffering", "ended"].includes(t) && this._onTimeupdate(), this.emit(t), ["unstarted", "playing", "cued"].includes(t) && this._onTimeupdate()
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onPlaybackQualityChange = function(e) {
    this.destroyed || this.emit("playbackQualityChange", e.data)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onPlaybackRateChange = function(e) {
    this.destroyed || this.emit("playbackRateChange", e.data)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onError = function(e) {
    if (!this.destroyed && (e = e.data) !== YOUTUBE_ERROR.HTML5_ERROR) {
        if (e === YOUTUBE_ERROR.UNPLAYABLE_1 || e === YOUTUBE_ERROR.UNPLAYABLE_2 || e === YOUTUBE_ERROR.NOT_FOUND || e === YOUTUBE_ERROR.INVALID_PARAM) return this.emit("unplayable", this.videoId);
        this._destroy(Error("YouTube Player Error. Unknown error code: " + e))
    }
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._startOptimizeDisplayEvent = function() {
    var e = this;
    this._resizeListener || (this._resizeListener = function() {
        return e._optimizeDisplayHandler("center, center")
    }, window.addEventListener("resize", this._resizeListener))
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._onTimeupdate = function() {
    this.emit("timeupdate", this.getCurrentTime())
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._startInterval = function() {
    var e = this;
    this._interval = setInterval((function() {
        return e._onTimeupdate()
    }), this._opts.timeupdateFrequency)
}, $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0.prototype._stopInterval = function() {
    clearInterval(this._interval), this._interval = null
}, YouTubePlayer = $Users$vagrant$workspace$Mobirise5_emac_Release$Release$release$mac$Mobirise_app$Contents$Resources$_app_asar$web$app$themes$mobirise5$plugins$ytplayer$index$classdecl$var0;