/*
Author: Tung Dao <tungd@tungdao.com>
URL:    http://tungdao.com
*/
var $$ = {},
    ua = navigator.userAgent.toLowerCase(),
    pf = navigator.platform.toLowerCase(),
    PF = ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || pf.match(/mac|win|linux/) || ['other'])[0],
    UA = ua.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/) || [null, 'unknown', 0];

$$.ajax = function(url, cb, data) {
    var xhr = new (ActiveXObject('Microsoft.XMLHttpRequest') || XHMLHttpRequest);

    xhr.open(data ? 'POST' : 'GET', url, 1);

    xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        xhr.readyState > 3 && cb && cb(xhr.responseText, xhr)
    };

    xhr.send(data)
};

(function() {
    $$.name = (UA[1] == 'version') ? UA[3] : UA[1];
    $$.platform = PF;

    switch($$.name) {
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

    $$.engine = engine;
}())

function $(id) {
    return document.getElementById(id);
};

Function.prototype.delay = function(ms) {
    setTimeout(this, s);
};

Element.prototype.html = function(html) {
    this.innerHTML = html;
};

Element.prototype.css = function(style) {
    this.style.cssText += ';' + style;
};

Element.prototype.anim = function(transform, dur){
    this.css('-webkit-transition-duration:' + dur + 's;' +
            '-webkit-transform:' + transform + ';');
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
};
