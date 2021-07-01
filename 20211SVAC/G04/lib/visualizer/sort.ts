// CONFIGURACIÓN
const BAR_MARGIN: number = 10
const BAR_WIDTH: number = 5
const BAR_HEIGHT: number = 300
canvasBannerDif = 60

// GLOBALES
let globalSortData: number[] = [
	4, 1, 13, 2, 15, 3, 8, 9, 5, 11, 14, 6, 18, 12, 7,
]
let allStrings: boolean = false
let globalCopyStringData: string[] = []
let globalCopySortData: number[] = [...globalSortData]
let globalSortLength: number = globalSortData.length
let sortBarWidth: number = (BAR_WIDTH / globalSortLength) * 100
let maxSortDataValue: number = Math.max(...globalSortData)
let sortBarHeight: number = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)
let fontSize: number = 25
let fontY: number = 20

// ELEMENTOS
const codeDataArray = document.getElementById('code-data-array')
const sortStepText = document.getElementById('sort-step-text')
const sortPerformance = document.getElementById('sort-performance')

// MÉTODO DE SORT
let sortMethod: (
	data: number[],
	stepCallback?: (newSortData: number[], step: number) => unknown,
) => unknown = () => null

// GUARDAR JSON
const saveSortJSONFile = () =>
	saveJSONFile(
		allStrings
			? globalSortData.map((wIndex: number) => globalCopyStringData[wIndex - 1])
			: globalSortData,
	)

// CARGAR JSON
fileUploadCallback = (json: JSONInputFile) => {
	// ASIGNAR VARIABLES GLOBALES
	const valores = json.valores as number[]
	globalCopySortData = valores
	globalSortData = valores
	globalSortLength = valores.length
	sortBarWidth = (BAR_WIDTH / valores.length) * 100
	maxSortDataValue = Math.max(...valores)
	sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)

	// TAMAÑOS DE FUENTE
	if (globalSortLength > 0 && globalSortLength <= 10) {
		fontSize = 25
		fontY = 20
	} else if (globalSortLength > 10 && globalSortLength <= 15) {
		fontSize = 25
		fontY = 20
	} else if (globalSortLength > 15 && globalSortLength <= 30) {
		fontSize = 17
		fontY = 27
	} else if (globalSortLength > 30 && globalSortLength <= 50) {
		fontSize = 13
		fontY = 35
	} else {
		fontSize = 13
		fontY = 35.5
	}

	// DATOS COMO STRINGS
	allStrings = valores.every((valor) => typeof valor === 'string')
	if (allStrings) {
		// @ts-ignore
		let sortedStrings: string[] = [...valores].sort((a, b) =>
			// @ts-ignore
			a.localeCompare(b),
		)
		globalCopyStringData = sortedStrings
		// @ts-ignore
		let unSortedStrings: number[] = valores.map(
			// @ts-ignore
			(valor: string) => sortedStrings.indexOf(valor) + 1,
		)

		// ASIGNACIÓN
		globalCopySortData = globalSortData = unSortedStrings
		globalSortLength = unSortedStrings.length
		sortBarWidth = (BAR_WIDTH / unSortedStrings.length) * 100
		maxSortDataValue = Math.max(...unSortedStrings)
		sortBarHeight = BAR_HEIGHT / Math.max(0.5, maxSortDataValue)
	}

	// CAMBIAR MUESTRA DE CÓDIGO
	if (codeDataArray) codeDataArray.textContent = valores.join(', ')
	if (sortStepText) sortStepText.textContent = '0'
	if (sortPerformance) sortPerformance.textContent = '0%'

	// ESTILOS Y TEXTOS
	removeBanner()
	setSortRuntime()
	setElementsLength(globalSortLength)
}

// CALLBACK PARA DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		// LIMPIAR
		canvasCtx.clearRect(0, 0, width, height)

		// DIBUJAR BARRAS
		for (let barIndex: number = 0; barIndex < globalSortLength; barIndex++) {
			// COLOR
			canvasCtx.fillStyle =
				canvasObjectColors[
					barIndex > canvasObjectColors.length - 1
						? barIndex -
						  canvasObjectColors.length *
								Math.floor(barIndex / canvasObjectColors.length)
						: barIndex
				]

			// PROPIEDADES DE BARRA
			const rectX: number =
				sortBarWidth * barIndex + BAR_MARGIN * (barIndex + 1) - width / 2 + 20
			const rectY: number = -(sortBarHeight * globalSortData[barIndex]) + 138
			const rectH: number = sortBarHeight * globalSortData[barIndex]
			const fontHeight: number =
				fontSize - globalSortData[barIndex].toString().length * 2

			// BARRA
			canvasCtx.fillRect(rectX, rectY, sortBarWidth, rectH)

			// TEXTO
			const barValue = allStrings
				? globalCopyStringData[globalSortData[barIndex] - 1]
				: globalSortData[barIndex].toString()
			canvasCtx.save()

			// ROTAR 90DEG
			if (allStrings) {
				canvasCtx.translate(rectX * 2 - rectX - 142, 180 + rectX - fontY + 7)
				canvasCtx.rotate(-Math.PI / 2)
			}

			canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
			canvasCtx.font = `bold ${fontHeight}px Montserrat`
			canvasCtx.textAlign = allStrings ? 'right' : 'center'
			canvasCtx.fillText(barValue, rectX + sortBarWidth / 2, 185 - fontY)

			// REINICIAR
			canvasCtx.restore()
		}
	}
}

// INICIAR ORDENAMIENTO
const startSorting = () => {
	// ORDENAMIENTO
	sortMethod(globalSortData, (newSortData: number[], step: number) => {
		// COPIAR DATOS
		let tmpSortData = [...newSortData]

		// ANIMAR
		setTimeout(() => {
			globalSortData = tmpSortData
			if (sortStepText) sortStepText.textContent = step.toString()
			if (sortPerformance)
				sortPerformance.textContent = `${(
					(globalSortLength / step) *
					100
				).toFixed(2)}%`
		}, step * (30 - ANIMATION_VELOCITY))
	})
}

// TIEMPO DE EJECUCIÓN
const setSortRuntime = () => {
	// CALCULAR TIEMPO
	const t0 = performance.now()
	sortMethod(globalSortData)
	const tf = performance.now()

	// MOSTRAR
	setRuntimeText(tf - t0)
}

// REINICIAR DATOS
const restartSortedData = () => {
	resetCanvas()
	globalSortData = globalCopySortData
}

setSortRuntime()
