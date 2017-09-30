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

class Gear {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    getVector() {

        return new Vector(this.x, this.y);
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

const createCircle = (cx, cy, r, fill) => {

    return createElement('circle', {
        cx,
        cy,
        r,
        fill
    });
};

const loopGears = (gears, callback) => {

    const length = gears.length;

    gears.forEach((gear, index) => {

        const prevGear = gears[(length + index - 1) % length];
        const nextGear = gears[(index + 1) % length];

        callback(gear, prevGear, nextGear);
    });
};

const arcDescription = (radius, largeArcFlag, sweepFlag, endVector) => {

    return `A${radius} ${radius} 0 ${+largeArcFlag} ${+sweepFlag} ${endVector}`;
};

const renderGears = (data) => {

    let x = Infinity;
    let y = Infinity;
    let w = -Infinity;
    let h = -Infinity;

    const gears = data.map((params) => {

        const gear = new Gear(...params);
        const unit = params[2] + 5;

        x = Math.min(x, gear.x - unit);
        y = Math.min(y, gear.y - unit);
        w = Math.max(w, gear.x + unit);
        h = Math.max(h, gear.y + unit);

        return gear;
    });

    const firstGear = gears[0];

    w -= x;
    h -= y;

    const svg = createElement('svg', {
        width: w,
        height: h,
        viewBox: `${x} ${y} ${w} ${h}`,
        transform: `scale(1,-1)`
    });

    let chainPath = '';

    loopGears(gears, (gear, prevGear, nextGear) => {

        const gearVector = gear.getVector();
        const prevGearVector = prevGear.getVector().subtract(gearVector);
        const nextGearVector = nextGear.getVector().subtract(gearVector);

        gear.sweep = (prevGearVector.cross(nextGearVector) > 0);
    });

    loopGears(gears, (gear, prevGear, nextGear) => {

        const diffVector = gear.getVector().subtract(nextGear.getVector());

        let angle = 0;
        let x = 1 / diffVector.length;
        let y = x;

        if (gear.sweep === nextGear.sweep) {

            angle = Math.asin((gear.radius - nextGear.radius) * x);

            if (gear.sweep) {
                x = -x;
                y = -y;
                angle = -angle;
            }
        } else {

            angle = Math.asin((gear.radius + nextGear.radius) * x);

            if (gear.sweep) {
                x = -x;
                angle = -angle;
            } else {
                y = -y;
            }
        }

        const perpendicularVector = diffVector.rotate(angle + Math.PI / 2);

        gear.out = perpendicularVector.multiply(x * gear.radius).add(gear.getVector());
        nextGear.in = perpendicularVector.multiply(y * nextGear.radius).add(nextGear.getVector());
    });

    loopGears(gears, (gear, prevGear, nextGear) => {

        const largeArcFlag = (prevGear.out.subtract(nextGear.in).length < gear.in.subtract(gear.out).length);
        const arcPath = arcDescription(gear.radius, largeArcFlag, !gear.sweep, gear.out);

        const gearExterior = createCircle(gear.x, gear.y, gear.radius - 1.5, '#888');
        const gearInterior = createCircle(gear.x, gear.y, gear.radius - 4.5, '#666');
        const gearCenter = createCircle(gear.x, gear.y, 3, '#888');

        const gearTeeth = createPath({
            d: `M${gear.in}${arcPath}${arcDescription(gear.radius, !largeArcFlag, !gear.sweep, gear.in)}`,
            stroke: '#888',
            'stroke-width': 5
        });

        const chainParts = cloneElement(gearTeeth, {
            d: `M${gear.in}${arcPath}L${nextGear.in}`,
            stroke: '#222'
        });

        gear.teeth = gearTeeth;
        gear.chainParts = chainParts;

        chainPath += `${arcPath}L${nextGear.in}`;

        svg.appendChild(gearExterior);
        svg.appendChild(gearInterior);
        svg.appendChild(gearCenter);
        svg.appendChild(gearTeeth);
        svg.appendChild(chainParts);
    });

    const chain = cloneElement(firstGear.chainParts, {
        d: 'M' + firstGear.in + chainPath,
        'stroke-width': 2
    });

    const chainLength = chain.getTotalLength();
    const chainUnit = chainLength / Math.round(chainLength / (4 * Math.PI)) / 2;
    const animationOffset = 8 * chainUnit;

    loopGears(gears, (gear, prevGear) => {

        if (gear === firstGear) {
            gear.teethOffset = chainUnit;
            gear.chainOffset = 0;
        } else {
            gear.teethOffset = prevGear.teethOffset + prevGear.chainParts.getTotalLength();
            gear.chainOffset = prevGear.chainOffset + prevGear.chainParts.getTotalLength();
        }

        setAttributes(gear.teeth, {
            'stroke-dasharray': chainUnit,
            'stroke-dashoffset': gear.teethOffset
        });

        setAttributes(gear.chainParts, {
            'stroke-dasharray': chainUnit,
            'stroke-dashoffset': gear.chainOffset
        });

        const animate = createElement('animate', {
            attributeName: 'stroke-dashoffset',
            from: gear.teethOffset + animationOffset,
            to: gear.teethOffset,
            repeatCount: 'indefinite',
            dur: '1s'
        });

        const cloneAnimate = cloneElement(animate, {
            from: gear.chainOffset + animationOffset,
            to: gear.chainOffset
        });

        gear.teeth.appendChild(animate);
        gear.chainParts.appendChild(cloneAnimate);
    });

    svg.appendChild(chain);
    document.body.appendChild(svg);
};