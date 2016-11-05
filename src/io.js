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
		var restricted = [];

		if (!this.getCheckboxVal('#uppercase')) {
			restricted.push('uppercase');
		}
		if (!this.getCheckboxVal('#lowercase')) {
			restricted.push('lowercase');
		}
		if (!this.getCheckboxVal('#digits')) {
			restricted.push('digits');
		}
		if (!this.getCheckboxVal('#symbols')) {
			restricted.push('symbols');
		}

		return restricted;
	}

	exportToBuffer(result) {
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
}
