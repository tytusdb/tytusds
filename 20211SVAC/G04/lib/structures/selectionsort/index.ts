const selectionSort = (
	data: number[],
	stepCallback?: (dataRef: number[], counter: number) => unknown,
): number[] => {
	// COPIAR
	const copy = [...data]
	const len = data.length
	let counter: number = 0

	for (let i = 0; i < len; i++) {
		let min = i

		for (let j = i + 1; j < len; j++) {
			if (copy[j] < copy[min]) min = j
			if (stepCallback) stepCallback(copy, ++counter)
		}

		if (min != i) {
			let tmp = copy[i]
			copy[i] = copy[min]
			copy[min] = tmp
		}

		if (stepCallback) stepCallback(copy, ++counter)
	}

	// RETORNAR
	return copy
}
