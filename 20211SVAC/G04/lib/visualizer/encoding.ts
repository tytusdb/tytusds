interface SetEncodingProps {
	instance: Feistel | Hamming | Huffman | LZW | null
	feistelProps: {
		iterations: number
		key: string
	} | null
}

let encodingProps: SetEncodingProps = {
	instance: null,
	feistelProps: {
		iterations: 0,
		key: '',
	},
}

// ELEMENTOS
const bitsTable = document.getElementById('bits-table-list')
const codeEditor = document.getElementById('code-editor')
const banner = document.getElementById('banner')
const encodeInput = document.getElementById('encode-input') as HTMLInputElement
const encodeOutput = document.getElementById(
	'encode-output',
) as HTMLInputElement

// GLOBAL
type EncodingType = 'feistel' | 'hamming' | 'huffman' | 'lzw'
let currentEncodingType: EncodingType = 'huffman'
let globalEncodingTextInput: string = ''
let globalEncodingTextOutput: string = ''
let feistelKey: string = ''
let feistelIterations: number = 0

// DATOS INICIALES
const setEncodingData = (props: SetEncodingProps) => (encodingProps = props)

// SUBIR JSON
const encodingFileUploadCallback = () => {
	if (encodeInput) encodeInput.value = globalEncodingTextInput
}
const onChangeUploadEncodingInput = (ev: Event): void => {
	// INPUT
	const input = ev.target as HTMLInputElement
	const file = input.files ? input.files[0] : null

	// READER
	const reader = new FileReader()
	reader.onload = () => {
		// LEER
		const text = reader.result as string
		globalEncodingTextInput = text

		// CALLBACK
		encodingFileUploadCallback()
	}

	// LEER
	if (file) {
		reader.readAsText(file)
		input.value = ''
	}
}

// GUARDAR
const saveEncodingJSONFile = () => {
	const uriData = `data:text/json;charset=utf-8,${encodeURIComponent(
		globalEncodingTextOutput,
	)}`

	const a = document.createElement('a')
	a.href = uriData
	a.download = 'data.json'
	a.innerHTML = 'download JSON'
	a.click()

	hideNavMenu(0)
}

// CAMBIAR OPCIONES DE FEISTEL
const onChangeFeistelKey = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	feistelKey = target.value
}
const onChangeFeistelIterations = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	feistelIterations = +target.value
}

// CAMBIAR TIPO DE ALGORITMO
const onChangeEncodingType = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	currentEncodingType = target.value as EncodingType

	if (codeEditor)
		codeEditor.innerHTML = `<strong style="color:var(--monoConstIce)">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong id="instance-name" style="color:var(--monoClassIce)">${currentEncodingType.toLowerCase()}</strong>()`

	if (currentEncodingType === 'feistel')
		encodingProps.instance = new Feistel(feistelKey, feistelIterations)
	else if (currentEncodingType === 'hamming')
		encodingProps.instance = new Hamming()
	else if (currentEncodingType === 'huffman')
		encodingProps.instance = new Huffman()
	else if (currentEncodingType === 'lzw') encodingProps.instance = new LZW()
}

// CAMBIAR TEXTO
const onChangeEncodingInput = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	globalEncodingTextInput = target.value
}

// CODIFICAR
const startEncoding = () => {
	if (encodingProps.instance) {
		if (encodeOutput) {
			// @ts-ignore
			encodingProps.instance.codificar(globalEncodingTextInput)
			const encodedValue: string = encodingProps.instance.toString()
			globalEncodingTextOutput = encodedValue

			// @ts-ignore
			const matrix: string[][] = encodingProps.instance.getMatrix()
			encodeOutput.value = encodedValue

			// AGREGAR CÓDIGO
			if (banner) banner.style.display = 'none'
			if (codeEditor)
				codeEditor.innerHTML =
					codeEditor.innerHTML +
					`\ndata.<strong style="color: var(--monoFuncGreen)">codificar</strong>(<strong style="color: var(--lightPurple)">INPUT</strong>)`

			// AGREGAR TABLA
			if (bitsTable) {
				bitsTable.innerHTML = ''
				matrix.forEach((row: string[]) => {
					bitsTable.innerHTML =
						bitsTable.innerHTML +
						`<li>${row
							.map((col: string) => '<span>' + col + '</span>')
							.join('')}</li>`
				})
			}
		}
	}
}
