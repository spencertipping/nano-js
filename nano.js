/*
Author: Tung Dao <tungd@tungdao.com>
URL:    http://tungdao.com

Modified by Spencer Tipping
*/
var $  = function (id) {return document.getElementById(id)},
    ua = navigator.userAgent.toLowerCase(),
    pf = navigator.platform.toLowerCase(),
    PF = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || pf.match(/mac|win|linux/) || ['other'])[0],
    UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0];

$.ajax = function(url, cb, data, headers) {
    var xhr = new (ActiveXObject('Microsoft.XMLHttpRequest') || XHMLHttpRequest);

    xhr.open(data ? 'POST' : 'GET', url, 1);

    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        xhr.readyState > 3 && cb && cb(xhr.responseText, xhr)
    };

    headers || (headers = {});
    for (var k in headers)
        if (headers.hasOwnProperty(k))
            xhr.setRequestHeader(k, headers[k]);

    xhr.send(data);
    return xhr;
};

(function() {
    $.name = (UA[1] == 'version') ? UA[3] : UA[1];
    $.platform = PF;

    switch($.name) {
        case 'chrome':
            engine = 'webkit';
            break;
        case 'safari':
            engine = 'webkit';
            break;
        case 'firefox':
            engine = 'moz';
            break;
        default:
            engine = 'trident';
            break;
    }

    $.engine = engine;
}())

Function.prototype.delay = function(ms) {
    return setTimeout(this, ms);
};

Number.prototype.cancel = function() {
    clearTimeout(this.valueOf());
};

Element.prototype.html = function(html) {
    if (html !== undefined) {
        this.innerHTML = html;
        return this;
    } else
        return this.innerHTML;
};

Element.prototype.css = function(style) {
    var styleRules = [];
    if (style && style.constructor === Object) {
        for (var k in style)
            if (style.hasOwnProperty(k))
                styleRules.push(k + ': ' + style[k]);
    } else
        styleRules = [style];

    this.style.cssText += ';' + styleRules.join(';');
    return this;
};

Element.prototype.anim = function(transform, dur){
    this.css('-webkit-transition-duration:' + dur + 's;' +
            '-webkit-transform:' + transform + ';');
    return this;
};

Element.prototype.addEvent = function(type, callback) {
    var elem = $(this.id);

    if (elem) {
        if (document.addEventListener) {
            elem.addEventListener(type, callback, false);
        }
        else if (document.attachEvent) {
            elem.attachEvent('on' + type, function() {
                    return callback.call(elem);
                });
        }
    }

    return this;
};
