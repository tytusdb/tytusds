class NodoB{
	constructor(_valor){
		this.valor = _valor
		this.anterior = null
		this.siguiente = null
		this.der = null
		this.izq = null
	}
}

class Rama{
	constructor(){
		this.root = null
		this.hoja = true
		this.cont = 0
	}

	add(nodo){
		if(nodo == null){
			this.root = nodo
			this.cont++
		} else {
			let tmp = this.root
			do{
				if(nodo.valor <= tmp.valor){
					this.cont++
					if(tmp == this.root){
						this.root.anterior = nodo
						this.root.izq =nodo.der
						this.root = nodo
						break
					} else {
						nodo.anterior =tmp.anterior
						nodo.siguiente = tmp
						tmp.anterior.siguiente = nodo
						tmp.anterior.der = nodo.izq
						tmp.anterior = nodo
						tmp.izq = nodo.der
						break
					}
				} else if(tmp.siguiente == null){
					this.cont++
					tmp.siguiente = nodo
					tmp.der = nodo.izq
					nodo.anterior = tmp
					nodo.siguiente = null
					break
				}
				tmp = tmp.siguiente
			} while(tmp != null);
		}
	}
}

class ArbolB{
	constructor(){
		this.aux = null
		this.
	}
}