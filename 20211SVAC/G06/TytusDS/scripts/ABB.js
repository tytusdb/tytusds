class NodoABB{
	constructor(_valor){
		this.valor = _valor
		this.izq = null
		this.der = null
		this.array = []
	}
}

class ABB{
	constructor(_repeat){
		this.root = null
		this.repeat = _repeat
		this.level = 0
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
		this.pre_orden(this.root)
	}

	pre_orden(nodo){
		if(nodo != null){
			console.log(nodo.valor.value)
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
}

function bb(){
	let arbolito = new ABB(false)
	let prueba = arbolito.add({id:1,value:5})
	arbolito.add({id:1,value:3})
	arbolito.add({id:1,value:8})
	arbolito.add({id:1,value:7})
	arbolito.add({id:1,value:9})
	arbolito.add({id:1,value:1})
	arbolito.add({id:1,value:2})

	console.log(prueba)
	arbolito.inorden()

	console.log(arbolito.search(0))
}

bb()