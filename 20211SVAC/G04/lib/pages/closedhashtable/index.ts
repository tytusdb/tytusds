setHashTable({
	closedHash: {
		hashInstance: new TablaHashCerrada(10, 20, 80, 0, 1),
		size: 10,
		min: 20,
		max: 80,
		coalition: 'lineal',
		hashFunc: 'div',
	},
	openHash: null,
})
