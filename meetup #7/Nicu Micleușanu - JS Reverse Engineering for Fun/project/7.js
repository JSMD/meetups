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

	let x = Infinity;
	let y = Infinity;
	let w = -Infinity;
	let h = -Infinity;

	const gears = data.map((params) => {

		const gear = new Vector(...params);

		gear.r = params[2];

		const unit = params[2] + 5;

		x = Math.min(x, gear.x - unit);
		y = Math.min(y, gear.y - unit);
		w = Math.max(w, gear.x + unit);
		h = Math.max(h, gear.y + unit);

		return gear;
	});

	w -= x;
	h -= y;

	const svg = createElement('svg', {
		width: w,
		height: h,
		viewBox: `${x} ${y} ${w} ${h}`,
		transform: `scale(1,-1)`
	});

	document.body.appendChild(svg);

	L = (c) => (h = gears.length) && gears.map((g, i) => c(gears[i], gears[i ? i - 1 : h - 1], gears[(i + 1) % h])) && L;

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
		svg.appendChild(e(z, g.r - 1.5));
		g.g = svg.appendChild(createPath({
			d: `M${g.i}${w}${d(!g.k,!g.f,g.i)}`,
			stroke: z,
			'stroke-width': 5
		}));
		g.h = svg.appendChild(cloneElement(g.g, {
			d: `M${g.i}${g.j}`,
			stroke: '#222'
		}));
		svg.appendChild(e('#666', g.r - 4.5));
		svg.appendChild(e(z, 3));
	});

	t = e => e.getTotalLength(), u = 'stroke-dasharray', v = 'stroke-dashoffset', f = gears[0];

	l = svg.appendChild(cloneElement(f.h, {
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