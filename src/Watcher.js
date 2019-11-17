import Dep, { pushTarget, popTarget } from './dep';

let uid = 0;

class Watcher {
	constructor(object, path, callback) {
		this.id = ++uid;
		this.depIds = new Set();
		this.getter = this.parsePath(path);
		this.callback = callback;
		this.object = object;
		this.value = this.get();
	}

	parsePath(path) {
		return obj => {
			return path.reduce((obj, key) => obj[key], obj);
		};
	}

	get() {
		window.target = this;
		const value = this.getter(this.object);
		window.target = null;
		return value;
	}

	update() {
		const oldValue = this.value;
		this.value = this.get();
		this.callback(this.value, oldValue);
	}

	addDep(dep) {
		const id = dep.id;
		if (!this.depIds.has(id)) {
			this.depIds.add(dep.id);
			dep.addSub(this);
		}
	}
}

export default Watcher;
