class NodoAvl {
	public valor: any
	public altura: number
	public izquierdo: any
	public derecho: any

	constructor(valor: any) {
		this.valor = valor
		this.altura = 0
		this.izquierdo = this.derecho = null
	}
}

class ArbolAvl {
	public raiz: any

	constructor() {
		this.raiz = null
	}
	//METODOS DE INFORMACIÓN --------------------------------------------------------------->
	//Devuelve la altura del Nodo
	altura(raiz: NodoAvl) {
		if (raiz == null) {
			return 0
		}
		return raiz.altura
	}

	//Devuelve la altura maxima del Nodo
	alturaMax(izq: NodoAvl, der: NodoAvl) {
		if (this.altura(izq) > this.altura(der)) {
			return this.altura(izq)
		}
		return this.altura(der)
	}

	//Calcula y devuelve el factor de equilibrio
	factor(raiz: NodoAvl) {
		return this.altura(raiz.derecho) - this.altura(raiz.izquierdo)
	}

	//METODOS PARA INSERTAR ------------------------------------------------------------------>
	//Inserta un nuevo nodo al arbol
	insertar(valor: any) {
		this.raiz = this.insertarNodo(valor, this.raiz)
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

	//Inserción de Nodo en el arbol
	private insertarNodo(valor: any, raiz: any) {
		if (raiz == null) {
			raiz = new NodoAvl(valor)
		} else {
			if (valor < raiz.valor) {
				raiz.izquierdo = this.insertarNodo(valor, raiz.izquierdo)
				raiz.izquierdo = this.equilibrar(raiz.izquierdo)
			} else if (valor >= raiz.valor) {
				raiz.derecho = this.insertarNodo(valor, raiz.derecho)
				raiz.derecho = this.equilibrar(raiz.derecho)
			}
		}
		raiz = this.equilibrar(raiz)
		raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		return raiz
	}

	//METODOS PARA ELIMINAR ---------------------------------------------------------------->
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
		raiz = this.equilibrar(raiz)
		raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		return raiz
	}

	private izqMayor(raiz: any) {
		while (raiz.derecho != null) {
			raiz = raiz.derecho
		}
		return raiz.valor
	}

	//Actualización de Nodos--------------------------------------------------------------->
	actualizar(valor: any, nuevo: any) {
		if (this.raiz != null) {
			this.eliminar(valor)
			this.insertar(nuevo)
		}
	}

	//ROTACIONES DEL ARBOL ----------------------------------------------------------------->
	private equilibrar(raiz: NodoAvl) {
		if (this.factor(raiz) == -2) {
			if (this.factor(raiz.izquierdo) == 1) {
				raiz = this.dobleDer(raiz)
			} else {
				raiz = this.simpleDer(raiz)
			}
		} else if (this.factor(raiz) == 2) {
			if (this.factor(raiz.derecho) == -1) {
				raiz = this.dobleIzq(raiz)
			} else {
				raiz = this.simpleIzq(raiz)
			}
		}
		return raiz
	}

	//Rotación cuando el factor es 2
	private simpleIzq(raiz: NodoAvl) {
		let aux = raiz.derecho
		raiz.derecho = aux.izquierdo
		aux.izquierdo = raiz
		raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		aux.altura = this.alturaMax(aux.izquierdo, raiz) + 1
		return aux
	}

	//Rotación cuando el factor es -2
	private simpleDer(raiz: NodoAvl) {
		let aux = raiz.izquierdo
		raiz.izquierdo = aux.derecho
		aux.derecho = raiz
		raiz.altura = this.alturaMax(raiz.izquierdo, raiz.derecho) + 1
		aux.altura = this.alturaMax(aux.izquierdo, raiz) + 1
		return aux
	}

	//Doble rotación para el factor 2
	private dobleIzq(raiz: NodoAvl) {
		raiz.derecho = this.simpleDer(raiz.derecho)
		return this.simpleIzq(raiz)
	}

	//Doble rotación cuando el factor -2
	private dobleDer(raiz: NodoAvl) {
		raiz.izquierdo = this.simpleIzq(raiz.izquierdo)
		return this.simpleDer(raiz)
	}

	//METODOS DE PRUEBAS ------------------------------------------------------------------->
	print() {
		console.log('\nARBOL AVL')
		if (this.raiz != null) {
			this.printNodo(this.raiz)
		}
	}

	printNodo(raiz: NodoAvl) {
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
