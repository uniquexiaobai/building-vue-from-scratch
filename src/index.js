import Observer from './Observer';
import Watcher from './Watcher';

var data = { a: 1, b: [2, 3, { c: 4 }] };
new Observer(data);
// console.log(data);

new Watcher(data, ['a'], (value, oldValue) => {
	console.log('watch data.a', value, oldValue, data);
});

new Watcher(data, ['b'], (value, oldValue) => {
	console.log('watch data.b', value, oldValue, data);
});

new Watcher(data, ['b', 2, 'c'], (value, oldValue) => {
	console.log('watch data.b[2].c', value, oldValue, data);
});

data.a = 3;
data.b[2].c = 5;
// data.b.shift();
