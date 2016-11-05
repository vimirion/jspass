// import SYMBOLS from './symbols';

export default class Alphabet {
	constructor(restricted = []) {
		this.dic = {};
		this.firstRequest = true;
		this.restricted = restricted;

		this.configAlphabet();

		// if (this.countDics() === 0) {
		// 	this.restricted = [];
		// 	this.configAlphabet();
		// }

		this.position = {
			current: this.getDicNameByNumber(0),
			total: this.countDics()
		};
	}

	configAlphabet() {
		if (this.restricted.indexOf('uppercase') === -1) {
			this.dic.uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		}
		if (this.restricted.indexOf('lowercase') === -1) {
			this.dic.lowercase = 'abcdefghijklmnopqrstuvwxyz'.split('');
		}
		if (this.restricted.indexOf('digits') === -1) {
			this.dic.digits = '1234567890'.split('');
		}
		if (this.restricted.indexOf('symbols') === -1) {
			this.dic.symbols = '!\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');
		}
	}

	countDics() {
		return Object.keys(this.dic).length;
	}

	getDicNameByNumber(number) {
		return Object.keys(this.dic)[number];
	}

	getDicNumberByName(name) {
		return Object.keys(this.dic).indexOf(name);
	}

	next() {
		if (this.firstRequest) {
			this.firstRequest = false;
			return this.getCurrent();
		} else {
			var currName = this.position.current,
				currIndex = this.getDicNumberByName(currName),
				nextIndex = currIndex + 1,
				realNextIndex = nextIndex > this.position.total - 1 ? 0 : nextIndex,
				realNextName = this.getDicNameByNumber(realNextIndex),
				realNextDic = this.dic[realNextName];

			if (realNextDic) {
				this.position.current = realNextName;
				return realNextDic;
			}
		}
	}

	getCurrent() {
		return this.dic[this.position.current];
	}

	reset() {
		this.position.current = this.getDicNameByNumber(0);
		this.position.total = this.countDics();
		return this.dic[this.position.current];
	}
	//
    // return {
    //     next: next,
    //     current: getCurrent,
    //     reset: reset
    // };
}
