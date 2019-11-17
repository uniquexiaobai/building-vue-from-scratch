export const def = (obj, key, val) => {
	Object.defineProperty(obj, key, {
        value: val,
        writable: true,
		enumerable: false,
		configurable: true,
	});
};
