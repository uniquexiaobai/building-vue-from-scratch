import { def } from './utils';

const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);

const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

methods.forEach(method => {
	const origin = arrayProto[method];
	def(arrayMethods, method, function(...args) {
		const result = origin.apply(this, args);
		const ob = this.__ob__;
		let inserted;

		switch (method) {
			case 'push':
			case 'unshift':
				inserted = args;
				break;
			case 'splice':
				inserted = args.slice(2);
				break;
		}

		if (inserted) ob.observeArray(args);

		console.log(ob.dep);

		ob.dep.notify();
		return result;
	});
});
