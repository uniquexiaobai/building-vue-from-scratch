import Dep from './dep';
import { arrayMethods } from './array';
import { def } from './utils';

class Observer {
	constructor(value) {
		this.value = value;
		this.dep = new Dep();

		def(value, '__ob__', this);

		if (Array.isArray(value)) {
			value.__proto__ = arrayMethods;
			this.observeArray(value);
		} else {
			this.walk(value);
		}
	}

	observeArray(array) {
		array.forEach(val => {
			observe(val);
		});
	}

	walk(obj) {
		const keys = Object.keys(obj);

		keys.forEach(key => {
			defineReactive(obj, key, obj[key]);
		});
	}
}

function observe(val) {
	if (typeof val !== 'object') return;

	let ob;

	if (val.__ob__) {
		ob = val.__ob__;
	} else {
		ob = new Observer(val);
	}
	return ob;
}

function defineReactive(obj, key, val) {
	const dep = new Dep();
	const childOb = observe(val);

	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			dep.depend();
			if (childOb) {
				childOb.dep.depend();
				if (Array.isArray(val)) {
					dependArray(val);
				}
			}
			return val;
		},
		set(newVal) {
			if (newVal === val) return;
			val = newVal;
			dep.notify();
		},
	});
}

function dependArray(array) {
	array.forEach(val => {
		val && val.__ob__ && val.__ob__.dep.depend();

		if (Array.isArray(val)) {
			dependArray(val);
		}
	});
}

export default Observer;
