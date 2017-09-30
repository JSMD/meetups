class Vector {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.length = Math.sqrt(x * x + y * y);
	}

	add(vector) {

		return new Vector(this.x + vector.x, this.y + vector.y);
	}

	subtract(vector) {

		return new Vector(this.x - vector.x, this.y - vector.y);
	}

	multiply(scalar) {

		return new Vector(this.x * scalar, this.y * scalar);
	}

	rotate(radians) {

		const cos = Math.cos(radians);
		const sin = Math.sin(radians);

		return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
	}

	cross(vector) {

		return this.x * vector.y - this.y * vector.x;
	}

	toString() {

		return `${this.x},${this.y}`;
	}
}

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

const render = (data) => {

	w = h = -(x = y = 1 / 0);

	G = data.map((a, g) => (g = new Vector(...a)) && (u = (g.r = a[2]) + 5, x = Math.min(x, g.x - u), y = Math.min(y, g.y - u), w = Math.max(w, g.x + u), h = Math.max(h, g.y + u)) && g);

	I = document.appendChild.bind(document.body.appendChild(createElement('svg', {
		width: w - x,
		height: h - y
	})).appendChild(createElement('g', {
		transform: `translate(${-x},${h})scale(1,-1)`
	})));

	L = (c) => (h = G.length) && G.map((g, i) => c(G[i], G[i ? i - 1 : h - 1], G[(i + 1) % h])) && L;

	l = '';

	L((g, p, n) => g.f = p.subtract(g).cross(n.subtract(g)) > 0)((g, a, n) => {
		d = g.subtract(n), y = x = 1 / d.length;
		g.f != n.f ? (a = Math.asin((g.r + n.r) * x), g.f ? (x = -x, a = -a) : (y = -y)) : (a = Math.asin((g.r - n.r) * x), g.f && (x = y = -x, a = -a));
		t = d.rotate(a + Math.PI / 2);
		g.o = t.multiply(x * g.r).add(g);
		n.i = t.multiply(y * n.r).add(n)
	})((g, p, n) => {
		z = '#888';
		d = (l, s, e) => `A${g.r},${g.r} 0 ${1*l},${1*s} ${e}`;
		e = (f, r) => createElement('circle', {
			cx: g.x,
			cy: g.y,
			r,
			fill: f
		});
		g.k = p.o.subtract(n.i).length < g.i.subtract(g.o).length;
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