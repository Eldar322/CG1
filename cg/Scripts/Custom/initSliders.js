var msg = $('.alert');

var RGBChanging = false;
var RGBChange = function (data, color) {
    if (RGBChanging)
        return;

    RGBChanging = true;


    if (color != null) {
        rgb.r.setValue(color.r);
        rgb.g.setValue(color.g);
        rgb.b.setValue(color.b);
        if (color.msg == null) {
            msg.text("");
        } else {
            msg.text(color.msg);
        }
        $('#RGBColor').css('background', 'rgb(' + rgb.r.getValue() + ',' + rgb.g.getValue() + ',' + rgb.b.getValue() + ')');
        RGBChanging = false;
        return;
    }

    msg.text("");

    $('#RGBColor').css('background', 'rgb(' + rgb.r.getValue() + ',' + rgb.g.getValue() + ',' + rgb.b.getValue() + ')');

    var rgbColor = {
        type: 'rgb',
        r: rgb.r.getValue(),
        g: rgb.g.getValue(),
        b: rgb.b.getValue()      
    };

    HLSChange(null, convert(rgbColor, 'hls'));

    LabChange(null, convert(rgbColor, 'lab'));
    
    CMYChange(null, convert(rgbColor, 'cmy'));

    RGBChanging = false;
};

var HLSChanging = false;
var HLSChange = function (data, color) {
    if (HLSChanging)
        return;

    HLSChanging = true;

    if (color != null) {
        hls.h.setValue(color.h);
        hls.l.setValue(color.l);
        hls.s.setValue(color.s);
        if (color.msg == null) {
            msg.text("");
        } else {
            msg.text(color.msg);
        }
        HLSChanging = false;
        return;
    }

    msg.text("");

    var hlsColor = {
        type: 'hls',
        h: hls.h.getValue(),
        l: hls.l.getValue(),
        s: hls.s.getValue()
    };

    RGBChange(null, convert(hlsColor, 'rgb'));

    LabChange(null, convert(hlsColor, 'lab'));

    CMYChange(null, convert(hlsColor, 'cmy'));

    HLSChanging = false;
};

var LabChanging = false;
var LabChange = function (data, color) {
    if (LabChanging)
        return;

    LabChanging = true;

    if (color != null) {
        lab.l.setValue(color.l);
        lab.a.setValue(color.a);
        lab.b.setValue(color.b);
        LabChanging = false;
        return;
    }

    var labColor = {
        type: 'lab',
        l: lab.l.getValue(),
        a: lab.a.getValue(),
        b: lab.b.getValue()
    };

    RGBChange(null, convert(labColor, 'rgb'));

    HLSChange(null, convert(labColor, 'hls'));

    CMYChange(null, convert(labColor, 'cmy'));

    LabChanging = false;
};

var CMYChanging = false;
var CMYChange = function (data, color) {
    if (CMYChanging)
        return;

    CMYChanging = true;

    if (color != null) {
        cmy.c.setValue(color.c);
        cmy.m.setValue(color.m);
        cmy.y.setValue(color.y);
        CMYChanging = false;
        return;
    }

    msg.text("");

    var cmyColor = {
        type: 'cmy',
        c: cmy.c.getValue(),
        m: cmy.m.getValue(),
        y: cmy.y.getValue()
    };

    RGBChange(null, convert(cmyColor, 'rgb'));

    HLSChange(null, convert(cmyColor, 'hls'));

    LabChange(null, convert(cmyColor, 'lab'));

    CMYChanging = false;
};

var rgb = {

    r : $('#RGB1').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', RGBChange).data('slider'),


    g : $('#RGB2').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', RGBChange).data('slider'),


    b : $('#RGB3').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', RGBChange).data('slider')
}

var hls = {

    h: $('#HLS1').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', HLSChange).data('slider'),


    l: $('#HLS2').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', HLSChange).data('slider'),


    s: $('#HLS3').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', HLSChange).data('slider')
}

var lab = {

    l: $('#Lab1').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', LabChange).data('slider'),


    a: $('#Lab2').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', LabChange).data('slider'),


    b: $('#Lab3').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', LabChange).data('slider')
}

var cmy = {

    c: $('#CMY1').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', CMYChange).data('slider'),


    m: $('#CMY2').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', CMYChange).data('slider'),


    y: $('#CMY3').slider({
        formatter: function (value) {
            return value;
        }, tooltip: 'always'
    }).on('slide', CMYChange).data('slider')
}

RGBChange();