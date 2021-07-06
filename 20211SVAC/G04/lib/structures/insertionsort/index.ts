const insertionSort = (
	data: number[],
	stepCallback?: (dataRef: number[], counter: number) => unknown,
): number[] => {
	// COPIAR
	const copy = [...data]
	const len = data.length
	let counter: number = 0

	// ITERAR
	for (let i = 1; i < len; i++) {
		let current = copy[i]
		let j = i - 1

		while (j > -1 && current < copy[j]) {
			copy[j + 1] = copy[j]
			j--
			if (stepCallback) stepCallback(copy, ++counter)
		}

		copy[j + 1] = current
		if (stepCallback) stepCallback(copy, ++counter)
	}

	// RETORNAR
	return copy
}
