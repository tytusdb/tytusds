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
const encodeInput = document.getElementById('encode-input') as HTMLInputElement
const encodeOutput = document.getElementById(
	'encode-output',
) as HTMLInputElement

// GLOBAL
let globalEncodingTextInput: string = ''

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

// CODIFICAR
const startEncoding = () => {
	if (encodingProps.instance) {
		if (encodeOutput) {
			// @ts-ignore
			encodingProps.instance.codificar(globalEncodingTextInput)
			const encodedValue: string = encodingProps.instance.toString()
			console.log(encodedValue)
		}
	}
}
