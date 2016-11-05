import Alphabet from './alphabet';
import { PBKDF2 } from 'crypto-pbkdf2';

const generateWordArray = (text, key, length) => {
	length = Number(length) || 20;

	if (text && key && PBKDF2) {
		return PBKDF2(text, key, {
			keySize: length,
			iterations: 8
		});
	}
};

const getLetter = (sum, dic) => {
	if (sum > 0 && dic.length > 0) {
		return dic[sum % dic.length];
	}
};

const matchWordArrayWithLetters = (wordsArray, alphabetSettings) => {
	let res = '';
	if (wordsArray && Alphabet) {
		let alph = new Alphabet(alphabetSettings);
		let mas = wordsArray.toString().split('');
		let buf = 0;

		for (let i = 1; i <= mas.length; i++) {
			buf += mas[i - 1].charCodeAt(0);
			if (i % 8 === 0) {
				res += getLetter(buf, alph.next());
				buf = 0;
			}
		}
	}
	return res;
};

export default class jspass {
	constructor(service, key, length, alphabetSettings) {
		let wordsArray = generateWordArray(service, key, length);
		this.password = matchWordArrayWithLetters(wordsArray, alphabetSettings);
	}

	getPassword() {
		return this.password;
	}
}
