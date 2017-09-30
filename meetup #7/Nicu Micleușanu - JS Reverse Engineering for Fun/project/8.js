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

	const loop = (callback) => {

		const length = gears.length;

		gears.forEach((gear, index) => {

			const prevGear = gears[(length + index - 1) % length];
			const nextGear = gears[(index + 1) % length];

			callback(gear, prevGear, nextGear);
		});
	};

	l = '';

	loop((gear, prevGear, nextGear) => {
		gear.f = prevGear.subtract(gear).cross(nextGear.subtract(gear)) > 0;
	});

	loop((gear, prevGear, nextGear) => {
		d = gear.subtract(nextGear), y = x = 1 / d.length;
		gear.f != nextGear.f ? (prevGear = Math.asin((gear.r + nextGear.r) * x), gear.f ? (x = -x, prevGear = -prevGear) : (y = -y)) : (prevGear = Math.asin((gear.r - nextGear.r) * x), gear.f && (x = y = -x, prevGear = -prevGear));
		t = d.rotate(prevGear + Math.PI / 2);
		gear.o = t.multiply(x * gear.r).add(gear);
		nextGear.i = t.multiply(y * nextGear.r).add(nextGear)
	});

	loop((gear, prevGear, nextGear) => {
		z = '#888';
		d = (l, s, e) => `A${gear.r},${gear.r} 0 ${1*l},${1*s} ${e}`;
		e = (f, r) => createElement('circle', {
			cx: gear.x,
			cy: gear.y,
			r,
			fill: f
		});
		gear.k = prevGear.o.subtract(nextGear.i).length < gear.i.subtract(gear.o).length;
		w = d(gear.k, !gear.f, gear.o);
		gear.j = `${w}L${nextGear.i}`;
		l += gear.j;
		svg.appendChild(e(z, gear.r - 1.5));
		gear.g = svg.appendChild(createPath({
			d: `M${gear.i}${w}${d(!gear.k,!gear.f,gear.i)}`,
			stroke: z,
			'stroke-width': 5
		}));
		gear.h = svg.appendChild(cloneElement(gear.g, {
			d: `M${gear.i}${gear.j}`,
			stroke: '#222'
		}));
		svg.appendChild(e('#666', gear.r - 4.5));
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

	loop((gear, prevGear) => {
		gear.g.setAttribute(u, s);
		gear.h.setAttribute(u, s);
		gear == f || (gear.w = prevGear.w + t(prevGear.h), gear.v = prevGear.v + t(prevGear.h));
		gear.g.setAttribute(v, gear.w);
		gear.h.setAttribute(v, gear.v);
		gear.h.appendChild(cloneElement(gear.g.appendChild(createElement('animate', {
			attributeName: v,
			from: gear.w + X,
			to: gear.w + Y,
			repeatCount: 'indefinite',
			dur: '1s'
		})), {
			from: gear.v + X,
			to: gear.v + Y
		}));
	});
};