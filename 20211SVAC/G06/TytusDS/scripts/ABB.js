class NodoABB{
	constructor(_valor){
		this.valor = _valor
		this.izq = null
		this.der = null
	}
}

class ABB{
	constructor(_repeat){
		this.root = null
		this.repeat = _repeat
		this.level = 0
		this.array = []
		this.aux = null
		this.eliminado = null
		this.nuevoPadre = null
		this.nuevoHijo = null
		this.actualizado = null
	}

	add(valor){
		this.array = []
		this.root = this.insert(valor, this.root)
		return this.array
	}

	insert(valor, nodo){
		if(nodo == null){
			return new NodoABB(valor)
		} else {
			this.array.push(nodo.valor)
			if(valor.value < nodo.valor.value){
				nodo.izq = this.insert(valor, nodo.izq)
			} else if (valor.value > nodo.valor.value) {
				nodo.der = this.insert(valor, nodo.der)
			} else {
				if(this.repeat){
					nodo.izq = this.add(valor, nodo.izq)
				}
			}
		}
		return nodo
	}

	preorden(nodo){
		this.array = []
		this.pre_orden(this.root)
		return this.array
	}

	pre_orden(nodo){
		if(nodo != null){
			this.array.push(nodo.valor)
			console.log(nodo.valor)
			this.pre_orden(nodo.izq)
			this.pre_orden(nodo.der)
		}
	}

	inorden(){
		this.in_orden(this.root)
	}

	in_orden(nodo){
		if(nodo != null){
			this.in_orden(nodo.izq)
			console.log(nodo.valor.value)
			this.in_orden(nodo.der)
		}
	}

	postorden(){
		this.post_orden(this.root)
	}

	post_orden(nodo){
		if(nodo != null){
			this.post_orden(nodo.izq)
			this.post_orden(nodo.der)
			console.log(nodo.valor.value)
		}
	}

	exist(valor){
		return this.buscar(this.root, valor)
	}

	existe(nodo, valor){
		if(nodo != null){
			if(nodo.valor.value == valor){
				return true
			} else {
				if(valor <= nodo.valor.value){
					return this.buscar(nodo.izq, valor)
				} else {
					return this.buscar(nodo.der, valor)
				}
			}
		}
		return false
	}

	search(valor){
		this.array = []
		let encontrado =  this.buscar(this.root, valor)
		return {recorrido: this.array, encontrado: encontrado}
	}

	buscar(nodo, valor){
		if(nodo != null){
			this.array.push(nodo.valor)
			if(nodo.valor.value == valor){
				return true
			} else {
				if(valor <= nodo.valor.value){
					return this.buscar(nodo.izq, valor)
				} else {
					return this.buscar(nodo.der, valor)
				}
			}
		}
		return false
	}

	delete(valor){
		this.eliminado = null
		this.nuevoPadre = null
		this.nuevoHijo = null
		this.actualizado = null
		this.root = this.remove(null, this.root, valor)
		return {
			eliminado: this.eliminado,
			nuevoHijo: this.nuevoHijo,
			nuevoPadre: this.nuevoPadre,
			actualizado: this.actualizado
		}
	}

	remove(padre, nodo, valor){
		if(nodo != null){
			if(nodo.valor.value == valor){
				/********Encontramos el nodo*********/
				//Caso uno para eliminar
				if(nodo.izq  == null && nodo.der != null){
					console.log("Caso 1")
					this.eliminado = nodo
					this.nuevoPadre = padre
					this.nuevoHijo = nodo.der
					return nodo = nodo.der
				}
				//Caso dos para eliminar
				if(nodo.izq != null && nodo.der == null){
					console.log("Caso 2")
					this.eliminado = nodo
					this.nuevoPadre = padre
					this.nuevoHijo = nodo.izq
					return nodo = nodo.izq
				}
				//Caso tres para eliminar
				if(nodo.izq == null && nodo.der == null){
					console.log("Caso 3")
					this.eliminado = nodo
					return nodo = null
				}
				//Caso cuatro para eliminar
				if(nodo.izq != null && nodo.der != null){
					console.log("Caso 4")
					//function devulve el valor mas pequenio
					nodo.der = this.deleteMin(nodo.der)
					nodo.valor.value = this.aux.valor.value
					this.actualizado = nodo
					return nodo
				}
			} else {
				if(valor <= nodo.valor.value){
					nodo.izq = this.remove(nodo, nodo.izq, valor)
				} else {
					nodo.der = this.remove(nodo, nodo.der, valor)
				}
			}
		}
		return nodo
	}

	deleteMin(padre){
		if(padre.izq != null){
			if(padre.izq.izq == null){
				this.eliminado = padre.izq
				this.aux = padre.izq
				//En este caso el padre.izq es el minimo
				if(padre.izq.der == null){
					padre.izq = null
					return padre
				} else {
					this.nuevoPadre = padre
					this.nuevoHijo = padre.izq.der
					padre.izq = padre.izq.der
					return padre
				}
			} else {
				return this.deleteMin2(padre.izq)
			}
		}
		this.eliminado = padre
		this.aux = padre
		return null
	}
}