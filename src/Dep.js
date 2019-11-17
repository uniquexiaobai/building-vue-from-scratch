let uid = 0;

class Dep {
	constructor() {
		this.id = ++uid;
		this.subs = [];
	}

	addSub(sub) {
		this.subs.push(sub);
	}

	depend() {
		if (window.target) {
			window.target.addDep(this);
		}
	}

	notify() {
		const subs = [...this.subs];
		subs.forEach(sub => {
			sub.update();
		});
	}
}

export default Dep;
