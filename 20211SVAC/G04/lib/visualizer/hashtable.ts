// CONFIGURACIÓN GLOBAL
type HashFunction = 'simple' | 'div' | 'times'
const hashFunctions: HashFunction[] = ['simple', 'div', 'times']

type HashCoalition = 'lineal' | 'quad' | 'times'
const hashCoalitions: HashCoalition[] = ['lineal', 'quad', 'times']

// INSTANCIAS
let hashInstance: TablaHashAbierta | TablaHashCerrada | null = null
let hashCoalition: HashCoalition = 'lineal'
let hashFunction: HashFunction = 'div'
let elementsCounter: number = 0
let hashTableSize: number = 10
let isOpenHash: boolean = true
let hashMin: number = 20
let hashMax: number = 20

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

	closedHash: {
		hashInstance: TablaHashCerrada
		size: number
		min: number
		max: number
		coalition: HashCoalition
		hashFunc: HashFunction
	} | null
}
const setHashTable = (props: SetHashTableProps) => {
	if (props.openHash) {
		isOpenHash = true
		hashInstance = props.openHash.hashInstance
		hashTableSize = props.openHash.size
		hashFunction = props.openHash.hashFunc
	} else if (props.closedHash) {
		isOpenHash = false
		hashInstance = props.closedHash.hashInstance
		hashTableSize = props.closedHash.size
		hashCoalition = props.closedHash.coalition
		hashFunction = props.closedHash.hashFunc
		hashMin = props.closedHash.min
		hashMax = props.closedHash.max
	}
}

// SUBIR ARCHIVO
fileUploadCallback = () => {
	// INSTANCIA
	hashInstance = isOpenHash
		? new TablaHashAbierta(hashTableSize, hashFunctions.indexOf(hashFunction))
		: new TablaHashCerrada(
				hashTableSize,
				hashMin,
				hashMax,
				hashCoalitions.indexOf(hashCoalition),
				hashFunctions.indexOf(hashFunction),
		  )

	globalJSONInput?.valores.forEach((valor: string | number) => {
		if (hashInstance) {
			newNodeValue = valor.toString()
			addOnHashTable()
		}
	})

	elementsCounter = globalJSONInput?.valores.length || 0
	setElementsLength(elementsCounter)
}

// GUARDAR ARCHIVO
const saveOpenHashTable = () => {
	if (hashInstance) {
		const parsedValues = isOpenHash
			? hashInstance.tabla.map(
					// @ts-ignore
					(node) => node.valores.map((node) => node.valor),
			  )
			: // @ts-ignore
			  hashInstance.tabla.map((node) => node.valor)
		saveJSONFile(parsedValues)
	}
}

// INPUT DE FUNCIÓN
const onChangeHashTableInput = (ev: Event, callback: (value: any) => void) => {
	const target = ev.target as HTMLInputElement
	const value: any = target.value as any
	callback(value)
}

const onChangeHashFunc = (ev: Event) =>
	onChangeHashTableInput(ev, (value) => (hashFunction = value))

const onChangeHashCoalition = (ev: Event) =>
	onChangeHashTableInput(ev, (value) => (hashCoalition = value))

const onChangeHashSize = (ev: Event) =>
	onChangeHashTableInput(ev, (value) => (hashTableSize = +value))

const onChangeHashMin = (ev: Event) =>
	onChangeHashTableInput(ev, (value) => (hashMin = +value))

const onChangeHashMax = (ev: Event) =>
	onChangeHashTableInput(ev, (value) => (hashMax = +value))

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		// DIBUJAR HASH ABIERTA
		if (hashInstance) {
			for (
				let headIndex: number = 0;
				headIndex < (isOpenHash ? hashTableSize : hashInstance.tabla.length);
				headIndex++
			) {
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

				// ANIMACIÓN DE ESCALA
				if (hashScalePosition[0] !== -1 && hashNodeScaleCounter < 10)
					hashNodeScaleCounter += ANIMATION_VELOCITY * 0.05

				const enableScale: boolean = hashScalePosition[0] === headIndex
				const addedScale: number = enableScale ? hashNodeScaleCounter : 0

				// CUADRO
				canvasCtx.roundRect(
					headIndex * 70 - 620 - addedScale / 2,
					150 - addedScale / 2,
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
					isOpenHash
						? headIndex.toString()
						: // @ts-ignore
						  hashInstance.tabla[headIndex]?.valor,
					headIndex * 70 - 620 + 25,
					175,
				)
				canvasCtx.closePath()

				// LISTAS
				if (isOpenHash)
					for (
						let nodeIndex: number = 0;
						// @ts-ignore
						nodeIndex < hashInstance.tabla[headIndex]?.valores.length || 0;
						nodeIndex++
					) {
						// @ts-ignore
						const nodeValue = hashInstance.tabla[headIndex].valores[nodeIndex]

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
						// ANIMACIÓN DE ESCALA
						if (hashScalePosition[0] !== -1 && hashNodeScaleCounter < 10)
							hashNodeScaleCounter += ANIMATION_VELOCITY * 0.05

						const enableScale: boolean =
							hashScalePosition[0] === headIndex &&
							(isOpenHash ? hashScalePosition[1] === nodeIndex : true)
						const addedScale: number = enableScale ? hashNodeScaleCounter : 0

						// CUADRO
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
	validateOnHashTable(() => {
		if (hashInstance && oldNodeValue.length) {
			hashInstance.eliminar(oldNodeValue)
			setElementsLength(--elementsCounter)
			addTestCode('eliminar', oldNodeValue.toString())
		}
	})
}

// ACTUALIZAR EN HASH
const updateOnHashTable = () => {
	validateOnHashTable(() => {
		if (hashInstance && oldNodeValue.length && newNodeValue.length) {
			hashInstance.actualizar(oldNodeValue, newNodeValue)
			addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)
		}
	})
}

// BUSCAR VALOR
const validateOnHashTable = (callback?: Function) => {
	if (hashInstance && oldNodeValue.length) {
		const index: number[] = hashInstance.getIndex(oldNodeValue)
		if (index[0] >= 0) {
			hashNodeScaleCounter = 0
			hashScalePosition = index
			callback && callback()
		} else alert('Valor no encontrado')
	}
}

// BUSCAR EN HASH
const searchOnHashTable = () => validateOnHashTable()
