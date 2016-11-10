!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var i=n(1),o=r(i),s=n(6),a=r(s);document.querySelector("#generate").addEventListener("click",function(e){var t=new a.default;e.preventDefault();var n=t.getInputVal("#mainPass"),r=t.getInputVal("#domain"),i=t.getInputVal("#length"),s=new o.default(r,n,i,t.genRestrictions()).getPassword();t.setInputVal("#result",s),t.exportToBuffer(s)}),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector("body"),t=document.querySelector("#sidedrawer"),n=function(){var e={onclose:function(){return t.classList.remove("active")}};window.mui.overlay("on",e).append(t),setTimeout(function(){return t.classList.add("active")},20)},r=function(){return e.classList.toggle("hide-sidedrawer")};document.querySelector(".js-show-sidedrawer").addEventListener("click",n),document.querySelector(".js-hide-sidedrawer").addEventListener("click",r)})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(2),a=r(s),u=n(4),c=8,f=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:20;if(e&&t&&u.PBKDF2)return(0,u.PBKDF2)(e,t,{keySize:n,iterations:c})},l=function(e,t){if(e>0&&t.length>0)return t[e%t.length]},h=function(e,t){var n="";if(e&&a.default)for(var r=new a.default(t),i=e.toString().split(""),o=0,s=1;s<=i.length;s++)o+=i[s-1].charCodeAt(0),s%c===0&&(n+=l(o,r.next()),o=0);return n},d=function(){function e(t,n,r,o){i(this,e);var s=f(t,n,r);this.password=h(s,o)}return o(e,[{key:"getPassword",value:function(){return this.password}}]),e}();t.default=d},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(3),s=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];r(this,e),this.dic={},this.firstRequest=!0,this.restricted=t,this.configAlphabet(),this.position={current:this.getDicNameByNumber(0),total:this.countDics()}}return i(e,[{key:"configAlphabet",value:function(){for(var e in o.SYMBOLS)this.restricted.indexOf(e)===-1&&(this.dic[e]=o.SYMBOLS[e].split(""))}},{key:"countDics",value:function(){return Object.keys(this.dic).length}},{key:"getDicNameByNumber",value:function(e){return Object.keys(this.dic)[e]}},{key:"getDicNumberByName",value:function(e){return Object.keys(this.dic).indexOf(e)}},{key:"next",value:function(){if(this.firstRequest)return this.firstRequest=!1,this.getCurrent();var e=this.position.current,t=this.getDicNumberByName(e),n=t+1,r=n>this.position.total-1?0:n,i=this.getDicNameByNumber(r),o=this.dic[i];return o?(this.position.current=i,o):void 0}},{key:"getCurrent",value:function(){return this.dic[this.position.current]}},{key:"reset",value:function(){return this.position.current=this.getDicNameByNumber(0),this.position.total=this.countDics(),this.dic[this.position.current]}}]),e}();t.default=s},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.SYMBOLS={uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",lowercase:"abcdefghijklmnopqrstuvwxyz",digits:"1234567890",symbols:"!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"}},function(e,t,n){t=e.exports=n(5)},function(e,t){var n=n||function(e,t){var n={},r=n.lib={},i=r.Base=function(){function e(){}return{extend:function(t){e.prototype=this;var n=new e;return t&&n.mixIn(t),n.$super=this,n},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.$super.extend(this)}}}(),o=r.WordArray=i.extend({init:function(e,n){e=this.words=e||[],this.sigBytes=n!=t?n:4*e.length},toString:function(e){return(e||a).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes,e=e.sigBytes;if(this.clamp(),r%4)for(var i=0;i<e;i++)t[r+i>>>2]|=(n[i>>>2]>>>24-8*(i%4)&255)<<24-8*((r+i)%4);else if(65535<n.length)for(i=0;i<e;i+=4)t[r+i>>>2]=n[i>>>2];else t.push.apply(t,n);return this.sigBytes+=e,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-8*(n%4),t.length=e.ceil(n/4)},clone:function(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n=[],r=0;r<t;r+=4)n.push(4294967296*e.random()|0);return o.create(n,t)}}),s=n.enc={},a=s.Hex={stringify:function(e){for(var t=e.words,e=e.sigBytes,n=[],r=0;r<e;r++){var i=t[r>>>2]>>>24-8*(r%4)&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-4*(r%8);return o.create(n,t/2)}},u=s.Latin1={stringify:function(e){for(var t=e.words,e=e.sigBytes,n=[],r=0;r<e;r++)n.push(String.fromCharCode(t[r>>>2]>>>24-8*(r%4)&255));return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;r<t;r++)n[r>>>2]|=(255&e.charCodeAt(r))<<24-8*(r%4);return o.create(n,t)}},c=s.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(e){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},f=r.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=o.create(),this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=c.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,r=n.words,i=n.sigBytes,s=this.blockSize,a=i/(4*s),a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0),t=a*s,i=e.min(4*t,i);if(t){for(var u=0;u<t;u+=s)this._doProcessBlock(r,u);u=r.splice(0,t),n.sigBytes-=i}return o.create(u,i)},clone:function(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=f.extend({init:function(){this.reset()},reset:function(){f.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize(),this._hash},clone:function(){var e=f.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:16,_createHelper:function(e){return function(t,n){return e.create(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return l.HMAC.create(e,n).finalize(t)}}});var l=n.algo={};return n}(Math);!function(){var e=n,t=e.lib,r=t.WordArray,t=t.Hasher,i=[],o=e.algo.SHA1=t.extend({_doReset:function(){this._hash=r.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(e,t){for(var n=this._hash.words,r=n[0],o=n[1],s=n[2],a=n[3],u=n[4],c=0;80>c;c++){if(16>c)i[c]=0|e[t+c];else{var f=i[c-3]^i[c-8]^i[c-14]^i[c-16];i[c]=f<<1|f>>>31}f=(r<<5|r>>>27)+u+i[c],f=20>c?f+((o&s|~o&a)+1518500249):40>c?f+((o^s^a)+1859775393):60>c?f+((o&s|o&a|s&a)-1894007588):f+((o^s^a)-899497514),u=a,a=s,s=o<<30|o>>>2,o=r,r=f}n[0]=n[0]+r|0,n[1]=n[1]+o|0,n[2]=n[2]+s|0,n[3]=n[3]+a|0,n[4]=n[4]+u|0},_doFinalize:function(){var e=this._data,t=e.words,n=8*this._nDataBytes,r=8*e.sigBytes;t[r>>>5]|=128<<24-r%32,t[(r+64>>>9<<4)+15]=n,e.sigBytes=4*t.length,this._process()}});e.SHA1=t._createHelper(o),e.HmacSHA1=t._createHmacHelper(o)}(),function(){var e=n,t=e.enc.Utf8;e.algo.HMAC=e.lib.Base.extend({init:function(e,n){e=this._hasher=e.create(),"string"==typeof n&&(n=t.parse(n));var r=e.blockSize,i=4*r;n.sigBytes>i&&(n=e.finalize(n));for(var o=this._oKey=n.clone(),s=this._iKey=n.clone(),a=o.words,u=s.words,c=0;c<r;c++)a[c]^=1549556828,u[c]^=909522486;o.sigBytes=s.sigBytes=i,this.reset()},reset:function(){var e=this._hasher;e.reset(),e.update(this._iKey)},update:function(e){return this._hasher.update(e),this},finalize:function(e){var t=this._hasher,e=t.finalize(e);return t.reset(),t.finalize(this._oKey.clone().concat(e))}})}(),function(){var e=n,t=e.lib,r=t.Base,i=t.WordArray,t=e.algo,o=t.HMAC,s=t.PBKDF2=r.extend({cfg:r.extend({keySize:4,hasher:t.SHA1,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=o.create(n.hasher,e),s=i.create(),a=i.create([1]),u=s.words,c=a.words,f=n.keySize,n=n.iterations;u.length<f;){var l=r.update(t).finalize(a);r.reset();for(var h=l.words,d=h.length,p=l,v=1;v<n;v++){p=r.finalize(p),r.reset();for(var y=p.words,g=0;g<d;g++)h[g]^=y[g]}s.concat(l),c[0]++}return s.sigBytes=4*f,s}});e.PBKDF2=function(e,t,n){return s.create(n).compute(e,t)}}(),t=e.exports=n},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(3),s=function(){function e(){r(this,e)}return i(e,[{key:"getInputVal",value:function(e){if(e)return document.querySelector(e).value;throw"Selector is absent"}},{key:"getCheckboxVal",value:function(e){if(e)return document.querySelector(e).checked}},{key:"setInputVal",value:function(e,t){if(!e)throw"Selector is absent";document.querySelector(e).value=t}},{key:"genRestrictions",value:function(){var e=[];for(var t in o.SYMBOLS)this.getCheckboxVal("#"+t)||e.push(t);return e}},{key:"exportToBuffer",value:function(e){if(e)if(document.execCommand){var t=document.querySelector("#result");t.value&&(t.select(),document.execCommand("copy",!0))}else window.prompt("Нажмите для копирования: Ctrl+C, Enter",e)}}]),e}();t.default=s}]);