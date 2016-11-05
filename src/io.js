import { SYMBOLS } from './symbols';

export default class io {
	getInputVal(selector) {
		if (selector) {
			return document.querySelector(selector).value;
		} else {
			throw 'Selector is absent';
		}
	}

	getCheckboxVal(selector) {
		if (selector) {
			return document.querySelector(selector).checked;
		}
	}

	setInputVal(selector, val) {
		if (selector) {
			document.querySelector(selector).value = val;
		} else {
			throw 'Selector is absent';
		}
	}

	genRestrictions() {
		let restricted = [];

		for (let set in SYMBOLS) {
			if (!this.getCheckboxVal(`#${set}`)) {
				restricted.push(set);
			}
		}

		return restricted;
	}

	exportToBuffer(result) {
		if (result) {
			if (document.execCommand) {
				let res = document.querySelector('#result');
				if (res.value) {
					res.select();
					document.execCommand('copy', true);
				}
			} else {
				window.prompt('Нажмите для копирования: Ctrl+C, Enter', result);
			}
		}
	}
}
