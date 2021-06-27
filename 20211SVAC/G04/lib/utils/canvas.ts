// TIPOS
type ScreenEvent = MouseEvent & TouchEvent
interface CanvasCoords {
	x: number
	y: number
}

// CANVAS
let canvas: HTMLCanvasElement = document.getElementById(
	'canvas',
) as HTMLCanvasElement
let canvasCtx: CanvasRenderingContext2D | null = canvas.getContext('2d')

// CONFIG
const width: number = window.innerWidth - 60
const height: number = window.innerHeight - 160
let cameraOffset: CanvasCoords = {
	x: width / 2,
	y: height / 2,
}
let cameraZoom: number = 1
let MAX_ZOOM: number = 5
let MIN_ZOOM: number = 0.1
let SCROLL_SENSITIVITY: number = 0.003
let ANIMATION_VELOCITY: number = 5

// RUNTIME
let isDragging: boolean = false
let dragStart: CanvasCoords = { x: 0, y: 0 }
let initialPinchDistance: number | null = null
let lastZoom: number = cameraZoom

// MÉTODOS
let drawInCanvas: () => unknown = () => {}

// ANIMACIÓN DE POSICIÓN
let enableTranslate: boolean = false
let xTranslateCounter: number = 0
let yTranslateCounter: number = 0
let xTranslate: number = 0
let yTranslate: number = 0

// ANIMACIÓN DE ZOOM
let enableZoom: boolean = false
let scaleCounter: number = 0
let animScale: number = 0

// CALLBACKS DE TRANSLATES
let canvasTranslateEndCallback = () => {}
let canvasZoomEndCallback = () => {}

// DIBUJAR
const draw = (): void => {
	// PROPIEDADES INICIALES
	canvas.width = width
	canvas.height = height

	if (canvasCtx) {
		// ANIMAR TRANSLATE
		if (enableTranslate) {
			if (xTranslate !== 0) {
				if (xTranslateCounter < Math.abs(xTranslate))
					xTranslateCounter += ANIMATION_VELOCITY
				else {
					canvasTranslateEndCallback()
					enableTranslate = false
				}
			}
			if (yTranslate !== 0) {
				if (yTranslateCounter < Math.abs(yTranslate))
					yTranslateCounter += ANIMATION_VELOCITY
				else {
					canvasTranslateEndCallback()
					enableTranslate = false
				}
			}
		}

		// ANIMAR ZOOM
		if (enableZoom) {
			if (scaleCounter < animScale) scaleCounter += 0.05
			else {
				canvasZoomEndCallback()
				enableZoom = false
			}
		}

		// ANIMACIÓN DE TRANSLATE
		canvasCtx.translate(
			xTranslateCounter * -1.25 * (xTranslate < 0 ? -1 : 1),
			yTranslateCounter * -1.25 * (yTranslate < 0 ? -1 : 1),
		)

		// CENTRAR
		canvasCtx.translate(width / 2, height / 2)

		// MOVER
		canvasCtx.scale(
			cameraZoom + scaleCounter * 1.25,
			cameraZoom + scaleCounter * 1.25,
		)
		canvasCtx.translate(
			-width / 2 + cameraOffset.x,
			-height / 2 + cameraOffset.y,
		)

		// DIBUJAR
		drawInCanvas()

		// ANIMACIÓN
		requestAnimationFrame(draw)
	}
}

// OBTENER POSICIÓN DE PUNTERO O TOQUE
const getEventLocation = (event: ScreenEvent): CanvasCoords => {
	if (event.touches && event.touches.length == 1) {
		return { x: event.touches[0].clientX, y: event.touches[0].clientY }
	} else if (event.clientX && event.clientY) {
		return { x: event.clientX, y: event.clientY }
	} else return { x: 0, y: 0 }
}

// EVENTO AL PASAR MOUSE O TOQUE
const onCanvasPointerDown = (event: ScreenEvent): void => {
	isDragging = true
	dragStart.x = getEventLocation(event).x / cameraZoom - cameraOffset.x
	dragStart.y = getEventLocation(event).y / cameraZoom - cameraOffset.y
}

// EVENTO AL SEPARAR MOUSE O TOQUE
const onCanvasPointerUp = (_event?: MouseEvent | TouchEvent): void => {
	isDragging = false
	initialPinchDistance = null
	lastZoom = cameraZoom
}

// MOVER MOUSE O TOQUE
const onCanvasPointerMove = (event: ScreenEvent): void => {
	if (isDragging) {
		cameraOffset.x = getEventLocation(event).x / cameraZoom - dragStart.x
		cameraOffset.y = getEventLocation(event).y / cameraZoom - dragStart.y
	}
}

// EVENTOS TOUCH
const handleCanvasTouch = (
	event: ScreenEvent,
	singleTouchHandler: (event: ScreenEvent) => unknown,
): void => {
	if (event.touches.length == 1) singleTouchHandler(event)
	else if (event.type == 'touchmove' && event.touches.length == 2) {
		isDragging = false
		handleCanvasPinch(event)
	}
}

// ZOOM IN
const handleCanvasPinch = (event: TouchEvent): void => {
	// DISTANCIAS
	event.preventDefault()
	let touch1: CanvasCoords = {
		x: event.touches[0].clientX,
		y: event.touches[0].clientY,
	}
	let touch2: CanvasCoords = {
		x: event.touches[1].clientX,
		y: event.touches[1].clientY,
	}

	// CUADRADO DE LA DISTANCIA
	let currentDistance: number =
		(touch1.x - touch2.x) ** 2 + (touch1.y - touch2.y) ** 2

	// ALEJAR ZOOM
	if (initialPinchDistance == null) initialPinchDistance = currentDistance
	else adjustCanvasZoom(null, currentDistance / initialPinchDistance)
}

// AJUSTAR ZOOM ALEJAR/ACERCAR
const adjustCanvasZoom = (
	zoomAmount: number | null,
	zoomFactor?: number,
): void => {
	if (!isDragging) {
		// FACTOR DE ZOOM
		if (zoomAmount) cameraZoom += zoomAmount
		else if (zoomFactor) cameraZoom = zoomFactor * lastZoom

		// ASIGNAR ZOOM TOTAL
		cameraZoom = Math.min(cameraZoom, MAX_ZOOM)
		cameraZoom = Math.max(cameraZoom, MIN_ZOOM)
	}
}

// AGREGAR EVENTOS AL CANVAS
canvas.addEventListener('mousedown', (event: MouseEvent) =>
	onCanvasPointerDown(event as ScreenEvent),
)
canvas.addEventListener('touchstart', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerDown),
)
canvas.addEventListener('mouseup', onCanvasPointerUp)
canvas.addEventListener('touchend', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerUp),
)
canvas.addEventListener('mousemove', (event: MouseEvent) =>
	onCanvasPointerMove(event as ScreenEvent),
)
canvas.addEventListener('touchmove', (event: TouchEvent) =>
	handleCanvasTouch(event as ScreenEvent, onCanvasPointerMove),
)
canvas.addEventListener('wheel', (event: WheelEvent) =>
	adjustCanvasZoom(event.deltaY * SCROLL_SENSITIVITY),
)

// INICIAR
draw()

CanvasRenderingContext2D.prototype.arrow = function (
	x: number,
	y: number,
	distance: number,
	width?: number,
	down?: boolean,
	left?: boolean,
	double?: boolean,
) {
	// FLECHA
	const lineWidth = width || 4
	this.lineWidth = lineWidth

	// CURVA
	this.moveTo(x, y)
	this.quadraticCurveTo(
		x + distance / 2,
		y + (distance / 2) * (down ? 1 : -1),
		x + distance,
		y,
	)
	this.strokeStyle = this.fillStyle
	this.stroke()

	// TRIANGULO
	if (!left || double) {
		this.beginPath()
		this.lineWidth = 1

		if (!down) {
			this.moveTo(x + distance - 5, y + 5)
			this.lineTo(x + distance + 5, y - 5)
			this.lineTo(x + distance + 5, y + 5)
		} else {
			this.moveTo(x + distance + 5, y + 5)
			this.lineTo(x + distance - 5, y - 5)
			this.lineTo(x + distance + 5, y - 5)
		}

		this.stroke()
		this.fill()
		this.closePath()
	}

	if (left || double) {
		this.beginPath()
		this.lineWidth = 1
		if (!down) {
			this.moveTo(x - 5, y - 5)
			this.lineTo(x + 5, y + 5)
			this.lineTo(x - 5, y + 5)
		} else {
			this.moveTo(x - 5, y + 5)
			this.lineTo(x + 5, y - 5)
			this.lineTo(x - 5, y - 5)
		}

		this.stroke()
		this.fill()
		this.closePath()
	}
}

interface RoundRectRadius {
	[index: string]: number
	tl: number
	tr: number
	br: number
	bl: number
}
CanvasRenderingContext2D.prototype.roundRect = function (
	x,
	y,
	width,
	height,
	radius = 5,
) {
	let localRadius: RoundRectRadius = {
		tl: 5,
		tr: 5,
		br: 5,
		bl: 5,
	}

	if (typeof radius === 'number') {
		localRadius = { tl: radius, tr: radius, br: radius, bl: radius }
	} else {
		let defaultRadius: RoundRectRadius = { tl: 0, tr: 0, br: 0, bl: 0 }

		for (let side in defaultRadius)
			localRadius[side] = localRadius[side] || defaultRadius[side]
	}

	this.moveTo(x + localRadius.tl, y)
	this.lineTo(x + width - localRadius.tr, y)
	this.quadraticCurveTo(x + width, y, x + width, y + localRadius.tr)
	this.lineTo(x + width, y + height - localRadius.br)
	this.quadraticCurveTo(
		x + width,
		y + height,
		x + width - localRadius.br,
		y + height,
	)
	this.lineTo(x + localRadius.bl, y + height)
	this.quadraticCurveTo(x, y + height, x, y + height - localRadius.bl)
	this.lineTo(x, y + localRadius.tl)
	this.quadraticCurveTo(x, y, x + localRadius.tl, y)
}

const translateCanvasTo = (x: number, y: number, callback?: () => unknown) => {
	if (callback) canvasTranslateEndCallback = callback
	enableTranslate = true
	xTranslate = x
	yTranslate = y
}

const zoomCanvasTo = (scale: number, callback?: () => unknown) => {
	if (callback) canvasZoomEndCallback = callback
	enableZoom = true
	animScale = scale
}
