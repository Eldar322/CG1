var maxX = 95.047;
var maxY = 100.000;
var maxZ = 108.883;

var toTemp = function (c) {
    var t;
    if (c > 0.008856)
        t = Math.pow(c, 1 / 3);
    else
        t = (7.787 * c) + (16 / 116);

    return t;
};

var toTempReverse = function (c) {
    var t;

    if (Math.pow(c, 3) > 0.008856)
        t = Math.pow(c, 3);
    else
        t = (c - 16 / 116) / 7.787;

    return t;
};

var xyzToLab = function(xyz){
    var x = xyz.x / maxX;
    var y = xyz.y / maxY;
    var z = xyz.z / maxZ;

    x = toTemp(x);
    y = toTemp(y);
    z = toTemp(z);

    return {
        type : 'lab',
        l : ( 116 * y ) - 16,
        a : 500 * ( x - y ),
        b: 200 * ( y - z )
    };
};

var labToXYZ = function (lab) {
    var y = (lab.l + 16) / 116;
    var x = lab.a / 500 + y;
    var z = y - lab.b / 200;

    y = toTempReverse(y);
    x = toTempReverse(x);
    z = toTempReverse(z);

    return {
        type: 'xyz',
        x: maxX * x,
        y: maxY * y,
        z: maxZ * z
    };
};

var toTempRGB = function (c) {
    var t;

    if (c > 0.0031308) 
        t = 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    else 
        t = 12.92 * c;
    return t;
}

var toTempRGBReverse = function (c) {
    var t;

    if (c > 0.04045)
        t = Math.pow(((c + 0.055) / 1.055), 2.4);
    else
        t = c / 12.92;

    return t;
}

var xyzToRGB = function (xyz) {
    var x = xyz.x / 100;
    var y = xyz.y / 100;
    var z = xyz.z / 100;

    var r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    var g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    var b = x * 0.0557 + y * -0.2040 + z * 1.0570;

    r = toTempRGB(r);
    g = toTempRGB(g);
    b = toTempRGB(b);

    return {
        type: 'rgb',
        r: r * 255,
        g: g * 255,
        b: b * 255
    };
};

var rgbToXYZ = function (rgb) {
    var r = (rgb.r / 255);
    var g = (rgb.g / 255);
    var b = (rgb.b / 255);

    r = toTempRGBReverse(r);
    g = toTempRGBReverse(g);
    b = toTempRGBReverse(b);

    r = r * 100;
    g = g * 100;
    b = b * 100;

    return {
        type: 'xyz',
        x: r * 0.4124 + g * 0.3576 + b * 0.1805,
        y: r * 0.2126 + g * 0.7152 + b * 0.0722,
        z: r * 0.0193 + g * 0.1192 + b * 0.9505
    };
};

var rgbToCMY = function (rgb) {
    return {
        type: 'cmy',
        c: 1 - (rgb.r / 255),
        m: 1 - (rgb.g / 255),
        y: 1 - (rgb.b / 255)
    }
};

var cmyToRgb = function (cmy) {
    return {
        type : 'rgb',
        r: (1 - cmy.c) * 255,
        g: (1 - cmy.m) * 255,
        b: (1 - cmy.y) * 255
    }
};

var equals = function (a, b) {
    return (Math.abs(a - b) < 0.00000001);  
}

var rgbToHLS = function (rgb) {
    var r = (rgb.r / 255);
    var g = (rgb.g / 255);
    var b = (rgb.b / 255);

    var min = Math.min(r, g, b);    
    var max = Math.max(r, g, b);    
    var delta = max - min;

    var h = 0, l, s;
    l = (max + min) / 2;

    if (equals(delta, 0))                     
    {
        h = 0;
        s = 0;
    }
    else                                    
    {
        if (l < 0.5)
            s = delta / (max + min);
        else
            s = delta / (2 - max - min);

        deltaR = (((max - r) / 6) + (delta / 2)) / delta;
        deltaG = (((max - g) / 6) + (delta / 2)) / delta;
        deltaB = (((max - b) / 6) + (delta / 2)) / delta;

        if (equals(r, max))
            h = deltaB - deltaG;
        else if (equals(g, max))
            h = (1 / 3) + deltaR - deltaB;
        else if (equals(b, max))
            h = (2 / 3) + deltaG - deltaR;

        if (!equals(h, 0) && h < 0)
            h += 1;
        if (!equals(h, 1) && h > 1)
            h -= 1;

        return {
            type: 'hls',
            h: h,
            l: l,
            s: s
        }
    }
}

var hueToRGB = function (v1, v2, vH) {
    var t = vH;
    if (!equals(vH, 0) && vH < 0)
        t = vH + 1;
    if (!equals(vH, 0) && vH > 1)
        t = vH - 1;

    if (!equals(6 * t, 1) && (6 * t) < 1)
        return v1 + (v2 - v1) * 6 * t;
    if (!equals(2 * t, 1) && (2 * t) < 1)
        return v2;
    if (!equals(3 * t, 2) && (3 * t) < 2)
        return v1 + (v2 - v1) * ((2 / 3) - t) * 6;
    return v1;
}

var hlsToRGB = function (hls) {
    var r, g, b;

    if (equals(hls.s, 0))                      
    {
        r = hls.l * 255;
        g = hls.l * 255;
        b = hls.l * 255;
    }
    else {
        var tmp1, tmp2;
        if (hls.l < 0.5)
            tmp2 = hls.l * (1 + hls.s);
        else
            tmp2 = (hls.l + hls.s) - (hls.s * hls.l);

        tmp1 = 2 * hls.l - tmp2;

        r = 255 * hueToRGB(tmp1, tmp2, hls.h + (1 / 3));
        g = 255 * hueToRGB(tmp1, tmp2, hls.h);
        b = 255 * hueToRGB(tmp1, tmp2, hls.h - (1 / 3));
    }
    return {
        type: 'rgb',
        r: r,
        g: g,
        b: b
    };
};

var convert = function (color, to) {
    if (color.type === to)
        return color;

    switch (color.type) {
        case 'rgb':
            switch (to) {
                case 'xyz':
                    return rgbToXYZ(color);
                case 'cmy':
                    return rgbToCMY(color);
                case 'hls':
                    return rgbToHLS(color);
                case 'lab':
                    return convert(rgbToXYZ(color), to);
            }
        case 'hls':
            return convert(hlsToRGB(color), to);
        case 'xyz':
            if (to === 'lab')
                return xyzToLab(color);
            else
                return convert(xyzToRGB(color), to);
        case 'lab':
            return convert(labToXYZ(color), to);
        case 'cmy':
            return convert(cmyToRgb(color), to);
    }
    return color;
};

