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
