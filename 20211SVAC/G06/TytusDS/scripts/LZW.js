function LZW(cadena){
	let arrayW = []
	let arrayK = []
	let arrayWK = []
	let diccionario = []
	let salida = []
	let cont = 0
	//Iniciamos el diccionario con los caracteres de la cadena
	for(let i = 0; i < cadena.length; i++){
		if(existeSimbolo(diccionario, cadena.charAt(i))) continue
		let simbolo = {
			simbolo: cadena.charAt(i),
			index: cont
		}
		diccionario.push(simbolo)
		cont++
	}
	//Empezamos a leer la cadena
	let W = ""
	let K = ""
	let WK = ""
	for(let i = 0; i < cadena.length; i++){
		K = cadena.charAt(i)
		WK = W+K
		//Ingresamos a nuestros arrays
		arrayW.push(W)
		arrayK.push(K)
		arrayWK.push(WK)
		if(existeSimbolo(diccionario, WK)){
			W = WK
			diccionario.push(null)
			salida.push(null)
		} else {
			let simbolo = {
				simbolo: WK,
				index: cont
			}
			diccionario.push(simbolo)
			salida.push(getSalida(diccionario, W))
			cont++
			W = K
		}
	}
	arrayW.push(W)
	arrayK.push("")
	arrayWK.push("")
	diccionario.push(null)
	salida.push(getSalida(diccionario, W))
	while(diccionario.length != arrayW.length) diccionario.shift()
	return {
		W: arrayW,
		K: arrayK,
		WK: arrayWK,
		Diccionario: diccionario,
		Salida: salida
	}
}

function existeSimbolo(diccionario, simbolo){
	for(let i = 0; i < diccionario.length; i++){
		if(diccionario[i] == null) continue
		if(diccionario[i].simbolo == simbolo) return true
	}
	return false
}

function getSalida(diccionario, simbolo){
	for(let i = 0; i < diccionario.length; i++){
		if(diccionario[i] == null) continue
		if(diccionario[i].simbolo == simbolo) return diccionario[i].index
	}
	return false
}

LZW("PABLO PAPA DE PABLITO")