// ELEMENTOS
const sortRuntime = document.getElementById('sort-runtime')
const sortLengthText = document.getElementById('sort-length')
const editor = document.querySelector('.editor > pre > code')
const startButton = document.getElementById('start-btn')
const sortBanner = document.getElementById('sort-banner')
const navBtns = document.querySelectorAll('.nav-btn')

// GLOBAL
let globalJSONInput: JSONInputFile | null = null

// CONFIGURACIÓN
let canvasBannerDif: number = 20
let repeatValues: boolean = true
let newNodeValue: string = ''
let oldNodeValue: string = ''

// COLORES
const canvasObjectColors: string[] = [
	'#F44336',
	'#E91E63',
	'#9C27B0',
	'#673AB7',
	'#3F51B5',
	'#2196F3',
	'#009688',
	'#4CAF50',
	'#CDDC39',
	'#FFC107',
	'#FF5722',
]

// REINICIAR CANVAS
const resetCanvas = () => {
	if (canvasCtx) {
		xTranslateCounter = 0
		yTranslateCounter = 0
		scaleCounter = 0
		isDragging = false
		initialPinchDistance = null
		cameraOffset = { x: width / 2, y: height / 2 }
		dragStart = { x: 0, y: 0 }
		cameraZoom = 1
		lastZoom = 1
	}
}

// CALLBACK AL SUBIR ARCHIVO
let fileUploadCallback: (json: any) => unknown = () => {}

const onChangeUploadInput = (ev: Event): void => {
	// INPUT
	const input = ev.target as HTMLInputElement
	const file = input.files ? input.files[0] : null

	// READER
	const reader = new FileReader()
	reader.onload = () => {
		const text = reader.result
		const json = JSON.parse(
			typeof text === 'string' ? text : '{}',
		) as JSONInputFile
		globalJSONInput = json
		if (globalJSONInput.repeticion) repeatValues = globalJSONInput.repeticion
		if (globalJSONInput.animacion)
			ANIMATION_VELOCITY = globalJSONInput.animacion
		fileUploadCallback(json)
	}

	// LEER
	if (file) {
		reader.readAsText(file)
		input.value = ''
	}
}

// GUARDAR UN ARCHIVO
const saveJSONFile = (valores: (string | number)[]) => {
	const strJSON = JSON.stringify({ ...globalJSONInput, valores })
	const uriData = `data:text/json;charset=utf-8,${encodeURIComponent(strJSON)}`

	const a = document.createElement('a')
	a.href = uriData
	a.download = 'data.json'
	a.innerHTML = 'download JSON'
	a.click()

	hideNavMenu(0)
}

// CAMBIAR VELOCIDAD
const onChangeSortVelocity = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	ANIMATION_VELOCITY = +target.value
}

// ELIMINAR IMAGEN DE BANNER
const removeBanner = () => {
	if (startButton && sortBanner) {
		setTimeout(() => {
			const btnRect = startButton.getBoundingClientRect().bottom
			const bannerRect = sortBanner.getBoundingClientRect().top + 24

			if (btnRect - bannerRect > canvasBannerDif)
				sortBanner.style.display = 'none'
		}, 100)
	}
}

// CAMBIAR TIEMPO DE EJECUCIÓN
const setRuntimeText = (ms: number) => {
	// MOSTRAR
	if (sortRuntime) sortRuntime.textContent = `${ms.toFixed(3)}ms`
}

// CAMBIAR TEXTO DE ELEMENTOS
const setElementsLength = (length: number) => {
	if (sortLengthText) sortLengthText.textContent = length.toString()
}

// AGREGAR CÓDIGO
const addTestCode = (method: string, value: string) => {
	if (editor)
		editor.innerHTML =
			editor.innerHTML +
			`\ndata.<strong style="color: var(--monoFuncGreen)">${method}</strong>(<strong style="color: var(--lightPurple)">${value}</strong>)`
}

// EVENTOS DE ELEMENTOS
const inputsMenuSwitcher = Array.prototype.slice
	.call(navBtns)
	.map(
		(element: Element) =>
			element.previousElementSibling as HTMLInputElement | null,
	)
	.filter(Boolean) as HTMLInputElement[]

// OCULTAR TODOS
navBtns.forEach((navElement: Element, navIndex: number) =>
	navElement.addEventListener('click', () =>
		inputsMenuSwitcher.forEach(
			(inputElement: HTMLInputElement, inpIndex: number) => {
				if (navIndex !== inpIndex) inputElement.checked = false
			},
		),
	),
)

// OCULTAR MANUALMENTE
const hideNavMenu = (index: number) => {
	inputsMenuSwitcher.forEach(
		(inputElement: HTMLInputElement, inpIndex: number) => {
			if (index === inpIndex) inputElement.checked = false
		},
	)
}

// GUARDAR VALORES DE NODOS
const saveNewNodeValue = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	newNodeValue = target.value
}

const saveOldNodeValue = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	oldNodeValue = target.value
}

// CAMBIAR OPCIÓN DE REPETIR VALORES
const changeRepeatValues = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	repeatValues = target.checked
}

// INICIAR A ORDENAR
removeBanner()
