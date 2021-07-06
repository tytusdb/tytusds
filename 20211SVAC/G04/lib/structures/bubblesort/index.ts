const bubbleSort = (
	data: number[],
	stepCallback?: (dataRef: number[], counter: number) => unknown,
): number[] => {
	// COPIAR
	const copy = [...data]
	const len = data.length
	let counter: number = 0

	// ITERAR
	for (let i = 0; i < len; i++) {
		for (let j = 0; j < len - i - 1; j++) {
			if (copy[j] > copy[j + 1]) {
				let temp = copy[j]
				copy[j] = copy[j + 1]
				copy[j + 1] = temp
			}

			if (stepCallback) stepCallback(copy, ++counter)
		}

		if (stepCallback) stepCallback(copy, ++counter)
	}

	// RETORNAR
	return copy
}
