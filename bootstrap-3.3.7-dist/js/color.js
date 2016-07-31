function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}


function numberToColorHsl(i, min, max) {
    var ratio = i;
    if (min> 0 || max < 1) {
        if (i < min) {
            ratio = 0;
        } else if (i > max) {
            ratio = 1;
        } else {
            var range = max - min;
            ratio = (i-min) / range;
        }
    }
    
    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = ratio * 1.2 / 3.60;
    //if (minMaxFactor!=1) hue /= minMaxFactor;
    //console.log(hue);
    
    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')'; 
}


// for (var i=0; i<=100; i++) {
    // $('#list-1').append($('<li style="background-color:'+ numberToColorHsl(i/100, 0, 1) + '">' + i + '</li>'));
    // $('#list-2').append($('<li style="background-color:'+ numberToColorHsl(i/100, 0.5, 1) + '">' + i + '</li>'));
    // $('#list-3').append($('<li style="background-color:'+ numberToColorHsl(i/100, 0, 0.6) + '">' + i + '</li>'));
    // $('#list-4').append($('<li style="background-color:'+ numberToColorHsl(i/100, 0.3, 0.8) + '">' + i + '</li>'));
// }