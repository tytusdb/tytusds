class NodoMerkle {
	valor: any
	hash: any
	tieneValor: boolean
	izquierdo: any
	derecho: any
	altura: number

	constructor(hash: any, altura: number) {
		this.hash = hash
		this.valor = null
		this.izquierdo = null
		this.derecho = null
		this.tieneValor = false
		this.altura = altura
	}
}

class ArbolMerkle {
	raiz: any
	maxValores: number
	valores: number
	agregado: boolean

	constructor() {
		this.raiz = null //La raiz
		this.maxValores = 0 //El maximo de valores disponible
		this.valores = 0 //valores ingresados
		this.agregado = false //El valor nuevo fue ingresado
	}

	factor() {
		return this.maxValores - this.valores
	}

	hash(valor: any) {
		valor = valor.toString()
		const H = 64
		let total = 1
		for (var i = 0; i < valor.length; i++) {
			total += ((H * total) << 1) + valor.charCodeAt(i)
		}
		return total
	}

	obtener(valor: any) {
		let searchNode = null
		if (this.raiz !== null) {
			const stack = [this.raiz]
			while (stack.length > 0) {
				const node = stack.shift()
				if (node.valor?.toString() === valor) {
					searchNode = node
				} else {
					if (node.izquierdo) stack.push(node.izquierdo)
					if (node.derecho) stack.push(node.derecho)
				}
			}
		}

		return searchNode
	}

	toArray() {
		if (this.raiz !== null) {
			const stack = [this.raiz]
			const stackCopy = [this.raiz.valor]

			while (stack.length > 0) {
				const node = stack.shift()
				if (node.izquierdo) {
					stackCopy.push(node.izquierdo.valor)
					stack.push(node.izquierdo)
				}
				if (node.derecho) {
					stackCopy.push(node.derecho.valor)
					stack.push(node.derecho)
				}
			}

			return stackCopy
		} else return []
	}

	insertar(valor: any) {
		this.agregado = false
		if (this.factor() <= 0) {
			//Creando el Padre con izquierdo valor a la raiz
			let padre = new NodoMerkle(-1, 2)
			padre.izquierdo = this.raiz

			if (this.raiz != null) {
				//Raiz no es nula la altura aumenta uno en el padre
				padre.altura = this.raiz.altura + 1
			} else {
				//Raiz es nula por lo que se crea un nodo izquierdo y aumenta el maxValores
				padre.izquierdo = new NodoMerkle(-1, 1)
				this.maxValores = 1
			}

			//Se crea el sub arbol derecho con valores nulos
			padre.derecho = this.crecer(padre.derecho, padre.altura - 1)
			this.maxValores = this.maxValores * 2
			this.raiz = padre
		}
		//Agregar el valor y actualizar el padre
		this.raiz = this.add(valor, this.raiz, this.raiz?.altura)
		this.raiz = this.actualizarPadre(this.raiz)
	}

	private add(valor: any, raiz: NodoMerkle, altura: number) {
		if (altura > 1) {
			//Si no es nodo hoja va a buscarlos
			raiz.izquierdo = this.add(valor, raiz.izquierdo, altura - 1)
			raiz.derecho = this.add(valor, raiz.derecho, altura - 1)
		} else {
			//Si es hoja y no se le ha ingresado nada se agrega el valor
			if (raiz) {
				if (!this.agregado && !raiz?.tieneValor) {
					this.agregado = true
					raiz.valor = valor
					raiz.hash = this.hash(valor)
					raiz.tieneValor = true
					this.valores++
				}
			}
		}
		return raiz
	}

	eliminar(valor: any) {
		this.raiz = this.delete(valor, this.raiz, this.raiz.altura)
		this.raiz = this.actualizarPadre(this.raiz)
	}

	private delete(valor: any, raiz: NodoMerkle, altura: number) {
		if (altura > 1) {
			//Si no es nodo hoja va a buscarlos
			raiz.izquierdo = this.delete(valor, raiz.izquierdo, altura - 1)
			raiz.derecho = this.delete(valor, raiz.derecho, altura - 1)
		} else {
			if (raiz.valor == valor) {
				raiz.valor = null
				raiz.hash = -1
				raiz.tieneValor = false
				this.valores--
			}
		}
		return raiz
	}

	actualizar(valor: any, nuevo: any) {
		this.raiz = this.actualiza(valor, nuevo, this.raiz, this.raiz.altura)
		this.raiz = this.actualizarPadre(this.raiz)
	}

	private actualiza(valor: any, nuevo: any, raiz: NodoMerkle, altura: number) {
		if (altura > 1) {
			//Si no es nodo hoja va a buscarlos
			raiz.izquierdo = this.actualiza(valor, nuevo, raiz.izquierdo, altura - 1)
			raiz.derecho = this.actualiza(valor, nuevo, raiz.derecho, altura - 1)
		} else {
			if (raiz.valor == valor) {
				raiz.valor = nuevo
				raiz.hash = this.hash(nuevo)
			}
		}
		return raiz
	}

	private crecer(raiz: NodoMerkle, altura: number) {
		if (altura > 0) {
			raiz = new NodoMerkle(-1, altura)
			raiz.izquierdo = this.crecer(raiz.izquierdo, altura - 1)
			raiz.derecho = this.crecer(raiz.derecho, altura - 1)
		}
		return raiz
	}

	private actualizarPadre(raiz: NodoMerkle) {
		if (raiz != null) {
			raiz.izquierdo = this.actualizarPadre(raiz.izquierdo)
			raiz.derecho = this.actualizarPadre(raiz.derecho)
			if (raiz.altura > 1) {
				raiz.hash = raiz.izquierdo.hash + raiz.derecho.hash
				raiz.tieneValor = true
			}
		}
		return raiz
	}

	print() {
		console.log('PRE ORDEN --------------------')
		this.preOrden(this.raiz)
	}

	preOrden(raiz: any) {
		if (raiz != null) {
			console.log('Raiz: ' + raiz.valor + '  - Altura:' + raiz.altura)
			this.preOrden(raiz.izquierdo)
			this.preOrden(raiz.derecho)
		}
	}
}
