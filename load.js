/*
 * Copyright (c) 2010 Chris O'Hara <cohara87@gmail.com>
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
//Include the chain.js microframework (http://github.com/chriso/chain.js)
(function(a){a=a||{};var b={},c,d,e=function(){};c=function(a,d,e){var f=a.halt=!1;a.error=function(){a.halt=!0},a.next=function(c){c&&(f=!1);if(!a.halt&&d&&d.length){var e=d.shift(),g=e.shift();f=!0;try{b[g].apply(a,[e,e.length,g])}catch(h){a.error(h)}}return a};for(var g in b){if(typeof a[g]==="function")continue;(function(b){a[b]=function(){var e,g=Array.prototype.slice.call(arguments);g.unshift(b);if(!d)return c({},[g],b);a.then=a[b],d.push(g);return f?a:a.next()}})(g)}e&&(a.then=a[e]),a.callMethod=function(b,c){c.unshift(b),d.unshift(c),a.next(!0)};return a.next()},d=a.addMethod=function(d){var e=Array.prototype.slice.call(arguments),f=e.pop();for(var g=0,h=e.length;g<h;g++)typeof e[g]==="string"&&(b[e[g]]=f);--h||(b["then"+ethod[0].toUpperCase()+d.substr(1)]=f),c(a)},d("chain",function(a){var b=this,c=function(){if(!b.halt){if(!a.length)return b.next(!0);try{null!=a.shift().call(this,c,b.error)&&c()}catch(d){b.error(d)}}};c()}),d("run",function(a,b){var c=this,d=function(){c.halt||(--b||c.next(!0))};for(var e=0,f=b;!this.halt&&e<f;e++)null!=a[e].call(this,d,this.error)&&d()}),d("first",function(a,b){var c=this,d=function(){c.next(!0)};for(var e=0;!this.halt&&e<b;e++)null!=a.shift().call(this,d,this.error)&&this.next(!0)}),d("all",function(a,b){for(var c=0;!this.halt&&c<b;c++)a.shift().call(this,e,this.error);this.next(!0)}),d("onError",!1,function(a,b){var c=this.error;this.error=function(d){c();for(var e=0;e<b;e++)a[e].call(this,d)}})})(this)

var head = document.getElementsByTagName('head')[0] || document.documentElement;

addMethod('load', function (scripts, argc) {
    for (var queue = [], i = 0; i < argc; i++) {
        (function (i) {
            queue.push(function (next, error) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = scripts[i];
                script.onload = next;
                script.onerror = error;
                head.insertBefore(script, head.firstChild);
            });
        }(i));
    }
    this.callMethod('run', queue);
});