R = g => {
	with(Math) {

		V = (x, y, o) => o = {
			x,
			y,
			l: sqrt(x * x + y * y),
			a: v => V(x + v.x, y + v.y),
			s: v => o.a(v.m(-1)),
			m: f => V(x * f, y * f),
			t: r => V(x * cos(r) - y * sin(r), x * sin(r) + y * cos(r)),
			c: v => x * v.y - y * v.x,
			toString: _ => x + ',' + y
		};

		k = document;
		a = 'appendChild';
		b = 'setAttribute';

		S = (e, a) => Object.keys(a).map(n => e[b](n, a[n])) && e;
		T = (t, a) => S(k.createElementNS('http://www.w3.org/2000/svg', t), a);
		C = (e, a) => S(e.cloneNode(), a);
		P = a => T('path', (a.fill = 'none', a));

		w = h = -(x = y = 1 / 0);

		G = g.map((a, g) => (g = V(...a)) && (u = (g.r = a[2]) + 5, x = min(x, g.x - u), y = min(y, g.y - u), w = max(w, g.x + u), h = max(h, g.y + u)) && g);

		I = k[a].bind(k.body[a](T('svg', {
			width: w - x,
			height: h - y
		}))[a](T('g', {
			transform: `translate(${-x},${h})scale(1,-1)`
		})));

		L = (c) => (h = G.length) && G.map((g, i) => c(G[i], G[i ? i - 1 : h - 1], G[(i + 1) % h])) && L;

		l = '';

		L((g, p, n) => g.f = p.s(g).c(n.s(g)) > 0)((g, a, n) => {
			d = g.s(n), y = x = 1 / d.l;
			g.f != n.f ? (a = asin((g.r + n.r) * x), g.f ? (x = -x, a = -a) : (y = -y)) : (a = asin((g.r - n.r) * x), g.f && (x = y = -x, a = -a));
			t = d.t(a + PI / 2);
			g.o = t.m(x * g.r).a(g);
			n.i = t.m(y * n.r).a(n)
		})((g, p, n) => {
			z = '#888';
			d = (l, s, e) => `A${g.r},${g.r} 0 ${1*l},${1*s} ${e}`;
			e = (f, r) => T('circle', {
				cx: g.x,
				cy: g.y,
				r,
				fill: f
			});
			g.k = p.o.s(n.i).l < g.i.s(g.o).l;
			w = d(g.k, !g.f, g.o);
			g.j = `${w}L${n.i}`;
			l += g.j;
			I(e(z, g.r - 1.5));
			g.g = I(P({
				d: `M${g.i}${w}${d(!g.k,!g.f,g.i)}`,
				stroke: z,
				'stroke-width': 5
			}));
			g.h = I(C(g.g, {
				d: `M${g.i}${g.j}`,
				stroke: '#222'
			}));
			I(e('#666', g.r - 4.5));
			I(e(z, 3))
		});

		t = e => e.getTotalLength(), u = 'stroke-dasharray', v = 'stroke-dashoffset', f = G[0];

		l = I(C(f.h, {
			d: 'M' + f.i + l,
			'stroke-width': 2
		}));

		s = f.w = t(l) / round(t(l) / (4 * PI)) / 2;

		X = 8 * s;
		Y = f.v = 0;

		L((g, p) => {
			g.g[b](u, s);
			g.h[b](u, s);
			g == f || (g.w = p.w + t(p.h), g.v = p.v + t(p.h));
			g.g[b](v, g.w);
			g.h[b](v, g.v);
			g.h[a](C(g.g[a](T('animate', {
				attributeName: v,
				from: g.w + X,
				to: g.w + Y,
				repeatCount: 'indefinite',
				dur: '1s'
			})), {
				from: g.v + X,
				to: g.v + Y
			}))
		})
	}
}