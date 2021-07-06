class NodoSimpleQ {
	public valor: any

	public siguiente: any

	public anterior: any

	public priority: number

	constructor(valor: any, priority: number) {
		this.priority = priority

		this.valor = valor

		this.siguiente = null

		this.anterior = null
	}
}

class PriorityQueue {
	private raiz: any

	private tamaño: number

	public nodoActual: any

	constructor() {
		this.raiz = null

		this.tamaño = 0

		this.nodoActual = null
	}

	// OBTENER TAMAÑO
	getTamaño() {
		return this.tamaño
	}

	//Validar si la cola esta vacia

	vacia() {
		if (this.raiz == null) {
			return true
		}
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

	pop() {
		if (this.raiz != null) {
			let valor = this.raiz.valor
			this.raiz = this.raiz.siguiente
			this.tamaño--
			return valor
		}
		return null
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
			nodo = nodo?.siguiente
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

	//Encolar caracter con prioridad

	insertar(valor: any, priority: any) {
		let aux = new NodoSimpleQ(valor, priority)

		if (this.raiz === null) {
			this.raiz = aux
			this.tamaño++
		} else {
			if (this.raiz.priority > priority) {
				aux.siguiente = this.raiz

				this.raiz = aux

				this.tamaño++
			} else {
				while (
					this.raiz.siguiente != null &&
					this.raiz.siguiente.priority < priority
				) {
					this.raiz = this.raiz.siguiente
				}

				aux.siguiente = this.raiz.siguiente

				this.raiz.siguiente = aux

				this.tamaño++
			}
		}

		return this.raiz
	}
}
