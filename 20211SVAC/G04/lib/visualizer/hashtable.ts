// CONFIGURACIÓN GLOBAL
type HashFunction = 'simple' | 'div' | 'times'

// INSTANCIAS
let openHashInstance: TablaHashAbierta | null = null
let hashInstance: TablaHashAbierta | TablaHashCerrada | null = null
let openHashFunc: HashFunction = 'div'
let openHashSize: number = 10
let elementsCounter: number = 0
let isOpenHash: boolean = true

// ANIMACIÓN
let hashScalePosition: number[] = [-1, -1]
let hashNodeScaleCounter: number = 0

// INICIAR
interface SetHashTableProps {
	openHash: {
		hashInstance: TablaHashAbierta
		size: number
		hashFunc: HashFunction
	} | null
}
const setHashTable = (props: SetHashTableProps) => {
	if (props.openHash) {
		hashInstance = props.openHash.hashInstance
		isOpenHash = true
		openHashInstance = props.openHash.hashInstance
		openHashSize = props.openHash.size
		openHashFunc = props.openHash.hashFunc
	}
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		// DIBUJAR HASH ABIERTA
		if (isOpenHash && openHashInstance) {
			for (let headIndex: number = 0; headIndex < openHashSize; headIndex++) {
				// CABECERAS
				canvasCtx.beginPath()
				// ESTILOS
				canvasCtx.lineWidth = 7
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
				canvasCtx.strokeStyle =
					canvasObjectColors[
						headIndex > canvasObjectColors.length - 1
							? headIndex -
							  canvasObjectColors.length *
									Math.floor(headIndex / canvasObjectColors.length)
							: headIndex
					]

				// CUADRO
				canvasCtx.roundRect(headIndex * 70 - 620, 150, 50, 50, 10)
				canvasCtx.stroke()
				canvasCtx.fill()
				canvasCtx.closePath()

				// TEXTO
				canvasCtx.beginPath()
				canvasCtx.fillStyle = '#011f3bcc'
				canvasCtx.font = `bold 20px Montserrat`
				canvasCtx.textAlign = 'center'
				canvasCtx.textBaseline = 'middle'
				canvasCtx.fillText(headIndex.toString(), headIndex * 70 - 620 + 25, 175)
				canvasCtx.closePath()

				// LISTAS
				for (
					let nodeIndex: number = 0;
					nodeIndex < openHashInstance.tabla[headIndex].valores.length;
					nodeIndex++
				) {
					const nodeValue = openHashInstance.tabla[headIndex].valores[nodeIndex]

					// VALORES
					canvasCtx.beginPath()
					// ESTILOS
					canvasCtx.lineWidth = 7
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
					canvasCtx.strokeStyle =
						canvasObjectColors[
							headIndex > canvasObjectColors.length - 1
								? headIndex -
								  canvasObjectColors.length *
										Math.floor(headIndex / canvasObjectColors.length)
								: headIndex
						]

					// CUADRO
					// ANIMACIÓN DE ESCALA
					if (hashScalePosition[0] !== -1 && hashNodeScaleCounter < 10)
						hashNodeScaleCounter += ANIMATION_VELOCITY * 0.05

					const enableScale: boolean =
						hashScalePosition[0] === headIndex &&
						(isOpenHash ? hashScalePosition[1] === nodeIndex : true)
					const addedScale: number = enableScale ? hashNodeScaleCounter : 0

					canvasCtx.roundRect(
						headIndex * 70 - 620 - addedScale / 2,
						155 - (nodeIndex + 1) * 100 - addedScale / 2,
						50 + addedScale,
						50 + addedScale,
						10,
					)
					canvasCtx.stroke()
					canvasCtx.fill()
					canvasCtx.closePath()

					// TEXTO
					canvasCtx.beginPath()
					canvasCtx.fillStyle = '#011f3bcc'
					canvasCtx.font = `bold ${20 + addedScale * 0.8}px Montserrat`
					canvasCtx.textAlign = 'center'
					canvasCtx.textBaseline = 'middle'
					canvasCtx.fillText(
						nodeValue.valor.toString(),
						headIndex * 70 - 620 + 25,
						155 - (nodeIndex + 1) * 100 + 25,
					)
					canvasCtx.closePath()

					// FLECHA
					canvasCtx.beginPath()
					canvasCtx.strokeStyle =
						canvasObjectColors[
							headIndex > canvasObjectColors.length - 1
								? headIndex -
								  canvasObjectColors.length *
										Math.floor(headIndex / canvasObjectColors.length)
								: headIndex
						]
					canvasCtx.arrowTo(
						headIndex * 70 - 620 + 25,
						180 - (nodeIndex + 1) * 100 + 70,
						headIndex * 70 - 620 + 25,
						180 - (nodeIndex + 1) * 100 + 0,
						30,
					)
					canvasCtx.stroke()
					canvasCtx.closePath()
				}
			}
		}
	}
}

// AGREGAR EN HASH
const addOnHashTable = () => {
	if (hashInstance && newNodeValue.length) {
		hashInstance.insertar(newNodeValue)
		setElementsLength(++elementsCounter)
		addTestCode('insertar', newNodeValue.toString())
	}
}

// ELIMINAR EN HASH
const removeOnHashTable = () => {
	if (hashInstance && oldNodeValue.length) {
		hashInstance.eliminar(oldNodeValue)
		setElementsLength(--elementsCounter)
		addTestCode('eliminar', oldNodeValue.toString())
	}
}

// ACTUALIZAR EN HASH
const updateOnHashTable = () => {
	if (hashInstance && oldNodeValue.length && newNodeValue.length) {
		hashInstance.actualizar(oldNodeValue, newNodeValue)
		addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)
	}
}

// BUSCAR EN HASH
const searchOnHashTable = () => {
	if (hashInstance && oldNodeValue.length) {
		const index: number[] = hashInstance.getIndex(oldNodeValue)
		if (index[0] >= 0) {
			hashNodeScaleCounter = 0
			hashScalePosition = index
		} else alert('Valor no encontrado')
	}
}
