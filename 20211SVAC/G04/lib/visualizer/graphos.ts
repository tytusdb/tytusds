// GLOBALES
let enableAddNode: boolean = false
let enableAddEdge: boolean = false
let selectedFirstEdge: number = 0
let mouseIsDown: boolean = false
let tmpGraphoNode: NodePosition | null = null
let newEdgeLength: number = 0

// ANIMACIÓN
let tmpSearchGraphoNode: NodePosition | null = null
let graphoNodeScaleCounter: number = 0

// ARREGLO DE GRAFOS
let edgesArray: EdgeJoin[] = []
let nodesArray: NodePosition[] = [
	{
		x: 0,
		y: 0,
		value: '1',
	},
]

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

			if (currentEdge.dest) {
				canvasCtx.beginPath()

				// LINEA
				canvasCtx.strokeStyle = currentEdge.dest.isDouble
					? currentEdge.dest.color
					: currentEdge.origin.color
				canvasCtx.lineWidth = 5

				// DIBUJAR LINEA
				canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y)
				canvasCtx.arrowTo(
					currentEdge.origin.x,
					currentEdge.origin.y,
					currentEdge.dest.x,
					currentEdge.dest.y,
					30,
				)

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

canvas.addEventListener('mousedown', (ev: MouseEvent) => {
	mouseIsDown = true
	setTimeout(function () {
		if (mouseIsDown) {
			if (enableAddNode && newNodeValue.length) {
				ev.preventDefault()

				// CREAR NODO
				tmpGraphoNode = {
					x: ev.clientX / cameraZoom - cameraOffset.x - 30,
					y: ev.clientY / cameraZoom - cameraOffset.y - 80,
					value: newNodeValue,
				}

				// AGREGAR A LISTA DE NODOS
				tmpSearchGraphoNode = null
				graphoNodeScaleCounter = 0
				nodesArray.push(tmpGraphoNode)
				enableAddNode = false
				tmpGraphoNode = null
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
	hideNavMenu(1)
	enableAddEdge = true
}

canvas.addEventListener('click', (ev: MouseEvent) => {
	if (enableAddEdge && newEdgeLength) {
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
				(eNode: NodePosition) => node.x !== eNode.x && node.y !== eNode.y,
			)

			// ELIMINAR ARISTAS QUE CONECTAN A ESE NODO
			edgesArray = edgesArray.filter(
				(edge: EdgeJoin) =>
					edge.origin.x !== node.x &&
					edge.origin.y !== node.y &&
					edge.dest?.x !== node.x &&
					edge.dest?.y !== node.y,
			)
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
		} else alert('Nodo no econtrado')
	}
}
