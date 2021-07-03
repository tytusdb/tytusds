class NodoBinario {
	public valor: any
	public izquierdo: any
	public derecho: any
	public altura: number

	constructor(valor: any) {
		this.valor = valor
		this.izquierdo = null
		this.derecho = null
		this.altura = 0
	}
}

class ArbolBinario {
	public raiz: any

	constructor() {
		this.raiz = null
	}

	altura(raiz: NodoBinario) {
		if (raiz == null) {
			return 0
		}
		return raiz.altura
	}

	alturaMax(izq: NodoBinario, der: NodoBinario) {
		if (this.altura(izq) > this.altura(der)) {
			return this.altura(izq)
		}
		return this.altura(der)
	}

	obtener(valor: any) {
		let searchNode = null
		if (this.raiz !== null) {
			const stack = [this.raiz]
			while (stack.length > 0) {
				const node = stack.shift()
				if (node.valor.toString() === valor) {
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

	//Insertar un valor--------------------------------------------------------------->
	insertar(valor: any) {
		this.raiz = this.insertarNodo(valor, this.raiz)
	}

	private insertarNodo(valor: any, raiz: any) {
		if (raiz == null) {
			//Insertar el nuevo nodo en la posicion actual
			raiz = new NodoBinario(valor)
		} else {
			if (valor < raiz.valor) {
				//Si el valor es menor ir a lado izquierdo
				raiz.izquierdo = this.insertarNodo(valor, raiz.izquierdo)
			} else if (valor >= raiz.valor) {
				//Si el valor es mayor ir a lado derecho
				raiz.derecho = this.insertarNodo(valor, raiz.derecho)
			}
		}
		raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		return raiz
	}

	//Eliminación de Nodos------------------------------------------------------------>
	eliminar(valor: any) {
		if (this.raiz != null) {
			this.raiz = this.delete(valor, this.raiz)
		}
	}

	private delete(valor: any, raiz: any) {
		if (valor < raiz.valor) {
			//Ir a nodo izquierdo
			raiz.izquierdo = this.delete(valor, raiz.izquierdo)
		} else if (valor > raiz.valor) {
			//Ir a nodo derecho
			raiz.derecho = this.delete(valor, raiz.derecho)
		} else if (valor == raiz.valor) {
			//Borrar Nodos
			if (raiz.izquierdo == null && raiz.derecho == null) {
				//Es Nodo Hoja
				return null
			} else if (raiz.izquierdo != null && raiz.derecho == null) {
				//Solo tiene hijo izquierdo
				raiz = raiz.izquierdo
			} else if (raiz.derecho != null && raiz.izquierdo == null) {
				//Solo tiene hijo derecho
				raiz = raiz.derecho
			} else {
				//Tiene ambos hijos
				let v = this.izqMayor(raiz.izquierdo)
				raiz = this.delete(v, raiz)
				raiz.valor = v
			}
		}
		if (raiz != null) {
			raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		}
		return raiz
	}

	private izqMayor(raiz: any) {
		while (raiz.derecho != null) {
			raiz = raiz.derecho
		}
		return raiz.valor
	}

	//Actualización de Nodos-------------------------------------------------------->
	actualizar(valor: any, nuevo: any) {
		if (this.raiz != null) {
			this.eliminar(valor)
			this.insertar(nuevo)
		}
	}

	//METODOS DE PRUEBAS ----------------------------------------------------------->
	print() {
		console.log('\nARBOL BINARIO')
		if (this.raiz != null) {
			this.printNodo(this.raiz)
		}
		console.log('------------------------')
	}

	printNodo(raiz: NodoBinario) {
		console.log('Raiz: ' + raiz.valor)
		if (raiz.izquierdo != null) {
			console.log('Izquierdo: ' + raiz.izquierdo.valor)
		}
		if (raiz.derecho != null) {
			console.log('Derecho: ' + raiz.derecho.valor)
		}
		console.log('\n')

		if (raiz.izquierdo != null) {
			this.printNodo(raiz.izquierdo)
		}
		if (raiz.derecho != null) {
			this.printNodo(raiz.derecho)
		}
	}
}
