// DATOS GLOBALES
let linearStructure: LinearStructure | null = null
let linearStructureLength: number = 0
let className: string = 'ListaSimple'
let isLikeStack: boolean = false
let isCircular: boolean = false
let isSimple: boolean = true
let lastPriority: number = 0
let isPriority: boolean = false

// TIPOS
type InsertMode = 'start' | 'end' | 'order'

// CONFIGURACIÓN GLOBAL
let insertMode: InsertMode = 'end'
canvasBannerDif = 110

// ANIMACIÓN
let nodeScaleCounter: number = 0
let nodeScaleIndex: number = -1
let opacityCounter: number = 0
let deleteIndex: number = -1

// CALLBACK DE ANIMACIÓN
let opacityEndCallback = () => {}

// DATOS INICIALES
const setLinearStructure = (
	newLinearStructure: LinearStructure | null,
	linearClassName: string,
	simple: boolean,
	circular: boolean = false,
	likeStack: boolean = false,
	insertModeType: InsertMode = 'end',
	isPriorityQueue: boolean = false,
) => {
	// CONFIGURAR GLOBALES
	linearStructure = newLinearStructure
	className = linearClassName
	isPriority = isPriorityQueue
	insertMode = insertModeType
	isLikeStack = likeStack
	isCircular = circular
	isSimple = simple

	// ELEMENTOS INICIALES
	if (linearStructure) {
		linearStructure.insertar(isPriority ? 6 : 1, isPriority ? 5 : undefined)
		linearStructure.insertar(isPriority ? 5 : 2, isPriority ? 4 : undefined)
		linearStructure.insertar(isPriority ? 4 : 3, isPriority ? 3 : undefined)
		linearStructure.insertar(isPriority ? 3 : 4, isPriority ? 2 : undefined)
		linearStructure.insertar(isPriority ? 2 : 5, isPriority ? 1 : undefined)

		// AGREGAR UNO EXTRA PARA PILAS Y COLAS
		if (isLikeStack) 
			linearStructure.insertar(isPriority ? 1 : 6, isPriority ? 0 : undefined)
	}

	// ACTUALIZAR TAMAÑO
	linearStructureLength = linearStructure?.getTamaño() || 5
	if (isLikeStack) canvasBannerDif += 20
}

// GUARDAR ARCHIVO
const saveJSONLinearFile = () => {
	if (linearStructure) {
		// CONVERTIR A ARREGLO
		const valores: (string | number)[] = []
		for (
			let linearIndex: number = 0;
			linearIndex < linearStructureLength;
			linearIndex++
		) {
			valores.push(linearStructure.obtener(linearIndex)?.valor)
		}

		// SUBIR
		saveJSONFile(valores)
	}
}

// LEER ARCHIVO
fileUploadCallback = (json: JSONInputFile) => {
	const { valores } = json

	// BORRAR
	if (linearStructure)
		for (
			let linearIndex: number = 0;
			linearIndex < linearStructureLength;
			linearIndex++
		)
			linearStructure.pop()

	// TEXTOS
	linearStructureLength = 0
	if (editor)
		// @ts-ignore
		editor.innerHTML = `<strong style="color:var(--monoConstIce)">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style="color:var(--monoClassIce)">${className}</strong><strong style="color:var(--gray)">&#x3c;</strong><strong style="color:var(--monoNumberIce)">number</strong><strong style="color:var(--gray)">&#x3e;</strong>()\n`

	// ITERAR
	valores.forEach((valor: string | number) => {
		if (linearStructure) {
			if (
				repeatValues ||
				(!repeatValues && linearStructure.buscar(valor.toString()) === null)
			) {
				// @ts-ignore
				newNodeValue = isPriority ? valor.valor.toString() : valor.toString()
				// @ts-ignore
				lastPriority = isPriority ? valor.prioridad : lastPriority
				addNode(false)
			}
		}
	})

	// ELEMENTOS
	setElementsLength(linearStructure ? linearStructure.getTamaño() : 0)
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		canvasCtx.globalCompositeOperation = 'destination-over'
		for (let nodeIndex = 0; nodeIndex < linearStructureLength; nodeIndex++) {
			// POSICIONES EN X
			const nodeX: number = -579 + 150 * nodeIndex
			let addedX: number = 0

			if (isCircular && !isSimple) addedX = 90
			const scaleAdded: number =
				nodeScaleIndex === nodeIndex ? nodeScaleCounter : 0

			// NODO FINAL LISTA CIRCULAR
			if (isCircular && nodeIndex === 0 && !isSimple) {
				const nodeEndX: number = -530 + 150 * -1

				// CIRCULO
				canvasCtx.beginPath()
				canvasCtx.arc(nodeEndX + addedX, 0, 30, 0, 2 * Math.PI)

				// COLOR
				canvasCtx.save()
				canvasCtx.globalAlpha = 0.5
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
				canvasCtx.strokeStyle =
					canvasObjectColors[
						linearStructureLength + 2 > canvasObjectColors.length - 1
							? linearStructureLength +
							  2 -
							  canvasObjectColors.length *
									Math.floor(linearStructureLength / canvasObjectColors.length)
							: linearStructureLength + 2
					]
				canvasCtx.lineWidth = 7

				// DIBUJAR BORDE DE COLOR Y CIRCULO
				canvasCtx.stroke()
				canvasCtx.fill()
				canvasCtx.closePath()

				// VALOR DE NODO
				const nodeEndValue: string = linearStructure
					? linearStructure.obtener(linearStructureLength - 1)?.valor.toString()
					: ''

				// TEXTO
				if (linearStructure) {
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
					canvasCtx.font = `bold ${20 - nodeEndValue.length * 0.5}px Montserrat`
					canvasCtx.textAlign = 'center'
					canvasCtx.fillText(nodeEndValue, nodeEndX + addedX, -50)
				}

				// REINICIAR
				canvasCtx.restore()
			}

			// CIRCULO
			canvasCtx.beginPath()

			// ANIMACIÓN DE ESCALA
			if (nodeScaleIndex === nodeIndex && nodeScaleCounter < 10)
				nodeScaleCounter += ANIMATION_VELOCITY * 0.1
			if (!isLikeStack)
				canvasCtx.arc(nodeX + addedX, 0, 40 + scaleAdded, 0, 2 * Math.PI)

			// COLOR
			canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
			canvasCtx.strokeStyle =
				canvasObjectColors[
					nodeIndex > canvasObjectColors.length - 1
						? nodeIndex -
						  canvasObjectColors.length *
								Math.floor(nodeIndex / canvasObjectColors.length)
						: nodeIndex
				]
			canvasCtx.lineWidth = 7

			// ANIMACIÓN DE ELIMINAR
			if (nodeIndex === deleteIndex) {
				if (opacityCounter < 1) {
					canvasCtx.save()
					opacityCounter += ANIMATION_VELOCITY / 150
					canvasCtx.globalAlpha = 1 - opacityCounter
				} else {
					opacityEndCallback()
					opacityEndCallback = () => {}
				}
			}

			// DIBUJAR BORDE Y CIRCULO
			if (!isLikeStack) {
				canvasCtx.stroke()
				canvasCtx.fill()
			}

			// DIBUJAR UN CUADRADO CON BORDES REDONDOS (PILAS Y COLAS)
			else {
				canvasCtx.beginPath()
				canvasCtx.roundRect(
					nodeX - nodeX / 3.5 - 200 + addedX - scaleAdded / 2,
					-40 - scaleAdded / 2,
					80 + scaleAdded,
					80 + scaleAdded,
					10,
				)
				canvasCtx.stroke()
				canvasCtx.closePath()
				canvasCtx.fillRect(
					nodeX - nodeX / 3.5 - 200 + addedX - scaleAdded / 2,
					-40 - scaleAdded / 2,
					80 + scaleAdded,
					80 + scaleAdded,
				)
			}

			// CERRAR
			canvasCtx.closePath()

			// VALOR DE NODO
			const nodeValue: string = linearStructure
				? linearStructure.obtener(nodeIndex)?.valor.toString() || ''
				: ''

			// TEXTO
			if (linearStructure) {
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
				canvasCtx.font = `bold ${20 - nodeValue?.length * 0.5}px Montserrat`
				canvasCtx.textAlign = 'center'
				canvasCtx.fillText(
					nodeValue,
					(isLikeStack ? nodeX - nodeX / 3.5 - 160 : nodeX) + addedX,
					(isLikeStack ? -55 : -50) -
						(nodeScaleIndex === nodeIndex ? nodeScaleCounter : 0),
				)
			}

			canvasCtx.restore()

			// FLECHA NODO SIGUIENTE
			if (
				(nodeIndex < linearStructureLength - 1 ||
					(isCircular && nodeIndex === linearStructureLength - 1)) &&
				!isLikeStack
			) {
				// ES LA FLECHA CIRCULAR AL FINAL
				const isCircularEnd: boolean =
					isCircular && nodeIndex === linearStructureLength - 1

				// INICIAR
				canvasCtx.beginPath()
				if (isSimple || isCircular) {
					canvasCtx.save()

					// AUMENTAR TAMAÑO
					if (isSimple) {
						canvasCtx.scale(2, 2)
						canvasCtx.translate(225, 0)
					}

					// CAMBIAR OPACIDAD
					if (isCircularEnd) canvasCtx.globalAlpha = 0.5
				}

				// FLECHA
				canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb'
				canvasCtx.arrow(
					(isSimple ? nodeX / 2 : nodeX) + 5 + (isSimple ? -215 : 0) + addedX,
					-1,
					isSimple ? (isCircularEnd ? 36 : 60) : 95,
					4,
				)

				// CERRAR Y REINICIAR
				canvasCtx.closePath()
				if (isSimple || isCircular) canvasCtx.restore()
			}

			// NODO FINAL LISTA CIRCULAR
			if (isCircular && nodeIndex === linearStructureLength - 1) {
				// CIRCULO
				const nodeRootX: number = -625 + 150 * (nodeIndex + 1)
				canvasCtx.beginPath()
				canvasCtx.arc(nodeRootX + addedX, 0, 30, 0, 2 * Math.PI)

				// COLOR
				canvasCtx.save()
				canvasCtx.globalAlpha = 0.5
				canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
				canvasCtx.strokeStyle =
					canvasObjectColors[
						nodeIndex + 1 > canvasObjectColors.length - 1
							? nodeIndex +
							  1 -
							  canvasObjectColors.length *
									Math.floor(nodeIndex / canvasObjectColors.length)
							: nodeIndex + 1
					]
				canvasCtx.lineWidth = 7

				// BORDE Y CIRCULO
				canvasCtx.stroke()
				canvasCtx.fill()
				canvasCtx.closePath()

				// VALOR DE NODO
				const nodeRootValue: string = linearStructure
					? linearStructure.obtener(0).valor.toString()
					: ''

				// TEXTO
				if (linearStructure) {
					canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
					canvasCtx.font = `bold ${
						20 - nodeRootValue.length * 0.5
					}px Montserrat`
					canvasCtx.textAlign = 'center'
					canvasCtx.fillText(nodeRootValue, nodeRootX + addedX, -50)
				}

				// REINICIAR
				canvasCtx.restore()
			}

			// FLECHA NODO ANTERIOR
			if (
				(nodeIndex > 0 && !isSimple) ||
				(isCircular && nodeIndex === 0 && !isSimple)
			) {
				if (!isSimple || isCircular) {
					canvasCtx.save()

					// CAMBIAR OPACIDAD PARA CIRCULARES
					if (isCircular && nodeIndex === 0) {
						canvasCtx.globalAlpha = 0.5

						// CAMBIAR TAMAÑO
						if (!isSimple) {
							canvasCtx.translate(0, 0)
						}
					}
				}

				// FLECHA
				canvasCtx.beginPath()
				canvasCtx.fillStyle = isDarkMode ? 'white' : '#bbb'
				canvasCtx.arrow(nodeX + 5 - 105 + addedX, -1, 95, 4, true, true)
				canvasCtx.closePath()

				// REINICIAR
				if (!isSimple || isCircular) canvasCtx.restore()
			}
		}
	}
}

// CAMBIAR MODO PARA INSERTAR
const changeInsertMode = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	insertMode = target.value as InsertMode
}

// AGREGAR NODO
const addNode = (withAnimation: boolean = true) => {
	if (linearStructure && newNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(newNodeValue)

		// INSERTAR
		if (repeatValues || (!repeatValues && nodeOnStructure === null)) {
			// ANIMAR
			scaleCounter = 0
			nodeScaleIndex = -1

			const addOnStructure = () => {
				if (linearStructure) {
					if (insertMode === 'start') {
						if ('push' in linearStructure) linearStructure.push(newNodeValue)
						if (isPriority)
							linearStructure.insertar(newNodeValue, lastPriority)
					} else if (insertMode === 'end')
						linearStructure.insertar(
							newNodeValue,
							isPriority ? lastPriority : undefined,
						)

					// RE DIMENSION
					linearStructureLength = linearStructure.getTamaño()
					setElementsLength(linearStructureLength)
				}
			}

			if (withAnimation)
				findNodeAnimation(
					insertMode === 'start' ? 0 : linearStructureLength - 1,
					addOnStructure,
					false,
				)
			else addOnStructure()

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode(
				insertMode === 'start'
					? 'push'
					: insertMode === 'end'
					? 'insertar'
					: 'insertar',
				isPriority ? `${newNodeValue},${0}` : newNodeValue,
			)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const removeNode = () => {
	if (linearStructure && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)

		if (nodeOnStructure !== null) {
			// 	INDICE
			const nodeIndex: number = linearStructure.obtenerIndice(oldNodeValue)

			findNodeAnimation(nodeIndex, () => {
				opacityEndCallback = () => {
					if (linearStructure) {
						// ELIMINAR
						linearStructure.eliminar(oldNodeValue)

						// RE DIMENSION
						linearStructureLength = linearStructure.getTamaño()
						setElementsLength(linearStructureLength)
					}
				}
				deleteIndex = nodeIndex
				opacityCounter = 0
			})

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('eliminar', oldNodeValue)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const findNodeAnimation = (
	selectedIndex?: number,
	callback?: () => unknown,
	withScale: boolean = true,
) => {
	if (linearStructure) {
		// CONSTANTES DE DESPLAZAMIENTO
		const index: number =
			selectedIndex || linearStructure.obtenerIndice(oldNodeValue)
		const fase: number = isLikeStack ? 1.72 : 2.4
		const middle: number = isLikeStack ? 2 : 4

		// ANIMACIÓN
		resetCanvas()
		translateCanvasTo(
			((index <= middle ? middle + 1 : index * 2) - index) *
				(index <= middle ? -50 : 50) *
				fase +
				(index <= middle
					? isLikeStack
						? -150
						: 136
					: isLikeStack
					? -440
					: -465),
			0,
			() => {
				if (withScale) {
					nodeScaleCounter = 0
					nodeScaleIndex = index
				}
				if (callback) callback()
			},
		)
	}
}
const findNode = () => {
	if (linearStructure && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)

		if (nodeOnStructure !== null) {
			findNodeAnimation(undefined, () => {})

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('buscar', oldNodeValue)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}

// ELIMINAR NODO
const updateNode = () => {
	if (linearStructure && newNodeValue.length > 0 && oldNodeValue.length > 0) {
		// BUSCAR NODO
		const nodeOnStructure: LinearNode | null =
			linearStructure.buscar(oldNodeValue)
		const newNodeOnStructure: LinearNode | null =
			linearStructure.buscar(newNodeValue)

		if (
			nodeOnStructure !== null &&
			(repeatValues || (newNodeOnStructure === null && !repeatValues))
		) {
			// 	INDICE
			const nodeIndex: number = linearStructure.obtenerIndice(oldNodeValue)
			findNodeAnimation(nodeIndex, () => {
				if (linearStructure)
					// ACTUALIZAR
					linearStructure.actualizar(oldNodeValue, newNodeValue)
			})

			// AGREGAR MUESTRA DE CÓDIGO
			addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)

			// OCULTAR MENU
			hideNavMenu(1)
			removeBanner()
		}
	}
}
