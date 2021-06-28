const quickSort = (
	arry: number[],
	stepCallback?: (dataRef: number[], counter: number) => unknown,
) => {
	let arr: number[] = [...arry]
	let counter: number = 0
	let stack: number[] = []

	const partition = (arr: number[], start: number, end: number) => {
		const pivotValue = arr[end]
		let pivotIndex = start
		for (let i = start; i < end; i++) {
			if (arr[i] < pivotValue) {
				;[arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
				pivotIndex++
			}

			if (stepCallback) stepCallback(arr, ++counter)
		}

		;[arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
		return pivotIndex
	}

	stack.push(0)
	stack.push(arr.length - 1)

	while (stack[stack.length - 1] >= 0) {
		let end = stack.pop()
		let start = stack.pop()
		let pivotIndex = partition(arr, start!, end!)

		if (pivotIndex - 1 > start!) {
			stack.push(start!)
			stack.push(pivotIndex - 1)
		}

		if (pivotIndex + 1 < end!) {
			stack.push(pivotIndex + 1)
			stack.push(end!)
		}

		if (stepCallback) stepCallback(arr, ++counter)
	}

	return arr
}
