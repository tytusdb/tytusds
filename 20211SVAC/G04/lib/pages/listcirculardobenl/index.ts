class NodoDob {

	public valor: any

	public siguiente: any

	public anterior: any

	constructor(valor: any) {

		this.valor = valor

		this.siguiente = null

		this.anterior = null
	}
}

class listacirculardob {

	private raiz: any

	private ultimo: any

	private tamaño: number

	public nodoActual: any


	constructor() {

		this.raiz = null

		this.ultimo = null

		this.tamaño = 0

		this.nodoActual = null

	}

	vacia() {

		if (this.raiz == null) {

			return true

		}
	}

	//Inserta al inicio de la lista 

	insertarInicio(valor: any) {

		let nuevo = new NodoDob(valor)

		if (this.vacia() == true) {

			this.raiz = this.ultimo = nuevo

			this.tamaño++

		} else {

			let aux = new NodoDob(valor)

			aux.siguiente = this.raiz

			this.raiz.anterior = aux

			this.raiz = aux

			this.tamaño++
		}
	}

	//Inserta al final de la lista


	insertarFinal(valor: any) {


		if (this.vacia() == true) {

			this.raiz = this.ultimo = new NodoDob(valor)

			this.tamaño++

		} else {

			let aux = this.ultimo

			this.ultimo = aux.siguiente = new NodoDob(valor)

			this.ultimo.anterior = aux

			this.tamaño++

		}
	}

	//METODOS PARA GRAFICAR ---------------------------------------------------->

	//Pone la variable en la raiz del la lista

	setActualRaiz() {

		this.nodoActual = this.raiz

	}

	//Mueve le nodo actual a la siguiente posicion

	pasarSiguiente() {

		this.nodoActual = this.nodoActual.siguiente

	}

	//Devuelve el nodo Actual

	getNodoActual() {

		return this.nodoActual.valor

	}

	//Elimina el valor seleccionado
	eliminar(valor: any) {
		valor = valor.toString()
		if (this.raiz != null) {
			if (this.raiz.valor.toString() == valor) {
				this.raiz = this.raiz.siguiente
				this.tamaño--
			} else {
				let aux = this.raiz
				while (aux.siguiente != null) {
					if (aux.siguiente.valor.toString() == valor) {
						aux.siguiente = aux.siguiente.siguiente
						this.tamaño--
						break
					}
					aux = aux.siguiente
				}
			}
		}
	}

	//Buscar un valor en la lista
	buscar(valor: any) {
		if (this.raiz != null) {
			let aux = this.raiz
			while (aux != null) {
				if (aux.valor == valor) {
					return valor
				}
				aux = aux.siguiente
			}
		}
		return null
	}

	// BUSCAR UN VALOR EN LA LISTA POR SU INDICE
	obtener(index: number) {
		let nodo = this.raiz

		for (let i = 0; i < this.tamaño; i++) {
			if (i === index) break
			nodo = nodo.siguiente
		}

		return nodo
	}
	// BUSCAR UN VALOR EN LA LISTA POR SU INDICE
	obtenerIndice(valor: any) {
		let nodo = this.raiz
		let indice = 0

		for (let i = 0; i < this.tamaño; i++) {
			if (nodo.valor.toString() === valor.toString()) {
				indice = i
				break
			}
			nodo = nodo.siguiente
		}

		return indice
	}

	//Actualiza el valor de un nodo
	actualizar(valor: any, nuevo: any) {
		if (this.raiz != null) {
			if (this.raiz.valor == valor) {
				this.raiz.valor = nuevo
			} else {
				let aux = this.raiz
				while (aux != null) {
					if (aux.valor == valor) {
						aux.valor = nuevo
						break
					}
					aux = aux.siguiente
				}
			}
		}
	}

	getTamaño() {
		return this.tamaño
	}

	//METODOS PILA ----------------------------------------------->

	//Ingresa un valor al inicio de la lista
	push(valor: any) {
		if (this.raiz == null) {
			this.raiz = new NodoSimple(valor)
			this.tamaño++
		} else {
			let aux = new NodoSimple(valor)
			aux.siguiente = this.raiz
			this.raiz = aux
			this.tamaño++
		}
	}

	//Saca el primer elemento de la lista
	pop() {
		if (this.raiz != null) {
			let valor = this.raiz.valor
			this.raiz = this.raiz.siguiente
			this.tamaño--
			return valor
		}
		return null
	}

	//METODOS COLA ------------------------------------------->

	//Saca el ultimo elemnto de la lista
	descolar() {
		if (this.raiz != null) {
			if (this.raiz.siguiente == null) {
				let valor = this.raiz.valor
				this.raiz = null
				this.tamaño--
				return valor
			} else {
				let aux = this.raiz
				while (aux.siguiente.siguiente != null) {
					aux = aux.siguiente
				}
				let valor = aux.siguiente.valor
				aux.siguiente = null
				return valor
			}
		}
		return null
	}

	//METODOS PARA PRUEBAS ------------------------->
	print() {
		console.log('Lista Contenido:')
		if (this.raiz != null) {
			let aux = this.raiz
			let salida = ''
			while (aux != null) {
				salida += aux.valor + ' -> '
				aux = aux.siguiente
			}
			console.log(salida)
		}
	}
}
