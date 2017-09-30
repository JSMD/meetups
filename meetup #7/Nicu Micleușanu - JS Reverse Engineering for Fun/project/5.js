const render = (data) => {

	V = (x, y, o) => o = {
		x,
		y,
		l: Math.sqrt(x * x + y * y),
		a: v => V(x + v.x, y + v.y),
		s: v => o.a(v.m(-1)),
		m: f => V(x * f, y * f),
		t: r => V(x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)),
		c: v => x * v.y - y * v.x,
		toString: _ => x + ',' + y
	};

	const setAttributes = (element, attributes) => {

		Object.keys(attributes).forEach((attribute) => {
			element.setAttribute(attribute, attributes[attribute]);
		});
	};

	const createElement = (tagName, attributes) => {

		const element = document.createElementNS('http://www.w3.org/2000/svg', tagName);

		setAttributes(element, attributes);

		return element;
	};

	const cloneElement = (element, attributes) => {

		const clone = element.cloneNode();

		setAttributes(clone, attributes);

		return clone;
	};

	const createPath = (attributes) => {

		return createElement('path', {
			...attributes,
			fill: 'none'
		});
	};

	w = h = -(x = y = 1 / 0);

	G = data.map((a, g) => (g = V(...a)) && (u = (g.r = a[2]) + 5, x = Math.min(x, g.x - u), y = Math.min(y, g.y - u), w = Math.max(w, g.x + u), h = Math.max(h, g.y + u)) && g);

	I = document.appendChild.bind(document.body.appendChild(createElement('svg', {
		width: w - x,
		height: h - y
	})).appendChild(createElement('g', {
		transform: `translate(${-x},${h})scale(1,-1)`
	})));

	L = (c) => (h = G.length) && G.map((g, i) => c(G[i], G[i ? i - 1 : h - 1], G[(i + 1) % h])) && L;

	l = '';

	L((g, p, n) => g.f = p.s(g).c(n.s(g)) > 0)((g, a, n) => {
		d = g.s(n), y = x = 1 / d.l;
		g.f != n.f ? (a = Math.asin((g.r + n.r) * x), g.f ? (x = -x, a = -a) : (y = -y)) : (a = Math.asin((g.r - n.r) * x), g.f && (x = y = -x, a = -a));
		t = d.t(a + Math.PI / 2);
		g.o = t.m(x * g.r).a(g);
		n.i = t.m(y * n.r).a(n)
	})((g, p, n) => {
		z = '#888';
		d = (l, s, e) => `A${g.r},${g.r} 0 ${1*l},${1*s} ${e}`;
		e = (f, r) => createElement('circle', {
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
		g.g = I(createPath({
			d: `M${g.i}${w}${d(!g.k,!g.f,g.i)}`,
			stroke: z,
			'stroke-width': 5
		}));
		g.h = I(cloneElement(g.g, {
			d: `M${g.i}${g.j}`,
			stroke: '#222'
		}));
		I(e('#666', g.r - 4.5));
		I(e(z, 3))
	});

	t = e => e.getTotalLength(), u = 'stroke-dasharray', v = 'stroke-dashoffset', f = G[0];

	l = I(cloneElement(f.h, {
		d: 'M' + f.i + l,
		'stroke-width': 2
	}));

	s = f.w = t(l) / Math.round(t(l) / (4 * Math.PI)) / 2;

	X = 8 * s;
	Y = f.v = 0;

	L((g, p) => {
		g.g.setAttribute(u, s);
		g.h.setAttribute(u, s);
		g == f || (g.w = p.w + t(p.h), g.v = p.v + t(p.h));
		g.g.setAttribute(v, g.w);
		g.h.setAttribute(v, g.v);
		g.h.appendChild(cloneElement(g.g.appendChild(createElement('animate', {
			attributeName: v,
			from: g.w + X,
			to: g.w + Y,
			repeatCount: 'indefinite',
			dur: '1s'
		})), {
			from: g.v + X,
			to: g.v + Y
		}));
	});
};