/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jspass = __webpack_require__(1);

	var _jspass2 = _interopRequireDefault(_jspass);

	var _io = __webpack_require__(5);

	var _io2 = _interopRequireDefault(_io);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	document.querySelector('#generate').addEventListener('click', function (e) {
		var ioInst = new _io2.default();

		e.preventDefault();
		var key = ioInst.getInputVal('#mainPass');
		var app = ioInst.getInputVal('#domain');
		var length = ioInst.getInputVal('#length');
		var result = new _jspass2.default(app, key, length, ioInst.genRestrictions()).getPassword();

		ioInst.setInputVal('#result', result);
		ioInst.exportToBuffer(result);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _alphabet = __webpack_require__(2);

	var _alphabet2 = _interopRequireDefault(_alphabet);

	var _cryptoPbkdf = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ITERATIONS = 8;

	var generateWordArray = function generateWordArray(text, key) {
		var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 20;

		if (text && key && _cryptoPbkdf.PBKDF2) {
			return (0, _cryptoPbkdf.PBKDF2)(text, key, {
				keySize: length,
				iterations: ITERATIONS
			});
		}
	};

	var getLetter = function getLetter(sum, dic) {
		if (sum > 0 && dic.length > 0) {
			return dic[sum % dic.length];
		}
	};

	var matchWordArrayWithLetters = function matchWordArrayWithLetters(wordsArray, alphabetSettings) {
		var res = '';
		if (wordsArray && _alphabet2.default) {
			var alph = new _alphabet2.default(alphabetSettings);
			var mas = wordsArray.toString().split('');
			var buf = 0;

			for (var i = 1; i <= mas.length; i++) {
				buf += mas[i - 1].charCodeAt(0);
				if (i % ITERATIONS === 0) {
					res += getLetter(buf, alph.next());
					buf = 0;
				}
			}
		}
		return res;
	};

	var jspass = function () {
		function jspass(service, key, length, alphabetSettings) {
			_classCallCheck(this, jspass);

			var wordsArray = generateWordArray(service, key, length);
			this.password = matchWordArrayWithLetters(wordsArray, alphabetSettings);
		}

		_createClass(jspass, [{
			key: 'getPassword',
			value: function getPassword() {
				return this.password;
			}
		}]);

		return jspass;
	}();

	exports.default = jspass;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _symbols = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Alphabet = function () {
		function Alphabet() {
			var restricted = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			_classCallCheck(this, Alphabet);

			this.dic = {};
			this.firstRequest = true;
			this.restricted = restricted;

			this.configAlphabet();

			this.position = {
				current: this.getDicNameByNumber(0),
				total: this.countDics()
			};
		}

		_createClass(Alphabet, [{
			key: 'configAlphabet',
			value: function configAlphabet() {
				for (var set in _symbols.SYMBOLS) {
					if (this.restricted.indexOf(set) === -1) {
						this.dic[set] = _symbols.SYMBOLS[set].split('');
					}
				}
			}
		}, {
			key: 'countDics',
			value: function countDics() {
				return Object.keys(this.dic).length;
			}
		}, {
			key: 'getDicNameByNumber',
			value: function getDicNameByNumber(number) {
				return Object.keys(this.dic)[number];
			}
		}, {
			key: 'getDicNumberByName',
			value: function getDicNumberByName(name) {
				return Object.keys(this.dic).indexOf(name);
			}
		}, {
			key: 'next',
			value: function next() {
				if (this.firstRequest) {
					this.firstRequest = false;
					return this.getCurrent();
				} else {
					var currName = this.position.current;
					var currIndex = this.getDicNumberByName(currName);
					var nextIndex = currIndex + 1;
					var realNextIndex = nextIndex > this.position.total - 1 ? 0 : nextIndex;
					var realNextName = this.getDicNameByNumber(realNextIndex);
					var realNextDic = this.dic[realNextName];

					if (realNextDic) {
						this.position.current = realNextName;
						return realNextDic;
					}
				}
			}
		}, {
			key: 'getCurrent',
			value: function getCurrent() {
				return this.dic[this.position.current];
			}
		}, {
			key: 'reset',
			value: function reset() {
				this.position.current = this.getDicNameByNumber(0);
				this.position.total = this.countDics();
				return this.dic[this.position.current];
			}
		}]);

		return Alphabet;
	}();

	exports.default = Alphabet;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	CryptoJS v3.0.2
	code.google.com/p/crypto-js
	(c) 2009-2012 by Jeff Mott. All rights reserved.
	code.google.com/p/crypto-js/wiki/License
	*/
	var CryptoJS=CryptoJS||function(g,i){var f={},b=f.lib={},m=b.Base=function(){function a(){}return{extend:function(e){a.prototype=this;var c=new a;e&&c.mixIn(e);c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.$super.extend(this)}}}(),l=b.WordArray=m.extend({init:function(a,e){a=
	this.words=a||[];this.sigBytes=e!=i?e:4*a.length},toString:function(a){return(a||d).stringify(this)},concat:function(a){var e=this.words,c=a.words,o=this.sigBytes,a=a.sigBytes;this.clamp();if(o%4)for(var b=0;b<a;b++)e[o+b>>>2]|=(c[b>>>2]>>>24-8*(b%4)&255)<<24-8*((o+b)%4);else if(65535<c.length)for(b=0;b<a;b+=4)e[o+b>>>2]=c[b>>>2];else e.push.apply(e,c);this.sigBytes+=a;return this},clamp:function(){var a=this.words,e=this.sigBytes;a[e>>>2]&=4294967295<<32-8*(e%4);a.length=g.ceil(e/4)},clone:function(){var a=
	m.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var e=[],c=0;c<a;c+=4)e.push(4294967296*g.random()|0);return l.create(e,a)}}),n=f.enc={},d=n.Hex={stringify:function(a){for(var e=a.words,a=a.sigBytes,c=[],b=0;b<a;b++){var d=e[b>>>2]>>>24-8*(b%4)&255;c.push((d>>>4).toString(16));c.push((d&15).toString(16))}return c.join("")},parse:function(a){for(var e=a.length,c=[],b=0;b<e;b+=2)c[b>>>3]|=parseInt(a.substr(b,2),16)<<24-4*(b%8);return l.create(c,e/2)}},j=n.Latin1={stringify:function(a){for(var e=
	a.words,a=a.sigBytes,b=[],d=0;d<a;d++)b.push(String.fromCharCode(e[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return l.create(c,b)}},k=n.Utf8={stringify:function(a){try{return decodeURIComponent(escape(j.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return j.parse(unescape(encodeURIComponent(a)))}},h=b.BufferedBlockAlgorithm=m.extend({reset:function(){this._data=l.create();
	this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=k.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var b=this._data,c=b.words,d=b.sigBytes,j=this.blockSize,h=d/(4*j),h=a?g.ceil(h):g.max((h|0)-this._minBufferSize,0),a=h*j,d=g.min(4*a,d);if(a){for(var f=0;f<a;f+=j)this._doProcessBlock(c,f);f=c.splice(0,a);b.sigBytes-=d}return l.create(f,d)},clone:function(){var a=m.clone.call(this);a._data=this._data.clone();return a},_minBufferSize:0});b.Hasher=h.extend({init:function(){this.reset()},
	reset:function(){h.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);this._doFinalize();return this._hash},clone:function(){var a=h.clone.call(this);a._hash=this._hash.clone();return a},blockSize:16,_createHelper:function(a){return function(b,c){return a.create(c).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return u.HMAC.create(a,c).finalize(b)}}});var u=f.algo={};return f}(Math);
	(function(){var g=CryptoJS,i=g.lib,f=i.WordArray,i=i.Hasher,b=[],m=g.algo.SHA1=i.extend({_doReset:function(){this._hash=f.create([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var d=this._hash.words,j=d[0],k=d[1],h=d[2],g=d[3],a=d[4],e=0;80>e;e++){if(16>e)b[e]=f[n+e]|0;else{var c=b[e-3]^b[e-8]^b[e-14]^b[e-16];b[e]=c<<1|c>>>31}c=(j<<5|j>>>27)+a+b[e];c=20>e?c+((k&h|~k&g)+1518500249):40>e?c+((k^h^g)+1859775393):60>e?c+((k&h|k&g|h&g)-1894007588):c+((k^h^g)-
	899497514);a=g;g=h;h=k<<30|k>>>2;k=j;j=c}d[0]=d[0]+j|0;d[1]=d[1]+k|0;d[2]=d[2]+h|0;d[3]=d[3]+g|0;d[4]=d[4]+a|0},_doFinalize:function(){var b=this._data,f=b.words,d=8*this._nDataBytes,j=8*b.sigBytes;f[j>>>5]|=128<<24-j%32;f[(j+64>>>9<<4)+15]=d;b.sigBytes=4*f.length;this._process()}});g.SHA1=i._createHelper(m);g.HmacSHA1=i._createHmacHelper(m)})();
	(function(){var g=CryptoJS,i=g.enc.Utf8;g.algo.HMAC=g.lib.Base.extend({init:function(f,b){f=this._hasher=f.create();"string"==typeof b&&(b=i.parse(b));var g=f.blockSize,l=4*g;b.sigBytes>l&&(b=f.finalize(b));for(var n=this._oKey=b.clone(),d=this._iKey=b.clone(),j=n.words,k=d.words,h=0;h<g;h++)j[h]^=1549556828,k[h]^=909522486;n.sigBytes=d.sigBytes=l;this.reset()},reset:function(){var f=this._hasher;f.reset();f.update(this._iKey)},update:function(f){this._hasher.update(f);return this},finalize:function(f){var b=
	this._hasher,f=b.finalize(f);b.reset();return b.finalize(this._oKey.clone().concat(f))}})})();
	(function(){var g=CryptoJS,i=g.lib,f=i.Base,b=i.WordArray,i=g.algo,m=i.HMAC,l=i.PBKDF2=f.extend({cfg:f.extend({keySize:4,hasher:i.SHA1,iterations:1}),init:function(b){this.cfg=this.cfg.extend(b)},compute:function(f,d){for(var g=this.cfg,k=m.create(g.hasher,f),h=b.create(),i=b.create([1]),a=h.words,e=i.words,c=g.keySize,g=g.iterations;a.length<c;){var l=k.update(d).finalize(i);k.reset();for(var q=l.words,t=q.length,r=l,s=1;s<g;s++){r=k.finalize(r);k.reset();for(var v=r.words,p=0;p<t;p++)q[p]^=v[p]}h.concat(l);
	e[0]++}h.sigBytes=4*c;return h}});g.PBKDF2=function(b,d,f){return l.create(f).compute(b,d)}})();

	exports = module.exports = CryptoJS;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _symbols = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var io = function () {
		function io() {
			_classCallCheck(this, io);
		}

		_createClass(io, [{
			key: 'getInputVal',
			value: function getInputVal(selector) {
				if (selector) {
					return document.querySelector(selector).value;
				} else {
					throw 'Selector is absent';
				}
			}
		}, {
			key: 'getCheckboxVal',
			value: function getCheckboxVal(selector) {
				if (selector) {
					return document.querySelector(selector).checked;
				}
			}
		}, {
			key: 'setInputVal',
			value: function setInputVal(selector, val) {
				if (selector) {
					document.querySelector(selector).value = val;
				} else {
					throw 'Selector is absent';
				}
			}
		}, {
			key: 'genRestrictions',
			value: function genRestrictions() {
				var restricted = [];

				for (var set in _symbols.SYMBOLS) {
					if (!this.getCheckboxVal('#' + set)) {
						restricted.push(set);
					}
				}

				return restricted;
			}
		}, {
			key: 'exportToBuffer',
			value: function exportToBuffer(result) {
				if (result) {
					if (document.execCommand) {
						var res = document.querySelector('#result');
						if (res.value) {
							res.select();
							document.execCommand('copy', true);
						}
					} else {
						window.prompt('Нажмите для копирования: Ctrl+C, Enter', result);
					}
				}
			}
		}]);

		return io;
	}();

	exports.default = io;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var SYMBOLS = exports.SYMBOLS = {
		uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		lowercase: 'abcdefghijklmnopqrstuvwxyz',
		digits: '1234567890',
		symbols: '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
	};

/***/ }
/******/ ]);