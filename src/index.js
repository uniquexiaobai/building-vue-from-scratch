import Observer from './Observer';
import Watcher from './Watcher';

var data = { a: 1, b: [2, 3] };
new Observer(data);

new Watcher(data, ['a'], (value, oldValue) => {
	console.log('watch a', value, oldValue, data);
});

new Watcher(data, ['b'], (value, oldValue) => {
	console.log('watch b', value, oldValue, data);
});

data.a = 3;
data.b.push(4);
// data.a = 5;

console.log(data);
