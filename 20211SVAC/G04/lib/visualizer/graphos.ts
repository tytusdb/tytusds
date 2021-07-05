// CONFIGURACIÓN
type GraphoType = 'dir' | 'noDir'
type GraphoWaySearch = 'deep' | 'width'
type GraphoSaveType = 'matrix' | 'list'

let graphoType: GraphoType = 'dir'
let graphoWaySearch: GraphoWaySearch = 'width'
let graphoSaveType: GraphoSaveType = 'matrix'

// GLOBALES
let enableAddNode: boolean = false
let enableAddEdge: boolean = false
let selectedFirstEdge: number = 0
let mouseIsDown: boolean = false
let tmpGraphoNode: NodePosition | null = null
let newEdgeLength: number = -1

// ANIMACIÓN
let tmpSearchGraphoNode: NodePosition | null = null
let graphoNodeScaleCounter: number = 0

// ARREGLO DE GRAFOS
let edgesArray: EdgeJoin[] = []
let nodesArray: NodePosition[] = []
let searchGraphoPositions: EdgeJoin[] = []
let vertexArray: GraphoInputValues[] = []

// SUBIR JSON
fileUploadCallback = () => {
	const values: GraphoInputValues[] =
		// @ts-ignore
		globalJSONInput?.valores as GraphoInputValues[]
	vertexArray = values
	let valueCounter: number = 0
	let matrixLength: number = Math.floor(Math.sqrt(2 * (values.length - 1)))
	const rootPosition: PointPosition = {
		x: -((matrixLength - 1) * 130) / 2 - 100,
		y: 0,
	}
	const positions: PointPosition[] = [rootPosition]

	// NODO RAÍZ
	newNodeValue = values[0].vertice.toString()
	addNodeOnGraphosAtPosition(rootPosition)

	// MATRIZ
	for (let i: number = 0; i < matrixLength; i++)
		for (let j: number = 0; j < matrixLength; j++)
			if (valueCounter < values.length) {
				valueCounter++
				newNodeValue = values[valueCounter].vertice.toString()
				const position: PointPosition = {
					x: i * 130 - ((matrixLength - 1) * 130) / 2,
					y: j * 130 - ((matrixLength - 1) * 130) / 2,
				}
				addNodeOnGraphosAtPosition(position)
				positions.push(position)
			}

	// ARISTAS
	for (let vertexIndex: number = 0; vertexIndex < values.length; vertexIndex++)
		for (
			let edgeIndex: number = 0;
			edgeIndex < values[vertexIndex].aristas.length;
			edgeIndex++
		) {
			// ARISTA
			const edge = values[vertexIndex].aristas[edgeIndex]
			const nodeIndex: number = values
				.map((value) => value.vertice)
				.indexOf(edge.arista)

			// COLOR
			const edgeColor =
				canvasObjectColors[
					vertexIndex > canvasObjectColors.length - 1
						? vertexIndex -
						  canvasObjectColors.length *
								Math.floor(vertexIndex / canvasObjectColors.length)
						: vertexIndex
				]

			const edgeDestColor =
				canvasObjectColors[
					nodeIndex > canvasObjectColors.length - 1
						? nodeIndex -
						  canvasObjectColors.length *
								Math.floor(nodeIndex / canvasObjectColors.length)
						: nodeIndex
				]

			// ES UNA ARISTA DOBLE
			const isDouble = edgesArray.some(
				(edge: EdgeJoin) =>
					edge.origin.x === positions[nodeIndex].x &&
					edge.origin.y === positions[nodeIndex].y &&
					edge.dest?.x === positions[vertexIndex].x &&
					edge.dest?.y === positions[vertexIndex].y,
			)

			edgesArray.push({
				origin: {
					...positions[vertexIndex],
					color: edgeColor,
					isDouble: false,
					value: values[vertexIndex].vertice.toString(),
					randPhase: 0,
				},
				dest: {
					...positions[nodeIndex],
					color: isDouble ? edgeDestColor : edgeColor,
					value: edge.arista.toString(),
					isDouble,
					randPhase: 0,
				},
				distance: edge.distancia,
			})
		}
	selectedFirstEdge = -1
	enableAddEdge = false
}

// GUARDAR JSON
const saveGraphosJSON = () => {
	if (graphoSaveType === 'matrix') {
		// GENERAR MATRIZ
		let matrix: number[][] = []
		for (let i: number = 0; i < nodesArray.length; i++) {
			const row: number[] = []
			for (let j: number = 0; j < nodesArray.length; j++) {
				const currentVertex = vertexArray[i]
				if (
					currentVertex.aristas.some(
						(edge) =>
							edge.arista.toString() === vertexArray[j].vertice.toString(),
					)
				)
					row.push(1)
				else row.push(0)
			}
			matrix.push(row)
		}

		// GUARDAR
		// @ts-ignore
		saveJSONFile(matrix)
	} else {
		const values = vertexArray.map((vertex) =>
			vertex.aristas.map((edge) => edge.arista),
		)
		// GUARDAR
		// @ts-ignore
		saveJSONFile(values)
	}
}

// INPUT DE FUNCIÓN
const onChangeGraphosInput = (ev: Event, callback: (value: any) => void) => {
	const target = ev.target as HTMLInputElement
	const value: any = target.value as any
	callback(value)
}

const onChangeGraphosType = (ev: Event) =>
	onChangeGraphosInput(ev, (value) => (graphoType = value))

const onChangeGraphosSearch = (ev: Event) =>
	onChangeGraphosInput(ev, (value) => (graphoWaySearch = value))

const onChangeGraphosSave = (ev: Event) =>
	onChangeGraphosInput(ev, (value) => (graphoSaveType = value))

// OBTENER INPUT DE DISTANCIA
const onChangeEdgeLength = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	const value: number = +target.value
	newEdgeLength = value
}

// OBTENER DISTANCIA ENTRE PUNTOS
const getNodesDistance = (x1: number, x2: number, y1: number, y2: number) =>
	Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

// DIBUJAR CADA NODO
drawInCanvas = () => {
	if (canvasCtx) {
		// GRAFICA ARISTAS
		for (
			let edgeIndex: number = 0;
			edgeIndex < edgesArray.length;
			edgeIndex++
		) {
			const currentEdge: EdgeJoin = edgesArray[edgeIndex]
			// @ts-ignore
			const currentSearchEdge: EdgeJoin = searchGraphoPositions.find(
				(node: EdgeJoin) =>
					// @ts-ignore
					node?.dest?.x === currentEdge?.dest?.x &&
					node?.dest?.y === currentEdge?.dest?.y &&
					node.origin.x === currentEdge.origin.x &&
					node.origin.y === currentEdge.origin.y,
			)

			if (currentEdge.dest) {
				canvasCtx.beginPath()

				// LINEA
				canvasCtx.strokeStyle = !currentSearchEdge
					? currentEdge.dest.isDouble
						? currentEdge.dest.color
						: currentEdge.origin.color
					: currentSearchEdge?.origin.color
				canvasCtx.lineWidth = 5

				// DIBUJAR LINEA
				canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y)

				if (graphoType === 'dir')
					canvasCtx.arrowTo(
						currentEdge.origin.x,
						currentEdge.origin.y,
						currentEdge.dest.x,
						currentEdge.dest.y,
						30,
					)
				else {
					canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y)
					canvasCtx.lineTo(currentEdge.dest.x, currentEdge.dest.y)
				}

				// PINTAR
				canvasCtx.stroke()
				canvasCtx.closePath()

				// ESTILO DEL TEXTO ARISTA
				canvasCtx.beginPath()
				const textX: number = (currentEdge.dest.x + currentEdge.origin.x) / 2
				const textY: number = (currentEdge.dest.y + currentEdge.origin.y) / 2

				canvasCtx.textAlign = 'center'
				canvasCtx.textBaseline = 'middle'
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
				canvasCtx.font = `bold 20px Montserrat`

				// TEXTO
				canvasCtx.clearRect(textX - 10, textY - 15, 20, 30)
				canvasCtx.fillText(currentEdge.distance.toString(), textX, textY)
				canvasCtx.closePath()
			}
		}

		for (
			let nodeIndex: number = 0;
			nodeIndex < nodesArray.length;
			nodeIndex++
		) {
			// NODO
			const currentColorIndex =
				nodeIndex > canvasObjectColors.length - 1
					? nodeIndex -
					  canvasObjectColors.length *
							Math.floor(nodeIndex / canvasObjectColors.length)
					: nodeIndex
			const currentNode: NodePosition = nodesArray[nodeIndex]

			// COLOR
			canvasCtx.strokeStyle = canvasObjectColors[currentColorIndex]

			// ANIMACIÓN DE ESCALA
			if (tmpSearchGraphoNode !== null && graphoNodeScaleCounter < 6)
				graphoNodeScaleCounter += ANIMATION_VELOCITY * 0.5

			const enableScale: boolean =
				tmpSearchGraphoNode?.x === currentNode.x &&
				tmpSearchGraphoNode?.y === currentNode.y
			const addedScale: number = enableScale ? graphoNodeScaleCounter : 0

			// CIRCULO
			canvasCtx.beginPath()
			canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
			canvasCtx.lineWidth = 7

			canvasCtx.arc(
				currentNode.x,
				currentNode.y,
				25 + addedScale,
				0,
				2 * Math.PI,
			)

			// DIBUJAR BORDE Y CIRCULO
			canvasCtx.stroke()
			canvasCtx.fill()
			canvasCtx.closePath()

			// NODO TEMPORAL
			if (tmpGraphoNode !== null) {
				if (enableAddNode) {
					canvasCtx.beginPath()

					canvasCtx.strokeStyle =
						canvasObjectColors[
							nodeIndex + 1 > canvasObjectColors.length - 1
								? nodeIndex +
								  1 -
								  canvasObjectColors.length *
										Math.floor(nodeIndex + 1 / canvasObjectColors.length)
								: nodeIndex + 1
						]
					canvasCtx.fillStyle = isDarkMode
						? 'rgba(170, 170, 170, .7)'
						: 'rgba(248, 248, 248, .7)'
					canvasCtx.lineWidth = 7
					canvasCtx.arc(tmpGraphoNode.x, tmpGraphoNode.y, 15, 0, 2 * Math.PI)

					canvasCtx.stroke()
					canvasCtx.fill()

					canvasCtx.closePath()
				} else if (enableAddEdge) {
					if (edgesArray[edgesArray.length - 1] && selectedFirstEdge !== -1) {
						canvasCtx.beginPath()
						canvasCtx.strokeStyle = edgesArray[selectedFirstEdge].origin.color
						canvasCtx.lineWidth = 5
						canvasCtx.moveTo(
							edgesArray[selectedFirstEdge].origin.x,
							edgesArray[selectedFirstEdge].origin.y,
						)
						canvasCtx.lineTo(tmpGraphoNode.x, tmpGraphoNode.y)
						canvasCtx.stroke()
						canvasCtx.closePath()
					}
				}
			}

			// ESTILO DEL TEXTO
			canvasCtx.beginPath()
			canvasCtx.textAlign = 'center'
			canvasCtx.textBaseline = 'middle'
			canvasCtx.fillStyle = '#011f3bcc'
			canvasCtx.font = `bold ${
				20 -
				currentNode.value.toString().length * 2.5 +
				(enableScale ? graphoNodeScaleCounter * 0.6 : 0)
			}px Montserrat`

			// TEXTO
			canvasCtx.fillText(currentNode.value, currentNode.x, currentNode.y)
			canvasCtx.closePath()
		}
	}
}

// INSERTAR NODOS
const addNodeOnGraphos = () => {
	if (newNodeValue.length > 0) {
		hideNavMenu(1)
		enableAddNode = true
	}
}
const removeTmpGraphoNode = () => (mouseIsDown = false)
canvas.addEventListener('mouseup', removeTmpGraphoNode)
canvas.addEventListener('touchend', removeTmpGraphoNode)

canvas.addEventListener('mousemove', (ev: MouseEvent) => {
	if (enableAddNode || enableAddEdge) {
		tmpGraphoNode = {
			x: ev.clientX / cameraZoom - cameraOffset.x - 30,
			y: ev.clientY / cameraZoom - cameraOffset.y - 80,
			value: newNodeValue,
		}
	}
	mouseIsDown = false
})

const addNodeOnGraphosAtPosition = (position: PointPosition) => {
	// CREAR NODO
	tmpGraphoNode = {
		...position,
		value: newNodeValue,
	}

	// AGREGAR A LISTA DE NODOS
	tmpSearchGraphoNode = null
	graphoNodeScaleCounter = 0
	nodesArray.push(tmpGraphoNode)
	addTestCode('insertar', newNodeValue)
	enableAddNode = false
	tmpGraphoNode = null
}

canvas.addEventListener('mousedown', (ev: MouseEvent) => {
	mouseIsDown = true
	setTimeout(function () {
		if (mouseIsDown) {
			if (enableAddNode && newNodeValue.length) {
				ev.preventDefault()
				addNodeOnGraphosAtPosition({
					x: ev.clientX / cameraZoom - cameraOffset.x - 30,
					y: ev.clientY / cameraZoom - cameraOffset.y - 80,
				})
				vertexArray.push({
					vertice: +newNodeValue,
					aristas: [],
				})
			}
		}
	}, 500)
})

// BUSCAR NODO
const searchNodeOnGrapho = (value: string) => {
	let currentNode: NodePosition | null = null
	for (let nodeIndex: number = 0; nodeIndex < nodesArray.length; nodeIndex++)
		if (nodesArray[nodeIndex].value.toString() === value)
			currentNode = nodesArray[nodeIndex]
	return currentNode
}

// INSERTAR ARISTA
const addEdgeOnGraphos = () => {
	if (newEdgeLength >= 0) {
		hideNavMenu(1)
		enableAddEdge = true
	}
}

canvas.addEventListener('click', (ev: MouseEvent) => {
	if (enableAddEdge && newEdgeLength >= 0) {
		// NODO SELECCIONADO
		let selectedNodeIndex: number = 0
		let selectedNode: EdgePosition | null = null
		const currentPosition: NodePosition = {
			x: ev.clientX / cameraZoom - cameraOffset.x - 30,
			y: ev.clientY / cameraZoom - cameraOffset.y - 80,
			value: newNodeValue,
		}
		const lastEdge: EdgeJoin | null =
			edgesArray.length > 0 ? edgesArray[edgesArray.length - 1] : null

		// BUSCAR NODO
		for (
			let nodeIndex: number = 0;
			nodeIndex < nodesArray.length;
			nodeIndex++
		) {
			const currentNode: NodePosition = nodesArray[nodeIndex]
			if (
				currentPosition.x <= currentNode.x + 25 &&
				currentPosition.x >= currentNode.x - 25 &&
				currentPosition.y <= currentNode.y + 25 &&
				currentPosition.y >= currentNode.y - 25
			) {
				selectedNodeIndex = nodeIndex
				selectedNode = {
					...currentNode,
					color: '',
					isDouble: false,
					randPhase: 1,
				}
				break
			}
		}

		// AGREGAR NODO
		if (selectedNode !== null) {
			if (lastEdge === null || lastEdge.dest !== null) {
				selectedNode.color =
					canvasObjectColors[
						selectedNodeIndex > canvasObjectColors.length - 1
							? selectedNodeIndex -
							  canvasObjectColors.length *
									Math.floor(selectedNodeIndex / canvasObjectColors.length)
							: selectedNodeIndex
					]

				// AGREGAR
				edgesArray.push({
					origin: selectedNode,
					dest: null,
					distance: newEdgeLength,
				})
				selectedFirstEdge = edgesArray.length - 1
			} else {
				// VERIFICAR CAMINO DOBLE
				const isJoinAdded: boolean = edgesArray.some(
					(edge: EdgeJoin) =>
						edge.dest?.x === lastEdge?.origin.x &&
						edge.dest?.y === lastEdge?.origin.y &&
						selectedNode?.x === edge.origin?.x &&
						selectedNode?.y === edge.origin?.y,
				)

				if (isJoinAdded) {
					selectedNode.isDouble = true
					selectedNode.randPhase = Math.random() * (0.5 - 0.3) + 0.3
				}

				// AGREGAR
				vertexArray[
					vertexArray
						.map((vert) => vert.vertice.toString())
						// @ts-ignore
						.indexOf(lastEdge.origin.value)
				]?.aristas.push({
					// @ts-ignore
					arista: selectedNode.value,
					distancia: newEdgeLength,
				})
				lastEdge.dest = selectedNode
				enableAddEdge = false
				selectedFirstEdge = -1
			}
		}
	}
})

// ELIMINAR NODO
const deleteNodeOnGraphos = () => {
	if (oldNodeValue.length) {
		// BUSCAR
		const node: NodePosition | null = searchNodeOnGrapho(
			oldNodeValue.toString(),
		)
		if (node) {
			// ELIMINAR NODO
			nodesArray = nodesArray.filter(
				(eNode: NodePosition) => eNode.value.toString() !== oldNodeValue,
			)

			// ELIMINAR ARISTAS QUE CONECTAN A ESE NODO
			vertexArray = vertexArray.filter(
				(vertex) => vertex.vertice.toString() !== oldNodeValue,
			)
			vertexArray.forEach((vertex) => {
				const edges = vertex.aristas.filter(
					(edge) => edge.arista.toString() !== oldNodeValue,
				)
				vertex.aristas = edges
			})
			edgesArray = edgesArray.filter(
				(edge: EdgeJoin) =>
					edge.origin.value !== oldNodeValue &&
					edge.dest?.value !== oldNodeValue,
			)
			addTestCode('eliminar', oldNodeValue)
			hideNavMenu(1)
		} else console.log('Nodo no econtrado')
	}
}

// ACTUALIZAR NODOS
const updateNodeOnGraphos = () => {
	if (oldNodeValue.length && newNodeValue.length) {
		// BUSCAR
		const node: NodePosition | null = searchNodeOnGrapho(
			oldNodeValue.toString(),
		)
		if (node) {
			// ACTUALIZAR NODO
			tmpSearchGraphoNode = node
			graphoNodeScaleCounter = 0
			node.value = newNodeValue

			// ACTUALIZAR EN VERTICES
			for (
				let vertexIndex: number = 0;
				vertexIndex < vertexArray.length;
				vertexIndex++
			)
				if (vertexArray[vertexIndex].vertice.toString() === oldNodeValue)
					vertexArray[vertexIndex].vertice = +newNodeValue

			// CÓDIGO
			addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)
			hideNavMenu(1)
		} else alert('Nodo no econtrado')
	}
}

// BUSCAR  NODO POR VALOR
const searchNodeOnGraphos = () => {
	if (oldNodeValue.length) {
		// BUSCAR
		const node: NodePosition | null = searchNodeOnGrapho(
			oldNodeValue.toString(),
		)
		if (node) {
			// ACTUALIZAR NODO
			tmpSearchGraphoNode = node
			graphoNodeScaleCounter = 0
			addTestCode('buscar', oldNodeValue)
			hideNavMenu(1)
		} else alert('Nodo no econtrado')
	}
}

// BUSQUEDA POR ANCHURA
const graphosWidthSearch = () => {
	const textValues: string[] = vertexArray.map((value) =>
		value.vertice.toString(),
	)
	const usedNodes: string[] = [textValues[0]]
	const widthSearchEdges: EdgeJoin[] = []

	// ARISTAS
	vertexArray.forEach((currentNode, currentIndex) => {
		currentNode.aristas.forEach((edge) => {
			const destEdge = edge.arista.toString()
			if (!usedNodes.some((node) => node === destEdge)) {
				usedNodes.push(destEdge)
				widthSearchEdges.push({
					origin: {
						...nodesArray[textValues.indexOf(textValues[currentIndex])],
						color: '#ADD8E6',
						isDouble: false,
						randPhase: 0,
					},
					dest: {
						...nodesArray[textValues.indexOf(destEdge)],
						color: '#ADD8E6',
						isDouble: false,
						randPhase: 0,
					},
					distance: edge.distancia,
				})
			}
		})
	})

	searchGraphoPositions = widthSearchEdges
}

// BUSQUEDA POR PROFUNDIDAD
const graphosDeepSearch = () => {
	const textValues: string[] = vertexArray.map((value) =>
		value.vertice.toString(),
	)
	let currentNodeIndex: number = 0
	const usedNodes: string[] = [textValues[0]]
	let deepSearchEdges: EdgeJoin[] = []

	// BUSCAR
	while (usedNodes.length < vertexArray.length) {
		if (currentNodeIndex >= 0) {
			// ULTIMA ARISTA DISPONIBLE
			let lastEdge  = graphoType === 'dir' ? undefined : vertexArray[currentNodeIndex].aristas[0]

			// BUSCAR ARISTA
			for (
				let edgesIndex: number = 0;
				edgesIndex < vertexArray[currentNodeIndex].aristas.length;
				edgesIndex++
			) {
				if (
					!usedNodes.some(
						(node) =>
							node ===
							vertexArray[currentNodeIndex].aristas[
								edgesIndex
							].arista.toString(),
					)
				) {
					lastEdge = vertexArray[currentNodeIndex].aristas[edgesIndex]
					break
				}
			}

			// AGREGAR A ARISTA USADA
			if (lastEdge) {
				const nextNodeIndex = textValues.indexOf(lastEdge.arista.toString())
				usedNodes.push(lastEdge.arista.toString())
				deepSearchEdges.push({
					origin: {
						...nodesArray[currentNodeIndex],
						color: '#ADD8E6',
						isDouble: false,
						randPhase: 0,
					},
					dest: {
						...nodesArray[nextNodeIndex],
						color: '#ADD8E6',
						isDouble: false,
						randPhase: 0,
					},
					distance: lastEdge.distancia,
				})
				currentNodeIndex = nextNodeIndex
			} else currentNodeIndex--
		} else break
	}

	searchGraphoPositions = deepSearchEdges
}

// BUSQUEDA POR ANCHURA O PROFUNDIDA
const handleWaySearchOnGraphos = () => {
	if (graphoWaySearch === 'deep') graphosDeepSearch()
	else graphosWidthSearch()

	// AGREGAR CÓDIGO
	addTestCode('recorrer', graphoWaySearch)
	hideNavMenu(1)
}
