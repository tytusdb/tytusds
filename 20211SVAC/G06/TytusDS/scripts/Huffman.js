class Nodo{
	constructor(simbolo, index, id){
		this.simbolo = simbolo
		this.index = index
		this.id = id
		this.binario = null
		this.left = null
		this.right = null
	}
}

let cont = 0

function Huffman(cadenita){
	let diccionario = []
	let original = []
	//Iniciamos el diccionario con los caracteres de la cadena y su peso
	for(let i = 0; i < cadenita.length; i++){
		addSimbolo(diccionario, cadenita.charAt(i))
	}
	diccionario.reverse()
	Insercion(diccionario)
	original = [...diccionario]
	//Generamos el arbolito
	if(diccionario.length == 1){
		return {arbolito: diccionario[0], original: original}
	}
	while(diccionario.length > 1){
		let izq = diccionario.shift()
		izq.binario = 0
		let der = diccionario.shift()
		der.binario = 1
		let padre = new Nodo("", izq.index + der.index, cont++)
		padre.left = izq
		padre.right = der
		diccionario.unshift(padre)
		Insercion(diccionario)
	}
	return {arbolito: diccionario[0], original: original}
}

function addSimbolo(diccionario, simbolo){
	for(let i = 0; i < diccionario.length; i++){
		if(diccionario[i].simbolo == simbolo){
			diccionario[i].index++
			return
		}
	}
	let nodo = new Nodo(simbolo, 1, cont++)
	diccionario.push(nodo)
}

function Insercion(array){
	for(let i = 1; i < array.length; i++){
		let key = array[i]
		let j = i-1
		while(j>=0 && array[j].index > key.index){
			array[j+1] = array[j]
			j = j-1
		}
		array[j+1] = key
	}
}

function Seleccion(array){
	for(let i = 0; i < array.length; i++){
		for(let j = i+1; j < array.length; j++){
			if(array[i].index > array[j].index){
				let tmp = array[j]
				array[j] = array[i]
				array[i] = tmp
			}
		}
	}
	return array
}

//Huffman("PABLO PAPA DE PABLITO")