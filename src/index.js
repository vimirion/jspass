import jspass from './jspass';
import io from './io';

document.querySelector('#generate').addEventListener(
	'click',
	e => {
		let ioInst = new io();

		e.preventDefault();
		let key = ioInst.getInputVal('#mainPass');
		let app = ioInst.getInputVal('#domain');
		let length = ioInst.getInputVal('#length');
		let result = new jspass(app, key, length, ioInst.genRestrictions()).getPassword();

		ioInst.setInputVal('#result', result);
		ioInst.exportToBuffer(result);
	});

document.addEventListener('DOMContentLoaded', () => {
	let bodyEl = document.querySelector('body');
	let sidedrawerEl = document.querySelector('#sidedrawer');

	const showSidedrawer = () => {
		const options = {
			onclose: () => sidedrawerEl.classList.remove('active')
		};

		window.mui.overlay('on', options).append(sidedrawerEl);

		setTimeout(() => sidedrawerEl.classList.add('active'), 20);
	};
	const hideSidedrawer = () => bodyEl.classList.toggle('hide-sidedrawer');

	document.querySelector('.js-show-sidedrawer').addEventListener('click', showSidedrawer);
	document.querySelector('.js-hide-sidedrawer').addEventListener('click', hideSidedrawer);
});
