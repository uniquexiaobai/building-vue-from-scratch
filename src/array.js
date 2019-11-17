import { def } from './utils';

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);

const methods = [
	'push',
	'pop',
	'shift',
	'unshift',
	'splice',
	'sort',
	'reverse',
];

methods.forEach(method => {
	const origin = arrayProto[method];
	def(arrayMethods, method, function(...args) {
		const result = origin.apply(this, args);
		const ob = this.__ob__;

		switch (method) {
			case 'push':
			case 'unshift':
			//
			case 'splice':
			//
		}

		ob.dep.notify();
		return result;
	});
});
