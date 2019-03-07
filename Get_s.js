var s_s = function () {
    return function () {
        this.input = null,
            this.next_in = 0,
            this.avail_in = 0,
            this.total_in = 0,
            this.output = null,
            this.next_out = 0,
            this.avail_out = 0,
            this.total_out = 0,
            this.msg = "",
            this.state = null,
            this.data_type = 2,
            this.adler = 0
    }
}
var n_3 = function () {
    return {
        "0": "",
        "1": "stream end",
        "2": "need dictionary",
        "-1": "file error",
        "-2": "stream error",
        "-3": "data error",
        "-4": "insufficient memory",
        "-5": "buffer error",
        "-6": "incompatible version"
    }
}
var n_13 = function() {
    var r = function() {
        for (var t, e = [], n = 0; n < 256; n++) {
            t = n;
            for (var r = 0; r < 8; r++)
                t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
            e[n] = t
        }
        return e
    }();
    return function(t, e, n, o) {
        var i = r
          , a = o + n;
        t ^= -1;
        for (var s = o; s < a; s++)
            t = t >>> 8 ^ i[255 & (t ^ e[s])];
        return -1 ^ t
    }
}
var n_12 = function() {
    return function(t, e, n, r) {
        for (var o = 65535 & t | 0, i = t >>> 16 & 65535 | 0, a = 0; 0 !== n; ) {
            n -= a = n > 2e3 ? 2e3 : n;
            do {
                i = i + (o = o + e[r++] | 0) | 0
            } while (--a);o %= 65521,
            i %= 65521
        }
        return o | i << 16 | 0
    }
}
function a(t) {
    return (a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } :
        function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }
    )(t)
}

function s_o(e = {}) {
    var r = "function" == typeof Symbol && "symbol" == a(Symbol.iterator) ? function (t) {
            return a(t)
        } :
        function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : a(t)
        },
        o = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;

    function i(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }
    e.assign = function (t) {
            for (var e = Array.prototype.slice.call(arguments, 1); e.length;) {
                var n = e.shift();
                if (n) {
                    if ("object" !== (void 0 === n ? "undefined" : r(n)))
                        throw new TypeError(n + "must be non-object");
                    for (var o in n)
                        i(n, o) && (t[o] = n[o])
                }
            }
            return t
        },
        e.shrinkBuf = function (t, e) {
            return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e,
                t)
        };
    var s = {
            arraySet: function (t, e, n, r, o) {
                if (e.subarray && t.subarray)
                    t.set(e.subarray(n, n + r), o);
                else
                    for (var i = 0; i < r; i++)
                        t[o + i] = e[n + i]
            },
            flattenChunks: function (t) {
                var e, n, r, o, i, a;
                for (r = 0,
                    e = 0,
                    n = t.length; e < n; e++)
                    r += t[e].length;
                for (a = new Uint8Array(r),
                    o = 0,
                    e = 0,
                    n = t.length; e < n; e++)
                    i = t[e],
                    a.set(i, o),
                    o += i.length;
                return a
            }
        },
        c = {
            arraySet: function (t, e, n, r, o) {
                for (var i = 0; i < r; i++)
                    t[o + i] = e[n + i]
            },
            flattenChunks: function (t) {
                return [].concat.apply([], t)
            }
        };
    e.setTyped = function (t) {
            t ? (e.Buf8 = Uint8Array,
                e.Buf16 = Uint16Array,
                e.Buf32 = Int32Array,
                e.assign(e, s)) : (e.Buf8 = Array,
                e.Buf16 = Array,
                e.Buf32 = Array,
                e.assign(e, c))
        },
        e.setTyped(o);
    return e;
}

function n_11(e = {}) {
    var r = s_o();

    function o(t) {
        for (var e = t.length; --e >= 0;)
            t[e] = 0
    }
    var i = 0,
        a = 256,
        s = a + 1 + 29,
        c = 30,
        u = 19,
        l = 2 * s + 1,
        f = 15,
        p = 16,
        h = 256,
        d = 16,
        m = 17,
        b = 18,
        y = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
        g = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
        w = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
        v = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
        _ = new Array(2 * (s + 2));
    o(_);
    var x = new Array(2 * c);
    o(x);
    var D = new Array(512);
    o(D);
    var O = new Array(256);
    o(O);
    var k = new Array(29);
    o(k);
    var C, S, I, T = new Array(c);

    function E(t, e, n, r, o) {
        this.static_tree = t,
            this.extra_bits = e,
            this.extra_base = n,
            this.elems = r,
            this.max_length = o,
            this.has_stree = t && t.length
    }

    function j(t, e) {
        this.dyn_tree = t,
            this.max_code = 0,
            this.stat_desc = e
    }

    function P(t) {
        return t < 256 ? D[t] : D[256 + (t >>> 7)]
    }

    function A(t, e) {
        t.pending_buf[t.pending++] = 255 & e,
            t.pending_buf[t.pending++] = e >>> 8 & 255
    }

    function N(t, e, n) {
        t.bi_valid > p - n ? (t.bi_buf |= e << t.bi_valid & 65535,
            A(t, t.bi_buf),
            t.bi_buf = e >> p - t.bi_valid,
            t.bi_valid += n - p) : (t.bi_buf |= e << t.bi_valid & 65535,
            t.bi_valid += n)
    }

    function M(t, e, n) {
        N(t, n[2 * e], n[2 * e + 1])
    }

    function L(t, e) {
        var n = 0;
        do {
            n |= 1 & t,
                t >>>= 1,
                n <<= 1
        } while (--e > 0);
        return n >>> 1
    }

    function K(t, e, n) {
        var r, o, i = new Array(f + 1),
            a = 0;
        for (r = 1; r <= f; r++)
            i[r] = a = a + n[r - 1] << 1;
        for (o = 0; o <= e; o++) {
            var s = t[2 * o + 1];
            0 !== s && (t[2 * o] = L(i[s]++, s))
        }
    }

    function z(t) {
        var e;
        for (e = 0; e < s; e++)
            t.dyn_ltree[2 * e] = 0;
        for (e = 0; e < c; e++)
            t.dyn_dtree[2 * e] = 0;
        for (e = 0; e < u; e++)
            t.bl_tree[2 * e] = 0;
        t.dyn_ltree[2 * h] = 1,
            t.opt_len = t.static_len = 0,
            t.last_lit = t.matches = 0
    }

    function q(t) {
        t.bi_valid > 8 ? A(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf),
            t.bi_buf = 0,
            t.bi_valid = 0
    }

    function R(t, e, n, r) {
        var o = 2 * e,
            i = 2 * n;
        return t[o] < t[i] || t[o] === t[i] && r[e] <= r[n]
    }

    function B(t, e, n) {
        for (var r = t.heap[n], o = n << 1; o <= t.heap_len && (o < t.heap_len && R(e, t.heap[o + 1], t.heap[o], t.depth) && o++,
                !R(e, r, t.heap[o], t.depth));)
            t.heap[n] = t.heap[o],
            n = o,
            o <<= 1;
        t.heap[n] = r
    }

    function V(t, e, n) {
        var r, o, i, s, c = 0;
        if (0 !== t.last_lit)
            do {
                r = t.pending_buf[t.d_buf + 2 * c] << 8 | t.pending_buf[t.d_buf + 2 * c + 1],
                    o = t.pending_buf[t.l_buf + c],
                    c++,
                    0 === r ? M(t, o, e) : (M(t, (i = O[o]) + a + 1, e),
                        0 !== (s = y[i]) && N(t, o -= k[i], s),
                        M(t, i = P(--r), n),
                        0 !== (s = g[i]) && N(t, r -= T[i], s))
            } while (c < t.last_lit);
        M(t, h, e)
    }

    function F(t, e) {
        var n, r, o, i = e.dyn_tree,
            a = e.stat_desc.static_tree,
            s = e.stat_desc.has_stree,
            c = e.stat_desc.elems,
            u = -1;
        for (t.heap_len = 0,
            t.heap_max = l,
            n = 0; n < c; n++)
            0 !== i[2 * n] ? (t.heap[++t.heap_len] = u = n,
                t.depth[n] = 0) : i[2 * n + 1] = 0;
        for (; t.heap_len < 2;)
            i[2 * (o = t.heap[++t.heap_len] = u < 2 ? ++u : 0)] = 1,
            t.depth[o] = 0,
            t.opt_len--,
            s && (t.static_len -= a[2 * o + 1]);
        for (e.max_code = u,
            n = t.heap_len >> 1; n >= 1; n--)
            B(t, i, n);
        o = c;
        do {
            n = t.heap[1],
                t.heap[1] = t.heap[t.heap_len--],
                B(t, i, 1),
                r = t.heap[1],
                t.heap[--t.heap_max] = n,
                t.heap[--t.heap_max] = r,
                i[2 * o] = i[2 * n] + i[2 * r],
                t.depth[o] = (t.depth[n] >= t.depth[r] ? t.depth[n] : t.depth[r]) + 1,
                i[2 * n + 1] = i[2 * r + 1] = o,
                t.heap[1] = o++,
                B(t, i, 1)
        } while (t.heap_len >= 2);
        t.heap[--t.heap_max] = t.heap[1],
            function (t, e) {
                var n, r, o, i, a, s, c = e.dyn_tree,
                    u = e.max_code,
                    p = e.stat_desc.static_tree,
                    h = e.stat_desc.has_stree,
                    d = e.stat_desc.extra_bits,
                    m = e.stat_desc.extra_base,
                    b = e.stat_desc.max_length,
                    y = 0;
                for (i = 0; i <= f; i++)
                    t.bl_count[i] = 0;
                for (c[2 * t.heap[t.heap_max] + 1] = 0,
                    n = t.heap_max + 1; n < l; n++)
                    (i = c[2 * c[2 * (r = t.heap[n]) + 1] + 1] + 1) > b && (i = b,
                        y++),
                    c[2 * r + 1] = i,
                    r > u || (t.bl_count[i]++,
                        a = 0,
                        r >= m && (a = d[r - m]),
                        s = c[2 * r],
                        t.opt_len += s * (i + a),
                        h && (t.static_len += s * (p[2 * r + 1] + a)));
                if (0 !== y) {
                    do {
                        for (i = b - 1; 0 === t.bl_count[i];)
                            i--;
                        t.bl_count[i]--,
                            t.bl_count[i + 1] += 2,
                            t.bl_count[b]--,
                            y -= 2
                    } while (y > 0);
                    for (i = b; 0 !== i; i--)
                        for (r = t.bl_count[i]; 0 !== r;)
                            (o = t.heap[--n]) > u || (c[2 * o + 1] !== i && (t.opt_len += (i - c[2 * o + 1]) * c[2 * o],
                                    c[2 * o + 1] = i),
                                r--)
                }
            }(t, e),
            K(i, u, t.bl_count)
    }

    function U(t, e, n) {
        var r, o, i = -1,
            a = e[1],
            s = 0,
            c = 7,
            u = 4;
        for (0 === a && (c = 138,
                u = 3),
            e[2 * (n + 1) + 1] = 65535,
            r = 0; r <= n; r++)
            o = a,
            a = e[2 * (r + 1) + 1],
            ++s < c && o === a || (s < u ? t.bl_tree[2 * o] += s : 0 !== o ? (o !== i && t.bl_tree[2 * o]++,
                    t.bl_tree[2 * d]++) : s <= 10 ? t.bl_tree[2 * m]++ : t.bl_tree[2 * b]++,
                s = 0,
                i = o,
                0 === a ? (c = 138,
                    u = 3) : o === a ? (c = 6,
                    u = 3) : (c = 7,
                    u = 4))
    }

    function G(t, e, n) {
        var r, o, i = -1,
            a = e[1],
            s = 0,
            c = 7,
            u = 4;
        for (0 === a && (c = 138,
                u = 3),
            r = 0; r <= n; r++)
            if (o = a,
                a = e[2 * (r + 1) + 1],
                !(++s < c && o === a)) {
                if (s < u)
                    do {
                        M(t, o, t.bl_tree)
                    } while (0 != --s);
                else
                    0 !== o ? (o !== i && (M(t, o, t.bl_tree),
                            s--),
                        M(t, d, t.bl_tree),
                        N(t, s - 3, 2)) : s <= 10 ? (M(t, m, t.bl_tree),
                        N(t, s - 3, 3)) : (M(t, b, t.bl_tree),
                        N(t, s - 11, 7));
                s = 0,
                    i = o,
                    0 === a ? (c = 138,
                        u = 3) : o === a ? (c = 6,
                        u = 3) : (c = 7,
                        u = 4)
            }
    }
    o(T);
    var H = !1;

    function W(t, e, n, o) {
        N(t, (i << 1) + (o ? 1 : 0), 3),
            function (t, e, n, o) {
                q(t),
                    A(t, n),
                    A(t, ~n),
                    r.arraySet(t.pending_buf, t.window, e, n, t.pending),
                    t.pending += n
            }(t, e, n)
    }
    e._tr_init = function (t) {
            H || (function () {
                        var t, e, n, r, o, i = new Array(f + 1);
                        for (n = 0,
                            r = 0; r < 28; r++)
                            for (k[r] = n,
                                t = 0; t < 1 << y[r]; t++)
                                O[n++] = r;
                        for (O[n - 1] = r,
                            o = 0,
                            r = 0; r < 16; r++)
                            for (T[r] = o,
                                t = 0; t < 1 << g[r]; t++)
                                D[o++] = r;
                        for (o >>= 7; r < c; r++)
                            for (T[r] = o << 7,
                                t = 0; t < 1 << g[r] - 7; t++)
                                D[256 + o++] = r;
                        for (e = 0; e <= f; e++)
                            i[e] = 0;
                        for (t = 0; t <= 143;)
                            _[2 * t + 1] = 8,
                            t++,
                            i[8]++;
                        for (; t <= 255;)
                            _[2 * t + 1] = 9,
                            t++,
                            i[9]++;
                        for (; t <= 279;)
                            _[2 * t + 1] = 7,
                            t++,
                            i[7]++;
                        for (; t <= 287;)
                            _[2 * t + 1] = 8,
                            t++,
                            i[8]++;
                        for (K(_, s + 1, i),
                            t = 0; t < c; t++)
                            x[2 * t + 1] = 5,
                            x[2 * t] = L(t, 5);
                        C = new E(_, y, a + 1, s, f),
                            S = new E(x, g, 0, c, f),
                            I = new E(new Array(0), w, 0, u, 7)
                    }(),
                    H = !0),
                t.l_desc = new j(t.dyn_ltree, C),
                t.d_desc = new j(t.dyn_dtree, S),
                t.bl_desc = new j(t.bl_tree, I),
                t.bi_buf = 0,
                t.bi_valid = 0,
                z(t)
        },
        e._tr_stored_block = W,
        e._tr_flush_block = function (t, e, n, r) {
            var o, i, s = 0;
            t.level > 0 ? (2 === t.strm.data_type && (t.strm.data_type = function (t) {
                        var e, n = 4093624447;
                        for (e = 0; e <= 31; e++,
                            n >>>= 1)
                            if (1 & n && 0 !== t.dyn_ltree[2 * e])
                                return 0;
                        if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
                            return 1;
                        for (e = 32; e < a; e++)
                            if (0 !== t.dyn_ltree[2 * e])
                                return 1;
                        return 0
                    }(t)),
                    F(t, t.l_desc),
                    F(t, t.d_desc),
                    s = function (t) {
                        var e;
                        for (U(t, t.dyn_ltree, t.l_desc.max_code),
                            U(t, t.dyn_dtree, t.d_desc.max_code),
                            F(t, t.bl_desc),
                            e = u - 1; e >= 3 && 0 === t.bl_tree[2 * v[e] + 1]; e--)
                        ;
                        return t.opt_len += 3 * (e + 1) + 5 + 5 + 4,
                            e
                    }(t),
                    o = t.opt_len + 3 + 7 >>> 3,
                    (i = t.static_len + 3 + 7 >>> 3) <= o && (o = i)) : o = i = n + 5,
                n + 4 <= o && -1 !== e ? W(t, e, n, r) : 4 === t.strategy || i === o ? (N(t, 2 + (r ? 1 : 0), 3),
                    V(t, _, x)) : (N(t, 4 + (r ? 1 : 0), 3),
                    function (t, e, n, r) {
                        var o;
                        for (N(t, e - 257, 5),
                            N(t, n - 1, 5),
                            N(t, r - 4, 4),
                            o = 0; o < r; o++)
                            N(t, t.bl_tree[2 * v[o] + 1], 3);
                        G(t, t.dyn_ltree, e - 1),
                            G(t, t.dyn_dtree, n - 1)
                    }(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, s + 1),
                    V(t, t.dyn_ltree, t.dyn_dtree)),
                z(t),
                r && q(t)
        },
        e._tr_tally = function (t, e, n) {
            return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255,
                t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e,
                t.pending_buf[t.l_buf + t.last_lit] = 255 & n,
                t.last_lit++,
                0 === e ? t.dyn_ltree[2 * n]++ : (t.matches++,
                    e--,
                    t.dyn_ltree[2 * (O[n] + a + 1)]++,
                    t.dyn_dtree[2 * P(e)]++),
                t.last_lit === t.lit_bufsize - 1
        },
        e._tr_align = function (t) {
            N(t, 2, 3),
                M(t, h, _),
                function (t) {
                    16 === t.bi_valid ? (A(t, t.bi_buf),
                        t.bi_buf = 0,
                        t.bi_valid = 0) : t.bi_valid >= 8 && (t.pending_buf[t.pending++] = 255 & t.bi_buf,
                        t.bi_buf >>= 8,
                        t.bi_valid -= 8)
                }(t)
        };
    return e;
}

function s_i(e = {}) {
    var r = s_o(),
        o = !0,
        i = !0;
    try {
        String.fromCharCode.apply(null, [0])
    } catch (t) {
        o = !1
    }
    try {
        String.fromCharCode.apply(null, new Uint8Array(1))
    } catch (t) {
        i = !1
    }
    for (var a = new r.Buf8(256), s = 0; s < 256; s++)
        a[s] = s >= 252 ? 6 : s >= 248 ? 5 : s >= 240 ? 4 : s >= 224 ? 3 : s >= 192 ? 2 : 1;

    function c(t, e) {
        if (e < 65537 && (t.subarray && i || !t.subarray && o))
            return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
        for (var n = "", a = 0; a < e; a++)
            n += String.fromCharCode(t[a]);
        return n
    }
    a[254] = a[254] = 1,
        e.string2buf = function (t) {
            var e, n, o, i, a, s = t.length,
                c = 0;
            for (i = 0; i < s; i++)
                55296 == (64512 & (n = t.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (o = t.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (o - 56320),
                    i++),
                c += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
            for (e = new r.Buf8(c),
                a = 0,
                i = 0; a < c; i++)
                55296 == (64512 & (n = t.charCodeAt(i))) && i + 1 < s && 56320 == (64512 & (o = t.charCodeAt(i + 1))) && (n = 65536 + (n - 55296 << 10) + (o - 56320),
                    i++),
                n < 128 ? e[a++] = n : n < 2048 ? (e[a++] = 192 | n >>> 6,
                    e[a++] = 128 | 63 & n) : n < 65536 ? (e[a++] = 224 | n >>> 12,
                    e[a++] = 128 | n >>> 6 & 63,
                    e[a++] = 128 | 63 & n) : (e[a++] = 240 | n >>> 18,
                    e[a++] = 128 | n >>> 12 & 63,
                    e[a++] = 128 | n >>> 6 & 63,
                    e[a++] = 128 | 63 & n);
            return e
        },
        e.buf2binstring = function (t) {
            return c(t, t.length)
        },
        e.binstring2buf = function (t) {
            for (var e = new r.Buf8(t.length), n = 0, o = e.length; n < o; n++)
                e[n] = t.charCodeAt(n);
            return e
        },
        e.buf2string = function (t, e) {
            var n, r, o, i, s = e || t.length,
                u = new Array(2 * s);
            for (r = 0,
                n = 0; n < s;)
                if ((o = t[n++]) < 128)
                    u[r++] = o;
                else if ((i = a[o]) > 4)
                u[r++] = 65533,
                n += i - 1;
            else {
                for (o &= 2 === i ? 31 : 3 === i ? 15 : 7; i > 1 && n < s;)
                    o = o << 6 | 63 & t[n++],
                    i--;
                i > 1 ? u[r++] = 65533 : o < 65536 ? u[r++] = o : (o -= 65536,
                    u[r++] = 55296 | o >> 10 & 1023,
                    u[r++] = 56320 | 1023 & o)
            }
            return c(u, r)
        },
        e.utf8border = function (t, e) {
            var n;
            for ((e = e || t.length) > t.length && (e = t.length),
                n = e - 1; n >= 0 && 128 == (192 & t[n]);)
                n--;
            return n < 0 ? e : 0 === n ? e : n + a[t[n]] > e ? n : e
        };
    return e;
}

function s_r(e = {}) {
    var o = s_o(),
        i = n_11(),
        a = n_12(),
        s = n_13(),
        c = n_3();

    var r, u = 0,
        l = 4,
        f = 0,
        p = -2,
        h = -1,
        d = 1,
        m = 4,
        b = 2,
        y = 8,
        g = 9,
        w = 286,
        v = 30,
        _ = 19,
        x = 2 * w + 1,
        D = 15,
        O = 3,
        k = 258,
        C = k + O + 1,
        S = 42,
        I = 103,
        T = 113,
        E = 666,
        j = 1,
        P = 2,
        A = 3,
        N = 4;

    function M(t, e) {
        return t.msg = c[e],
            e
    }

    function L(t) {
        return (t << 1) - (t > 4 ? 9 : 0)
    }

    function K(t) {
        for (var e = t.length; --e >= 0;)
            t[e] = 0
    }

    function z(t) {
        var e = t.state,
            n = e.pending;
        n > t.avail_out && (n = t.avail_out),
            0 !== n && (o.arraySet(t.output, e.pending_buf, e.pending_out, n, t.next_out),
                t.next_out += n,
                e.pending_out += n,
                t.total_out += n,
                t.avail_out -= n,
                e.pending -= n,
                0 === e.pending && (e.pending_out = 0))
    }

    function q(t, e) {
        i._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e),
            t.block_start = t.strstart,
            z(t.strm)
    }

    function R(t, e) {
        t.pending_buf[t.pending++] = e
    }

    function B(t, e) {
        t.pending_buf[t.pending++] = e >>> 8 & 255,
            t.pending_buf[t.pending++] = 255 & e
    }

    function V(t, e) {
        var n, r, o = t.max_chain_length,
            i = t.strstart,
            a = t.prev_length,
            s = t.nice_match,
            c = t.strstart > t.w_size - C ? t.strstart - (t.w_size - C) : 0,
            u = t.window,
            l = t.w_mask,
            f = t.prev,
            p = t.strstart + k,
            h = u[i + a - 1],
            d = u[i + a];
        t.prev_length >= t.good_match && (o >>= 2),
            s > t.lookahead && (s = t.lookahead);
        do {
            if (u[(n = e) + a] === d && u[n + a - 1] === h && u[n] === u[i] && u[++n] === u[i + 1]) {
                i += 2,
                    n++;
                do {} while (u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && u[++i] === u[++n] && i < p);
                if (r = k - (p - i),
                    i = p - k,
                    r > a) {
                    if (t.match_start = e,
                        a = r,
                        r >= s)
                        break;
                    h = u[i + a - 1],
                        d = u[i + a]
                }
            }
        } while ((e = f[e & l]) > c && 0 != --o);
        return a <= t.lookahead ? a : t.lookahead
    }

    function F(t) {
        var e, n, r, i, c, u, l, f, p, h, d = t.w_size;
        do {
            if (i = t.window_size - t.lookahead - t.strstart,
                t.strstart >= d + (d - C)) {
                o.arraySet(t.window, t.window, d, d, 0),
                    t.match_start -= d,
                    t.strstart -= d,
                    t.block_start -= d,
                    e = n = t.hash_size;
                do {
                    r = t.head[--e],
                        t.head[e] = r >= d ? r - d : 0
                } while (--n);
                e = n = d;
                do {
                    r = t.prev[--e],
                        t.prev[e] = r >= d ? r - d : 0
                } while (--n);
                i += d
            }
            if (0 === t.strm.avail_in)
                break;
            if (u = t.strm,
                l = t.window,
                f = t.strstart + t.lookahead,
                p = i,
                h = void 0,
                (h = u.avail_in) > p && (h = p),
                n = 0 === h ? 0 : (u.avail_in -= h,
                    o.arraySet(l, u.input, u.next_in, h, f),
                    1 === u.state.wrap ? u.adler = a(u.adler, l, h, f) : 2 === u.state.wrap && (u.adler = s(u.adler, l, h, f)),
                    u.next_in += h,
                    u.total_in += h,
                    h),
                t.lookahead += n,
                t.lookahead + t.insert >= O)
                for (c = t.strstart - t.insert,
                    t.ins_h = t.window[c],
                    t.ins_h = (t.ins_h << t.hash_shift ^ t.window[c + 1]) & t.hash_mask; t.insert && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[c + O - 1]) & t.hash_mask,
                        t.prev[c & t.w_mask] = t.head[t.ins_h],
                        t.head[t.ins_h] = c,
                        c++,
                        t.insert--,
                        !(t.lookahead + t.insert < O));)
            ;
        } while (t.lookahead < C && 0 !== t.strm.avail_in)
    }

    function U(t, e) {
        for (var n, r;;) {
            if (t.lookahead < C) {
                if (F(t),
                    t.lookahead < C && e === u)
                    return j;
                if (0 === t.lookahead)
                    break
            }
            if (n = 0,
                t.lookahead >= O && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask,
                    n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                    t.head[t.ins_h] = t.strstart),
                0 !== n && t.strstart - n <= t.w_size - C && (t.match_length = V(t, n)),
                t.match_length >= O)
                if (r = i._tr_tally(t, t.strstart - t.match_start, t.match_length - O),
                    t.lookahead -= t.match_length,
                    t.match_length <= t.max_lazy_match && t.lookahead >= O) {
                    t.match_length--;
                    do {
                        t.strstart++,
                            t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask,
                            n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                            t.head[t.ins_h] = t.strstart
                    } while (0 != --t.match_length);
                    t.strstart++
                } else
                    t.strstart += t.match_length,
                    t.match_length = 0,
                    t.ins_h = t.window[t.strstart],
                    t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
            else
                r = i._tr_tally(t, 0, t.window[t.strstart]),
                t.lookahead--,
                t.strstart++;
            if (r && (q(t, !1),
                    0 === t.strm.avail_out))
                return j
        }
        return t.insert = t.strstart < O - 1 ? t.strstart : O - 1,
            e === l ? (q(t, !0),
                0 === t.strm.avail_out ? A : N) : t.last_lit && (q(t, !1),
                0 === t.strm.avail_out) ? j : P
    }

    function G(t, e) {
        for (var n, r, o;;) {
            if (t.lookahead < C) {
                if (F(t),
                    t.lookahead < C && e === u)
                    return j;
                if (0 === t.lookahead)
                    break
            }
            if (n = 0,
                t.lookahead >= O && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask,
                    n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                    t.head[t.ins_h] = t.strstart),
                t.prev_length = t.match_length,
                t.prev_match = t.match_start,
                t.match_length = O - 1,
                0 !== n && t.prev_length < t.max_lazy_match && t.strstart - n <= t.w_size - C && (t.match_length = V(t, n),
                    t.match_length <= 5 && (t.strategy === d || t.match_length === O && t.strstart - t.match_start > 4096) && (t.match_length = O - 1)),
                t.prev_length >= O && t.match_length <= t.prev_length) {
                o = t.strstart + t.lookahead - O,
                    r = i._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - O),
                    t.lookahead -= t.prev_length - 1,
                    t.prev_length -= 2;
                do {
                    ++t.strstart <= o && (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[t.strstart + O - 1]) & t.hash_mask,
                        n = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h],
                        t.head[t.ins_h] = t.strstart)
                } while (0 != --t.prev_length);
                if (t.match_available = 0,
                    t.match_length = O - 1,
                    t.strstart++,
                    r && (q(t, !1),
                        0 === t.strm.avail_out))
                    return j
            } else if (t.match_available) {
                if ((r = i._tr_tally(t, 0, t.window[t.strstart - 1])) && q(t, !1),
                    t.strstart++,
                    t.lookahead--,
                    0 === t.strm.avail_out)
                    return j
            } else
                t.match_available = 1,
                t.strstart++,
                t.lookahead--
        }
        return t.match_available && (r = i._tr_tally(t, 0, t.window[t.strstart - 1]),
                t.match_available = 0),
            t.insert = t.strstart < O - 1 ? t.strstart : O - 1,
            e === l ? (q(t, !0),
                0 === t.strm.avail_out ? A : N) : t.last_lit && (q(t, !1),
                0 === t.strm.avail_out) ? j : P
    }

    function H(t, e, n, r, o) {
        this.good_length = t,
            this.max_lazy = e,
            this.nice_length = n,
            this.max_chain = r,
            this.func = o
    }

    function W(t) {
        var e;
        return t && t.state ? (t.total_in = t.total_out = 0,
            t.data_type = b,
            (e = t.state).pending = 0,
            e.pending_out = 0,
            e.wrap < 0 && (e.wrap = -e.wrap),
            e.status = e.wrap ? S : T,
            t.adler = 2 === e.wrap ? 0 : 1,
            e.last_flush = u,
            i._tr_init(e),
            f) : M(t, p)
    }

    function Y(t) {
        var e, n = W(t);
        return n === f && ((e = t.state).window_size = 2 * e.w_size,
                K(e.head),
                e.max_lazy_match = r[e.level].max_lazy,
                e.good_match = r[e.level].good_length,
                e.nice_match = r[e.level].nice_length,
                e.max_chain_length = r[e.level].max_chain,
                e.strstart = 0,
                e.block_start = 0,
                e.lookahead = 0,
                e.insert = 0,
                e.match_length = e.prev_length = O - 1,
                e.match_available = 0,
                e.ins_h = 0),
            n
    }

    function Q(t, e, n, r, i, a) {
        if (!t)
            return p;
        var s = 1;
        if (e === h && (e = 6),
            r < 0 ? (s = 0,
                r = -r) : r > 15 && (s = 2,
                r -= 16),
            i < 1 || i > g || n !== y || r < 8 || r > 15 || e < 0 || e > 9 || a < 0 || a > m)
            return M(t, p);
        8 === r && (r = 9);
        var c = new function () {
            this.strm = null,
                this.status = 0,
                this.pending_buf = null,
                this.pending_buf_size = 0,
                this.pending_out = 0,
                this.pending = 0,
                this.wrap = 0,
                this.gzhead = null,
                this.gzindex = 0,
                this.method = y,
                this.last_flush = -1,
                this.w_size = 0,
                this.w_bits = 0,
                this.w_mask = 0,
                this.window = null,
                this.window_size = 0,
                this.prev = null,
                this.head = null,
                this.ins_h = 0,
                this.hash_size = 0,
                this.hash_bits = 0,
                this.hash_mask = 0,
                this.hash_shift = 0,
                this.block_start = 0,
                this.match_length = 0,
                this.prev_match = 0,
                this.match_available = 0,
                this.strstart = 0,
                this.match_start = 0,
                this.lookahead = 0,
                this.prev_length = 0,
                this.max_chain_length = 0,
                this.max_lazy_match = 0,
                this.level = 0,
                this.strategy = 0,
                this.good_match = 0,
                this.nice_match = 0,
                this.dyn_ltree = new o.Buf16(2 * x),
                this.dyn_dtree = new o.Buf16(2 * (2 * v + 1)),
                this.bl_tree = new o.Buf16(2 * (2 * _ + 1)),
                K(this.dyn_ltree),
                K(this.dyn_dtree),
                K(this.bl_tree),
                this.l_desc = null,
                this.d_desc = null,
                this.bl_desc = null,
                this.bl_count = new o.Buf16(D + 1),
                this.heap = new o.Buf16(2 * w + 1),
                K(this.heap),
                this.heap_len = 0,
                this.heap_max = 0,
                this.depth = new o.Buf16(2 * w + 1),
                K(this.depth),
                this.l_buf = 0,
                this.lit_bufsize = 0,
                this.last_lit = 0,
                this.d_buf = 0,
                this.opt_len = 0,
                this.static_len = 0,
                this.matches = 0,
                this.insert = 0,
                this.bi_buf = 0,
                this.bi_valid = 0
        };
        return t.state = c,
            c.strm = t,
            c.wrap = s,
            c.gzhead = null,
            c.w_bits = r,
            c.w_size = 1 << c.w_bits,
            c.w_mask = c.w_size - 1,
            c.hash_bits = i + 7,
            c.hash_size = 1 << c.hash_bits,
            c.hash_mask = c.hash_size - 1,
            c.hash_shift = ~~((c.hash_bits + O - 1) / O),
            c.window = new o.Buf8(2 * c.w_size),
            c.head = new o.Buf16(c.hash_size),
            c.prev = new o.Buf16(c.w_size),
            c.lit_bufsize = 1 << i + 6,
            c.pending_buf_size = 4 * c.lit_bufsize,
            c.pending_buf = new o.Buf8(c.pending_buf_size),
            c.d_buf = 1 * c.lit_bufsize,
            c.l_buf = 3 * c.lit_bufsize,
            c.level = e,
            c.strategy = a,
            c.method = n,
            Y(t)
    }
    r = [new H(0, 0, 0, 0, function (t, e) {
            var n = 65535;
            for (n > t.pending_buf_size - 5 && (n = t.pending_buf_size - 5);;) {
                if (t.lookahead <= 1) {
                    if (F(t),
                        0 === t.lookahead && e === u)
                        return j;
                    if (0 === t.lookahead)
                        break
                }
                t.strstart += t.lookahead,
                    t.lookahead = 0;
                var r = t.block_start + n;
                if ((0 === t.strstart || t.strstart >= r) && (t.lookahead = t.strstart - r,
                        t.strstart = r,
                        q(t, !1),
                        0 === t.strm.avail_out))
                    return j;
                if (t.strstart - t.block_start >= t.w_size - C && (q(t, !1),
                        0 === t.strm.avail_out))
                    return j
            }
            return t.insert = 0,
                e === l ? (q(t, !0),
                    0 === t.strm.avail_out ? A : N) : (t.strstart > t.block_start && (q(t, !1),
                        t.strm.avail_out),
                    j)
        }), new H(4, 4, 8, 4, U), new H(4, 5, 16, 8, U), new H(4, 6, 32, 32, U), new H(4, 4, 16, 16, G), new H(8, 16, 32, 32, G), new H(8, 16, 128, 128, G), new H(8, 32, 128, 256, G), new H(32, 128, 258, 1024, G), new H(32, 258, 258, 4096, G)],

        e.deflateInit = function (t, e) {
            return Q(t, e, y, 15, 8, 0)
        },
        e.deflateInit2 = Q,
        e.deflateReset = Y,
        e.deflateResetKeep = W,
        e.deflateSetHeader = function (t, e) {
            return t && t.state ? 2 !== t.state.wrap ? p : (t.state.gzhead = e,
                f) : p
        },
        e.deflate = function (t, e) {
            var n, o, a, c;
            if (!t || !t.state || e > 5 || e < 0)
                return t ? M(t, p) : p;
            if (o = t.state,
                !t.output || !t.input && 0 !== t.avail_in || o.status === E && e !== l)
                return M(t, 0 === t.avail_out ? -5 : p);
            if (o.strm = t,
                n = o.last_flush,
                o.last_flush = e,
                o.status === S)
                if (2 === o.wrap)
                    t.adler = 0,
                    R(o, 31),
                    R(o, 139),
                    R(o, 8),
                    o.gzhead ? (R(o, (o.gzhead.text ? 1 : 0) + (o.gzhead.hcrc ? 2 : 0) + (o.gzhead.extra ? 4 : 0) + (o.gzhead.name ? 8 : 0) + (o.gzhead.comment ? 16 : 0)),
                        R(o, 255 & o.gzhead.time),
                        R(o, o.gzhead.time >> 8 & 255),
                        R(o, o.gzhead.time >> 16 & 255),
                        R(o, o.gzhead.time >> 24 & 255),
                        R(o, 9 === o.level ? 2 : o.strategy >= 2 || o.level < 2 ? 4 : 0),
                        R(o, 255 & o.gzhead.os),
                        o.gzhead.extra && o.gzhead.extra.length && (R(o, 255 & o.gzhead.extra.length),
                            R(o, o.gzhead.extra.length >> 8 & 255)),
                        o.gzhead.hcrc && (t.adler = s(t.adler, o.pending_buf, o.pending, 0)),
                        o.gzindex = 0,
                        o.status = 69) : (R(o, 0),
                        R(o, 0),
                        R(o, 0),
                        R(o, 0),
                        R(o, 0),
                        R(o, 9 === o.level ? 2 : o.strategy >= 2 || o.level < 2 ? 4 : 0),
                        R(o, 3),
                        o.status = T);
                else {
                    var h = y + (o.w_bits - 8 << 4) << 8;
                    h |= (o.strategy >= 2 || o.level < 2 ? 0 : o.level < 6 ? 1 : 6 === o.level ? 2 : 3) << 6,
                        0 !== o.strstart && (h |= 32),
                        h += 31 - h % 31,
                        o.status = T,
                        B(o, h),
                        0 !== o.strstart && (B(o, t.adler >>> 16),
                            B(o, 65535 & t.adler)),
                        t.adler = 1
                }
            if (69 === o.status)
                if (o.gzhead.extra) {
                    for (a = o.pending; o.gzindex < (65535 & o.gzhead.extra.length) && (o.pending !== o.pending_buf_size || (o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                            z(t),
                            a = o.pending,
                            o.pending !== o.pending_buf_size));)
                        R(o, 255 & o.gzhead.extra[o.gzindex]),
                        o.gzindex++;
                    o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                        o.gzindex === o.gzhead.extra.length && (o.gzindex = 0,
                            o.status = 73)
                } else
                    o.status = 73;
            if (73 === o.status)
                if (o.gzhead.name) {
                    a = o.pending;
                    do {
                        if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                                z(t),
                                a = o.pending,
                                o.pending === o.pending_buf_size)) {
                            c = 1;
                            break
                        }
                        c = o.gzindex < o.gzhead.name.length ? 255 & o.gzhead.name.charCodeAt(o.gzindex++) : 0,
                            R(o, c)
                    } while (0 !== c);
                    o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                        0 === c && (o.gzindex = 0,
                            o.status = 91)
                } else
                    o.status = 91;
            if (91 === o.status)
                if (o.gzhead.comment) {
                    a = o.pending;
                    do {
                        if (o.pending === o.pending_buf_size && (o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                                z(t),
                                a = o.pending,
                                o.pending === o.pending_buf_size)) {
                            c = 1;
                            break
                        }
                        c = o.gzindex < o.gzhead.comment.length ? 255 & o.gzhead.comment.charCodeAt(o.gzindex++) : 0,
                            R(o, c)
                    } while (0 !== c);
                    o.gzhead.hcrc && o.pending > a && (t.adler = s(t.adler, o.pending_buf, o.pending - a, a)),
                        0 === c && (o.status = I)
                } else
                    o.status = I;
            if (o.status === I && (o.gzhead.hcrc ? (o.pending + 2 > o.pending_buf_size && z(t),
                    o.pending + 2 <= o.pending_buf_size && (R(o, 255 & t.adler),
                        R(o, t.adler >> 8 & 255),
                        t.adler = 0,
                        o.status = T)) : o.status = T),
                0 !== o.pending) {
                if (z(t),
                    0 === t.avail_out)
                    return o.last_flush = -1,
                        f
            } else if (0 === t.avail_in && L(e) <= L(n) && e !== l)
                return M(t, -5);
            if (o.status === E && 0 !== t.avail_in)
                return M(t, -5);
            if (0 !== t.avail_in || 0 !== o.lookahead || e !== u && o.status !== E) {
                var d = 2 === o.strategy ? function (t, e) {
                    for (var n;;) {
                        if (0 === t.lookahead && (F(t),
                                0 === t.lookahead)) {
                            if (e === u)
                                return j;
                            break
                        }
                        if (t.match_length = 0,
                            n = i._tr_tally(t, 0, t.window[t.strstart]),
                            t.lookahead--,
                            t.strstart++,
                            n && (q(t, !1),
                                0 === t.strm.avail_out))
                            return j
                    }
                    return t.insert = 0,
                        e === l ? (q(t, !0),
                            0 === t.strm.avail_out ? A : N) : t.last_lit && (q(t, !1),
                            0 === t.strm.avail_out) ? j : P
                }(o, e) : 3 === o.strategy ? function (t, e) {
                    for (var n, r, o, a, s = t.window;;) {
                        if (t.lookahead <= k) {
                            if (F(t),
                                t.lookahead <= k && e === u)
                                return j;
                            if (0 === t.lookahead)
                                break
                        }
                        if (t.match_length = 0,
                            t.lookahead >= O && t.strstart > 0 && (r = s[o = t.strstart - 1]) === s[++o] && r === s[++o] && r === s[++o]) {
                            a = t.strstart + k;
                            do {} while (r === s[++o] && r === s[++o] && r === s[++o] && r === s[++o] && r === s[++o] && r === s[++o] && r === s[++o] && r === s[++o] && o < a);
                            t.match_length = k - (a - o),
                                t.match_length > t.lookahead && (t.match_length = t.lookahead)
                        }
                        if (t.match_length >= O ? (n = i._tr_tally(t, 1, t.match_length - O),
                                t.lookahead -= t.match_length,
                                t.strstart += t.match_length,
                                t.match_length = 0) : (n = i._tr_tally(t, 0, t.window[t.strstart]),
                                t.lookahead--,
                                t.strstart++),
                            n && (q(t, !1),
                                0 === t.strm.avail_out))
                            return j
                    }
                    return t.insert = 0,
                        e === l ? (q(t, !0),
                            0 === t.strm.avail_out ? A : N) : t.last_lit && (q(t, !1),
                            0 === t.strm.avail_out) ? j : P
                }(o, e) : r[o.level].func(o, e);
                if (d !== A && d !== N || (o.status = E),
                    d === j || d === A)
                    return 0 === t.avail_out && (o.last_flush = -1),
                        f;
                if (d === P && (1 === e ? i._tr_align(o) : 5 !== e && (i._tr_stored_block(o, 0, 0, !1),
                            3 === e && (K(o.head),
                                0 === o.lookahead && (o.strstart = 0,
                                    o.block_start = 0,
                                    o.insert = 0))),
                        z(t),
                        0 === t.avail_out))
                    return o.last_flush = -1,
                        f
            }
            return e !== l ? f : o.wrap <= 0 ? 1 : (2 === o.wrap ? (R(o, 255 & t.adler),
                    R(o, t.adler >> 8 & 255),
                    R(o, t.adler >> 16 & 255),
                    R(o, t.adler >> 24 & 255),
                    R(o, 255 & t.total_in),
                    R(o, t.total_in >> 8 & 255),
                    R(o, t.total_in >> 16 & 255),
                    R(o, t.total_in >> 24 & 255)) : (B(o, t.adler >>> 16),
                    B(o, 65535 & t.adler)),
                z(t),
                o.wrap > 0 && (o.wrap = -o.wrap),
                0 !== o.pending ? f : 1)
        },
        e.deflateEnd = function (t) {
            var e;
            return t && t.state ? (e = t.state.status) !== S && 69 !== e && 73 !== e && 91 !== e && e !== I && e !== T && e !== E ? M(t, p) : (t.state = null,
                e === T ? M(t, -3) : f) : p
        },
        e.deflateSetDictionary = function (t, e) {
            var n, r, i, s, c, u, l, h, d = e.length;
            if (!t || !t.state)
                return p;
            if (2 === (s = (n = t.state).wrap) || 1 === s && n.status !== S || n.lookahead)
                return p;
            for (1 === s && (t.adler = a(t.adler, e, d, 0)),
                n.wrap = 0,
                d >= n.w_size && (0 === s && (K(n.head),
                        n.strstart = 0,
                        n.block_start = 0,
                        n.insert = 0),
                    h = new o.Buf8(n.w_size),
                    o.arraySet(h, e, d - n.w_size, n.w_size, 0),
                    e = h,
                    d = n.w_size),
                c = t.avail_in,
                u = t.next_in,
                l = t.input,
                t.avail_in = d,
                t.next_in = 0,
                t.input = e,
                F(n); n.lookahead >= O;) {
                r = n.strstart,
                    i = n.lookahead - (O - 1);
                do {
                    n.ins_h = (n.ins_h << n.hash_shift ^ n.window[r + O - 1]) & n.hash_mask,
                        n.prev[r & n.w_mask] = n.head[n.ins_h],
                        n.head[n.ins_h] = r,
                        r++
                } while (--i);
                n.strstart = r,
                    n.lookahead = O - 1,
                    F(n)
            }
            return n.strstart += n.lookahead,
                n.block_start = n.strstart,
                n.insert = n.lookahead,
                n.lookahead = 0,
                n.match_length = n.prev_length = O - 1,
                n.match_available = 0,
                t.next_in = u,
                t.input = l,
                t.avail_in = c,
                n.wrap = s,
                f
        },
        e.deflateInfo = "pako deflate (from Nodeca project)";
    return e;
}

function Get_s(e = {}) {
    var r = s_r(),
        o = s_o(),
        i = s_i(),
        a = n_3(),
        s = s_s(),
        c = Object.prototype.toString,
        u = 0,
        l = -1,
        f = 0,
        p = 8;

    function h(t) {
        if (!(this instanceof h))
            return new h(t);
        this.options = o.assign({
            level: l,
            method: p,
            chunkSize: 16384,
            windowBits: 15,
            memLevel: 8,
            strategy: f,
            to: ""
        }, t || {});
        var e = this.options;
        e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0 && e.windowBits < 16 && (e.windowBits += 16),
            this.err = 0,
            this.msg = "",
            this.ended = !1,
            this.chunks = [],
            this.strm = new s,
            this.strm.avail_out = 0;
        var n = r.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
        if (n !== u)
            throw new Error(a[n]);
        if (e.header && r.deflateSetHeader(this.strm, e.header),
            e.dictionary) {
            var d;
            if (d = "string" == typeof e.dictionary ? i.string2buf(e.dictionary) : "[object ArrayBuffer]" === c.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary,
                (n = r.deflateSetDictionary(this.strm, d)) !== u)
                throw new Error(a[n]);
            this._dict_set = !0
        }
    }

    function d(t, e) {
        var n = new h(e);
        if (n.push(t, !0),
            n.err)
            throw n.msg || a[n.err];
        return n.result
    }
    h.prototype.push = function (t, e) {
            var n, a, s = this.strm,
                l = this.options.chunkSize;
            if (this.ended)
                return !1;
            a = e === ~~e ? e : !0 === e ? 4 : 0,
                "string" == typeof t ? s.input = i.string2buf(t) : "[object ArrayBuffer]" === c.call(t) ? s.input = new Uint8Array(t) : s.input = t,
                s.next_in = 0,
                s.avail_in = s.input.length;
            do {
                if (0 === s.avail_out && (s.output = new o.Buf8(l),
                        s.next_out = 0,
                        s.avail_out = l),
                    1 !== (n = r.deflate(s, a)) && n !== u)
                    return this.onEnd(n),
                        this.ended = !0,
                        !1;
                0 !== s.avail_out && (0 !== s.avail_in || 4 !== a && 2 !== a) || ("string" === this.options.to ? this.onData(i.buf2binstring(o.shrinkBuf(s.output, s.next_out))) : this.onData(o.shrinkBuf(s.output, s.next_out)))
            } while ((s.avail_in > 0 || 0 === s.avail_out) && 1 !== n);
            return 4 === a ? (n = r.deflateEnd(this.strm),
                this.onEnd(n),
                this.ended = !0,
                n === u) : 2 !== a || (this.onEnd(u),
                s.avail_out = 0,
                !0)
    },
    h.prototype.onData = function (t) {
        this.chunks.push(t)
    },
    h.prototype.onEnd = function (t) {
        t === u && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
            this.chunks = [],
            this.err = t,
            this.msg = this.strm.msg
    },
    e.Deflate = h,
    e.deflate = d,
    e.deflateRaw = function (t, e) {
        return (e = e || {}).raw = !0,
            d(t, e)
    },
    e.gzip = function (t, e) {
        return (e = e || {}).gzip = !0,
            d(t, e)
    };
    return e;
}

var s = Get_s();
