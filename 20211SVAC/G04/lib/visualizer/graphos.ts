// GLOBALES
let enableAddNode: boolean = false
let enableAddEdge: boolean = false
let selectedFirstEdge: number = 0
let mouseIsDown: boolean = false
let tmpGraphoNode: NodePosition | null = null

// ARREGLO DE GRAFOS
const edgesArray: EdgeJoin[] = []
const nodesArray: NodePosition[] = [
	{
		x: 0,
		y: 0,
		value: '1',
	},
]

// OBTENER DISTANCIA ENTRE PUNTOS
const getNodesDistance = (x1: number, x2: number, y1: number, y2: number) =>
	Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

// DIBUJAR CADA NODO
drawInCanvas = () => {
	if (canvasCtx) {
		// GRAFICAR ARISTAS
		for (
			let edgeIndex: number = 0;
			edgeIndex < edgesArray.length;
			edgeIndex++
		) {
			const currentEdge: EdgeJoin = edgesArray[edgeIndex]

			if (currentEdge.dest) {
				canvasCtx.beginPath()

				// LINEA
				canvasCtx.strokeStyle = currentEdge.origin.color
				canvasCtx.lineWidth = 5

				// DIBUJAR LINEA
				canvasCtx.moveTo(currentEdge.origin.x, currentEdge.origin.y)

				// ARCO SI ES DOBLE
				if (currentEdge.dest.isDouble) {
					// GET DELTAS
					const midX: number = (currentEdge.dest.x + currentEdge.origin.x) / 2
					const midY: number = (currentEdge.dest.y + currentEdge.origin.y) / 2
					const deltaX: number = currentEdge.dest.x - currentEdge.origin.x
					const deltaY: number = currentEdge.dest.y - currentEdge.origin.y
					const distance: number = getNodesDistance(
						currentEdge.origin.x,
						currentEdge.dest.x,
						currentEdge.origin.y,
						currentEdge.dest.y,
					)
					const randPhase: number = currentEdge.dest.randPhase

					canvasCtx.quadraticCurveTo(
						midX +
							(Math.abs(deltaY) > Math.abs(deltaX) ? distance / 2 : 0) *
								randPhase,
						midY +
							+(Math.abs(deltaX) > Math.abs(deltaY) ? distance / 2 : 0) *
								randPhase,
						currentEdge.dest.x,
						currentEdge.dest.y,
					)
				} else canvasCtx.lineTo(currentEdge.dest.x, currentEdge.dest.y)

				// PINTAR
				canvasCtx.stroke()
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

			// CIRCULO
			canvasCtx.beginPath()
			canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
			canvasCtx.lineWidth = 7

			canvasCtx.arc(currentNode.x, currentNode.y, 25, 0, 2 * Math.PI)

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
			canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
			canvasCtx.font = `bold ${
				20 - currentNode.value.toString().length * 2.5
			}px Montserrat`

			// TEXTO
			canvasCtx.fillText(currentNode.value, currentNode.x, currentNode.y - 45)
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
			if (enableAddNode) {
				ev.preventDefault()

				// CREAR NODO
				tmpGraphoNode = {
					x: ev.clientX / cameraZoom - cameraOffset.x - 30,
					y: ev.clientY / cameraZoom - cameraOffset.y - 80,
					value: newNodeValue,
				}

				// AGREGAR A LISTA DE NODOS
				nodesArray.push(tmpGraphoNode)
				enableAddNode = false
				tmpGraphoNode = null
			}
		}
	}, 500)
})

// INSERTAR ARISTA
const addEdgeOnGraphos = () => {
	hideNavMenu(1)
	enableAddEdge = true
}

canvas.addEventListener('click', (ev: MouseEvent) => {
	if (enableAddEdge) {
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
				edgesArray.push({ origin: selectedNode, dest: null })
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
					selectedNode.randPhase = Math.random() + 0.1
				}

				// AGREGAR
				lastEdge.dest = selectedNode
				enableAddEdge = false
				selectedFirstEdge = -1
			}
		}
	}
})
