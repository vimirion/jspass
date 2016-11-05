import { SYMBOLS } from './symbols';

export default class Alphabet {
	constructor(restricted = []) {
		this.dic = {};
		this.firstRequest = true;
		this.restricted = restricted;

		this.configAlphabet();

		this.position = {
			current: this.getDicNameByNumber(0),
			total: this.countDics()
		};
	}

	configAlphabet() {
		for (let set in SYMBOLS) {
			if (this.restricted.indexOf(set) === -1) {
				this.dic[set] = SYMBOLS[set].split('');
			}
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
			let currName = this.position.current;
			let currIndex = this.getDicNumberByName(currName);
			let nextIndex = currIndex + 1;
			let realNextIndex = nextIndex > this.position.total - 1 ? 0 : nextIndex;
			let realNextName = this.getDicNameByNumber(realNextIndex);
			let realNextDic = this.dic[realNextName];

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
}
